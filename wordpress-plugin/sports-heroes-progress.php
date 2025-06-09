<?php
/**
 * Plugin Name: Sports Heroes Progress Tracker
 * Description: Custom post type and API endpoints for tracking reading progress in the Sports Heroes Reading App
 * Version: 1.0
 * Author: Sports Heroes Team
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class SportsHeroesProgress {
    
    public function __construct() {
        add_action('init', array($this, 'create_post_type'));
        add_action('rest_api_init', array($this, 'register_api_routes'));
        add_action('add_meta_boxes', array($this, 'add_meta_boxes'));
        add_action('save_post', array($this, 'save_meta_boxes'));
    }
    
    /**
     * Create custom post type for progress tracking
     */
    public function create_post_type() {
        register_post_type('sports-progress', array(
            'labels' => array(
                'name' => 'Sports Progress',
                'singular_name' => 'Progress Entry',
                'menu_name' => 'Sports Progress',
                'add_new' => 'Add New Entry',
                'add_new_item' => 'Add New Progress Entry',
                'edit_item' => 'Edit Progress Entry',
                'new_item' => 'New Progress Entry',
                'view_item' => 'View Progress Entry',
                'search_items' => 'Search Progress',
                'not_found' => 'No progress found',
                'not_found_in_trash' => 'No progress found in trash'
            ),
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_rest' => true,
            'rest_base' => 'sports-progress',
            'capability_type' => 'post',
            'hierarchical' => false,
            'supports' => array('title', 'editor', 'custom-fields'),
            'menu_icon' => 'dashicons-chart-line',
            'menu_position' => 25
        ));
    }
    
    /**
     * Register custom API routes
     */
    public function register_api_routes() {
        // Get user progress
        register_rest_route('sports-heroes/v1', '/progress/(?P<user_id>\d+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_user_progress'),
            'permission_callback' => array($this, 'check_permissions'),
            'args' => array(
                'user_id' => array(
                    'validate_callback' => function($param, $request, $key) {
                        return is_numeric($param);
                    }
                ),
            ),
        ));
        
        // Save progress
        register_rest_route('sports-heroes/v1', '/progress', array(
            'methods' => 'POST',
            'callback' => array($this, 'save_progress'),
            'permission_callback' => array($this, 'check_permissions'),
        ));
        
        // Update progress
        register_rest_route('sports-heroes/v1', '/progress/(?P<user_id>\d+)/(?P<athlete_id>\d+)', array(
            'methods' => 'PUT',
            'callback' => array($this, 'update_progress'),
            'permission_callback' => array($this, 'check_permissions'),
        ));
    }
    
    /**
     * Check API permissions
     */
    public function check_permissions() {
        return current_user_can('read');
    }
    
    /**
     * Get user progress
     */
    public function get_user_progress($request) {
        $user_id = $request['user_id'];
        
        $posts = get_posts(array(
            'post_type' => 'sports-progress',
            'meta_query' => array(
                array(
                    'key' => 'user_id',
                    'value' => $user_id,
                    'compare' => '='
                )
            ),
            'posts_per_page' => -1
        ));
        
        $progress = array();
        foreach ($posts as $post) {
            $progress[] = array(
                'id' => $post->ID,
                'user_id' => get_post_meta($post->ID, 'user_id', true),
                'athlete_id' => get_post_meta($post->ID, 'athlete_id', true),
                'athlete_name' => get_post_meta($post->ID, 'athlete_name', true),
                'story_read' => get_post_meta($post->ID, 'story_read', true) === '1',
                'quiz_completed' => get_post_meta($post->ID, 'quiz_completed', true) === '1',
                'quiz_score' => intval(get_post_meta($post->ID, 'quiz_score', true)),
                'total_questions' => intval(get_post_meta($post->ID, 'total_questions', true)),
                'completion_date' => get_post_meta($post->ID, 'completion_date', true),
                'time_spent_reading' => intval(get_post_meta($post->ID, 'time_spent_reading', true))
            );
        }
        
        return rest_ensure_response($progress);
    }
    
    /**
     * Save new progress entry
     */
    public function save_progress($request) {
        $data = $request->get_json_params();
        
        // Check if progress already exists
        $existing = get_posts(array(
            'post_type' => 'sports-progress',
            'meta_query' => array(
                array(
                    'key' => 'user_id',
                    'value' => $data['user_id'],
                    'compare' => '='
                ),
                array(
                    'key' => 'athlete_id',
                    'value' => $data['athlete_id'],
                    'compare' => '='
                )
            ),
            'posts_per_page' => 1
        ));
        
        if (!empty($existing)) {
            // Update existing
            $post_id = $existing[0]->ID;
            wp_update_post(array(
                'ID' => $post_id,
                'post_title' => $data['athlete_name'] . ' - User ' . $data['user_id']
            ));
        } else {
            // Create new
            $post_id = wp_insert_post(array(
                'post_type' => 'sports-progress',
                'post_title' => $data['athlete_name'] . ' - User ' . $data['user_id'],
                'post_status' => 'publish',
                'post_content' => json_encode($data)
            ));
        }
        
        if ($post_id) {
            // Save meta fields
            update_post_meta($post_id, 'user_id', $data['user_id']);
            update_post_meta($post_id, 'athlete_id', $data['athlete_id']);
            update_post_meta($post_id, 'athlete_name', $data['athlete_name']);
            update_post_meta($post_id, 'story_read', $data['story_read'] ? '1' : '0');
            update_post_meta($post_id, 'quiz_completed', $data['quiz_completed'] ? '1' : '0');
            update_post_meta($post_id, 'quiz_score', $data['quiz_score']);
            update_post_meta($post_id, 'total_questions', $data['total_questions']);
            update_post_meta($post_id, 'completion_date', $data['completion_date']);
            update_post_meta($post_id, 'time_spent_reading', $data['time_spent_reading'] ?? 0);
            
            return rest_ensure_response(array('success' => true, 'post_id' => $post_id));
        }
        
        return new WP_Error('save_failed', 'Failed to save progress', array('status' => 500));
    }
    
    /**
     * Update existing progress
     */
    public function update_progress($request) {
        $user_id = $request['user_id'];
        $athlete_id = $request['athlete_id'];
        $data = $request->get_json_params();
        
        $existing = get_posts(array(
            'post_type' => 'sports-progress',
            'meta_query' => array(
                array(
                    'key' => 'user_id',
                    'value' => $user_id,
                    'compare' => '='
                ),
                array(
                    'key' => 'athlete_id',
                    'value' => $athlete_id,
                    'compare' => '='
                )
            ),
            'posts_per_page' => 1
        ));
        
        if (empty($existing)) {
            return new WP_Error('not_found', 'Progress entry not found', array('status' => 404));
        }
        
        $post_id = $existing[0]->ID;
        
        // Update meta fields
        foreach ($data as $key => $value) {
            if ($key === 'story_read' || $key === 'quiz_completed') {
                update_post_meta($post_id, $key, $value ? '1' : '0');
            } else {
                update_post_meta($post_id, $key, $value);
            }
        }
        
        return rest_ensure_response(array('success' => true, 'post_id' => $post_id));
    }
    
    /**
     * Add meta boxes for admin interface
     */
    public function add_meta_boxes() {
        add_meta_box(
            'sports-progress-details',
            'Progress Details',
            array($this, 'progress_meta_box'),
            'sports-progress',
            'normal',
            'high'
        );
    }
    
    /**
     * Progress meta box content
     */
    public function progress_meta_box($post) {
        wp_nonce_field('sports_progress_meta_box', 'sports_progress_meta_box_nonce');
        
        $user_id = get_post_meta($post->ID, 'user_id', true);
        $athlete_id = get_post_meta($post->ID, 'athlete_id', true);
        $athlete_name = get_post_meta($post->ID, 'athlete_name', true);
        $story_read = get_post_meta($post->ID, 'story_read', true);
        $quiz_completed = get_post_meta($post->ID, 'quiz_completed', true);
        $quiz_score = get_post_meta($post->ID, 'quiz_score', true);
        $total_questions = get_post_meta($post->ID, 'total_questions', true);
        $completion_date = get_post_meta($post->ID, 'completion_date', true);
        $time_spent_reading = get_post_meta($post->ID, 'time_spent_reading', true);
        
        echo '<table class="form-table">';
        echo '<tr><th><label for="user_id">User ID:</label></th><td><input type="number" id="user_id" name="user_id" value="' . esc_attr($user_id) . '" /></td></tr>';
        echo '<tr><th><label for="athlete_id">Athlete ID:</label></th><td><input type="number" id="athlete_id" name="athlete_id" value="' . esc_attr($athlete_id) . '" /></td></tr>';
        echo '<tr><th><label for="athlete_name">Athlete Name:</label></th><td><input type="text" id="athlete_name" name="athlete_name" value="' . esc_attr($athlete_name) . '" /></td></tr>';
        echo '<tr><th><label for="story_read">Story Read:</label></th><td><input type="checkbox" id="story_read" name="story_read" value="1"' . checked($story_read, '1', false) . ' /></td></tr>';
        echo '<tr><th><label for="quiz_completed">Quiz Completed:</label></th><td><input type="checkbox" id="quiz_completed" name="quiz_completed" value="1"' . checked($quiz_completed, '1', false) . ' /></td></tr>';
        echo '<tr><th><label for="quiz_score">Quiz Score:</label></th><td><input type="number" id="quiz_score" name="quiz_score" value="' . esc_attr($quiz_score) . '" /></td></tr>';
        echo '<tr><th><label for="total_questions">Total Questions:</label></th><td><input type="number" id="total_questions" name="total_questions" value="' . esc_attr($total_questions) . '" /></td></tr>';
        echo '<tr><th><label for="completion_date">Completion Date:</label></th><td><input type="datetime-local" id="completion_date" name="completion_date" value="' . esc_attr($completion_date) . '" /></td></tr>';
        echo '<tr><th><label for="time_spent_reading">Time Spent Reading (seconds):</label></th><td><input type="number" id="time_spent_reading" name="time_spent_reading" value="' . esc_attr($time_spent_reading) . '" /></td></tr>';
        echo '</table>';
    }
    
    /**
     * Save meta box data
     */
    public function save_meta_boxes($post_id) {
        if (!isset($_POST['sports_progress_meta_box_nonce']) || !wp_verify_nonce($_POST['sports_progress_meta_box_nonce'], 'sports_progress_meta_box')) {
            return;
        }
        
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
        
        $fields = array('user_id', 'athlete_id', 'athlete_name', 'quiz_score', 'total_questions', 'completion_date', 'time_spent_reading');
        
        foreach ($fields as $field) {
            if (isset($_POST[$field])) {
                update_post_meta($post_id, $field, sanitize_text_field($_POST[$field]));
            }
        }
        
        // Handle checkboxes
        update_post_meta($post_id, 'story_read', isset($_POST['story_read']) ? '1' : '0');
        update_post_meta($post_id, 'quiz_completed', isset($_POST['quiz_completed']) ? '1' : '0');
    }
}

// Initialize the plugin
new SportsHeroesProgress();

/**
 * Activation hook - create database tables if needed
 */
register_activation_hook(__FILE__, 'sports_heroes_activate');
function sports_heroes_activate() {
    // Flush rewrite rules
    flush_rewrite_rules();
}

/**
 * Deactivation hook
 */
register_deactivation_hook(__FILE__, 'sports_heroes_deactivate');
function sports_heroes_deactivate() {
    // Flush rewrite rules
    flush_rewrite_rules();
}
