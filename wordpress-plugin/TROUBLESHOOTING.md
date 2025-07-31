# Sports Heroes Admin Dashboard - Troubleshooting Guide

## Common Browser and Authentication Issues

### Browser Extension Conflicts

**Error**: `Failed to execute 'put' on 'Cache': Request scheme 'chrome-extension' is unsupported`

**Cause**: Browser extensions (like ad blockers, privacy tools, or development extensions) interfering with the dashboard.

**Solutions**:
1. **Disable Browser Extensions**: Temporarily disable all browser extensions and test the dashboard
2. **Use Incognito/Private Mode**: Test the dashboard in a private browsing window
3. **Whitelist Your Site**: Add your WordPress site to extension whitelists
4. **Try Different Browser**: Test with Firefox, Safari, or Edge

### Authentication Issues

**Error**: `Access Denied - You do not have permission to sign in`

**Cause**: User account lacks administrator privileges or authentication system issues.

**Solutions**:

#### 1. Check User Role
```sql
-- Check user role in WordPress database
SELECT u.user_login, u.user_email, m.meta_value as capabilities
FROM wp_users u
JOIN wp_usermeta m ON u.ID = m.user_id
WHERE m.meta_key = 'wp_capabilities'
AND u.user_login = 'your_username';
```

#### 2. Grant Administrator Access
```php
// Add to WordPress functions.php temporarily
function make_user_admin() {
    $user = get_user_by('email', 'your-email@example.com');
    if ($user) {
        $user->set_role('administrator');
    }
}
add_action('init', 'make_user_admin');
```

#### 3. WordPress Admin Access
- Go directly to `/wp-admin/` on your WordPress site
- Log in with WordPress admin credentials
- Navigate to Users → All Users
- Edit your user and change role to "Administrator"

### Service Worker Issues

**Error**: `A store named 'undefined' already exists`

**Cause**: Conflicting service workers or cached data.

**Solutions**:
1. **Clear Browser Cache**: Clear all browser data for your site
2. **Disable Service Worker**: Add to your site's header temporarily:
   ```html
   <script>
   if ('serviceWorker' in navigator) {
       navigator.serviceWorker.getRegistrations().then(function(registrations) {
           for(let registration of registrations) {
               registration.unregister();
           }
       });
   }
   </script>
   ```

### WordPress-Specific Issues

#### Plugin Conflicts
1. **Deactivate Other Plugins**: Temporarily deactivate all other plugins
2. **Test Dashboard**: Check if the Sports Heroes dashboard works
3. **Reactivate One by One**: Find the conflicting plugin

#### Theme Conflicts
1. **Switch to Default Theme**: Temporarily switch to Twenty Twenty-Four
2. **Test Dashboard**: Check functionality
3. **Theme Compatibility**: Some themes may conflict with admin styles

#### WordPress Configuration

**Check wp-config.php**:
```php
// Ensure these are set correctly
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

// Check if REST API is enabled
// These should NOT be in your wp-config.php:
// define('JSON_API_ENABLED', false);
// define('REST_API_ENABLED', false);
```

### Database Issues

#### Check Required Tables
```sql
-- Verify sports-progress post type exists
SELECT COUNT(*) FROM wp_posts WHERE post_type = 'sports-progress';

-- Check if meta tables have data
SELECT COUNT(*) FROM wp_postmeta WHERE meta_key LIKE 'user_id';
```

#### Reset Plugin Data (if needed)
```sql
-- CAUTION: This will delete all progress data
DELETE FROM wp_posts WHERE post_type = 'sports-progress';
DELETE FROM wp_postmeta WHERE post_id NOT IN (SELECT ID FROM wp_posts);
```

### Network and Server Issues

#### Check REST API Access
Test these URLs directly in your browser:
```
https://your-site.com/wp-json/wp/v2/users
https://your-site.com/wp-json/sports-heroes/v1/admin/dashboard-stats
```

#### Server Requirements
- **PHP Version**: 7.4 or higher
- **WordPress Version**: 5.0 or higher
- **Memory Limit**: At least 256MB
- **Max Execution Time**: At least 60 seconds

### Step-by-Step Debugging

#### 1. Basic Connectivity Test
```javascript
// Test in browser console
fetch('/wp-json/wp/v2/users', {
    credentials: 'include',
    headers: {
        'X-WP-Nonce': wpApiSettings.nonce
    }
}).then(response => console.log(response.status));
```

#### 2. Check Plugin Activation
```php
// Add to functions.php to verify plugins are active
function check_sports_heroes_plugins() {
    $active_plugins = get_option('active_plugins');
    error_log('Active plugins: ' . print_r($active_plugins, true));
}
add_action('admin_init', 'check_sports_heroes_plugins');
```

#### 3. Verify User Permissions
```php
// Check current user capabilities
function check_user_caps() {
    if (is_user_logged_in()) {
        $user = wp_get_current_user();
        error_log('User capabilities: ' . print_r($user->allcaps, true));
    }
}
add_action('admin_init', 'check_user_caps');
```

### Alternative Access Methods

#### Direct Database Access
If the dashboard won't load, you can still access data directly:

```sql
-- Get user count
SELECT COUNT(*) as total_users FROM wp_users;

-- Get progress summary
SELECT 
    pm1.meta_value as athlete_name,
    COUNT(*) as story_count
FROM wp_posts p
JOIN wp_postmeta pm1 ON p.ID = pm1.post_id AND pm1.meta_key = 'athlete_name'
JOIN wp_postmeta pm2 ON p.ID = pm2.post_id AND pm2.meta_key = 'story_read' AND pm2.meta_value = '1'
WHERE p.post_type = 'sports-progress'
GROUP BY pm1.meta_value
ORDER BY story_count DESC;
```

#### WordPress CLI (if available)
```bash
# Check user roles
wp user list --role=administrator

# Check plugin status
wp plugin list

# Flush rewrite rules
wp rewrite flush
```

### Emergency Recovery

#### If Dashboard is Completely Broken
1. **Deactivate Plugin**: Via FTP, rename the plugin folder
2. **Check Error Logs**: Look in `/wp-content/debug.log`
3. **Restore Backup**: If you have a recent backup
4. **Manual Database Cleanup**: Remove plugin data if necessary

#### Reset to Clean State
```sql
-- Remove all Sports Heroes data (CAUTION: Irreversible)
DELETE FROM wp_posts WHERE post_type = 'sports-progress';
DELETE FROM wp_postmeta WHERE meta_key LIKE '%sports%';
DELETE FROM wp_options WHERE option_name LIKE '%sports%';
```

### Getting Help

#### Information to Collect
When seeking support, provide:
1. **WordPress Version**: Found in Dashboard → Updates
2. **PHP Version**: Found in Tools → Site Health
3. **Active Plugins**: List of all active plugins
4. **Theme**: Current active theme
5. **Error Messages**: Complete error messages from browser console
6. **Server Logs**: Any relevant server error logs

#### Debug Information
```php
// Add to functions.php for debugging
function sports_heroes_debug_info() {
    if (current_user_can('manage_options')) {
        echo '<div class="notice notice-info">';
        echo '<h3>Sports Heroes Debug Info</h3>';
        echo '<p><strong>WordPress Version:</strong> ' . get_bloginfo('version') . '</p>';
        echo '<p><strong>PHP Version:</strong> ' . PHP_VERSION . '</p>';
        echo '<p><strong>Active Theme:</strong> ' . wp_get_theme()->get('Name') . '</p>';
        echo '<p><strong>Plugin Active:</strong> ' . (is_plugin_active('sports-heroes-admin-dashboard.php') ? 'Yes' : 'No') . '</p>';
        echo '</div>';
    }
}
add_action('admin_notices', 'sports_heroes_debug_info');
```

This troubleshooting guide should help resolve most common issues with the Sports Heroes Admin Dashboard.
