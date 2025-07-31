# Sports Heroes Admin Dashboard Setup Guide

This guide will help you install and configure the comprehensive admin dashboard for managing users and progress in the Sports Heroes Reading App.

## Overview

The admin dashboard provides:
- **Overview Dashboard**: Key metrics and analytics charts
- **Users Management**: Search, filter, and manage all users
- **Individual User Details**: Detailed progress tracking per user
- **Export Functionality**: CSV and PDF exports of user data
- **Bulk Actions**: Reset progress, delete users, export data

## Installation Steps

### 1. Install the Admin Dashboard Plugin

**Option A: Upload via WordPress Admin**
1. Go to WordPress Admin → Plugins → Add New
2. Click "Upload Plugin"
3. Upload `sports-heroes-admin-dashboard.php`
4. Click "Activate Plugin"

**Option B: Manual Installation**
1. Copy `sports-heroes-admin-dashboard.php` to `/wp-content/plugins/`
2. Go to WordPress Admin → Plugins
3. Find "Sports Heroes Admin Dashboard" and click "Activate"

### 2. Create Required Directory Structure

The plugin will automatically create the necessary directories, but you can manually create them if needed:

```
wp-content/plugins/
├── sports-heroes-admin-dashboard.php
└── admin/
    ├── css/
    │   └── dashboard.css
    └── js/
        └── dashboard.js
```

### 3. Upload Assets

Copy the CSS and JavaScript files to the correct locations:
- Copy `admin/css/dashboard.css` to `/wp-content/plugins/admin/css/`
- Copy `admin/js/dashboard.js` to `/wp-content/plugins/admin/js/`

### 4. Verify Installation

After activation, you should see a new "Sports Heroes" menu item in your WordPress admin sidebar with the following submenu items:
- **Sports Heroes** (Overview Dashboard)
- **Users** (Users Management)
- **Export** (Data Export)

## Dashboard Features

### Overview Dashboard

**Key Metrics Cards:**
- Total Users: Count of all registered users
- Active Users (30 days): Users with activity in the last 30 days
- Stories Read: Total number of stories completed
- Average Quiz Score: Overall average quiz performance

**Charts:**
- User Registrations Over Time: Line chart showing new user signups
- Most Popular Athletes: Bar chart of most-read athlete stories
- Quiz Score Distribution: Doughnut chart showing score breakdown
- Daily Activity: Bar chart of daily user activity

### Users Management

**User Table Features:**
- Search by name or email
- Filter by activity level and date range
- Sortable columns (registration date, stories read, quiz scores)
- Activity indicators (high/medium/low/inactive)
- Individual user actions (View, Reset Progress, Delete)

**Bulk Actions:**
- Export selected users to CSV
- Reset progress for multiple users
- Delete multiple users

**User Detail Pages:**
- Complete user profile information
- Visual progress grid showing all athlete progress
- Individual athlete cards with reading time and quiz scores
- Activity timeline showing chronological progress

### Export Functionality

**User Data Export:**
- CSV format with customizable date ranges
- Include/exclude progress data, quiz details, reading times
- PDF report generation

**Progress Reports:**
- Summary reports with key statistics
- Detailed progress breakdowns
- Athlete performance analysis

## API Endpoints

The dashboard creates several REST API endpoints:

```
GET /wp-json/sports-heroes/v1/admin/dashboard-stats
GET /wp-json/sports-heroes/v1/admin/users
GET /wp-json/sports-heroes/v1/admin/user/{id}
GET /wp-json/sports-heroes/v1/admin/analytics
```

## Permissions

- Only users with `manage_options` capability (Administrators) can access the dashboard
- All API endpoints require proper authentication
- Bulk actions include confirmation dialogs for destructive operations

## Troubleshooting

### Common Issues

**1. Dashboard Not Appearing**
- Verify plugin is activated
- Check user has Administrator role
- Clear any caching plugins

**2. Charts Not Loading**
- Ensure Chart.js is loading (check browser console)
- Verify REST API endpoints are accessible
- Check for JavaScript errors in browser console

**3. DataTables Not Working**
- Confirm DataTables library is loading
- Check for jQuery conflicts
- Verify AJAX endpoints are responding

**4. Styling Issues**
- Ensure CSS file is properly uploaded
- Check for theme conflicts
- Verify file permissions

### Debug Mode

Enable debug mode by adding to `wp-config.php`:
```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
```

Check debug logs at `/wp-content/debug.log` for any errors.

### Performance Optimization

**For Large User Bases:**
- Consider implementing pagination for user lists
- Add database indexes for faster queries
- Use caching for dashboard statistics

**Database Queries:**
The dashboard uses optimized queries with JOINs to minimize database calls. For very large datasets, consider:
- Adding database indexes on meta_key and meta_value columns
- Implementing query caching
- Using transients for dashboard statistics

## Customization

### Adding Custom Metrics

To add new dashboard statistics, modify the `get_dashboard_stats()` method in the main plugin file:

```php
public function get_dashboard_stats($request) {
    global $wpdb;
    
    // Add your custom metric
    $custom_metric = $wpdb->get_var("YOUR_CUSTOM_QUERY");
    
    return rest_ensure_response(array(
        'total_users' => intval($total_users),
        'active_users' => intval($active_users),
        'total_stories' => intval($total_stories),
        'avg_quiz_score' => round(floatval($avg_quiz_score), 1),
        'custom_metric' => intval($custom_metric) // Add here
    ));
}
```

### Styling Customization

Modify `admin/css/dashboard.css` to customize the appearance:
- Change color schemes by updating CSS variables
- Adjust grid layouts for different screen sizes
- Customize chart colors and styling

### Adding New Charts

To add new charts, modify the JavaScript file:

1. Add a new canvas element to the PHP template
2. Create a new chart rendering function in `dashboard.js`
3. Add the chart data to the analytics API endpoint

## Security Considerations

- All API endpoints require proper WordPress authentication
- User input is sanitized using WordPress functions
- Bulk actions include confirmation dialogs
- Database queries use prepared statements
- File uploads are restricted to administrators only

## Backup Recommendations

Before using bulk delete operations:
- Always backup your WordPress database
- Test bulk actions on a staging site first
- Consider exporting user data before major changes

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review WordPress debug logs
3. Verify all files are properly uploaded
4. Ensure proper user permissions

## Version History

**Version 1.0**
- Initial release with core dashboard functionality
- User management with search and filtering
- Basic analytics and charts
- Export functionality
- Bulk user operations

## Future Enhancements

Potential future features:
- Email notifications for admin actions
- Advanced filtering options
- Custom report generation
- User engagement analytics
- Automated backup before bulk operations
