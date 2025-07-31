# Sports Heroes Admin Dashboard

A comprehensive WordPress admin dashboard for managing users and progress in the Sports Heroes Reading App.

## Overview

This admin dashboard provides a complete solution for monitoring and managing users of the Sports Heroes Reading App. It includes analytics, user management, progress tracking, and data export capabilities.

## Features

### 📊 Dashboard Analytics
- **Key Metrics**: Total users, active users, stories read, average quiz scores
- **Visual Charts**: User registrations, popular athletes, quiz score distribution, daily activity
- **Real-time Data**: Live statistics updated from WordPress database

### 👥 User Management
- **User Table**: Searchable and filterable list of all users
- **Activity Indicators**: Visual indicators for user engagement levels
- **Individual Actions**: View details, reset progress, delete users
- **Bulk Operations**: Export, reset progress, or delete multiple users

### 📈 Progress Tracking
- **Individual User Details**: Complete progress breakdown per user
- **Visual Progress Grid**: Color-coded athlete completion status
- **Activity Timeline**: Chronological view of user activities
- **Reading Analytics**: Time spent reading, quiz performance

### 📤 Export & Reporting
- **CSV Export**: User data with customizable date ranges
- **PDF Reports**: Comprehensive progress reports
- **Custom Filters**: Include/exclude specific data points
- **Bulk Export**: Export selected users or all data

## File Structure

```
wordpress-plugin/
├── sports-heroes-admin-dashboard.php    # Main plugin file
├── sports-heroes-progress.php           # Original progress tracking plugin
├── demo-data-generator.php              # Demo data generator (optional)
├── admin/
│   ├── css/
│   │   └── dashboard.css                # Dashboard styles
│   └── js/
│       └── dashboard.js                 # Dashboard JavaScript
├── ADMIN_DASHBOARD_SETUP.md             # Installation guide
└── README.md                            # This file
```

## Installation

### Quick Setup

1. **Upload Plugin Files**
   ```
   wp-content/plugins/
   ├── sports-heroes-admin-dashboard.php
   ├── sports-heroes-progress.php
   └── admin/
       ├── css/dashboard.css
       └── js/dashboard.js
   ```

2. **Activate Plugins**
   - Go to WordPress Admin → Plugins
   - Activate "Sports Heroes Progress Tracker"
   - Activate "Sports Heroes Admin Dashboard"

3. **Access Dashboard**
   - Navigate to WordPress Admin → Sports Heroes
   - Explore the dashboard, users, and export sections

### Demo Data (Optional)

For testing purposes, you can generate sample data:

1. Upload `demo-data-generator.php` to the plugins directory
2. Go to Sports Heroes → Demo Data
3. Generate 50-100 sample users with progress data
4. Test all dashboard features with realistic data

## Dashboard Pages

### 1. Overview Dashboard
**Location**: Sports Heroes → Sports Heroes

**Features**:
- Key metrics cards showing totals and averages
- Interactive charts powered by Chart.js
- Real-time data from WordPress database
- Responsive design for all screen sizes

### 2. Users Management
**Location**: Sports Heroes → Users

**Features**:
- DataTables-powered user list with search and filtering
- Activity level indicators (high/medium/low/inactive)
- Individual user actions (view, reset, delete)
- Bulk operations with confirmation dialogs

### 3. User Details
**Location**: Accessible from user management page

**Features**:
- Complete user profile information
- Visual progress grid for all athletes
- Individual athlete progress cards with scores
- Activity timeline showing chronological progress

### 4. Export Data
**Location**: Sports Heroes → Export

**Features**:
- User data export with date range filtering
- Progress reports with multiple format options
- Customizable data inclusion (progress, quiz details, reading times)
- Instant download generation

## API Endpoints

The dashboard creates REST API endpoints for data access:

```
GET /wp-json/sports-heroes/v1/admin/dashboard-stats
GET /wp-json/sports-heroes/v1/admin/users
GET /wp-json/sports-heroes/v1/admin/user/{id}
GET /wp-json/sports-heroes/v1/admin/analytics
```

All endpoints require administrator permissions and proper authentication.

## Technical Details

### Dependencies
- **Chart.js**: For dashboard visualizations
- **DataTables**: For user management tables
- **jQuery**: For JavaScript functionality
- **WordPress REST API**: For data communication

### Database Integration
- Uses existing `sports-progress` custom post type
- Optimized queries with JOINs for performance
- Meta fields for detailed progress tracking
- Compatible with existing progress data

### Security
- Administrator-only access (`manage_options` capability)
- Nonce verification for all AJAX requests
- Sanitized input and prepared SQL statements
- Confirmation dialogs for destructive operations

## Customization

### Adding Custom Metrics
Modify the `get_dashboard_stats()` method in the main plugin file to add new statistics.

### Styling Changes
Edit `admin/css/dashboard.css` to customize colors, layouts, and responsive behavior.

### New Chart Types
Add new charts by modifying the JavaScript file and adding corresponding data endpoints.

## Performance Considerations

### For Large User Bases
- Database queries are optimized with proper indexing
- Consider implementing pagination for very large datasets
- Use WordPress transients for caching dashboard statistics

### Recommended Limits
- **Users**: Tested with up to 1,000 users
- **Progress Records**: Handles thousands of progress entries efficiently
- **Charts**: Optimized for datasets up to 500 data points

## Troubleshooting

### Common Issues

**Dashboard Not Loading**
- Verify both plugins are activated
- Check user has Administrator role
- Clear any caching plugins

**Charts Not Displaying**
- Ensure Chart.js is loading (check browser console)
- Verify REST API endpoints are accessible
- Check for JavaScript errors

**DataTables Issues**
- Confirm DataTables library is loading
- Check for jQuery conflicts
- Verify AJAX endpoints are responding

### Debug Mode
Enable WordPress debug mode in `wp-config.php`:
```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
```

Check `/wp-content/debug.log` for detailed error information.

## Version History

### Version 1.0
- Initial release with core dashboard functionality
- User management with search and filtering
- Basic analytics and charts
- Export functionality
- Bulk user operations
- Demo data generator for testing

## Support & Development

### File Locations
- **Main Plugin**: `sports-heroes-admin-dashboard.php`
- **Styles**: `admin/css/dashboard.css`
- **JavaScript**: `admin/js/dashboard.js`
- **Setup Guide**: `ADMIN_DASHBOARD_SETUP.md`

### Key Classes
- `SportsHeroesAdminDashboard`: Main dashboard functionality
- `SportsHeroesProgress`: Original progress tracking (existing)
- `SportsHeroesDemoDataGenerator`: Demo data generation (optional)

### WordPress Hooks Used
- `admin_menu`: Add dashboard menu pages
- `admin_enqueue_scripts`: Load CSS and JavaScript
- `rest_api_init`: Register REST API endpoints
- `wp_ajax_*`: Handle AJAX requests

## Integration with Sports Heroes App

This admin dashboard is designed to work seamlessly with the existing Sports Heroes Reading App:

- **User Data**: Integrates with Google OAuth user creation
- **Progress Tracking**: Uses existing progress data structure
- **WordPress Integration**: Compatible with current WordPress setup
- **API Compatibility**: Works with existing REST API endpoints

## Future Enhancements

Potential future features:
- Email notifications for admin actions
- Advanced user segmentation and filtering
- Custom report scheduling and automation
- User engagement analytics and insights
- Integration with external analytics platforms

## License

This admin dashboard is part of the Sports Heroes Reading App project and follows the same licensing terms.
