<?php
/**
 * Plugin Name: Sports Heroes Admin Dashboard
 * Description: Comprehensive admin dashboard for managing users and progress in the Sports Heroes Reading App
 * Version: 1.0
 * Author: Sports Heroes Team
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class SportsHeroesAdminDashboard {
    
    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        add_action('rest_api_init', array($this, 'register_admin_api_routes'));
        add_action('wp_ajax_sports_heroes_bulk_action', array($this, 'handle_bulk_action'));
    }
    
    /**
     * Add admin menu pages
     */
    public function add_admin_menu() {
        // Main dashboard page
        add_menu_page(
            'Sports Heroes Dashboard',
            'Sports Heroes',
            'manage_options',
            'sports-heroes-dashboard',
            array($this, 'render_overview_page'),
            'dashicons-chart-area',
            25
        );
        
        // Users management submenu
        add_submenu_page(
            'sports-heroes-dashboard',
            'Users Management',
            'Users',
            'manage_options',
            'sports-heroes-users',
            array($this, 'render_users_page')
        );
        
        // Individual user detail page (hidden from menu)
        add_submenu_page(
            null, // Hidden from menu
            'User Details',
            'User Details',
            'manage_options',
            'sports-heroes-user-detail',
            array($this, 'render_user_detail_page')
        );
        
        // Export page
        add_submenu_page(
            'sports-heroes-dashboard',
            'Export Data',
            'Export',
            'manage_options',
            'sports-heroes-export',
            array($this, 'render_export_page')
        );
    }
    
    /**
     * Enqueue admin scripts and styles
     */
    public function enqueue_admin_scripts($hook) {
        if (strpos($hook, 'sports-heroes') === false) {
            return;
        }
        
        // Enqueue Chart.js for visualizations
        wp_enqueue_script('chart-js', 'https://cdn.jsdelivr.net/npm/chart.js', array(), '3.9.1', true);
        
        // Enqueue DataTables for user management
        wp_enqueue_script('datatables-js', 'https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js', array('jquery'), '1.13.6', true);
        wp_enqueue_style('datatables-css', 'https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css', array(), '1.13.6');
        
        // Custom admin styles
        wp_enqueue_style('sports-heroes-admin', plugin_dir_url(__FILE__) . 'admin/css/dashboard.css', array(), '1.0');
        wp_enqueue_script('sports-heroes-admin', plugin_dir_url(__FILE__) . 'admin/js/dashboard.js', array('jquery', 'chart-js'), '1.0', true);
        
        // Localize script for AJAX
        wp_localize_script('sports-heroes-admin', 'sportsHeroesAdmin', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('sports_heroes_admin_nonce'),
            'restUrl' => rest_url('sports-heroes/v1/admin/'),
            'restNonce' => wp_create_nonce('wp_rest')
        ));
    }
    
    /**
     * Register admin API routes
     */
    public function register_admin_api_routes() {
        // Dashboard statistics
        register_rest_route('sports-heroes/v1/admin', '/dashboard-stats', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_dashboard_stats'),
            'permission_callback' => array($this, 'check_admin_permissions'),
        ));
        
        // Users list with progress
        register_rest_route('sports-heroes/v1/admin', '/users', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_users_with_progress'),
            'permission_callback' => array($this, 'check_admin_permissions'),
        ));
        
        // Individual user details
        register_rest_route('sports-heroes/v1/admin', '/user/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_user_details'),
            'permission_callback' => array($this, 'check_admin_permissions'),
        ));
        
        // Analytics data
        register_rest_route('sports-heroes/v1/admin', '/analytics', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_analytics_data'),
            'permission_callback' => array($this, 'check_admin_permissions'),
        ));
    }
    
    /**
     * Check admin permissions
     */
    public function check_admin_permissions() {
        // More flexible permission checking
        if (!is_user_logged_in()) {
            return new WP_Error('not_logged_in', 'You must be logged in to access this resource.', array('status' => 401));
        }
        
        // Check for admin capabilities
        if (current_user_can('manage_options')) {
            return true;
        }
        
        // Fallback: check if user has any elevated permissions
        if (current_user_can('edit_users') || current_user_can('list_users')) {
            return true;
        }
        
        return new WP_Error('insufficient_permissions', 'You do not have permission to access this resource.', array('status' => 403));
    }
    
    /**
     * Render overview/dashboard page
     */
    public function render_overview_page() {
        ?>
        <div class="wrap sports-heroes-dashboard">
            <h1>Sports Heroes Dashboard</h1>
            
            <!-- Key Metrics Cards -->
            <div class="dashboard-stats">
                <div class="stat-card" id="total-users">
                    <h3>Total Users</h3>
                    <div class="stat-number">-</div>
                </div>
                <div class="stat-card" id="active-users">
                    <h3>Active Users (30 days)</h3>
                    <div class="stat-number">-</div>
                </div>
                <div class="stat-card" id="total-stories">
                    <h3>Stories Read</h3>
                    <div class="stat-number">-</div>
                </div>
                <div class="stat-card" id="avg-quiz-score">
                    <h3>Avg Quiz Score</h3>
                    <div class="stat-number">-</div>
                </div>
            </div>
            
            <!-- Charts Section -->
            <div class="dashboard-charts">
                <div class="chart-container">
                    <h3>User Registrations Over Time</h3>
                    <canvas id="registrations-chart"></canvas>
                </div>
                <div class="chart-container">
                    <h3>Most Popular Athletes</h3>
                    <canvas id="athletes-chart"></canvas>
                </div>
                <div class="chart-container">
                    <h3>Quiz Score Distribution</h3>
                    <canvas id="scores-chart"></canvas>
                </div>
                <div class="chart-container">
                    <h3>Daily Activity</h3>
                    <canvas id="activity-chart"></canvas>
                </div>
            </div>
        </div>
        <?php
    }
    
    /**
     * Render users management page
     */
    public function render_users_page() {
        ?>
        <div class="wrap sports-heroes-users">
            <h1>Users Management</h1>
            
            <!-- Search and Filter Controls -->
            <div class="users-controls">
                <div class="search-box">
                    <input type="text" id="user-search" placeholder="Search by name or email...">
                </div>
                <div class="filter-controls">
                    <select id="activity-filter">
                        <option value="">All Activity Levels</option>
                        <option value="high">High Activity</option>
                        <option value="medium">Medium Activity</option>
                        <option value="low">Low Activity</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <select id="date-filter">
                        <option value="">All Time</option>
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 90 days</option>
                    </select>
                </div>
                <div class="bulk-actions">
                    <select id="bulk-action">
                        <option value="">Bulk Actions</option>
                        <option value="export">Export Selected</option>
                        <option value="reset-progress">Reset Progress</option>
                        <option value="delete">Delete Users</option>
                    </select>
                    <button id="apply-bulk-action" class="button">Apply</button>
                </div>
            </div>
            
            <!-- Users Table -->
            <table id="users-table" class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th><input type="checkbox" id="select-all"></th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Registration Date</th>
                        <th>Stories Read</th>
                        <th>Avg Quiz Score</th>
                        <th>Last Activity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Data loaded via AJAX -->
                </tbody>
            </table>
        </div>
        <?php
    }
    
    /**
     * Render user detail page
     */
    public function render_user_detail_page() {
        $user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;
        if (!$user_id) {
            wp_die('Invalid user ID');
        }
        ?>
        <div class="wrap sports-heroes-user-detail">
            <h1>User Details</h1>
            <a href="<?php echo admin_url('admin.php?page=sports-heroes-users'); ?>" class="button">&larr; Back to Users</a>
            
            <div id="user-detail-content">
                <!-- Content loaded via AJAX -->
            </div>
        </div>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                loadUserDetails(<?php echo $user_id; ?>);
            });
        </script>
        <?php
    }
    
    /**
     * Render export page
     */
    public function render_export_page() {
        ?>
        <div class="wrap sports-heroes-export">
            <h1>Export Data</h1>
            
            <div class="export-options">
                <div class="export-section">
                    <h3>User Data Export</h3>
                    <p>Export user information and progress data</p>
                    <form id="export-users-form">
                        <table class="form-table">
                            <tr>
                                <th>Date Range</th>
                                <td>
                                    <input type="date" name="start_date" id="start_date">
                                    to
                                    <input type="date" name="end_date" id="end_date">
                                </td>
                            </tr>
                            <tr>
                                <th>Format</th>
                                <td>
                                    <label><input type="radio" name="format" value="csv" checked> CSV</label>
                                    <label><input type="radio" name="format" value="pdf"> PDF Report</label>
                                </td>
                            </tr>
                            <tr>
                                <th>Include</th>
                                <td>
                                    <label><input type="checkbox" name="include_progress" checked> Progress Data</label>
                                    <label><input type="checkbox" name="include_quiz_details"> Quiz Details</label>
                                    <label><input type="checkbox" name="include_reading_times"> Reading Times</label>
                                </td>
                            </tr>
                        </table>
                        <button type="submit" class="button button-primary">Export Users</button>
                    </form>
                </div>
                
                <div class="export-section">
                    <h3>Progress Reports</h3>
                    <p>Generate comprehensive progress reports</p>
                    <form id="export-progress-form">
                        <table class="form-table">
                            <tr>
                                <th>Report Type</th>
                                <td>
                                    <select name="report_type">
                                        <option value="summary">Summary Report</option>
                                        <option value="detailed">Detailed Progress</option>
                                        <option value="athlete_performance">Athlete Performance</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Date Range</th>
                                <td>
                                    <input type="date" name="report_start_date">
                                    to
                                    <input type="date" name="report_end_date">
                                </td>
                            </tr>
                        </table>
                        <button type="submit" class="button button-primary">Generate Report</button>
                    </form>
                </div>
            </div>
        </div>
        <?php
    }
    
    /**
     * Get dashboard statistics
     */
    public function get_dashboard_stats($request) {
        global $wpdb;
        
        // Total users
        $total_users = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->users}");
        
        // Active users (last 30 days)
        $thirty_days_ago = date('Y-m-d H:i:s', strtotime('-30 days'));
        $active_users = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(DISTINCT pm.meta_value) 
             FROM {$wpdb->postmeta} pm 
             JOIN {$wpdb->posts} p ON pm.post_id = p.ID 
             WHERE p.post_type = 'sports-progress' 
             AND pm.meta_key = 'user_id' 
             AND p.post_modified >= %s",
            $thirty_days_ago
        ));
        
        // Total stories read
        $total_stories = $wpdb->get_var(
            "SELECT COUNT(*) 
             FROM {$wpdb->postmeta} 
             WHERE meta_key = 'story_read' 
             AND meta_value = '1'"
        );
        
        // Average quiz score
        $avg_quiz_score = $wpdb->get_var(
            "SELECT AVG(CAST(meta_value AS DECIMAL(3,1))) 
             FROM {$wpdb->postmeta} 
             WHERE meta_key = 'quiz_score' 
             AND meta_value > 0"
        );
        
        return rest_ensure_response(array(
            'total_users' => intval($total_users),
            'active_users' => intval($active_users),
            'total_stories' => intval($total_stories),
            'avg_quiz_score' => round(floatval($avg_quiz_score), 1)
        ));
    }
    
    /**
     * Get users with progress summary
     */
    public function get_users_with_progress($request) {
        global $wpdb;
        
        $users = $wpdb->get_results("
            SELECT u.ID, u.display_name, u.user_email, u.user_registered,
                   COUNT(CASE WHEN pm1.meta_value = '1' THEN 1 END) as stories_read,
                   AVG(CASE WHEN pm2.meta_value > 0 THEN CAST(pm2.meta_value AS DECIMAL) END) as avg_quiz_score,
                   MAX(p.post_modified) as last_activity
            FROM {$wpdb->users} u
            LEFT JOIN {$wpdb->postmeta} pm_user ON pm_user.meta_value = u.ID AND pm_user.meta_key = 'user_id'
            LEFT JOIN {$wpdb->posts} p ON pm_user.post_id = p.ID AND p.post_type = 'sports-progress'
            LEFT JOIN {$wpdb->postmeta} pm1 ON p.ID = pm1.post_id AND pm1.meta_key = 'story_read'
            LEFT JOIN {$wpdb->postmeta} pm2 ON p.ID = pm2.post_id AND pm2.meta_key = 'quiz_score'
            GROUP BY u.ID
            ORDER BY u.user_registered DESC
        ");
        
        $formatted_users = array();
        foreach ($users as $user) {
            $formatted_users[] = array(
                'id' => $user->ID,
                'name' => $user->display_name,
                'email' => $user->user_email,
                'registration_date' => $user->user_registered,
                'stories_read' => intval($user->stories_read),
                'avg_quiz_score' => $user->avg_quiz_score ? round(floatval($user->avg_quiz_score), 1) : 0,
                'last_activity' => $user->last_activity
            );
        }
        
        return rest_ensure_response($formatted_users);
    }
    
    /**
     * Get detailed user information
     */
    public function get_user_details($request) {
        $user_id = $request['id'];
        $user = get_user_by('ID', $user_id);
        
        if (!$user) {
            return new WP_Error('user_not_found', 'User not found', array('status' => 404));
        }
        
        // Get user progress
        global $wpdb;
        $progress = $wpdb->get_results($wpdb->prepare("
            SELECT pm1.meta_value as athlete_id,
                   pm2.meta_value as athlete_name,
                   pm3.meta_value as story_read,
                   pm4.meta_value as quiz_completed,
                   pm5.meta_value as quiz_score,
                   pm6.meta_value as total_questions,
                   pm7.meta_value as completion_date,
                   pm8.meta_value as time_spent_reading
            FROM {$wpdb->posts} p
            JOIN {$wpdb->postmeta} pm_user ON p.ID = pm_user.post_id AND pm_user.meta_key = 'user_id' AND pm_user.meta_value = %s
            LEFT JOIN {$wpdb->postmeta} pm1 ON p.ID = pm1.post_id AND pm1.meta_key = 'athlete_id'
            LEFT JOIN {$wpdb->postmeta} pm2 ON p.ID = pm2.post_id AND pm2.meta_key = 'athlete_name'
            LEFT JOIN {$wpdb->postmeta} pm3 ON p.ID = pm3.post_id AND pm3.meta_key = 'story_read'
            LEFT JOIN {$wpdb->postmeta} pm4 ON p.ID = pm4.post_id AND pm4.meta_key = 'quiz_completed'
            LEFT JOIN {$wpdb->postmeta} pm5 ON p.ID = pm5.post_id AND pm5.meta_key = 'quiz_score'
            LEFT JOIN {$wpdb->postmeta} pm6 ON p.ID = pm6.post_id AND pm6.meta_key = 'total_questions'
            LEFT JOIN {$wpdb->postmeta} pm7 ON p.ID = pm7.post_id AND pm7.meta_key = 'completion_date'
            LEFT JOIN {$wpdb->postmeta} pm8 ON p.ID = pm8.post_id AND pm8.meta_key = 'time_spent_reading'
            WHERE p.post_type = 'sports-progress'
            ORDER BY pm7.meta_value DESC
        ", $user_id));
        
        return rest_ensure_response(array(
            'user' => array(
                'id' => $user->ID,
                'name' => $user->display_name,
                'email' => $user->user_email,
                'registration_date' => $user->user_registered,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name
            ),
            'progress' => $progress
        ));
    }
    
    /**
     * Get analytics data for charts
     */
    public function get_analytics_data($request) {
        global $wpdb;
        
        // User registrations over time (last 30 days)
        $registrations = $wpdb->get_results("
            SELECT DATE(user_registered) as date, COUNT(*) as count
            FROM {$wpdb->users}
            WHERE user_registered >= DATE_SUB(NOW(), INTERVAL 30 DAY)
            GROUP BY DATE(user_registered)
            ORDER BY date
        ");
        
        // Most popular athletes
        $popular_athletes = $wpdb->get_results("
            SELECT pm.meta_value as athlete_name, COUNT(*) as count
            FROM {$wpdb->postmeta} pm
            JOIN {$wpdb->postmeta} pm2 ON pm.post_id = pm2.post_id
            WHERE pm.meta_key = 'athlete_name'
            AND pm2.meta_key = 'story_read'
            AND pm2.meta_value = '1'
            GROUP BY pm.meta_value
            ORDER BY count DESC
            LIMIT 10
        ");
        
        // Quiz score distribution
        $score_distribution = $wpdb->get_results("
            SELECT meta_value as score, COUNT(*) as count
            FROM {$wpdb->postmeta}
            WHERE meta_key = 'quiz_score'
            AND meta_value > 0
            GROUP BY meta_value
            ORDER BY CAST(meta_value AS UNSIGNED)
        ");
        
        return rest_ensure_response(array(
            'registrations' => $registrations,
            'popular_athletes' => $popular_athletes,
            'score_distribution' => $score_distribution
        ));
    }
    
    /**
     * Handle bulk actions
     */
    public function handle_bulk_action() {
        check_ajax_referer('sports_heroes_admin_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_die('Insufficient permissions');
        }
        
        $action = sanitize_text_field($_POST['action_type']);
        $user_ids = array_map('intval', $_POST['user_ids']);
        
        switch ($action) {
            case 'export':
                // Handle export logic
                wp_send_json_success(array('message' => 'Export initiated'));
                break;
                
            case 'reset-progress':
                // Reset progress for selected users
                global $wpdb;
                foreach ($user_ids as $user_id) {
                    $wpdb->delete(
                        $wpdb->posts,
                        array('post_type' => 'sports-progress'),
                        array('%s')
                    );
                }
                wp_send_json_success(array('message' => 'Progress reset for selected users'));
                break;
                
            case 'delete':
                // Delete selected users
                foreach ($user_ids as $user_id) {
                    wp_delete_user($user_id);
                }
                wp_send_json_success(array('message' => 'Users deleted successfully'));
                break;
                
            default:
                wp_send_json_error(array('message' => 'Invalid action'));
        }
    }
}

// Initialize the admin dashboard
new SportsHeroesAdminDashboard();

/**
 * Activation hook
 */
register_activation_hook(__FILE__, 'sports_heroes_admin_activate');
function sports_heroes_admin_activate() {
    // Create admin directory structure
    $upload_dir = wp_upload_dir();
    $admin_dir = $upload_dir['basedir'] . '/sports-heroes-admin';
    
    if (!file_exists($admin_dir)) {
        wp_mkdir_p($admin_dir);
    }
}
