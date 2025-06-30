# Sports Heroes Homepage WordPress Theme

A custom WordPress theme designed specifically for the Sports Heroes Reading App homepage. This theme features a dark design with Tennessee Orange accents, Advanced Custom Fields (ACF) integration, and responsive design that perfectly matches your Next.js app's aesthetic.

## Features

- 🎨 **Matching Design**: Perfectly matches your Sports Heroes app's color scheme and design language
- 🔧 **ACF Integration**: Comprehensive Advanced Custom Fields setup for easy content management
- 📱 **Responsive Design**: Mobile-first approach with breakpoints matching your app
- ⚡ **Performance Optimized**: Fast loading with optimized CSS and JavaScript
- 🎯 **SEO Ready**: Proper meta tags, Open Graph, and Twitter Card support
- 🎭 **Interactive Elements**: Smooth scrolling, animations, and mobile menu
- 📊 **Analytics Ready**: Built-in CTA tracking for Google Analytics

## Color Scheme

The theme uses the exact same color variables as your Sports Heroes app:

- **Background**: `#121212` (Very dark gray)
- **Foreground**: `#FFFFFF` (White primary text)
- **Secondary Text**: `#B3B3B3` (Light gray)
- **Accent**: `#FF8200` (Tennessee Orange)
- **Card Background**: `#1E1E1E` (Dark cards)
- **Border**: `#2C2C2C` (Subtle borders)
- **Smokey Gray**: `#4B4B4B` (Secondary accent)

## File Structure

```
wordpress-homepage-theme/
├── style.css                 # Main stylesheet with theme info
├── functions.php             # Theme functions and ACF field registration
├── index.php                 # Main template file
├── header.php                # Header template
├── footer.php                # Footer template
├── page-homepage.php         # Custom homepage template
├── js/
│   └── main.js              # Interactive JavaScript features
└── README.md                # This file
```

## Installation

### 1. Upload Theme

1. **Via WordPress Admin**:
   - Go to Appearance → Themes → Add New → Upload Theme
   - Upload the `wordpress-homepage-theme` folder as a ZIP file
   - Activate the theme

2. **Via FTP/SFTP**:
   - Upload the `wordpress-homepage-theme` folder to `/wp-content/themes/`
   - Go to Appearance → Themes and activate "Sports Heroes Homepage"

### 2. Install Required Plugins

**Advanced Custom Fields (ACF) - Required**
```bash
# Install ACF Pro (recommended) or ACF Free
# The theme will automatically register all field groups
```

### 3. Create Homepage

1. **Create a new page**:
   - Go to Pages → Add New
   - Title: "Home" or "Homepage"
   - Template: Select "Sports Heroes Homepage"
   - Publish the page

2. **Set as homepage**:
   - Go to Settings → Reading
   - Set "Your homepage displays" to "A static page"
   - Select your new page as the homepage

### 4. Configure Content

Once you've created the homepage, you'll see ACF field groups in the page editor:

#### Hero Section
- **Hero Title**: Main headline (default: "Inspire Young Readers with Sports Heroes")
- **Hero Subtitle**: Secondary headline
- **Hero Description**: Supporting text
- **CTA Button Text**: Button label
- **CTA Button URL**: Link to your Sports Heroes app

#### Features Section
- **Features Title**: Section heading
- **Features**: Repeater field for feature cards
  - Feature Icon (emoji selector)
  - Feature Title
  - Feature Description

#### Athletes Showcase
- **Athletes Title**: Section heading
- **Featured Athletes**: Repeater for athlete cards
  - Athlete Name
  - Sport
  - Athlete Emoji
  - Short Bio

#### How It Works
- **Process Steps**: Repeater for step-by-step process
  - Step Number
  - Step Title
  - Step Description

#### Benefits Section
- **Student Benefits**: Benefits for students
- **Parent Benefits**: Benefits for parents
- **Teacher Benefits**: Benefits for teachers

#### App Gallery
- **Gallery Title**: Section heading
- **Gallery Description**: Supporting text
- **App Screenshots**: Image gallery field

#### Download Section
- **Download Title**: Final CTA section heading
- **Download Description**: Supporting text
- **App URL**: Link to your app
- **Download Button Text**: Button label
- **System Requirements**: Technical requirements text

## Customization

### Updating Colors

To modify colors, edit the CSS variables in `style.css`:

```css
:root {
  --background: #121212;
  --foreground: #FFFFFF;
  --accent: #FF8200;
  /* ... other variables */
}
```

### Adding Custom Sections

1. **Add ACF Fields**:
   - Edit `functions.php`
   - Add new field group in `sports_heroes_register_acf_fields()`

2. **Update Template**:
   - Edit `page-homepage.php`
   - Add new section with proper HTML structure

### Modifying JavaScript

Edit `js/main.js` to add or modify interactive features:
- Smooth scrolling
- Animations
- Mobile menu
- Analytics tracking

## Default Content

The theme includes sensible defaults for all sections, so it will look great even without custom content. Default content includes:

- **6 Features**: Interactive Stories, Comprehension Quizzes, Progress Tracking, Text-to-Speech, Mobile Friendly, Fast & Reliable
- **4 Athletes**: Patrick Mahomes, Serena Williams, LeBron James, Simone Biles
- **4 Process Steps**: Sign Up, Choose Athlete, Read Story, Take Quiz
- **Benefits**: Organized by Students, Parents, and Teachers

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The theme is optimized for performance:
- Minimal CSS and JavaScript
- Optimized images with lazy loading
- Efficient animations using CSS transforms
- Mobile-first responsive design

## SEO Features

- Proper HTML5 semantic structure
- Meta descriptions and keywords
- Open Graph tags for social sharing
- Twitter Card support
- Schema.org markup ready
- Fast loading times

## Accessibility

- WCAG 2.1 AA compliant color contrast
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Semantic HTML structure
- Alt text support for images

## Analytics Integration

The theme includes built-in analytics tracking:

```javascript
// Google Analytics 4 events
gtag('event', 'cta_click', {
  'button_text': buttonText,
  'section': section,
  'page_title': document.title
});
```

## Troubleshooting

### ACF Fields Not Showing
- Ensure ACF plugin is installed and activated
- Check that you're editing a page with "Sports Heroes Homepage" template
- Verify functions.php is loading correctly

### Styling Issues
- Clear any caching plugins
- Check for theme conflicts
- Ensure CSS variables are supported in your browser

### Mobile Menu Not Working
- Check JavaScript console for errors
- Ensure main.js is loading correctly
- Verify jQuery is available

## Support

For technical support:
1. Check the WordPress debug log
2. Verify all required plugins are installed
3. Test with default WordPress themes to isolate issues
4. Check browser console for JavaScript errors

## Updates

To update the theme:
1. Backup your current theme and customizations
2. Upload the new theme files
3. Test all functionality
4. Update any custom modifications

## License

This theme is designed specifically for the Sports Heroes Reading App. All rights reserved.

---

**Built with ❤️ for young readers and the Sports Heroes community.**
