# Eric Connelly — Personal Website

[ericconnelly.me](https://ericconnelly.me)

Static personal website for Eric Connelly, focused on cloud security, platform adoption, professional experience, and certifications.

## Architecture

- Static HTML hosted in Amazon S3
- Delivered globally through Amazon CloudFront
- Deployed automatically from the `main` branch through AWS CodePipeline
- Crawl metadata includes canonical URLs, `robots.txt`, and an XML sitemap

The canonical production domain is `https://ericconnelly.me`.
