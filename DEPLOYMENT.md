# WP Engine Deployment Guide

Complete guide for deploying the Sports Heroes Reading App to WP Engine's headless Node.js hosting platform.

## Overview

This application uses a **headless architecture**:
- **Frontend**: Next.js app hosted on WP Engine Node.js environment
- **Backend**: WordPress site (can be on WP Engine or external) for user data and progress tracking
- **Integration**: WordPress REST API with custom endpoints

## Prerequisites

### WP Engine Requirements
- WP Engine account with Node.js hosting enabled
- Node.js environment provisioned (18.x or 20.x LTS)
- Custom domain configured (optional but recommended)

### WordPress Requirements
- WordPress site with admin access
- Ability to install plugins
- Application Passwords enabled (WordPress 5.6+)

### Development Tools
- Git repository (GitHub, GitLab, etc.)
- Node.js 18+ installed locally
- npm or yarn package manager

## Step-by-Step Deployment

### Phase 1: WordPress Backend Setup

#### 1.1 Install the Sports Heroes Plugin

**Option A: WordPress Admin Upload**
1. Download `wordpress-plugin/sports-heroes-progress.php`
2. Go to WordPress Admin → Plugins → Add New → Upload Plugin
3. Upload the file and activate

**Option B: SFTP/File Manager**
1. Upload `sports-heroes-progress.php` to `/wp-content/plugins/`
2. Activate via WordPress Admin → Plugins

#### 1.2 Create Application Password
1. WordPress Admin → Users → Your Profile
2. Scroll to "Application Passwords" section
3. Add new password with name "Sports Heroes App"
4. **Save the generated password** - you'll need it for environment variables

#### 1.3 Test WordPress API
```bash
# Replace with your actual credentials
curl -X GET "https://your-wordpress-site.com/wp-json/wp/v2/users/me" \
     -H "Authorization: Basic $(echo -n 'username:app_password' | base64)"
```

### Phase 2: WP Engine Node.js Environment Setup

#### 2.1 Access WP Engine User Portal
1. Log into [WP Engine User Portal](https://my.wpengine.com)
2. Navigate to your Node.js environment
3. Note your environment URL (e.g., `your-app.wpengine.com`)

#### 2.2 Configure Environment Variables
In WP Engine User Portal → Your Environment → Environment Variables:

```env
NODE_ENV=production
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.wpengine.com
WORDPRESS_USERNAME=your_wp_username
WORDPRESS_PASSWORD=your_generated_app_password
```

**Important Notes**:
- Use the full WordPress URL including `https://`
- Use the Application Password, not your regular WordPress password
- Ensure no trailing slashes in URLs

### Phase 3: Code Deployment

#### 3.1 Git Deployment (Recommended)

**Setup Git Integration**:
1. WP Engine User Portal → Your Environment → Git Push
2. Add your Git repository URL
3. Configure branch (usually `main` or `master`)
4. Set up deploy key if using private repository

**Configure Build Settings**:
```bash
# Build Command
npm ci && npm run build

# Start Command
npm start

# Node.js Version
20.x
```

**Deploy**:
```bash
# From your local repository
git add .
git commit -m "Deploy to WP Engine"
git push wpengine main
```

#### 3.2 Manual Deployment (Alternative)

**Build Locally**:
```bash
npm install
npm run build
```

**Upload Files**:
1. Create a zip file of your entire project
2. WP Engine User Portal → Your Environment → File Manager
3. Upload and extract in the root directory
4. Ensure `package.json` and `.next` folder are present

### Phase 4: Domain and SSL Configuration

#### 4.1 Custom Domain Setup
1. WP Engine User Portal → Your Environment → Domains
2. Add your custom domain
3. Update DNS records:
   ```
   Type: CNAME
   Name: your-subdomain (or @)
   Value: your-app.wpengine.com
   ```

#### 4.2 SSL Certificate
- WP Engine automatically provisions SSL certificates
- Allow 24-48 hours for propagation
- Verify HTTPS is working: `https://your-domain.com`

### Phase 5: Performance Optimization

#### 5.1 Update next.config.ts
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static optimization
  output: 'standalone',
  
  // Optimize images
  images: {
    domains: ['your-wordpress-site.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Configure headers for caching
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },
  
  // CORS configuration if needed
  async rewrites() {
    return [
      {
        source: '/api/wordpress/:path*',
        destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
```

#### 5.2 Enable WP Engine CDN
1. WP Engine User Portal → Your Environment → Global Edge Security
2. Enable CDN for static assets
3. Configure cache rules for optimal performance

### Phase 6: Testing and Validation

#### 6.1 Functional Testing Checklist
- [ ] Application loads without errors
- [ ] User registration works
- [ ] User login works
- [ ] Stories load and display correctly
- [ ] Quizzes function properly
- [ ] Progress tracking saves to WordPress
- [ ] All 26 athletes are accessible
- [ ] Responsive design works on mobile/tablet

#### 6.2 Performance Testing
```bash
# Test page load speed
curl -w "@curl-format.txt" -o /dev/null -s "https://your-domain.com"

# Check WordPress API response time
curl -w "%{time_total}\n" -o /dev/null -s "https://your-wordpress-site.com/wp-json/wp/v2/"
```

#### 6.3 API Connectivity Test
```bash
# Test from your deployed app
curl -X GET "https://your-domain.com/api/test-wordpress" \
     -H "Content-Type: application/json"
```

### Phase 7: Monitoring and Maintenance

#### 7.1 Set Up Monitoring
1. **WP Engine Analytics**: Monitor traffic and performance
2. **Application Logs**: Check for errors in WP Engine User Portal
3. **Uptime Monitoring**: Use external service to monitor availability

#### 7.2 Regular Maintenance Tasks
- **Weekly**: Check application logs for errors
- **Monthly**: Review performance metrics
- **Quarterly**: Update dependencies and security patches

## Troubleshooting

### Common Deployment Issues

#### Build Failures
```bash
# Check Node.js version
node --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### API Connection Issues
1. **Verify WordPress URL**: Ensure it's accessible and correct
2. **Check Application Password**: Regenerate if needed
3. **Test CORS**: May need to configure WordPress CORS headers
4. **Firewall Issues**: Ensure WP Engine can access your WordPress site

#### Performance Issues
1. **Enable Caching**: Configure Next.js caching headers
2. **Optimize Images**: Use Next.js Image component
3. **Bundle Analysis**: Check for large dependencies
   ```bash
   npm install --save-dev @next/bundle-analyzer
   ANALYZE=true npm run build
   ```

### Error Codes and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid WordPress credentials | Regenerate Application Password |
| 404 Not Found | WordPress API endpoint missing | Verify plugin is activated |
| 500 Internal Server Error | WordPress plugin error | Check WordPress error logs |
| CORS Error | Cross-origin request blocked | Configure CORS headers |
| Build Timeout | Large bundle or slow dependencies | Optimize build process |

## Security Considerations

### Environment Variables
- Never commit `.env` files to version control
- Use WP Engine's environment variable system
- Rotate Application Passwords regularly

### WordPress Security
- Keep WordPress and plugins updated
- Use strong Application Passwords
- Limit API access to necessary endpoints only
- Consider IP whitelisting for production

### SSL and HTTPS
- Always use HTTPS in production
- Verify SSL certificate is valid
- Configure HSTS headers if needed

## Backup and Recovery

### Code Backup
- Git repository serves as primary backup
- WP Engine maintains automatic backups of your environment
- Consider additional backup to external storage

### WordPress Data Backup
- Use WP Engine's automatic WordPress backups
- Export user progress data regularly
- Test restore procedures

## Support Resources

### WP Engine Support
- [WP Engine Node.js Documentation](https://wpengine.com/support/nodejs/)
- [WP Engine Support Portal](https://wpengine.com/support/)
- Live chat and ticket support available

### WordPress Resources
- [WordPress REST API Documentation](https://developer.wordpress.org/rest-api/)
- [Application Passwords Guide](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/)

### Next.js Resources
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Next.js Performance Optimization](https://nextjs.org/docs/advanced-features/measuring-performance)

## Deployment Checklist

### Pre-Deployment
- [ ] WordPress plugin installed and activated
- [ ] Application password created and tested
- [ ] Environment variables configured
- [ ] Code committed to Git repository
- [ ] Build tested locally

### Deployment
- [ ] Git repository connected to WP Engine
- [ ] Build settings configured
- [ ] Environment variables set in WP Engine
- [ ] Code deployed successfully
- [ ] Application accessible via WP Engine URL

### Post-Deployment
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] All functionality tested
- [ ] Performance optimizations applied
- [ ] Monitoring configured
- [ ] Documentation updated

### Go-Live
- [ ] DNS updated to point to WP Engine
- [ ] Final functionality test
- [ ] Performance baseline established
- [ ] Team notified of successful deployment
- [ ] Monitoring alerts configured

---

**Need Help?** Contact WP Engine support or refer to the troubleshooting section above for common issues and solutions.
