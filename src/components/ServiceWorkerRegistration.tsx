'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, show update notification
                  if (confirm('New content is available! Would you like to refresh?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('Message from service worker:', event.data);
        
        if (event.data.type === 'CACHE_UPDATED') {
          // Handle cache update notifications
          console.log('Cache has been updated');
        }
      });

        // Handle online/offline status
        const handleOnline = () => {
          console.log('App is online');
          // Trigger background sync if available
          if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
            navigator.serviceWorker.ready.then((registration) => {
              // Type assertion for background sync
              const syncRegistration = registration as ServiceWorkerRegistration & {
                sync?: {
                  register: (tag: string) => Promise<void>;
                };
              };
              if (syncRegistration.sync) {
                return syncRegistration.sync.register('progress-sync');
              }
            }).catch((error) => {
              console.error('Background sync registration failed:', error);
            });
          }
        };

      const handleOffline = () => {
        console.log('App is offline');
        // Show offline indicator
        const offlineIndicator = document.createElement('div');
        offlineIndicator.id = 'offline-indicator';
        offlineIndicator.innerHTML = `
          <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #f59e0b;
            color: white;
            text-align: center;
            padding: 8px;
            font-size: 14px;
            z-index: 9999;
          ">
            📱 You're offline. Some features may not be available.
          </div>
        `;
        document.body.appendChild(offlineIndicator);
      };

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      // Check initial online status
      if (!navigator.onLine) {
        handleOffline();
      }

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  return null; // This component doesn't render anything
}
