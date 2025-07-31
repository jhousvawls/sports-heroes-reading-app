<?php
/**
 * Demo Data Generator for Sports Heroes Admin Dashboard
 * 
 * This script generates sample users and progress data for testing the admin dashboard.
 * Run this script once to populate your WordPress site with demo data.
 * 
 * WARNING: This is for testing purposes only. Do not run on production sites.
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class SportsHeroesDemoDataGenerator {
    
    private $demo_users = array();
    private $athletes = array(
        1 => 'Patrick Mahomes',
        2 => 'Serena Williams', 
        3 => 'LeBron James',
        4 => 'Simone Biles',
        5 => 'Lionel Messi',
        6 => 'Muhammad Ali'
    );
    
    public function __construct() {
        add_action('admin_menu', array($this, 'add_demo_menu'));
        add_action('wp_ajax_generate_demo_data', array($this, 'generate_demo_data'));
        add_action('wp_ajax_clear_demo_data', array($this, 'clear_demo_data'));
    }
    
    /**
     * Add demo data menu to admin
     */
    public function add_demo_menu() {
        add_submenu_page(
            'sports-heroes-dashboard',
            'Demo Data Generator',
            'Demo Data',
            'manage_options',
            'sports-heroes-demo',
            array($this, 'render_demo_page')
        );
    }
    
    /**
     * Render demo data page
     */
    public function render_demo_page() {
        ?>
        <div class="wrap">
            <h1>Sports Heroes Demo Data Generator</h1>
            <p>Generate sample users and progress data for testing the admin dashboard.</p>
            
            <div class="notice notice-warning">
                <p><strong>Warning:</strong> This is for testing purposes only. Do not use on production sites.</p>
            </div>
            
            <div class="demo-controls">
                <h3>Generate Demo Data</h3>
                <form id="demo-data-form">
                    <table class="form-table">
                        <tr>
                            <th>Number of Users</th>
                            <td>
                                <input type="number" name="user_count" value="50" min="1" max="500">
                                <p class="description">Number of demo users to create (1-500)</p>
                            </td>
                        </tr>
                        <tr>
                            <th>Progress Density</th>
                            <td>
                                <select name="progress_density">
                                    <option value="low">Low (20-40% completion)</option>
                                    <option value="medium" selected>Medium (40-70% completion)</option>
                                    <option value="high">High (70-90% completion)</option>
                                </select>
                                <p class="description">How much progress each user should have</p>
                            </td>
                        </tr>
                        <tr>
                            <th>Date Range</th>
                            <td>
                                <select name="date_range">
                                    <option value="30">Last 30 days</option>
                                    <option value="90" selected>Last 90 days</option>
                                    <option value="180">Last 180 days</option>
                                    <option value="365">Last year</option>
                                </select>
                                <p class="description">Registration date range for demo users</p>
                            </td>
                        </tr>
                    </table>
                    
                    <p class="submit">
                        <button type="submit" class="button button-primary">Generate Demo Data</button>
                        <button type="button" id="clear-demo-data" class="button button-secondary">Clear Demo Data</button>
                    </p>
                </form>
            </div>
            
            <div id="demo-status" style="display: none;">
                <h3>Generation Status</h3>
                <div id="progress-bar" style="width: 100%; background: #f0f0f0; border-radius: 4px; overflow: hidden;">
                    <div id="progress-fill" style="width: 0%; height: 20px; background: #2271b1; transition: width 0.3s;"></div>
                </div>
                <p id="status-text">Preparing...</p>
            </div>
        </div>
        
        <script>
        jQuery(document).ready(function($) {
            $('#demo-data-form').on('submit', function(e) {
                e.preventDefault();
                
                const userCount = $('input[name="user_count"]').val();
                const progressDensity = $('select[name="progress_density"]').val();
                const dateRange = $('select[name="date_range"]').val();
                
                $('#demo-status').show();
                $('#progress-fill').css('width', '0%');
                $('#status-text').text('Starting generation...');
                
                $.ajax({
                    url: ajaxurl,
                    method: 'POST',
                    data: {
                        action: 'generate_demo_data',
                        user_count: userCount,
                        progress_density: progressDensity,
                        date_range: dateRange,
                        nonce: '<?php echo wp_create_nonce('demo_data_nonce'); ?>'
                    },
                    success: function(response) {
                        if (response.success) {
                            $('#progress-fill').css('width', '100%');
                            $('#status-text').text('Demo data generated successfully!');
                            alert('Demo data generated successfully!');
                        } else {
                            $('#status-text').text('Error: ' + response.data.message);
                            alert('Error: ' + response.data.message);
                        }
                    },
                    error: function() {
                        $('#status-text').text('Error generating demo data');
                        alert('Error generating demo data');
                    }
                });
            });
            
            $('#clear-demo-data').on('click', function() {
                if (confirm('Are you sure you want to clear all demo data? This will delete all demo users and their progress.')) {
                    $.ajax({
                        url: ajaxurl,
                        method: 'POST',
                        data: {
                            action: 'clear_demo_data',
                            nonce: '<?php echo wp_create_nonce('demo_data_nonce'); ?>'
                        },
                        success: function(response) {
                            if (response.success) {
                                alert('Demo data cleared successfully!');
                            } else {
                                alert('Error: ' + response.data.message);
                            }
                        },
                        error: function() {
                            alert('Error clearing demo data');
                        }
                    });
                }
            });
        });
        </script>
        <?php
    }
    
    /**
     * Generate demo data
     */
    public function generate_demo_data() {
        check_ajax_referer('demo_data_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Insufficient permissions'));
        }
        
        $user_count = intval($_POST['user_count']);
        $progress_density = sanitize_text_field($_POST['progress_density']);
        $date_range = intval($_POST['date_range']);
        
        if ($user_count < 1 || $user_count > 500) {
            wp_send_json_error(array('message' => 'Invalid user count'));
        }
        
        try {
            $this->create_demo_users($user_count, $date_range);
            $this->create_demo_progress($progress_density);
            
            wp_send_json_success(array('message' => "Generated {$user_count} demo users with progress data"));
        } catch (Exception $e) {
            wp_send_json_error(array('message' => $e->getMessage()));
        }
    }
    
    /**
     * Create demo users
     */
    private function create_demo_users($count, $date_range) {
        $first_names = array('Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery', 'Quinn', 'Sage', 'River', 'Skylar', 'Cameron', 'Dakota', 'Emery', 'Finley', 'Harper', 'Hayden', 'Jamie', 'Kendall', 'Logan');
        $last_names = array('Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin');
        
        for ($i = 0; $i < $count; $i++) {
            $first_name = $first_names[array_rand($first_names)];
            $last_name = $last_names[array_rand($last_names)];
            $username = strtolower($first_name . $last_name . rand(100, 999));
            $email = $username . '@demo.sportsheroes.com';
            
            // Random registration date within range
            $days_ago = rand(1, $date_range);
            $registration_date = date('Y-m-d H:i:s', strtotime("-{$days_ago} days"));
            
            $user_data = array(
                'user_login' => $username,
                'user_email' => $email,
                'user_pass' => wp_generate_password(),
                'first_name' => $first_name,
                'last_name' => $last_name,
                'display_name' => $first_name . ' ' . $last_name,
                'role' => 'subscriber',
                'user_registered' => $registration_date
            );
            
            $user_id = wp_insert_user($user_data);
            
            if (!is_wp_error($user_id)) {
                $this->demo_users[] = $user_id;
                
                // Add demo user meta to identify them later
                update_user_meta($user_id, 'sports_heroes_demo_user', true);
            }
        }
    }
    
    /**
     * Create demo progress data
     */
    private function create_demo_progress($density) {
        foreach ($this->demo_users as $user_id) {
            $this->create_user_progress($user_id, $density);
        }
    }
    
    /**
     * Create progress for a single user
     */
    private function create_user_progress($user_id, $density) {
        // Determine how many athletes this user will have progress for
        $athlete_count = count($this->athletes);
        
        switch ($density) {
            case 'low':
                $progress_count = rand(1, ceil($athlete_count * 0.4));
                break;
            case 'medium':
                $progress_count = rand(ceil($athlete_count * 0.4), ceil($athlete_count * 0.7));
                break;
            case 'high':
                $progress_count = rand(ceil($athlete_count * 0.7), $athlete_count);
                break;
            default:
                $progress_count = rand(1, $athlete_count);
        }
        
        // Randomly select athletes for this user
        $selected_athletes = array_rand($this->athletes, $progress_count);
        if (!is_array($selected_athletes)) {
            $selected_athletes = array($selected_athletes);
        }
        
        foreach ($selected_athletes as $athlete_id) {
            $athlete_name = $this->athletes[$athlete_id];
            
            // Random completion date (after user registration)
            $user = get_user_by('ID', $user_id);
            $reg_timestamp = strtotime($user->user_registered);
            $completion_timestamp = rand($reg_timestamp, time());
            $completion_date = date('Y-m-d H:i:s', $completion_timestamp);
            
            // Random reading time (2-15 minutes)
            $reading_time = rand(120, 900);
            
            // Determine if story is read and quiz completed
            $story_read = true; // Always read if we're creating progress
            $quiz_completed = rand(0, 100) < 80; // 80% chance of completing quiz
            
            // Random quiz score (if completed)
            $quiz_score = 0;
            $total_questions = 3;
            
            if ($quiz_completed) {
                // Weighted random score (higher scores more likely)
                $score_weights = array(1 => 5, 2 => 15, 3 => 80); // 5% get 1, 15% get 2, 80% get 3
                $rand = rand(1, 100);
                if ($rand <= 5) {
                    $quiz_score = 1;
                } elseif ($rand <= 20) {
                    $quiz_score = 2;
                } else {
                    $quiz_score = 3;
                }
            }
            
            // Create progress post
            $post_data = array(
                'post_type' => 'sports-progress',
                'post_title' => $athlete_name . ' - User ' . $user_id,
                'post_status' => 'publish',
                'post_content' => json_encode(array(
                    'user_id' => $user_id,
                    'athlete_id' => $athlete_id,
                    'athlete_name' => $athlete_name,
                    'story_read' => $story_read,
                    'quiz_completed' => $quiz_completed,
                    'quiz_score' => $quiz_score,
                    'total_questions' => $total_questions,
                    'completion_date' => $completion_date,
                    'time_spent_reading' => $reading_time
                )),
                'post_date' => $completion_date,
                'post_modified' => $completion_date
            );
            
            $post_id = wp_insert_post($post_data);
            
            if ($post_id) {
                // Add meta fields
                update_post_meta($post_id, 'user_id', $user_id);
                update_post_meta($post_id, 'athlete_id', $athlete_id);
                update_post_meta($post_id, 'athlete_name', $athlete_name);
                update_post_meta($post_id, 'story_read', $story_read ? '1' : '0');
                update_post_meta($post_id, 'quiz_completed', $quiz_completed ? '1' : '0');
                update_post_meta($post_id, 'quiz_score', $quiz_score);
                update_post_meta($post_id, 'total_questions', $total_questions);
                update_post_meta($post_id, 'completion_date', $completion_date);
                update_post_meta($post_id, 'time_spent_reading', $reading_time);
                
                // Mark as demo data
                update_post_meta($post_id, 'sports_heroes_demo_data', true);
            }
        }
    }
    
    /**
     * Clear demo data
     */
    public function clear_demo_data() {
        check_ajax_referer('demo_data_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Insufficient permissions'));
        }
        
        global $wpdb;
        
        try {
            // Delete demo users
            $demo_users = get_users(array(
                'meta_key' => 'sports_heroes_demo_user',
                'meta_value' => true,
                'fields' => 'ID'
            ));
            
            foreach ($demo_users as $user_id) {
                wp_delete_user($user_id);
            }
            
            // Delete demo progress posts
            $demo_posts = get_posts(array(
                'post_type' => 'sports-progress',
                'meta_key' => 'sports_heroes_demo_data',
                'meta_value' => true,
                'posts_per_page' => -1,
                'fields' => 'ids'
            ));
            
            foreach ($demo_posts as $post_id) {
                wp_delete_post($post_id, true);
            }
            
            wp_send_json_success(array(
                'message' => 'Cleared ' . count($demo_users) . ' demo users and ' . count($demo_posts) . ' progress records'
            ));
            
        } catch (Exception $e) {
            wp_send_json_error(array('message' => $e->getMessage()));
        }
    }
}

// Initialize demo data generator only if we're in admin and the main plugin is active
if (is_admin() && class_exists('SportsHeroesProgress')) {
    new SportsHeroesDemoDataGenerator();
}
