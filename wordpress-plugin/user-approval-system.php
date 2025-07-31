<?php
/**
 * Plugin Name: Sports Heroes User Approval System
 * Description: Optional user approval workflow for the Sports Heroes Reading App
 * Version: 1.0
 * Author: Sports Heroes Team
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class SportsHeroesUserApproval {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'add_approval_menu'));
        add_action('rest_api_init', array($this, 'register_approval_api_routes'));
        add_action('wp_ajax_approve_user', array($this, 'approve_user'));
        add_action('wp_ajax_deny_user', array($this, 'deny_user'));
        add_action('wp_ajax_bulk_approve_users', array($this, 'bulk_approve_users'));
    }
    
    /**
     * Initialize the approval system
     */
    public function init() {
        // Add custom user meta fields
        add_action('user_register', array($this, 'set_user_pending_status'));
        
        // Add approval status to user list
        add_filter('manage_users_columns', array($this, 'add_approval_column'));
        add_filter('manage_users_custom_column', array($this, 'show_approval_column'), 10, 3);
        
        // Add bulk actions
        add_filter('bulk_actions-users', array($this, 'add_bulk_actions'));
        add_filter('handle_bulk_actions-users', array($this, 'handle_bulk_actions'), 10, 3);
    }
    
    /**
     * Set new users to pending status
     */
    public function set_user_pending_status($user_id) {
        // Only set pending if approval is enabled
        if ($this->is_approval_enabled()) {
            update_user_meta($user_id, 'sports_heroes_approval_status', 'pending');
            update_user_meta($user_id, 'sports_heroes_approval_date', current_time('mysql'));
            
            // Send notification to admins
            $this->notify_admins_new_user($user_id);
        } else {
            // Auto-approve if approval system is disabled
            update_user_meta($user_id, 'sports_heroes_approval_status', 'approved');
            update_user_meta($user_id, 'sports_heroes_approval_date', current_time('mysql'));
        }
    }
    
    /**
     * Check if approval system is enabled
     */
    public function is_approval_enabled() {
        return get_option('sports_heroes_require_approval', false);
    }
    
    /**
     * Add approval menu to admin
     */
    public function add_approval_menu() {
        add_submenu_page(
            'sports-heroes-dashboard',
            'User Approval',
            'User Approval',
            'manage_options',
            'sports-heroes-approval',
            array($this, 'render_approval_page')
        );
        
        // Add settings submenu
        add_submenu_page(
            'sports-heroes-dashboard',
            'Approval Settings',
            'Settings',
            'manage_options',
            'sports-heroes-approval-settings',
            array($this, 'render_settings_page')
        );
    }
    
    /**
     * Render approval page
     */
    public function render_approval_page() {
        $pending_users = $this->get_pending_users();
        $approved_users = $this->get_approved_users();
        $denied_users = $this->get_denied_users();
        ?>
        <div class="wrap">
            <h1>User Approval Management</h1>
            
            <?php if (!$this->is_approval_enabled()): ?>
            <div class="notice notice-warning">
                <p><strong>User approval is currently disabled.</strong> All new users are automatically approved. 
                <a href="admin.php?page=sports-heroes-approval-settings">Enable approval system</a></p>
            </div>
            <?php endif; ?>
            
            <div class="approval-tabs">
                <nav class="nav-tab-wrapper">
                    <a href="#pending" class="nav-tab nav-tab-active">Pending Approval (<?php echo count($pending_users); ?>)</a>
                    <a href="#approved" class="nav-tab">Approved (<?php echo count($approved_users); ?>)</a>
                    <a href="#denied" class="nav-tab">Denied (<?php echo count($denied_users); ?>)</a>
                </nav>
                
                <div id="pending" class="tab-content">
                    <h2>Users Pending Approval</h2>
                    <?php $this->render_users_table($pending_users, 'pending'); ?>
                </div>
                
                <div id="approved" class="tab-content" style="display: none;">
                    <h2>Approved Users</h2>
                    <?php $this->render_users_table($approved_users, 'approved'); ?>
                </div>
                
                <div id="denied" class="tab-content" style="display: none;">
                    <h2>Denied Users</h2>
                    <?php $this->render_users_table($denied_users, 'denied'); ?>
                </div>
            </div>
        </div>
        
        <script>
        jQuery(document).ready(function($) {
            // Tab switching
            $('.nav-tab').on('click', function(e) {
                e.preventDefault();
                var target = $(this).attr('href');
                
                $('.nav-tab').removeClass('nav-tab-active');
                $(this).addClass('nav-tab-active');
                
                $('.tab-content').hide();
                $(target).show();
            });
            
            // Approval actions
            $('.approve-user').on('click', function() {
                var userId = $(this).data('user-id');
                if (confirm('Approve this user?')) {
                    approveUser(userId);
                }
            });
            
            $('.deny-user').on('click', function() {
                var userId = $(this).data('user-id');
                var reason = prompt('Reason for denial (optional):');
                if (confirm('Deny this user?')) {
                    denyUser(userId, reason);
                }
            });
            
            // Bulk approve
            $('#bulk-approve').on('click', function() {
                var selectedUsers = $('.user-checkbox:checked').map(function() {
                    return this.value;
                }).get();
                
                if (selectedUsers.length === 0) {
                    alert('Please select users to approve');
                    return;
                }
                
                if (confirm('Approve ' + selectedUsers.length + ' selected users?')) {
                    bulkApproveUsers(selectedUsers);
                }
            });
            
            function approveUser(userId) {
                $.ajax({
                    url: ajaxurl,
                    method: 'POST',
                    data: {
                        action: 'approve_user',
                        user_id: userId,
                        nonce: '<?php echo wp_create_nonce('approval_nonce'); ?>'
                    },
                    success: function(response) {
                        if (response.success) {
                            location.reload();
                        } else {
                            alert('Error: ' + response.data.message);
                        }
                    }
                });
            }
            
            function denyUser(userId, reason) {
                $.ajax({
                    url: ajaxurl,
                    method: 'POST',
                    data: {
                        action: 'deny_user',
                        user_id: userId,
                        reason: reason || '',
                        nonce: '<?php echo wp_create_nonce('approval_nonce'); ?>'
                    },
                    success: function(response) {
                        if (response.success) {
                            location.reload();
                        } else {
                            alert('Error: ' + response.data.message);
                        }
                    }
                });
            }
            
            function bulkApproveUsers(userIds) {
                $.ajax({
                    url: ajaxurl,
                    method: 'POST',
                    data: {
                        action: 'bulk_approve_users',
                        user_ids: userIds,
                        nonce: '<?php echo wp_create_nonce('approval_nonce'); ?>'
                    },
                    success: function(response) {
                        if (response.success) {
                            location.reload();
                        } else {
                            alert('Error: ' + response.data.message);
                        }
                    }
                });
            }
        });
        </script>
        
        <style>
        .approval-tabs { margin-top: 20px; }
        .users-table { width: 100%; margin-top: 20px; }
        .users-table th, .users-table td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        .users-table th { background: #f9f9f9; font-weight: bold; }
        .status-pending { color: #d63638; font-weight: bold; }
        .status-approved { color: #00a32a; font-weight: bold; }
        .status-denied { color: #8c8f94; font-weight: bold; }
        .user-actions { display: flex; gap: 5px; }
        .user-actions .button { padding: 4px 8px; font-size: 12px; }
        .bulk-actions-bar { margin: 15px 0; padding: 10px; background: #f9f9f9; border-radius: 4px; }
        </style>
        <?php
    }
    
    /**
     * Render users table
     */
    private function render_users_table($users, $status) {
        if (empty($users)) {
            echo '<p>No users found.</p>';
            return;
        }
        ?>
        
        <?php if ($status === 'pending'): ?>
        <div class="bulk-actions-bar">
            <button id="bulk-approve" class="button button-primary">Bulk Approve Selected</button>
            <span style="margin-left: 10px;">Select users below and click to approve multiple at once.</span>
        </div>
        <?php endif; ?>
        
        <table class="users-table wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <?php if ($status === 'pending'): ?>
                    <th><input type="checkbox" id="select-all-users"></th>
                    <?php endif; ?>
                    <th>User</th>
                    <th>Email</th>
                    <th>Registration Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($users as $user): ?>
                <tr>
                    <?php if ($status === 'pending'): ?>
                    <td><input type="checkbox" class="user-checkbox" value="<?php echo $user->ID; ?>"></td>
                    <?php endif; ?>
                    <td>
                        <strong><?php echo esc_html($user->display_name); ?></strong><br>
                        <small>ID: <?php echo $user->ID; ?></small>
                    </td>
                    <td><?php echo esc_html($user->user_email); ?></td>
                    <td><?php echo date('M j, Y g:i A', strtotime($user->user_registered)); ?></td>
                    <td>
                        <span class="status-<?php echo $status; ?>">
                            <?php echo ucfirst($status); ?>
                        </span>
                        <?php 
                        $approval_date = get_user_meta($user->ID, 'sports_heroes_approval_date', true);
                        if ($approval_date && $status !== 'pending') {
                            echo '<br><small>' . date('M j, Y', strtotime($approval_date)) . '</small>';
                        }
                        ?>
                    </td>
                    <td>
                        <div class="user-actions">
                            <?php if ($status === 'pending'): ?>
                                <button class="button button-primary approve-user" data-user-id="<?php echo $user->ID; ?>">Approve</button>
                                <button class="button deny-user" data-user-id="<?php echo $user->ID; ?>">Deny</button>
                            <?php elseif ($status === 'denied'): ?>
                                <button class="button button-primary approve-user" data-user-id="<?php echo $user->ID; ?>">Approve</button>
                            <?php elseif ($status === 'approved'): ?>
                                <button class="button deny-user" data-user-id="<?php echo $user->ID; ?>">Revoke</button>
                            <?php endif; ?>
                            <a href="admin.php?page=sports-heroes-user-detail&user_id=<?php echo $user->ID; ?>" class="button">View Details</a>
                        </div>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        
        <script>
        jQuery(document).ready(function($) {
            $('#select-all-users').on('change', function() {
                $('.user-checkbox').prop('checked', this.checked);
            });
        });
        </script>
        <?php
    }
    
    /**
     * Render settings page
     */
    public function render_settings_page() {
        if (isset($_POST['save_settings'])) {
            $require_approval = isset($_POST['require_approval']) ? 1 : 0;
            $notification_email = sanitize_email($_POST['notification_email']);
            $auto_approve_domains = sanitize_textarea_field($_POST['auto_approve_domains']);
            
            update_option('sports_heroes_require_approval', $require_approval);
            update_option('sports_heroes_notification_email', $notification_email);
            update_option('sports_heroes_auto_approve_domains', $auto_approve_domains);
            
            echo '<div class="notice notice-success"><p>Settings saved!</p></div>';
        }
        
        $require_approval = get_option('sports_heroes_require_approval', false);
        $notification_email = get_option('sports_heroes_notification_email', get_option('admin_email'));
        $auto_approve_domains = get_option('sports_heroes_auto_approve_domains', '');
        ?>
        <div class="wrap">
            <h1>User Approval Settings</h1>
            
            <form method="post">
                <table class="form-table">
                    <tr>
                        <th scope="row">Require User Approval</th>
                        <td>
                            <label>
                                <input type="checkbox" name="require_approval" value="1" <?php checked($require_approval); ?>>
                                Require administrator approval for new users
                            </label>
                            <p class="description">
                                When enabled, new users will be set to "pending" status and cannot access the app until approved.
                                When disabled, all new users are automatically approved.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Notification Email</th>
                        <td>
                            <input type="email" name="notification_email" value="<?php echo esc_attr($notification_email); ?>" class="regular-text">
                            <p class="description">Email address to notify when new users register (leave blank to disable notifications)</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Auto-Approve Domains</th>
                        <td>
                            <textarea name="auto_approve_domains" rows="5" cols="50" class="large-text"><?php echo esc_textarea($auto_approve_domains); ?></textarea>
                            <p class="description">
                                Email domains to automatically approve (one per line). Example:<br>
                                yourschool.edu<br>
                                trustedorganization.org<br>
                                Leave blank to require approval for all domains.
                            </p>
                        </td>
                    </tr>
                </table>
                
                <p class="submit">
                    <input type="submit" name="save_settings" class="button-primary" value="Save Settings">
                </p>
            </form>
            
            <div class="approval-stats" style="margin-top: 30px;">
                <h2>Current Statistics</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div style="background: #fff; padding: 15px; border: 1px solid #ccd0d4; border-radius: 4px;">
                        <h3 style="margin: 0 0 10px 0;">Pending Users</h3>
                        <div style="font-size: 24px; font-weight: bold; color: #d63638;">
                            <?php echo count($this->get_pending_users()); ?>
                        </div>
                    </div>
                    <div style="background: #fff; padding: 15px; border: 1px solid #ccd0d4; border-radius: 4px;">
                        <h3 style="margin: 0 0 10px 0;">Approved Users</h3>
                        <div style="font-size: 24px; font-weight: bold; color: #00a32a;">
                            <?php echo count($this->get_approved_users()); ?>
                        </div>
                    </div>
                    <div style="background: #fff; padding: 15px; border: 1px solid #ccd0d4; border-radius: 4px;">
                        <h3 style="margin: 0 0 10px 0;">Denied Users</h3>
                        <div style="font-size: 24px; font-weight: bold; color: #8c8f94;">
                            <?php echo count($this->get_denied_users()); ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
    
    /**
     * Get pending users
     */
    public function get_pending_users() {
        return get_users(array(
            'meta_key' => 'sports_heroes_approval_status',
            'meta_value' => 'pending',
            'orderby' => 'registered',
            'order' => 'DESC'
        ));
    }
    
    /**
     * Get approved users
     */
    public function get_approved_users() {
        return get_users(array(
            'meta_key' => 'sports_heroes_approval_status',
            'meta_value' => 'approved',
            'orderby' => 'registered',
            'order' => 'DESC'
        ));
    }
    
    /**
     * Get denied users
     */
    public function get_denied_users() {
        return get_users(array(
            'meta_key' => 'sports_heroes_approval_status',
            'meta_value' => 'denied',
            'orderby' => 'registered',
            'order' => 'DESC'
        ));
    }
    
    /**
     * Approve user
     */
    public function approve_user() {
        check_ajax_referer('approval_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Insufficient permissions'));
        }
        
        $user_id = intval($_POST['user_id']);
        
        update_user_meta($user_id, 'sports_heroes_approval_status', 'approved');
        update_user_meta($user_id, 'sports_heroes_approval_date', current_time('mysql'));
        update_user_meta($user_id, 'sports_heroes_approved_by', get_current_user_id());
        
        // Send approval email to user
        $this->send_approval_email($user_id);
        
        wp_send_json_success(array('message' => 'User approved successfully'));
    }
    
    /**
     * Deny user
     */
    public function deny_user() {
        check_ajax_referer('approval_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Insufficient permissions'));
        }
        
        $user_id = intval($_POST['user_id']);
        $reason = sanitize_text_field($_POST['reason']);
        
        update_user_meta($user_id, 'sports_heroes_approval_status', 'denied');
        update_user_meta($user_id, 'sports_heroes_approval_date', current_time('mysql'));
        update_user_meta($user_id, 'sports_heroes_denied_by', get_current_user_id());
        update_user_meta($user_id, 'sports_heroes_denial_reason', $reason);
        
        // Send denial email to user
        $this->send_denial_email($user_id, $reason);
        
        wp_send_json_success(array('message' => 'User denied successfully'));
    }
    
    /**
     * Bulk approve users
     */
    public function bulk_approve_users() {
        check_ajax_referer('approval_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Insufficient permissions'));
        }
        
        $user_ids = array_map('intval', $_POST['user_ids']);
        $approved_count = 0;
        
        foreach ($user_ids as $user_id) {
            update_user_meta($user_id, 'sports_heroes_approval_status', 'approved');
            update_user_meta($user_id, 'sports_heroes_approval_date', current_time('mysql'));
            update_user_meta($user_id, 'sports_heroes_approved_by', get_current_user_id());
            
            // Send approval email
            $this->send_approval_email($user_id);
            $approved_count++;
        }
        
        wp_send_json_success(array('message' => "Successfully approved {$approved_count} users"));
    }
    
    /**
     * Send approval email to user
     */
    private function send_approval_email($user_id) {
        $user = get_user_by('ID', $user_id);
        if (!$user) return;
        
        $subject = 'Welcome to Sports Heroes Reading App!';
        $message = "Hi {$user->display_name},\n\n";
        $message .= "Great news! Your account for the Sports Heroes Reading App has been approved.\n\n";
        $message .= "You can now sign in and start reading inspiring athlete stories:\n";
        $message .= home_url() . "\n\n";
        $message .= "Happy reading!\n";
        $message .= "The Sports Heroes Team";
        
        wp_mail($user->user_email, $subject, $message);
    }
    
    /**
     * Send denial email to user
     */
    private function send_denial_email($user_id, $reason = '') {
        $user = get_user_by('ID', $user_id);
        if (!$user) return;
        
        $subject = 'Sports Heroes Reading App - Account Status';
        $message = "Hi {$user->display_name},\n\n";
        $message .= "Thank you for your interest in the Sports Heroes Reading App.\n\n";
        $message .= "Unfortunately, we are unable to approve your account at this time.\n";
        
        if ($reason) {
            $message .= "\nReason: {$reason}\n";
        }
        
        $message .= "\nIf you have any questions, please contact us.\n\n";
        $message .= "Best regards,\n";
        $message .= "The Sports Heroes Team";
        
        wp_mail($user->user_email, $subject, $message);
    }
    
    /**
     * Notify admins of new user registration
     */
    private function notify_admins_new_user($user_id) {
        $notification_email = get_option('sports_heroes_notification_email');
        if (!$notification_email) return;
        
        $user = get_user_by('ID', $user_id);
        if (!$user) return;
        
        $subject = 'New User Registration - Sports Heroes App';
        $message = "A new user has registered for the Sports Heroes Reading App and is awaiting approval:\n\n";
        $message .= "Name: {$user->display_name}\n";
        $message .= "Email: {$user->user_email}\n";
        $message .= "Registration Date: " . date('M j, Y g:i A', strtotime($user->user_registered)) . "\n\n";
        $message .= "Review and approve/deny this user:\n";
        $message .= admin_url('admin.php?page=sports-heroes-approval') . "\n";
        
        wp_mail($notification_email, $subject, $message);
    }
    
    /**
     * Add approval column to users list
     */
    public function add_approval_column($columns) {
        $columns['sports_heroes_approval'] = 'Sports Heroes Status';
        return $columns;
    }
    
    /**
     * Show approval column content
     */
    public function show_approval_column($value, $column_name, $user_id) {
        if ($column_name === 'sports_heroes_approval') {
            $status = get_user_meta($user_id, 'sports_heroes_approval_status', true);
            
            if (!$status) {
                return '<span style="color: #8c8f94;">Not set</span>';
            }
            
            $colors = array(
                'pending' => '#d63638',
                'approved' => '#00a32a',
                'denied' => '#8c8f94'
            );
            
            $color = isset($colors[$status]) ? $colors[$status] : '#8c8f94';
            
            return '<span style="color: ' . $color . '; font-weight: bold;">' . ucfirst($status) . '</span>';
        }
        
        return $value;
    }
    
    /**
     * Add bulk actions to users page
     */
    public function add_bulk_actions($actions) {
        $actions['sports_heroes_approve'] = 'Approve for Sports Heroes';
        $actions['sports_heroes_deny'] = 'Deny for Sports Heroes';
        return $actions;
    }
    
    /**
     * Handle bulk actions
     */
    public function handle_bulk_actions($redirect_to, $action, $user_ids) {
        if ($action === 'sports_heroes_approve') {
            foreach ($user_ids as $user_id) {
                update_user_meta($user_id, 'sports_heroes_approval_status', 'approved');
                update_user_meta($user_id, 'sports_heroes_approval_date', current_time('mysql'));
                $this->send_approval_email($user_id);
            }
            
            $redirect_to = add_query_arg('sports_heroes_approved', count($user_ids), $redirect_to);
        } elseif ($action === 'sports_heroes_deny') {
            foreach ($user_ids as $user_id) {
                update_user_meta($user_id, 'sports_heroes_approval_status', 'denied');
                update_user_meta($user_id, 'sports_heroes_approval_date', current_time('mysql'));
                $this->send_denial_email($user_id);
            }
            
            $redirect_to = add_query_arg('sports_heroes_denied', count($user_ids), $redirect_to);
        }
        
        return $redirect_to;
    }
    
    /**
     * Register API routes for approval system
     */
    public function register_approval_api_routes() {
        // Check user approval status
        register_rest_route('sports-heroes/v1', '/user-status/(?P<user_id>\d+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_user_approval_status'),
            'permission_callback' => '__return_true',
        ));
    }
    
    /**
     * Get user approval status via API
     */
    public function get_user_approval_status($request) {
        $user_id = $request['user_id'];
        $status = get_user_meta($user_id, 'sports_heroes_approval_status', true);
        
        return rest_ensure_response(array(
            'user_id' => $user_id,
            'approval_status' => $status ?: 'not_set',
            'is_approved' => $status === 'approved',
            'approval_required' => $this->is_approval_enabled()
        ));
    }
}

// Initialize the approval system
new SportsHeroesUserApproval();
