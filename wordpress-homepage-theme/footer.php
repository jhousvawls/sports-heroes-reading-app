<footer id="colophon" class="site-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-branding">
                    <div class="footer-logo">
                        <span class="logo-icon">🏆</span>
                        <span class="logo-text">Sports Heroes</span>
                    </div>
                    <p class="footer-description">
                        Inspiring young readers through sports heroes and interactive learning.
                    </p>
                </div>
                
                <div class="footer-links">
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="<?php echo esc_url(home_url('/')); ?>">Home</a></li>
                            <?php 
                            $app_url = get_field('app_url') ?: get_field('cta_button_url') ?: 'https://your-app-url.com';
                            ?>
                            <li><a href="<?php echo esc_url($app_url); ?>" target="_blank">Launch App</a></li>
                            <?php
                            $about_page = get_page_by_path('about');
                            if ($about_page): ?>
                                <li><a href="<?php echo esc_url(get_permalink($about_page)); ?>">About</a></li>
                            <?php endif;
                            
                            $contact_page = get_page_by_path('contact');
                            if ($contact_page): ?>
                                <li><a href="<?php echo esc_url(get_permalink($contact_page)); ?>">Contact</a></li>
                            <?php endif; ?>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Features</h4>
                        <ul>
                            <li>Interactive Stories</li>
                            <li>Reading Comprehension</li>
                            <li>Progress Tracking</li>
                            <li>Text-to-Speech</li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>For Educators</h4>
                        <ul>
                            <li>Classroom Ready</li>
                            <li>Assessment Tools</li>
                            <li>Progress Reports</li>
                            <li>Curriculum Aligned</li>
                        </ul>
                    </div>
                </div>
                
                <div class="footer-cta">
                    <h4>Ready to Get Started?</h4>
                    <p>Join thousands of students improving their reading skills.</p>
                    <a href="<?php echo esc_url($app_url); ?>" class="btn btn-primary" target="_blank">
                        Launch Sports Heroes App 🚀
                    </a>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <div class="copyright">
                        <p>&copy; <?php echo date('Y'); ?> Sports Heroes Reading App. All rights reserved.</p>
                    </div>
                    
                    <div class="footer-meta">
                        <p>
                            Built with ❤️ for young readers | 
                            <a href="<?php echo esc_url(home_url('/privacy-policy')); ?>">Privacy Policy</a> | 
                            <a href="<?php echo esc_url(home_url('/terms-of-service')); ?>">Terms of Service</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>

</div><!-- #page -->

<?php wp_footer(); ?>

<!-- Additional CSS for Footer -->
<style>
.site-footer {
    background: var(--card-background);
    border-top: 1px solid var(--border);
    padding: 3rem 0 1rem;
    margin-top: 4rem;
}

.footer-content {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 3rem;
    margin-bottom: 2rem;
}

.footer-branding .footer-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.footer-branding .logo-icon {
    font-size: 1.5rem;
}

.footer-branding .logo-text {
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--foreground);
}

.footer-description {
    color: var(--secondary-text);
    font-size: 0.9rem;
    line-height: 1.5;
}

.footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}

.footer-section h4 {
    color: var(--accent);
    margin-bottom: 1rem;
    font-size: 1rem;
}

.footer-section ul {
    list-style: none;
    padding: 0;
}

.footer-section ul li {
    margin-bottom: 0.5rem;
}

.footer-section ul li a {
    color: var(--secondary-text);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
}

.footer-section ul li a:hover {
    color: var(--accent);
}

.footer-section ul li:not(:has(a)) {
    color: var(--secondary-text);
    font-size: 0.9rem;
}

.footer-cta {
    text-align: center;
    padding: 2rem;
    background: var(--smokey-gray);
    border-radius: 1rem;
}

.footer-cta h4 {
    color: var(--foreground);
    margin-bottom: 0.5rem;
}

.footer-cta p {
    color: var(--secondary-text);
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
}

.footer-bottom {
    border-top: 1px solid var(--border);
    padding-top: 2rem;
}

.footer-bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.copyright p,
.footer-meta p {
    color: var(--secondary-text);
    font-size: 0.8rem;
    margin: 0;
}

.footer-meta a {
    color: var(--secondary-text);
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-meta a:hover {
    color: var(--accent);
}

/* Responsive Footer */
@media (max-width: 768px) {
    .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
    }
    
    .footer-links {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .footer-bottom-content {
        flex-direction: column;
        text-align: center;
        gap: 0.5rem;
    }
    
    .footer-cta {
        padding: 1.5rem;
    }
}

@media (max-width: 480px) {
    .site-footer {
        padding: 2rem 0 1rem;
    }
    
    .footer-content {
        gap: 1.5rem;
    }
    
    .footer-cta {
        padding: 1rem;
    }
    
    .footer-cta .btn {
        font-size: 0.9rem;
        padding: 0.75rem 1.5rem;
    }
}

/* Screen reader text */
.screen-reader-text {
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute !important;
    width: 1px;
    word-wrap: normal !important;
}

.screen-reader-text:focus {
    background-color: var(--accent);
    border-radius: 3px;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.6);
    clip: auto !important;
    clip-path: none;
    color: white;
    display: block;
    font-size: 0.875rem;
    font-weight: bold;
    height: auto;
    left: 5px;
    line-height: normal;
    padding: 15px 23px 14px;
    text-decoration: none;
    top: 5px;
    width: auto;
    z-index: 100000;
}
</style>

</body>
</html>
