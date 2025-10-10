# Quick Start Guide - Modernized Website

## 🚀 Getting Started

### Option 1: Test Locally (Recommended)

1. **Open the modernized version**
   ```bash
   # Simply open in your browser
   index-modern.html
   ```

2. **Test all features**
   - Click through navigation
   - Test mobile menu (resize browser)
   - Submit contact form (will hit your API)
   - Check responsive design

### Option 2: Deploy to S3

1. **Backup current site**
   ```bash
   # Download current index.html from S3
   aws s3 cp s3://your-bucket/index.html index-backup.html
   ```

2. **Upload new files**
   ```bash
   # Upload modernized files
   aws s3 cp index-modern.html s3://your-bucket/index.html
   aws s3 cp assets/css/modern.css s3://your-bucket/assets/css/
   aws s3 cp assets/js/modern.js s3://your-bucket/assets/js/
   aws s3 cp assets/js/config.js s3://your-bucket/assets/js/
   ```

3. **Invalidate CloudFront cache**
   ```bash
   aws cloudfront create-invalidation \
     --distribution-id YOUR_DISTRIBUTION_ID \
     --paths "/*"
   ```

### Option 3: Side-by-Side Testing

1. **Upload as separate file**
   ```bash
   aws s3 cp index-modern.html s3://your-bucket/modern.html
   ```

2. **Test at**: `https://ericconnelly.me/modern.html`

3. **Switch when ready**
   ```bash
   aws s3 cp s3://your-bucket/modern.html s3://your-bucket/index.html
   ```

## 📋 Pre-Deployment Checklist

- [ ] Test contact form locally
- [ ] Verify API endpoint in `modern.js` (line 2)
- [ ] Test on mobile device
- [ ] Check all images load
- [ ] Verify all links work
- [ ] Test in Chrome, Firefox, Safari
- [ ] Run Lighthouse audit
- [ ] Check console for errors

## 🔧 Configuration

### Update API Endpoint

Edit `assets/js/modern.js`:
```javascript
const CONFIG = {
    apiEndpoint: 'YOUR_API_ENDPOINT_HERE'
};
```

Or use the config file `assets/js/config.js`:
```javascript
export const config = {
    api: {
        endpoint: 'YOUR_API_ENDPOINT_HERE'
    }
};
```

## 🧪 Testing

### Local Testing
1. Open `index-modern.html` in browser
2. Open Developer Tools (F12)
3. Check Console for errors
4. Test form submission
5. Test responsive design (Device Toolbar)

### Contact Form Testing
```javascript
// Test data
Name: Test User
Email: test@example.com
Subject: Test Message
Message: This is a test message
```

Expected behavior:
- Form validates input
- Shows "Sending..." during submission
- Shows success message
- Form resets after success

## 🎨 Customization

### Change Colors
Edit `assets/css/modern.css`:
```css
:root {
    --primary: #2e476e;        /* Your brand color */
    --text: #888;              /* Body text */
    --bg: #fff;                /* Background */
}
```

### Add New Section
```html
<section id="new-section">
    <div class="container">
        <h2>New Section</h2>
        <p>Your content here</p>
    </div>
</section>
```

Add to navigation:
```html
<li><a href="#new-section">New Section</a></li>
```

## 📊 Performance Testing

### Run Lighthouse
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Click "Generate report"
4. Target scores: 90+ in all categories

### Check Core Web Vitals
- Visit: https://pagespeed.web.dev/
- Enter: https://ericconnelly.me
- Review metrics

## 🐛 Troubleshooting

### Contact Form Not Working
1. Check browser console for errors
2. Verify API endpoint is correct
3. Check CORS settings on API Gateway
4. Test API endpoint directly with Postman

### Mobile Menu Not Opening
1. Check if JavaScript loaded (console)
2. Verify no JavaScript errors
3. Test in different browsers

### Images Not Loading
1. Check image paths are correct
2. Verify images exist in S3
3. Check CloudFront distribution

### Styles Not Applied
1. Clear browser cache
2. Check CSS file path
3. Verify CSS uploaded to S3
4. Check browser console for 404s

## 🔄 Rollback

If something goes wrong:

```bash
# Restore backup
aws s3 cp index-backup.html s3://your-bucket/index.html

# Invalidate cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/index.html"
```

## 📱 Browser Support

### Fully Supported
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Partially Supported
- Older browsers will work but may lack some features
- Graceful degradation built-in

## 🚀 Next Steps

After successful deployment:

1. **Monitor Performance**
   - Set up Google Analytics
   - Monitor CloudWatch logs
   - Check error rates

2. **SEO Optimization**
   - Submit sitemap to Google
   - Update meta descriptions
   - Add structured data

3. **Future Enhancements**
   - Add dark mode
   - Implement PWA features
   - Add blog section
   - Integrate CMS

## 📞 Support

### Common Issues

**Q: Form submits but no email received**
A: Check Lambda function logs in CloudWatch

**Q: Mobile menu doesn't close**
A: Clear cache and hard reload (Ctrl+Shift+R)

**Q: Styles look broken**
A: Ensure modern.css is loaded, check Network tab

**Q: JavaScript errors in console**
A: Check if modern.js loaded correctly, verify syntax

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

## ✅ Success Criteria

Your modernization is successful when:
- ✅ Page loads in < 2 seconds
- ✅ Lighthouse score > 90
- ✅ Contact form works
- ✅ Mobile responsive
- ✅ No console errors
- ✅ All links functional
- ✅ Images load properly

---

**Need Help?** Review the MODERNIZATION.md and COMPARISON.md files for detailed information.
