<?php
/**
 * Sports Heroes Homepage Theme Functions
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function sports_heroes_theme_setup() {
    // Add theme support for various features
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'sports-heroes'),
    ));
}
add_action('after_setup_theme', 'sports_heroes_theme_setup');

/**
 * Enqueue Scripts and Styles
 */
function sports_heroes_scripts() {
    wp_enqueue_style('sports-heroes-style', get_stylesheet_uri(), array(), '1.0.0');
    wp_enqueue_script('sports-heroes-script', get_template_directory_uri() . '/js/main.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'sports_heroes_scripts');

/**
 * Register ACF Field Groups
 */
function sports_heroes_register_acf_fields() {
    if (function_exists('acf_add_local_field_group')) {
        
        // Hero Section Fields
        acf_add_local_field_group(array(
            'key' => 'group_hero_section',
            'title' => 'Hero Section',
            'fields' => array(
                array(
                    'key' => 'field_hero_title',
                    'label' => 'Hero Title',
                    'name' => 'hero_title',
                    'type' => 'text',
                    'default_value' => 'Inspire Young Readers with Sports Heroes',
                ),
                array(
                    'key' => 'field_hero_subtitle',
                    'label' => 'Hero Subtitle',
                    'name' => 'hero_subtitle',
                    'type' => 'text',
                    'default_value' => 'Reading Comprehension Made Fun',
                ),
                array(
                    'key' => 'field_hero_description',
                    'label' => 'Hero Description',
                    'name' => 'hero_description',
                    'type' => 'textarea',
                    'default_value' => 'Help kids develop reading skills through inspiring athlete biographies, interactive quizzes, and progress tracking.',
                ),
                array(
                    'key' => 'field_cta_button_text',
                    'label' => 'CTA Button Text',
                    'name' => 'cta_button_text',
                    'type' => 'text',
                    'default_value' => 'Start Reading Now',
                ),
                array(
                    'key' => 'field_cta_button_url',
                    'label' => 'CTA Button URL',
                    'name' => 'cta_button_url',
                    'type' => 'url',
                    'default_value' => 'https://your-app-url.com',
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'page_template',
                        'operator' => '==',
                        'value' => 'page-homepage.php',
                    ),
                ),
            ),
        ));

        // Features Section
        acf_add_local_field_group(array(
            'key' => 'group_features_section',
            'title' => 'Features Section',
            'fields' => array(
                array(
                    'key' => 'field_features_title',
                    'label' => 'Features Section Title',
                    'name' => 'features_title',
                    'type' => 'text',
                    'default_value' => 'Why Choose Sports Heroes?',
                ),
                array(
                    'key' => 'field_features',
                    'label' => 'Features',
                    'name' => 'features',
                    'type' => 'repeater',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_feature_icon',
                            'label' => 'Feature Icon',
                            'name' => 'feature_icon',
                            'type' => 'select',
                            'choices' => array(
                                '📚' => '📚 Reading',
                                '🧠' => '🧠 Quiz',
                                '📊' => '📊 Progress',
                                '🔊' => '🔊 Audio',
                                '📱' => '📱 Mobile',
                                '⚡' => '⚡ Fast',
                                '🏆' => '🏆 Achievement',
                                '👨‍👩‍👧‍👦' => '👨‍👩‍👧‍👦 Family',
                            ),
                        ),
                        array(
                            'key' => 'field_feature_title',
                            'label' => 'Feature Title',
                            'name' => 'feature_title',
                            'type' => 'text',
                        ),
                        array(
                            'key' => 'field_feature_description',
                            'label' => 'Feature Description',
                            'name' => 'feature_description',
                            'type' => 'textarea',
                        ),
                    ),
                    'min' => 1,
                    'layout' => 'table',
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'page_template',
                        'operator' => '==',
                        'value' => 'page-homepage.php',
                    ),
                ),
            ),
        ));

        // Athletes Showcase
        acf_add_local_field_group(array(
            'key' => 'group_athletes_section',
            'title' => 'Athletes Showcase',
            'fields' => array(
                array(
                    'key' => 'field_athletes_title',
                    'label' => 'Athletes Section Title',
                    'name' => 'athletes_title',
                    'type' => 'text',
                    'default_value' => 'Meet Our Sports Heroes',
                ),
                array(
                    'key' => 'field_featured_athletes',
                    'label' => 'Featured Athletes',
                    'name' => 'featured_athletes',
                    'type' => 'repeater',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_athlete_name',
                            'label' => 'Athlete Name',
                            'name' => 'athlete_name',
                            'type' => 'text',
                        ),
                        array(
                            'key' => 'field_athlete_sport',
                            'label' => 'Sport',
                            'name' => 'athlete_sport',
                            'type' => 'text',
                        ),
                        array(
                            'key' => 'field_athlete_emoji',
                            'label' => 'Athlete Emoji',
                            'name' => 'athlete_emoji',
                            'type' => 'text',
                            'instructions' => 'Enter an emoji or icon to represent the athlete',
                        ),
                        array(
                            'key' => 'field_athlete_bio',
                            'label' => 'Short Bio',
                            'name' => 'athlete_bio',
                            'type' => 'textarea',
                        ),
                    ),
                    'min' => 1,
                    'layout' => 'table',
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'page_template',
                        'operator' => '==',
                        'value' => 'page-homepage.php',
                    ),
                ),
            ),
        ));

        // How It Works Section
        acf_add_local_field_group(array(
            'key' => 'group_how_it_works',
            'title' => 'How It Works Section',
            'fields' => array(
                array(
                    'key' => 'field_how_it_works_title',
                    'label' => 'How It Works Title',
                    'name' => 'how_it_works_title',
                    'type' => 'text',
                    'default_value' => 'How It Works',
                ),
                array(
                    'key' => 'field_process_steps',
                    'label' => 'Process Steps',
                    'name' => 'process_steps',
                    'type' => 'repeater',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_step_number',
                            'label' => 'Step Number',
                            'name' => 'step_number',
                            'type' => 'number',
                        ),
                        array(
                            'key' => 'field_step_title',
                            'label' => 'Step Title',
                            'name' => 'step_title',
                            'type' => 'text',
                        ),
                        array(
                            'key' => 'field_step_description',
                            'label' => 'Step Description',
                            'name' => 'step_description',
                            'type' => 'textarea',
                        ),
                    ),
                    'min' => 1,
                    'layout' => 'table',
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'page_template',
                        'operator' => '==',
                        'value' => 'page-homepage.php',
                    ),
                ),
            ),
        ));

        // Benefits Section
        acf_add_local_field_group(array(
            'key' => 'group_benefits_section',
            'title' => 'Benefits Section',
            'fields' => array(
                array(
                    'key' => 'field_benefits_title',
                    'label' => 'Benefits Section Title',
                    'name' => 'benefits_title',
                    'type' => 'text',
                    'default_value' => 'Benefits for Everyone',
                ),
                array(
                    'key' => 'field_student_benefits',
                    'label' => 'Student Benefits',
                    'name' => 'student_benefits',
                    'type' => 'repeater',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_student_benefit_title',
                            'label' => 'Benefit Title',
                            'name' => 'benefit_title',
                            'type' => 'text',
                        ),
                        array(
                            'key' => 'field_student_benefit_description',
                            'label' => 'Benefit Description',
                            'name' => 'benefit_description',
                            'type' => 'textarea',
                        ),
                    ),
                    'layout' => 'table',
                ),
                array(
                    'key' => 'field_parent_benefits',
                    'label' => 'Parent Benefits',
                    'name' => 'parent_benefits',
                    'type' => 'repeater',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_parent_benefit_title',
                            'label' => 'Benefit Title',
                            'name' => 'benefit_title',
                            'type' => 'text',
                        ),
                        array(
                            'key' => 'field_parent_benefit_description',
                            'label' => 'Benefit Description',
                            'name' => 'benefit_description',
                            'type' => 'textarea',
                        ),
                    ),
                    'layout' => 'table',
                ),
                array(
                    'key' => 'field_teacher_benefits',
                    'label' => 'Teacher Benefits',
                    'name' => 'teacher_benefits',
                    'type' => 'repeater',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_teacher_benefit_title',
                            'label' => 'Benefit Title',
                            'name' => 'benefit_title',
                            'type' => 'text',
                        ),
                        array(
                            'key' => 'field_teacher_benefit_description',
                            'label' => 'Benefit Description',
                            'name' => 'benefit_description',
                            'type' => 'textarea',
                        ),
                    ),
                    'layout' => 'table',
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'page_template',
                        'operator' => '==',
                        'value' => 'page-homepage.php',
                    ),
                ),
            ),
        ));

        // App Gallery Section
        acf_add_local_field_group(array(
            'key' => 'group_app_gallery',
            'title' => 'App Gallery Section',
            'fields' => array(
                array(
                    'key' => 'field_gallery_title',
                    'label' => 'Gallery Title',
                    'name' => 'gallery_title',
                    'type' => 'text',
                    'default_value' => 'See the App in Action',
                ),
                array(
                    'key' => 'field_gallery_description',
                    'label' => 'Gallery Description',
                    'name' => 'gallery_description',
                    'type' => 'textarea',
                    'default_value' => 'Take a look at our user-friendly interface designed specifically for young readers.',
                ),
                array(
                    'key' => 'field_app_screenshots',
                    'label' => 'App Screenshots',
                    'name' => 'app_screenshots',
                    'type' => 'gallery',
                    'instructions' => 'Upload screenshots of your app interface',
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'page_template',
                        'operator' => '==',
                        'value' => 'page-homepage.php',
                    ),
                ),
            ),
        ));

        // Download Section
        acf_add_local_field_group(array(
            'key' => 'group_download_section',
            'title' => 'Download Section',
            'fields' => array(
                array(
                    'key' => 'field_download_title',
                    'label' => 'Download Title',
                    'name' => 'download_title',
                    'type' => 'text',
                    'default_value' => 'Ready to Get Started?',
                ),
                array(
                    'key' => 'field_download_description',
                    'label' => 'Download Description',
                    'name' => 'download_description',
                    'type' => 'textarea',
                    'default_value' => 'Join thousands of students already improving their reading skills with Sports Heroes.',
                ),
                array(
                    'key' => 'field_app_url',
                    'label' => 'App URL',
                    'name' => 'app_url',
                    'type' => 'url',
                    'default_value' => 'https://your-app-url.com',
                ),
                array(
                    'key' => 'field_download_button_text',
                    'label' => 'Download Button Text',
                    'name' => 'download_button_text',
                    'type' => 'text',
                    'default_value' => 'Launch Sports Heroes App',
                ),
                array(
                    'key' => 'field_system_requirements',
                    'label' => 'System Requirements',
                    'name' => 'system_requirements',
                    'type' => 'textarea',
                    'default_value' => 'Works on all modern web browsers. No download required!',
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'page_template',
                        'operator' => '==',
                        'value' => 'page-homepage.php',
                    ),
                ),
            ),
        ));
    }
}
add_action('acf/init', 'sports_heroes_register_acf_fields');

/**
 * Add default content for homepage fields
 */
function sports_heroes_add_default_content() {
    // This function can be used to populate default content
    // when the theme is first activated
}

/**
 * Custom function to get athlete data from your app
 */
function get_sports_heroes_athletes() {
    // This would typically connect to your app's data source
    // For now, we'll return some sample data matching your app
    return array(
        array(
            'name' => 'Patrick Mahomes',
            'sport' => 'Football',
            'emoji' => '🏈',
            'bio' => 'NFL quarterback known for his incredible arm strength and leadership on the field.'
        ),
        array(
            'name' => 'Serena Williams',
            'sport' => 'Tennis',
            'emoji' => '🎾',
            'bio' => 'One of the greatest tennis players of all time with 23 Grand Slam singles titles.'
        ),
        array(
            'name' => 'LeBron James',
            'sport' => 'Basketball',
            'emoji' => '🏀',
            'bio' => 'NBA superstar known for his versatility, basketball IQ, and community leadership.'
        ),
        array(
            'name' => 'Simone Biles',
            'sport' => 'Gymnastics',
            'emoji' => '🤸‍♀️',
            'bio' => 'The most decorated gymnast in history with incredible strength and determination.'
        ),
    );
}

/**
 * Enqueue additional scripts for interactive features
 */
function sports_heroes_enqueue_additional_scripts() {
    wp_enqueue_script('sports-heroes-interactions', get_template_directory_uri() . '/js/interactions.js', array('jquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'sports_heroes_enqueue_additional_scripts');

/**
 * Add custom body classes
 */
function sports_heroes_body_classes($classes) {
    $classes[] = 'sports-heroes-theme';
    if (is_page_template('page-homepage.php')) {
        $classes[] = 'homepage-template';
    }
    return $classes;
}
add_filter('body_class', 'sports_heroes_body_classes');

/**
 * Customize WordPress admin for better ACF experience
 */
function sports_heroes_admin_styles() {
    echo '<style>
        .acf-field-group .acf-field-object {
            border-left: 3px solid #FF8200;
        }
        .acf-field-group .acf-field-object:hover {
            border-left-color: #E6750A;
        }
    </style>';
}
add_action('admin_head', 'sports_heroes_admin_styles');
?>
