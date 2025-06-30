# Quick Setup Guide - Sports Heroes Homepage Theme

## Prerequisites

- WordPress 5.0+ installed
- Advanced Custom Fields (ACF) plugin
- Admin access to WordPress

## 5-Minute Setup

### Step 1: Install the Theme
1. Download/copy the `wordpress-homepage-theme` folder
2. Upload to `/wp-content/themes/` on your WordPress site
3. Go to **Appearance → Themes** and activate "Sports Heroes Homepage"

### Step 2: Install ACF Plugin
1. Go to **Plugins → Add New**
2. Search for "Advanced Custom Fields"
3. Install and activate ACF (Free version works, Pro recommended)

### Step 3: Create Homepage
1. Go to **Pages → Add New**
2. Title: "Home"
3. **Page Attributes → Template**: Select "Sports Heroes Homepage"
4. Click **Publish**

### Step 4: Set as Homepage
1. Go to **Settings → Reading**
2. Select "A static page" for homepage displays
3. Choose your "Home" page as the homepage
4. **Save Changes**

### Step 5: Configure Content
1. Edit your homepage
2. Scroll down to see ACF field groups
3. Fill in your content or use the defaults:

**Essential Fields to Update:**
- **Hero Section → CTA Button URL**: Your app URL
- **Download Section → App URL**: Your app URL
- **Athletes**: Add your featured athletes
- **App Screenshots**: Upload screenshots of your app

## Default Content Included

The theme works immediately with built-in defaults:

✅ **Hero Section**: "Inspire Young Readers with Sports Heroes"  
✅ **6 Features**: Reading, Quizzes, Progress, Audio, Mobile, Performance  
✅ **4 Athletes**: Mahomes, Serena, LeBron, Simone  
✅ **4 Steps**: Sign Up → Choose → Read → Quiz  
✅ **Benefits**: For Students, Parents, Teachers  

## Customization Quick Tips

### Update Your App URL
```php
// In ACF fields, update these:
- Hero Section → CTA Button URL
- Download Section → App URL
```

### Change Colors (Optional)
```css
/* In style.css, modify: */
:root {
  --accent: #FF8200; /* Your brand color */
}
```

### Add Your Screenshots
1. Go to **Media → Add New**
2. Upload app screenshots
3. In homepage editor, add to "App Screenshots" gallery

## Troubleshooting

**ACF fields not showing?**
- Ensure ACF plugin is activated
- Check you selected "Sports Heroes Homepage" template

**Styling looks off?**
- Clear any caching plugins
- Check browser developer tools for errors

**Mobile menu not working?**
- Ensure JavaScript is enabled
- Check browser console for errors

## Next Steps

1. **Add Content**: Customize all ACF fields with your specific content
2. **Upload Screenshots**: Add real screenshots of your Sports Heroes app
3. **Test Mobile**: Check responsive design on various devices
4. **SEO**: Add meta descriptions and optimize for search engines
5. **Analytics**: Set up Google Analytics to track CTA clicks

## Support

- Check the main README.md for detailed documentation
- Test with default WordPress themes to isolate issues
- Verify all plugins are up to date

---

**Your Sports Heroes homepage will be live and looking great in under 5 minutes!** 🏆
