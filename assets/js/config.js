// Environment configuration
// Update this file for different environments (dev, staging, prod)

export const config = {
	// API Configuration
	api: {
		endpoint: 'https://tkoqr84s4c.execute-api.us-east-1.amazonaws.com/PROD/email',
		timeout: 10000 // 10 seconds
	},

	// Feature flags
	features: {
		analytics: false,
		lazyLoading: true,
		smoothScroll: true
	},

	// Contact form settings
	contactForm: {
		maxMessageLength: 5000,
		requiredFields: ['name', 'email', 'subject', 'message']
	}
};

export default config;
