<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @package Sports Heroes Homepage Theme
 */

get_header();
?>

<main id="main" class="site-main">

    <?php if (have_posts()) : ?>

        <?php if (is_home() && !is_front_page()) : ?>
            <header class="page-header">
                <div class="container">
                    <h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
                </div>
            </header>
        <?php endif; ?>

        <div class="container">
            <div class="content-area">
                
                <?php
                // Start the Loop.
                while (have_posts()) :
                    the_post();
                ?>

                    <article id="post-<?php the_ID(); ?>" <?php post_class('card'); ?>>
                        
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="post-thumbnail">
                                <?php the_post_thumbnail('large'); ?>
                            </div>
                        <?php endif; ?>

                        <header class="entry-header">
                            <?php
                            if (is_singular()) :
                                the_title('<h1 class="entry-title">', '</h1>');
                            else :
                                the_title('<h2 class="entry-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h2>');
                            endif;
                            ?>

                            <?php if ('post' === get_post_type()) : ?>
                                <div class="entry-meta">
                                    <span class="posted-on">
                                        <time class="entry-date published" datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                                            <?php echo esc_html(get_the_date()); ?>
                                        </time>
                                    </span>
                                    <span class="byline">
                                        by <span class="author vcard">
                                            <a class="url fn n" href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>">
                                                <?php echo esc_html(get_the_author()); ?>
                                            </a>
                                        </span>
                                    </span>
                                </div>
                            <?php endif; ?>
                        </header>

                        <div class="entry-content">
                            <?php
                            if (is_singular()) {
                                the_content();
                            } else {
                                the_excerpt();
                            }

                            wp_link_pages(array(
                                'before' => '<div class="page-links">' . esc_html__('Pages:', 'sports-heroes'),
                                'after'  => '</div>',
                            ));
                            ?>
                        </div>

                        <?php if (!is_singular()) : ?>
                            <footer class="entry-footer">
                                <a href="<?php echo esc_url(get_permalink()); ?>" class="btn btn-secondary">
                                    <?php esc_html_e('Read More', 'sports-heroes'); ?>
                                </a>
                            </footer>
                        <?php endif; ?>

                    </article>

                <?php
                endwhile;

                // Previous/next page navigation.
                the_posts_pagination(array(
                    'prev_text'          => esc_html__('Previous page', 'sports-heroes'),
                    'next_text'          => esc_html__('Next page', 'sports-heroes'),
                    'before_page_number' => '<span class="meta-nav screen-reader-text">' . esc_html__('Page', 'sports-heroes') . ' </span>',
                ));
                ?>

            </div>
        </div>

    <?php else : ?>

        <div class="container">
            <div class="no-results card">
                <header class="page-header">
                    <h1 class="page-title"><?php esc_html_e('Nothing here', 'sports-heroes'); ?></h1>
                </header>

                <div class="page-content">
                    <?php if (is_home() && current_user_can('publish_posts')) : ?>
                        <p>
                            <?php
                            printf(
                                wp_kses(
                                    /* translators: 1: link to WP admin new post page. */
                                    __('Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'sports-heroes'),
                                    array(
                                        'a' => array(
                                            'href' => array(),
                                        ),
                                    )
                                ),
                                esc_url(admin_url('post-new.php'))
                            );
                            ?>
                        </p>
                    <?php elseif (is_search()) : ?>
                        <p><?php esc_html_e('Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'sports-heroes'); ?></p>
                        <?php get_search_form(); ?>
                    <?php else : ?>
                        <p><?php esc_html_e('It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'sports-heroes'); ?></p>
                        <?php get_search_form(); ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>

    <?php endif; ?>

</main>

<?php
get_footer();
