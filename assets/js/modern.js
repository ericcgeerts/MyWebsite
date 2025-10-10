// Configuration
const CONFIG = {
	apiEndpoint: 'https://tkoqr84s4c.execute-api.us-east-1.amazonaws.com/PROD/email'
};

// Smooth scroll navigation
class Navigation {
	constructor() {
		this.nav = document.getElementById('nav');
		this.sections = document.querySelectorAll('main section[id]');
		this.navLinks = this.nav.querySelectorAll('a');
		this.init();
	}

	init() {
		this.setupClickHandlers();
		this.setupScrollSpy();
	}

	setupClickHandlers() {
		this.navLinks.forEach(link => {
			link.addEventListener('click', (e) => {
				const href = link.getAttribute('href');
				if (href.startsWith('#')) {
					e.preventDefault();
					const target = document.querySelector(href);
					if (target) {
						target.scrollIntoView({ behavior: 'smooth' });
						this.setActiveLink(link);
						// Close mobile menu if open
						if (window.innerWidth <= 1024) {
							document.getElementById('header').classList.remove('active');
							document.getElementById('menu-toggle').classList.remove('active');
						}
					}
				}
			});
		});
	}

	setupScrollSpy() {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const id = entry.target.getAttribute('id');
						const link = this.nav.querySelector(`a[href="#${id}"]`);
						if (link) {
							this.setActiveLink(link);
						}
					}
				});
			},
			{ threshold: 0.5 }
		);

		this.sections.forEach(section => observer.observe(section));
	}

	setActiveLink(activeLink) {
		this.navLinks.forEach(link => link.classList.remove('active'));
		activeLink.classList.add('active');
	}
}

// Mobile menu toggle
class MobileMenu {
	constructor() {
		this.toggle = document.getElementById('menu-toggle');
		this.header = document.getElementById('header');
		this.init();
	}

	init() {
		this.toggle.addEventListener('click', () => this.toggleMenu());
		
		// Close menu when clicking outside
		document.addEventListener('click', (e) => {
			if (!this.header.contains(e.target) && !this.toggle.contains(e.target)) {
				this.closeMenu();
			}
		});
	}

	toggleMenu() {
		this.toggle.classList.toggle('active');
		this.header.classList.toggle('active');
		const isExpanded = this.header.classList.contains('active');
		this.toggle.setAttribute('aria-expanded', isExpanded);
	}

	closeMenu() {
		this.toggle.classList.remove('active');
		this.header.classList.remove('active');
		this.toggle.setAttribute('aria-expanded', 'false');
	}
}

// Contact form handler
class ContactForm {
	constructor() {
		this.form = document.getElementById('contact-form');
		this.message = document.getElementById('contact-message');
		this.init();
	}

	init() {
		this.form.addEventListener('submit', (e) => this.handleSubmit(e));
	}

	async handleSubmit(e) {
		e.preventDefault();

		const formData = {
			Name: this.form.name.value.trim(),
			Email: this.form.email.value.trim(),
			Subject: this.form.subject.value.trim(),
			Body: this.form.message.value.trim()
		};

		// Basic validation
		if (!this.validateForm(formData)) {
			return;
		}

		// Disable form during submission
		this.setFormState(true);

		try {
			const response = await fetch(CONFIG.apiEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				this.showSuccess();
				this.form.reset();
			} else {
				throw new Error('Failed to send message');
			}
		} catch (error) {
			console.error('Error sending message:', error);
			this.showError();
		} finally {
			this.setFormState(false);
		}
	}

	validateForm(data) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!data.Name || !data.Email || !data.Subject || !data.Body) {
			this.showMessage('Please fill in all fields', 'error');
			return false;
		}

		if (!emailRegex.test(data.Email)) {
			this.showMessage('Please enter a valid email address', 'error');
			return false;
		}

		return true;
	}

	setFormState(isSubmitting) {
		const submitBtn = this.form.querySelector('button[type="submit"]');
		const inputs = this.form.querySelectorAll('input, textarea, button');

		inputs.forEach(input => input.disabled = isSubmitting);
		submitBtn.textContent = isSubmitting ? 'Sending...' : 'Send Message';
	}

	showSuccess() {
		this.showMessage('Thank you for reaching out! I\'ll get back to you soon.', 'success');
	}

	showError() {
		this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
	}

	showMessage(text, type) {
		this.message.textContent = text;
		this.message.style.color = type === 'success' ? '#2e476e' : '#d9534f';
		this.message.style.fontWeight = '700';
	}
}

// Lazy load images
class LazyLoader {
	constructor() {
		this.images = document.querySelectorAll('img[loading="lazy"]');
		this.init();
	}

	init() {
		if ('loading' in HTMLImageElement.prototype) {
			// Browser supports native lazy loading
			return;
		}

		// Fallback for browsers that don't support native lazy loading
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const img = entry.target;
					img.src = img.dataset.src || img.src;
					observer.unobserve(img);
				}
			});
		});

		this.images.forEach(img => observer.observe(img));
	}
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
	new Navigation();
	new MobileMenu();
	new ContactForm();
	new LazyLoader();

	// Remove preload class
	document.body.classList.remove('is-preload');
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
	if (document.hidden) {
		// Pause animations or reduce activity when page is hidden
		console.log('Page hidden - reducing activity');
	} else {
		// Resume normal activity
		console.log('Page visible - resuming activity');
	}
});
