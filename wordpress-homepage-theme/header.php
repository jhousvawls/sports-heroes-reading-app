<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <!-- Preconnect to improve performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Sports Heroes Reading App - Help kids develop reading skills through inspiring athlete biographies, interactive quizzes, and progress tracking.">
    <meta name="keywords" content="reading comprehension, sports heroes, educational app, kids reading, athlete biographies">
    <meta name="author" content="Sports Heroes Team">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="<?php wp_title('|', true, 'right'); ?>">
    <meta property="og:description" content="Inspire young readers with sports heroes. Interactive stories, quizzes, and progress tracking for kids.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo esc_url(home_url('/')); ?>">
    <meta property="og:site_name" content="Sports Heroes Reading App">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php wp_title('|', true, 'right'); ?>">
    <meta name="twitter:description" content="Inspire young readers with sports heroes. Interactive stories, quizzes, and progress tracking for kids.">
    
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏆</text></svg>">
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#main"><?php esc_html_e('Skip to content', 'sports-heroes'); ?></a>

    <header id="masthead" class="site-header">
        <div class="container">
            <div class="header-content">
                <div class="site-branding">
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="logo" rel="home">
                        <span class="logo-icon">🏆</span>
                        <span class="logo-text">
                            <?php 
                            $site_title = get_bloginfo('name');
                            echo $site_title ? esc_html($site_title) : 'Sports Heroes';
                            ?>
                        </span>
                    </a>
                </div>

                <nav id="site-navigation" class="main-nav">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_id'        => 'primary-menu',
                        'container'      => false,
                        'fallback_cb'    => 'sports_heroes_fallback_menu',
                    ));
                    ?>
                </nav>
            </div>
        </div>
    </header>

<?php
/**
 * Fallback menu if no menu is assigned
 */
function sports_heroes_fallback_menu() {
    echo '<ul id="primary-menu">';
    echo '<li><a href="' . esc_url(home_url('/')) . '">Home</a></li>';
    
    // Get the app URL from ACF or use default
    $app_url = get_field('app_url', 'option') ?: get_field('cta_button_url') ?: 'https://your-app-url.com';
    echo '<li><a href="' . esc_url($app_url) . '" target="_blank">Launch App</a></li>';
    
    // Add other common pages if they exist
    $about_page = get_page_by_path('about');
    if ($about_page) {
        echo '<li><a href="' . esc_url(get_permalink($about_page)) . '">About</a></li>';
    }
    
    $contact_page = get_page_by_path('contact');
    if ($contact_page) {
        echo '<li><a href="' . esc_url(get_permalink($contact_page)) . '">Contact</a></li>';
    }
    
    echo '</ul>';
}
?>
