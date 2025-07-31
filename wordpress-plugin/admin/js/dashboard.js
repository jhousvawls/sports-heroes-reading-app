/**
 * Sports Heroes Admin Dashboard JavaScript
 */

(function($) {
    'use strict';

    // Global variables
    let usersTable;
    let dashboardCharts = {};

    // Initialize dashboard when DOM is ready
    $(document).ready(function() {
        initializeDashboard();
        initializeUsersPage();
        initializeExportPage();
        bindEvents();
    });

    /**
     * Initialize main dashboard
     */
    function initializeDashboard() {
        if ($('.sports-heroes-dashboard').length) {
            loadDashboardStats();
            loadDashboardCharts();
        }
    }

    /**
     * Load dashboard statistics
     */
    function loadDashboardStats() {
        $.ajax({
            url: sportsHeroesAdmin.restUrl + 'dashboard-stats',
            method: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', sportsHeroesAdmin.restNonce);
            },
            success: function(data) {
                updateStatCards(data);
            },
            error: function(xhr, status, error) {
                console.error('Error loading dashboard stats:', error);
                showNotice('Error loading dashboard statistics', 'error');
            }
        });
    }

    /**
     * Update stat cards with data
     */
    function updateStatCards(data) {
        $('#total-users .stat-number').text(data.total_users.toLocaleString());
        $('#active-users .stat-number').text(data.active_users.toLocaleString());
        $('#total-stories .stat-number').text(data.total_stories.toLocaleString());
        $('#avg-quiz-score .stat-number').text(data.avg_quiz_score || '0');
    }

    /**
     * Load and render dashboard charts
     */
    function loadDashboardCharts() {
        $.ajax({
            url: sportsHeroesAdmin.restUrl + 'analytics',
            method: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', sportsHeroesAdmin.restNonce);
            },
            success: function(data) {
                renderCharts(data);
            },
            error: function(xhr, status, error) {
                console.error('Error loading analytics data:', error);
                showNotice('Error loading charts data', 'error');
            }
        });
    }

    /**
     * Render all charts
     */
    function renderCharts(data) {
        renderRegistrationsChart(data.registrations);
        renderAthletesChart(data.popular_athletes);
        renderScoresChart(data.score_distribution);
        renderActivityChart(data.registrations); // Reuse registrations for activity
    }

    /**
     * Render user registrations chart
     */
    function renderRegistrationsChart(registrations) {
        const ctx = document.getElementById('registrations-chart');
        if (!ctx) return;

        const labels = registrations.map(item => new Date(item.date).toLocaleDateString());
        const data = registrations.map(item => parseInt(item.count));

        dashboardCharts.registrations = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'New Users',
                    data: data,
                    borderColor: '#2271b1',
                    backgroundColor: 'rgba(34, 113, 177, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    /**
     * Render popular athletes chart
     */
    function renderAthletesChart(athletes) {
        const ctx = document.getElementById('athletes-chart');
        if (!ctx) return;

        const labels = athletes.map(item => item.athlete_name);
        const data = athletes.map(item => parseInt(item.count));

        dashboardCharts.athletes = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Stories Read',
                    data: data,
                    backgroundColor: [
                        '#2271b1', '#00a32a', '#dba617', '#d63638', '#8c8f94',
                        '#72aee6', '#68de7c', '#f2d675', '#f87171', '#a7aaad'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    /**
     * Render quiz scores distribution chart
     */
    function renderScoresChart(scores) {
        const ctx = document.getElementById('scores-chart');
        if (!ctx) return;

        const labels = scores.map(item => `${item.score}/3`);
        const data = scores.map(item => parseInt(item.count));

        dashboardCharts.scores = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#d63638', '#dba617', '#72aee6', '#00a32a']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    /**
     * Render daily activity chart
     */
    function renderActivityChart(registrations) {
        const ctx = document.getElementById('activity-chart');
        if (!ctx) return;

        const labels = registrations.map(item => new Date(item.date).toLocaleDateString());
        const data = registrations.map(item => parseInt(item.count));

        dashboardCharts.activity = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Daily Activity',
                    data: data,
                    backgroundColor: '#00a32a'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    /**
     * Initialize users management page
     */
    function initializeUsersPage() {
        if ($('.sports-heroes-users').length) {
            initializeUsersTable();
            bindUserControls();
        }
    }

    /**
     * Initialize users DataTable
     */
    function initializeUsersTable() {
        usersTable = $('#users-table').DataTable({
            ajax: {
                url: sportsHeroesAdmin.restUrl + 'users',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-WP-Nonce', sportsHeroesAdmin.restNonce);
                },
                dataSrc: ''
            },
            columns: [
                {
                    data: null,
                    orderable: false,
                    render: function(data, type, row) {
                        return `<input type="checkbox" class="user-checkbox" value="${row.id}">`;
                    }
                },
                {
                    data: 'name',
                    render: function(data, type, row) {
                        return `<div class="user-info">
                                    <span class="user-name">${data}</span>
                                </div>`;
                    }
                },
                { data: 'email' },
                {
                    data: 'registration_date',
                    render: function(data) {
                        return new Date(data).toLocaleDateString();
                    }
                },
                { data: 'stories_read' },
                {
                    data: 'avg_quiz_score',
                    render: function(data) {
                        return data ? data.toFixed(1) : '0.0';
                    }
                },
                {
                    data: 'last_activity',
                    render: function(data) {
                        if (!data) return 'Never';
                        const date = new Date(data);
                        const now = new Date();
                        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
                        
                        let indicator = 'inactive';
                        if (diffDays <= 7) indicator = 'high';
                        else if (diffDays <= 30) indicator = 'medium';
                        else if (diffDays <= 90) indicator = 'low';
                        
                        return `<span class="activity-indicator activity-${indicator}"></span>${date.toLocaleDateString()}`;
                    }
                },
                {
                    data: null,
                    orderable: false,
                    render: function(data, type, row) {
                        return `<div class="user-actions">
                                    <a href="admin.php?page=sports-heroes-user-detail&user_id=${row.id}" class="button button-small">View</a>
                                    <button class="button button-small reset-user-progress" data-user-id="${row.id}">Reset</button>
                                    <button class="button button-small button-danger delete-user" data-user-id="${row.id}">Delete</button>
                                </div>`;
                    }
                }
            ],
            pageLength: 25,
            order: [[3, 'desc']], // Order by registration date
            language: {
                search: '',
                searchPlaceholder: 'Search users...',
                emptyTable: 'No users found',
                info: 'Showing _START_ to _END_ of _TOTAL_ users',
                infoEmpty: 'No users to show',
                infoFiltered: '(filtered from _MAX_ total users)'
            }
        });
    }

    /**
     * Bind user control events
     */
    function bindUserControls() {
        // Search functionality
        $('#user-search').on('keyup', function() {
            usersTable.search(this.value).draw();
        });

        // Filter controls
        $('#activity-filter, #date-filter').on('change', function() {
            // Implement filtering logic here
            // This would require custom filtering functions
        });

        // Select all checkbox
        $('#select-all').on('change', function() {
            $('.user-checkbox').prop('checked', this.checked);
        });

        // Bulk actions
        $('#apply-bulk-action').on('click', function() {
            const action = $('#bulk-action').val();
            const selectedUsers = $('.user-checkbox:checked').map(function() {
                return this.value;
            }).get();

            if (!action) {
                showNotice('Please select an action', 'warning');
                return;
            }

            if (selectedUsers.length === 0) {
                showNotice('Please select users', 'warning');
                return;
            }

            if (confirm(`Are you sure you want to ${action} ${selectedUsers.length} user(s)?`)) {
                performBulkAction(action, selectedUsers);
            }
        });
    }

    /**
     * Perform bulk action on users
     */
    function performBulkAction(action, userIds) {
        $.ajax({
            url: sportsHeroesAdmin.ajaxurl,
            method: 'POST',
            data: {
                action: 'sports_heroes_bulk_action',
                action_type: action,
                user_ids: userIds,
                nonce: sportsHeroesAdmin.nonce
            },
            success: function(response) {
                if (response.success) {
                    showNotice(response.data.message, 'success');
                    usersTable.ajax.reload();
                } else {
                    showNotice(response.data.message, 'error');
                }
            },
            error: function() {
                showNotice('Error performing bulk action', 'error');
            }
        });
    }

    /**
     * Initialize export page
     */
    function initializeExportPage() {
        if ($('.sports-heroes-export').length) {
            bindExportEvents();
        }
    }

    /**
     * Bind export form events
     */
    function bindExportEvents() {
        $('#export-users-form').on('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const params = new URLSearchParams();
            
            for (let [key, value] of formData.entries()) {
                params.append(key, value);
            }
            
            // Create download link
            const downloadUrl = `${sportsHeroesAdmin.restUrl}export/users?${params.toString()}`;
            window.open(downloadUrl, '_blank');
            
            showNotice('Export started. Download will begin shortly.', 'success');
        });

        $('#export-progress-form').on('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const params = new URLSearchParams();
            
            for (let [key, value] of formData.entries()) {
                params.append(key, value);
            }
            
            // Create download link
            const downloadUrl = `${sportsHeroesAdmin.restUrl}export/progress?${params.toString()}`;
            window.open(downloadUrl, '_blank');
            
            showNotice('Report generation started. Download will begin shortly.', 'success');
        });
    }

    /**
     * Bind general events
     */
    function bindEvents() {
        // Individual user actions
        $(document).on('click', '.reset-user-progress', function() {
            const userId = $(this).data('user-id');
            if (confirm('Are you sure you want to reset this user\'s progress?')) {
                resetUserProgress(userId);
            }
        });

        $(document).on('click', '.delete-user', function() {
            const userId = $(this).data('user-id');
            if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
                deleteUser(userId);
            }
        });
    }

    /**
     * Reset individual user progress
     */
    function resetUserProgress(userId) {
        performBulkAction('reset-progress', [userId]);
    }

    /**
     * Delete individual user
     */
    function deleteUser(userId) {
        performBulkAction('delete', [userId]);
    }

    /**
     * Load user details for detail page
     */
    window.loadUserDetails = function(userId) {
        $.ajax({
            url: sportsHeroesAdmin.restUrl + 'user/' + userId,
            method: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', sportsHeroesAdmin.restNonce);
            },
            success: function(data) {
                renderUserDetails(data);
            },
            error: function() {
                $('#user-detail-content').html('<div class="notice notice-error"><p>Error loading user details</p></div>');
            }
        });
    };

    /**
     * Render user details
     */
    function renderUserDetails(data) {
        const user = data.user;
        const progress = data.progress;

        let html = `
            <div class="user-profile">
                <div class="user-info-detail">
                    <h2>${user.name}</h2>
                    <div class="user-meta">
                        <span><strong>Email:</strong> ${user.email}</span>
                        <span><strong>Registration:</strong> ${new Date(user.registration_date).toLocaleDateString()}</span>
                        <span><strong>Total Progress:</strong> ${progress.length} activities</span>
                    </div>
                </div>
            </div>

            <h3>Reading Progress</h3>
            <div class="progress-grid">
        `;

        if (progress.length === 0) {
            html += '<p>No progress recorded yet.</p>';
        } else {
            progress.forEach(function(item) {
                const status = item.quiz_completed === '1' ? 'completed' : 
                              item.story_read === '1' ? 'in-progress' : 'not-started';
                
                const quizScoreClass = item.quiz_score === '3' ? 'perfect' :
                                     item.quiz_score >= '2' ? 'good' : 'needs-improvement';

                html += `
                    <div class="athlete-progress-card ${status}">
                        <div class="athlete-name">${item.athlete_name}</div>
                        <div class="progress-details">
                            <div>Story Read: ${item.story_read === '1' ? 'Yes' : 'No'}</div>
                            <div>Quiz Completed: ${item.quiz_completed === '1' ? 'Yes' : 'No'}</div>
                            ${item.quiz_completed === '1' ? 
                                `<div>Quiz Score: <span class="quiz-score ${quizScoreClass}">${item.quiz_score}/${item.total_questions}</span></div>` : ''}
                            ${item.time_spent_reading ? 
                                `<div>Reading Time: ${Math.round(item.time_spent_reading / 60)} minutes</div>` : ''}
                            ${item.completion_date ? 
                                `<div>Completed: ${new Date(item.completion_date).toLocaleDateString()}</div>` : ''}
                        </div>
                    </div>
                `;
            });
        }

        html += '</div>';

        // Add activity timeline
        if (progress.length > 0) {
            html += '<h3>Activity Timeline</h3><div class="activity-timeline">';
            
            progress.sort((a, b) => new Date(b.completion_date) - new Date(a.completion_date));
            
            progress.forEach(function(item) {
                if (item.completion_date) {
                    html += `
                        <div class="timeline-item">
                            <div class="timeline-icon ${item.quiz_completed === '1' ? 'timeline-quiz' : 'timeline-story'}">
                                ${item.quiz_completed === '1' ? '✓' : '📖'}
                            </div>
                            <div class="timeline-content">
                                <div class="timeline-title">
                                    ${item.quiz_completed === '1' ? 'Completed quiz for' : 'Read story about'} ${item.athlete_name}
                                </div>
                                <div class="timeline-meta">
                                    ${new Date(item.completion_date).toLocaleDateString()}
                                    ${item.quiz_completed === '1' ? ` - Score: ${item.quiz_score}/${item.total_questions}` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                }
            });
            
            html += '</div>';
        }

        $('#user-detail-content').html(html);
    }

    /**
     * Show admin notice
     */
    function showNotice(message, type = 'info') {
        const noticeClass = `notice-${type}`;
        const notice = $(`
            <div class="notice ${noticeClass} is-dismissible">
                <p>${message}</p>
                <button type="button" class="notice-dismiss">
                    <span class="screen-reader-text">Dismiss this notice.</span>
                </button>
            </div>
        `);

        $('.wrap').first().prepend(notice);

        // Auto-dismiss after 5 seconds
        setTimeout(function() {
            notice.fadeOut(function() {
                notice.remove();
            });
        }, 5000);

        // Manual dismiss
        notice.find('.notice-dismiss').on('click', function() {
            notice.fadeOut(function() {
                notice.remove();
            });
        });
    }

    /**
     * Utility function to format numbers
     */
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /**
     * Utility function to format dates
     */
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

})(jQuery);
