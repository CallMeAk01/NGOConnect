// ============================================================
// NGO CONNECT — Live Updates (WebSocket Integration)
// ============================================================

const LiveUpdates = {
    socket: null,
    connected: false,

    init() {
        const indicator = document.getElementById('liveIndicator');

        try {
            // Connect to the backend WebSocket namespace
            this.socket = io('http://localhost:3000/events', {
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionDelay: 2000,
                reconnectionAttempts: 10,
                timeout: 5000
            });

            this.socket.on('connect', () => {
                console.log('🟢 WebSocket connected:', this.socket.id);
                this.connected = true;
                if (indicator) {
                    indicator.classList.remove('disconnected');
                    indicator.innerHTML = '<span class="live-dot"></span> Live';
                    indicator.title = 'Connected — receiving real-time updates';
                }
            });

            this.socket.on('disconnect', () => {
                console.log('🔴 WebSocket disconnected');
                this.connected = false;
                if (indicator) {
                    indicator.classList.add('disconnected');
                    indicator.innerHTML = '<span class="live-dot"></span> Offline';
                    indicator.title = 'Disconnected — reconnecting...';
                }
            });

            this.socket.on('connect_error', () => {
                this.connected = false;
                if (indicator) {
                    indicator.classList.add('disconnected');
                    indicator.innerHTML = '<span class="live-dot"></span> Offline';
                    indicator.title = 'Cannot reach server — using cached data';
                }
            });

            // --- Event Listeners ---

            // New case created
            this.socket.on('case:created', (payload) => {
                console.log('📢 New case:', payload);
                const desc = payload.data?.description || 'New rescue case reported';
                const shortDesc = desc.length > 60 ? desc.substring(0, 60) + '...' : desc;
                showToast(`🚨 New Case Reported: ${shortDesc}`, 'info');

                // Refresh cases grid if on cases page
                if (window.location.hash === '#/cases' && typeof initCasesPage === 'function') {
                    setTimeout(() => initCasesPage(), 500);
                }
                // Refresh home page feed
                if ((window.location.hash === '#/' || window.location.hash === '') && typeof initHomePage === 'function') {
                    setTimeout(() => initHomePage(), 500);
                }
            });

            // Case status update
            this.socket.on('case:statusUpdate', (payload) => {
                console.log('🔄 Case status update:', payload);
                const data = payload.data;
                const statusEmoji = data.newStatus === 'RESOLVED' ? '✅' : data.newStatus === 'IN_PROGRESS' ? '🏥' : '📋';
                showToast(`${statusEmoji} Case updated: ${data.previousStatus} → ${data.newStatus}`, 'info');
            });

            // Critical case alert
            this.socket.on('case:critical', (payload) => {
                console.log('🚨 CRITICAL CASE ALERT:', payload);
                this.showCriticalAlert(payload.data);
            });

            // Escalation event
            this.socket.on('case:escalated', (payload) => {
                console.log('⬆️ Case escalated:', payload);
                showToast(`⚠️ Case auto-escalated to next nearest NGO`, 'warning');
            });

        } catch (err) {
            console.warn('WebSocket initialization failed (backend may not be running):', err.message);
            if (indicator) {
                indicator.classList.add('disconnected');
                indicator.innerHTML = '<span class="live-dot"></span> Offline';
            }
        }
    },

    showCriticalAlert(data) {
        // Remove existing alert banner if any
        const existing = document.querySelector('.live-alert-banner');
        if (existing) existing.remove();

        const caseInfo = data.case;
        const desc = caseInfo?.description || 'Critical animal rescue case reported';
        const shortDesc = desc.length > 80 ? desc.substring(0, 80) + '...' : desc;

        const banner = document.createElement('div');
        banner.className = 'live-alert-banner';
        banner.innerHTML = `
      <span>🚨</span>
      <span>CRITICAL ALERT: ${shortDesc}</span>
      <span style="font-size:0.8rem; opacity:0.8;">— ${data.notifiedNgos?.length || 0} NGOs notified</span>
      <button class="close-alert" onclick="this.parentElement.remove()">✕</button>
    `;
        document.body.appendChild(banner);

        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            if (banner.parentElement) {
                banner.style.animation = 'alertSlideDown 0.3s ease reverse forwards';
                setTimeout(() => banner.remove(), 300);
            }
        }, 10000);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to let the page render first
    setTimeout(() => LiveUpdates.init(), 500);
});
