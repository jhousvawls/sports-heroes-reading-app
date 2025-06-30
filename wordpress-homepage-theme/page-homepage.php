<?php
/**
 * Template Name: Sports Heroes Homepage
 * 
 * Custom homepage template for Sports Heroes Reading App
 */

get_header(); ?>

<main id="main" class="site-main">
    
    <!-- Hero Section -->
    <section class="hero section">
        <div class="container">
            <?php 
            $hero_title = get_field('hero_title') ?: 'Inspire Young Readers with Sports Heroes';
            $hero_subtitle = get_field('hero_subtitle') ?: 'Reading Comprehension Made Fun';
            $hero_description = get_field('hero_description') ?: 'Help kids develop reading skills through inspiring athlete biographies, interactive quizzes, and progress tracking.';
            $cta_button_text = get_field('cta_button_text') ?: 'Start Reading Now';
            $cta_button_url = get_field('cta_button_url') ?: 'https://your-app-url.com';
            ?>
            
            <div class="hero-content">
                <h1><?php echo esc_html($hero_title); ?></h1>
                <h2 class="hero-subtitle"><?php echo esc_html($hero_subtitle); ?></h2>
                <p><?php echo esc_html($hero_description); ?></p>
                <a href="<?php echo esc_url($cta_button_url); ?>" class="btn btn-primary" target="_blank">
                    <?php echo esc_html($cta_button_text); ?> 🚀
                </a>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features section">
        <div class="container">
            <?php 
            $features_title = get_field('features_title') ?: 'Why Choose Sports Heroes?';
            $features = get_field('features');
            
            // Default features if none are set
            if (!$features) {
                $features = array(
                    array(
                        'feature_icon' => '📚',
                        'feature_title' => 'Interactive Stories',
                        'feature_description' => 'Age-appropriate athlete biographies written at 3rd grade reading level'
                    ),
                    array(
                        'feature_icon' => '🧠',
                        'feature_title' => 'Comprehension Quizzes',
                        'feature_description' => 'Multiple-choice questions with detailed explanations to reinforce learning'
                    ),
                    array(
                        'feature_icon' => '📊',
                        'feature_title' => 'Progress Tracking',
                        'feature_description' => 'Monitor reading progress and quiz scores with detailed analytics'
                    ),
                    array(
                        'feature_icon' => '🔊',
                        'feature_title' => 'Text-to-Speech',
                        'feature_description' => 'Read-aloud functionality for accessibility and learning support'
                    ),
                    array(
                        'feature_icon' => '📱',
                        'feature_title' => 'Mobile Friendly',
                        'feature_description' => 'Works perfectly on desktop, tablet, and mobile devices'
                    ),
                    array(
                        'feature_icon' => '⚡',
                        'feature_title' => 'Fast & Reliable',
                        'feature_description' => 'Built with Next.js for lightning-fast performance and reliability'
                    )
                );
            }
            ?>
            
            <h2 class="text-center mb-4"><?php echo esc_html($features_title); ?></h2>
            
            <div class="grid grid-3">
                <?php foreach ($features as $feature): ?>
                    <div class="card feature-card">
                        <div class="feature-icon"><?php echo esc_html($feature['feature_icon']); ?></div>
                        <h3 class="feature-title"><?php echo esc_html($feature['feature_title']); ?></h3>
                        <p><?php echo esc_html($feature['feature_description']); ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Athletes Showcase -->
    <section class="athletes-showcase section">
        <div class="container">
            <?php 
            $athletes_title = get_field('athletes_title') ?: 'Meet Our Sports Heroes';
            $featured_athletes = get_field('featured_athletes');
            
            // Default athletes if none are set
            if (!$featured_athletes) {
                $featured_athletes = get_sports_heroes_athletes();
            }
            ?>
            
            <h2 class="text-center mb-4"><?php echo esc_html($athletes_title); ?></h2>
            
            <div class="grid grid-4">
                <?php foreach ($featured_athletes as $athlete): ?>
                    <div class="card athlete-card">
                        <div class="athlete-emoji"><?php echo esc_html($athlete['athlete_emoji'] ?? $athlete['emoji']); ?></div>
                        <h3 class="athlete-name"><?php echo esc_html($athlete['athlete_name'] ?? $athlete['name']); ?></h3>
                        <p class="athlete-sport"><?php echo esc_html($athlete['athlete_sport'] ?? $athlete['sport']); ?></p>
                        <p class="athlete-bio"><?php echo esc_html($athlete['athlete_bio'] ?? $athlete['bio']); ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works section">
        <div class="container">
            <?php 
            $how_it_works_title = get_field('how_it_works_title') ?: 'How It Works';
            $process_steps = get_field('process_steps');
            
            // Default steps if none are set
            if (!$process_steps) {
                $process_steps = array(
                    array(
                        'step_number' => 1,
                        'step_title' => 'Sign Up',
                        'step_description' => 'Create your account and get started with Sports Heroes reading app'
                    ),
                    array(
                        'step_number' => 2,
                        'step_title' => 'Choose an Athlete',
                        'step_description' => 'Select from our collection of inspiring sports heroes to read about'
                    ),
                    array(
                        'step_number' => 3,
                        'step_title' => 'Read the Story',
                        'step_description' => 'Enjoy age-appropriate biographies with optional text-to-speech'
                    ),
                    array(
                        'step_number' => 4,
                        'step_title' => 'Take the Quiz',
                        'step_description' => 'Test your comprehension with interactive quizzes and get instant feedback'
                    )
                );
            }
            ?>
            
            <h2 class="text-center mb-4"><?php echo esc_html($how_it_works_title); ?></h2>
            
            <div class="steps">
                <?php foreach ($process_steps as $step): ?>
                    <div class="step">
                        <div class="step-number"><?php echo esc_html($step['step_number']); ?></div>
                        <h3 class="step-title"><?php echo esc_html($step['step_title']); ?></h3>
                        <p class="step-description"><?php echo esc_html($step['step_description']); ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits section">
        <div class="container">
            <?php 
            $benefits_title = get_field('benefits_title') ?: 'Benefits for Everyone';
            $student_benefits = get_field('student_benefits');
            $parent_benefits = get_field('parent_benefits');
            $teacher_benefits = get_field('teacher_benefits');
            
            // Default benefits if none are set
            if (!$student_benefits) {
                $student_benefits = array(
                    array('benefit_title' => 'Improve Reading Skills', 'benefit_description' => 'Develop comprehension through engaging sports stories'),
                    array('benefit_title' => 'Learn About Heroes', 'benefit_description' => 'Discover inspiring athletes and their journeys to success'),
                    array('benefit_title' => 'Interactive Learning', 'benefit_description' => 'Engage with quizzes and immediate feedback')
                );
            }
            
            if (!$parent_benefits) {
                $parent_benefits = array(
                    array('benefit_title' => 'Track Progress', 'benefit_description' => 'Monitor your child\'s reading development and quiz scores'),
                    array('benefit_title' => 'Educational Content', 'benefit_description' => 'Age-appropriate stories that combine learning with inspiration'),
                    array('benefit_title' => 'Screen Time Value', 'benefit_description' => 'Meaningful digital activity that builds reading skills')
                );
            }
            
            if (!$teacher_benefits) {
                $teacher_benefits = array(
                    array('benefit_title' => 'Classroom Ready', 'benefit_description' => 'Perfect for reading centers and independent practice'),
                    array('benefit_title' => 'Assessment Tools', 'benefit_description' => 'Built-in progress tracking and comprehension assessment'),
                    array('benefit_title' => 'Engaging Content', 'benefit_description' => 'Sports themes that motivate reluctant readers')
                );
            }
            ?>
            
            <h2 class="text-center mb-4"><?php echo esc_html($benefits_title); ?></h2>
            
            <div class="grid grid-3">
                <!-- Student Benefits -->
                <div class="benefit-category">
                    <h3>For Students</h3>
                    <?php foreach ($student_benefits as $benefit): ?>
                        <div class="benefit-item">
                            <div class="benefit-icon">🎓</div>
                            <div class="benefit-content">
                                <h4><?php echo esc_html($benefit['benefit_title']); ?></h4>
                                <p><?php echo esc_html($benefit['benefit_description']); ?></p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>

                <!-- Parent Benefits -->
                <div class="benefit-category">
                    <h3>For Parents</h3>
                    <?php foreach ($parent_benefits as $benefit): ?>
                        <div class="benefit-item">
                            <div class="benefit-icon">👨‍👩‍👧‍👦</div>
                            <div class="benefit-content">
                                <h4><?php echo esc_html($benefit['benefit_title']); ?></h4>
                                <p><?php echo esc_html($benefit['benefit_description']); ?></p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>

                <!-- Teacher Benefits -->
                <div class="benefit-category">
                    <h3>For Teachers</h3>
                    <?php foreach ($teacher_benefits as $benefit): ?>
                        <div class="benefit-item">
                            <div class="benefit-icon">👩‍🏫</div>
                            <div class="benefit-content">
                                <h4><?php echo esc_html($benefit['benefit_title']); ?></h4>
                                <p><?php echo esc_html($benefit['benefit_description']); ?></p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </section>

    <!-- App Gallery -->
    <?php 
    $gallery_title = get_field('gallery_title') ?: 'See the App in Action';
    $gallery_description = get_field('gallery_description') ?: 'Take a look at our user-friendly interface designed specifically for young readers.';
    $app_screenshots = get_field('app_screenshots');
    
    if ($app_screenshots): ?>
        <section class="app-gallery section">
            <div class="container">
                <h2 class="text-center mb-2"><?php echo esc_html($gallery_title); ?></h2>
                <p class="text-center mb-4"><?php echo esc_html($gallery_description); ?></p>
                
                <div class="screenshot-grid">
                    <?php foreach ($app_screenshots as $screenshot): ?>
                        <div class="screenshot">
                            <img src="<?php echo esc_url($screenshot['sizes']['large']); ?>" 
                                 alt="<?php echo esc_attr($screenshot['alt']); ?>"
                                 loading="lazy">
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>
    <?php endif; ?>

    <!-- Download Section -->
    <section class="download-section section">
        <div class="container">
            <?php 
            $download_title = get_field('download_title') ?: 'Ready to Get Started?';
            $download_description = get_field('download_description') ?: 'Join thousands of students already improving their reading skills with Sports Heroes.';
            $app_url = get_field('app_url') ?: 'https://your-app-url.com';
            $download_button_text = get_field('download_button_text') ?: 'Launch Sports Heroes App';
            $system_requirements = get_field('system_requirements') ?: 'Works on all modern web browsers. No download required!';
            ?>
            
            <div class="text-center">
                <h2 class="mb-2"><?php echo esc_html($download_title); ?></h2>
                <p class="mb-4"><?php echo esc_html($download_description); ?></p>
                
                <a href="<?php echo esc_url($app_url); ?>" class="btn btn-primary mb-4" target="_blank">
                    <?php echo esc_html($download_button_text); ?> 🎯
                </a>
                
                <p class="secondary-text"><?php echo esc_html($system_requirements); ?></p>
            </div>
        </div>
    </section>

</main>

<?php get_footer(); ?>
