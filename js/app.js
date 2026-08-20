// ============================================================
// NGO CONNECT — SPA Router & App Logic
// ============================================================

// --- Route Definitions ---
// --- Route Definitions ---
let routes = {};

try {
    // Check if required functions are defined
    const required = [
        'renderHome', 'renderReport', 'renderCases', 'renderNgoDirectory',
        'renderMedicineExchange', 'renderDonate', 'renderImpact',
        'renderHowItWorks', 'renderAbout', 'renderAuth',
        'renderDashboardReporter', 'renderDashboardNgo', 'renderDashboardDonor'
    ];

    const missing = required.filter(fn => typeof window[fn] !== 'function');

    if (missing.length > 0) {
        console.error('Missing components:', missing);
        alert(`Critical Error: The following components failed to load:\n\n${missing.join(', ')}\n\nCheck the console for details.`);
    }

    routes = {
        '/': typeof renderHome !== 'undefined' ? renderHome : () => '<h1>Error: Home component missing</h1>',
        '/report': typeof renderReport !== 'undefined' ? renderReport : () => '<h1>Error: Report component missing</h1>',
        '/cases': typeof renderCases !== 'undefined' ? renderCases : () => '<h1>Error: Cases component missing</h1>',
        '/ngos': typeof renderNgoDirectory !== 'undefined' ? renderNgoDirectory : () => '<h1>Error: NGOs component missing</h1>',
        '/medicine': typeof renderMedicineExchange !== 'undefined' ? renderMedicineExchange : () => '<h1>Error: Medicine component missing</h1>',
        '/donate': typeof renderDonate !== 'undefined' ? renderDonate : () => '<h1>Error: Donate component missing</h1>',
        '/impact': typeof renderImpact !== 'undefined' ? renderImpact : () => '<h1>Error: Impact component missing</h1>',
        '/how-it-works': typeof renderHowItWorks !== 'undefined' ? renderHowItWorks : () => '<h1>Error: How It Works component missing</h1>',
        '/about': typeof renderAbout !== 'undefined' ? renderAbout : () => '<h1>Error: About component missing</h1>',
        '/login': typeof renderAuth !== 'undefined' ? renderAuth : () => '<h1>Error: Auth component missing</h1>',
        '/dashboard/reporter': typeof renderDashboardReporter !== 'undefined' ? renderDashboardReporter : () => '<h1>Error: Reporter Dashboard component missing</h1>',
        '/dashboard/ngo': typeof renderDashboardNgo !== 'undefined' ? renderDashboardNgo : () => '<h1>Error: NGO Dashboard component missing</h1>',
        '/dashboard/donor': typeof renderDashboardDonor !== 'undefined' ? renderDashboardDonor : () => '<h1>Error: Donor Dashboard component missing</h1>',
    };
} catch (e) {
    console.error('Error initializing routes:', e);
    alert('Critical Error: Application failed to initialize routes. See console.');
}

// --- Auth Helpers ---
function isLoggedIn() {
    return !!localStorage.getItem('token');
}

function getCurrentUser() {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
}

function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                 : { 'Content-Type': 'application/json' };
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    updateNavbar();
    navigate('/');
    showToast('Logged out successfully', 'success');
}

function updateNavbar() {
    const authBtn = document.getElementById('navAuthBtn');
    if (!authBtn) return;
    const user = getCurrentUser();
    if (isLoggedIn() && user) {
        const role = (user.role || 'REPORTER').toUpperCase();
        const dashMap = { REPORTER: '/dashboard/reporter', NGO: '/dashboard/ngo', DONOR: '/dashboard/donor', ADMIN: '/dashboard/reporter' };
        const dashPath = dashMap[role] || '/dashboard/reporter';
        const initials = (user.name || user.email || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
        const roleColors = { REPORTER: '#14b8a6', NGO: '#2563eb', DONOR: '#f59e0b', ADMIN: '#dc2626' };
        const avatarColor = roleColors[role] || '#14b8a6';
        authBtn.outerHTML = `
          <div id="navAuthBtn" style="position:relative;display:inline-block;">
            <div id="userAvatarBtn" onclick="toggleUserDropdown()" style="
              width:36px;height:36px;border-radius:50%;background:${avatarColor};
              color:#fff;font-weight:700;font-size:0.85rem;display:flex;
              align-items:center;justify-content:center;cursor:pointer;
              border:2px solid rgba(255,255,255,0.3);box-shadow:0 2px 8px rgba(0,0,0,0.3);
              user-select:none;transition:transform 0.15s ease;" 
              title="${user.name || user.email}"
              onmouseover="this.style.transform='scale(1.1)'"
              onmouseout="this.style.transform='scale(1)'">${initials}</div>
            <div id="userDropdown" style="
              display:none;position:absolute;right:0;top:calc(100% + 8px);
              background:var(--bg-card);border:1px solid var(--border-glass);
              border-radius:12px;min-width:200px;padding:8px;
              box-shadow:0 8px 32px rgba(0,0,0,0.4);z-index:9999;
              backdrop-filter:blur(12px);">
              <div style="padding:10px 12px;border-bottom:1px solid var(--border-glass);margin-bottom:4px;">
                <div style="font-weight:700;font-size:0.9rem;">${user.name || 'User'}</div>
                <div style="font-size:0.75rem;color:var(--text-muted);">${user.email || ''}</div>
                <div style="font-size:0.7rem;margin-top:3px;"><span style="padding:2px 7px;border-radius:10px;background:${avatarColor}22;color:${avatarColor};font-weight:600;">${role}</span></div>
              </div>
              <a href="#${dashPath}" onclick="closeUserDropdown()" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;color:var(--text-primary);text-decoration:none;font-size:0.85rem;transition:background 0.15s;" onmouseover="this.style.background='var(--bg-glass)'" onmouseout="this.style.background='transparent'">📊 My Dashboard</a>
              <a href="#/report" onclick="closeUserDropdown()" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;color:var(--text-primary);text-decoration:none;font-size:0.85rem;transition:background 0.15s;" onmouseover="this.style.background='var(--bg-glass)'" onmouseout="this.style.background='transparent'">🚨 Report Animal</a>
              <div style="border-top:1px solid var(--border-glass);margin:4px 0;"></div>
              <button onclick="logout();closeUserDropdown();" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;color:#dc2626;background:none;border:none;width:100%;font-size:0.85rem;cursor:pointer;transition:background 0.15s;" onmouseover="this.style.background='rgba(220,38,38,0.08)'" onmouseout="this.style.background='transparent'">🚪 Logout</button>
            </div>
          </div>`;
    } else {
        authBtn.outerHTML = `<a id="navAuthBtn" href="#/login" class="btn btn-sm btn-secondary nav-auth-btn">Login</a>`;
    }
}

function toggleUserDropdown() {
    const dd = document.getElementById('userDropdown');
    if (!dd) return;
    const isOpen = dd.style.display !== 'none';
    dd.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) {
        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', function closeDD(e) {
                if (!document.getElementById('navAuthBtn')?.contains(e.target)) {
                    closeUserDropdown();
                    document.removeEventListener('click', closeDD);
                }
            });
        }, 0);
    }
}

function closeUserDropdown() {
    const dd = document.getElementById('userDropdown');
    if (dd) dd.style.display = 'none';
}

// Protected routes that require login
const PROTECTED_ROUTES = ['/report', '/dashboard/reporter', '/dashboard/ngo', '/dashboard/donor'];


// --- Router ---
function getHash() {
    return window.location.hash.slice(1) || '/';
}

function navigate(path) {
    window.location.hash = '#' + path;
}

function router() {
    try {
        const path = getHash();
        const app = document.getElementById('app');

        // --- Page Transition: fade out ---
        app.classList.add('page-exit');
        app.classList.remove('page-enter');

        setTimeout(() => {
            try {
                // Check for dynamic routes
                if (path.startsWith('/case/')) {
                    const caseId = path.split('/case/')[1];
                    if (typeof renderCaseDetail !== 'function') throw new Error('renderCaseDetail is missing');
                    app.innerHTML = renderCaseDetail(caseId);
                    if (typeof initCaseDetailPage === 'function') initCaseDetailPage();
                } else if (path.startsWith('/ngo/')) {
                    const ngoId = path.split('/ngo/')[1];
                    if (typeof renderNgoProfile !== 'function') throw new Error('renderNgoProfile is missing');
                    app.innerHTML = renderNgoProfile(ngoId);
                    if (typeof initNgoProfilePage === 'function') initNgoProfilePage();
                } else if (path.startsWith('/auth/callback')) {
                    // Google OAuth callback — parse token from URL and redirect to dashboard
                    if (typeof handleGoogleCallback === 'function') handleGoogleCallback();
                } else if (routes[path]) {
                    // Auth guard for protected routes
                    if (PROTECTED_ROUTES.includes(path) && !isLoggedIn()) {
                        showToast('Please login to access this page', 'error');
                        app.innerHTML = routes['/login']();
                        initPage('/login');
                        window.location.hash = '#/login';
                    } else {
                        app.innerHTML = routes[path]();
                        initPage(path);
                    }
                } else {
                    app.innerHTML = render404();
                }

                // --- Page Transition: fade in ---
                app.classList.remove('page-exit');
                app.classList.add('page-enter');

                // Update active nav link
                updateActiveNav(path);
                // Update navbar auth state
                updateNavbar();

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Close mobile nav
                closeMobileNav();

                // Animate elements
                requestAnimationFrame(() => {
                    animateElements();
                });

                // Re-create Lucide icons for new content
                if (window.lucide) window.lucide.createIcons();

            } catch (innerErr) {
                console.error('Router Render Error:', innerErr);
                app.innerHTML = `
                    <div class="container" style="padding: 4rem; text-align: center;">
                        <h1>⚠️ Application Error</h1>
                        <p>Something went wrong while loading this page.</p>
                        <code style="display:block; margin: 1rem 0; background: var(--bg-glass, #eee); padding: 1rem; border-radius: 8px; color: var(--text-secondary, #666);">${innerErr.message}</code>
                        <button class="btn btn-primary" onclick="location.hash='#/'">Return Home</button>
                    </div>
                `;
                app.classList.remove('page-exit');
                app.classList.add('page-enter');
            }
        }, 200); // Wait for exit animation

    } catch (e) {
        console.error('Router Error:', e);
        document.getElementById('app').innerHTML = `
            <div class="container" style="padding: 4rem; text-align: center;">
                <h1>⚠️ Application Error</h1>
                <p>Something went wrong while loading this page.</p>
                <code style="display:block; margin: 1rem 0; background: var(--bg-glass, #eee); padding: 1rem; border-radius: 8px; color: var(--text-secondary, #666);">${e.message}</code>
                <button class="btn btn-primary" onclick="location.hash='#/'">Return Home</button>
            </div>
        `;
    }
}

function initPage(path) {
    switch (path) {
        case '/': initHomePage(); break;
        case '/report': initReportPage(); break;
        case '/cases': initCasesPage(); break;
        case '/ngos': if (typeof initNgoDirectoryPage === 'function') initNgoDirectoryPage(); break;
        case '/medicine': initMedicinePage(); break;
        case '/donate': initDonatePage(); break;
        case '/impact': initImpactPage(); break;
        case '/how-it-works': initHowItWorksPage(); break;
        case '/login': initAuthPage(); break;
        case '/auth/callback': /* handled by handleGoogleCallback directly in router */ break;
        case '/dashboard/reporter': initDashboardReporterPage(); break;
        case '/dashboard/ngo': initDashboardNgoPage(); break;
        case '/dashboard/donor': initDashboardDonorPage(); break;
    }
}

// --- Active Nav Highlight ---
function updateActiveNav(path) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === '#' + path || (path === '/' && href === '#/')) {
            link.classList.add('active');
        }
    });
}

// --- Mobile Nav ---
function toggleMobileNav() {
    const links = document.getElementById('navLinks');
    const hamburger = document.getElementById('navHamburger');
    links.classList.toggle('open');
    hamburger.classList.toggle('open');
}

function closeMobileNav() {
    const links = document.getElementById('navLinks');
    const hamburger = document.getElementById('navHamburger');
    if (links) links.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
}

// --- Navbar scroll effect ---
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Animate elements on scroll ---
function animateElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run animation once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.animate-in').forEach(el => {
        observer.observe(el);
    });
}

// --- Counter Animation ---
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        if (target >= 1000) {
            element.textContent = Math.floor(start).toLocaleString('en-IN');
        } else if (target % 1 !== 0) {
            element.textContent = start.toFixed(1);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// --- Initialize Counter Animations ---
function initCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseFloat(el.getAttribute('data-count'));
        animateCounter(el, target);
    });
}

// --- FAQ Toggle ---
function toggleFaq(element) {
    const item = element.closest('.faq-item');
    item.classList.toggle('open');
}

// --- Tab Switching ---
function switchTab(tabGroup, tabName) {
    document.querySelectorAll(`[data-tab-group="${tabGroup}"] .tab`).forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-tab') === tabName);
    });
    document.querySelectorAll(`[data-tab-group="${tabGroup}"] .tab-content`).forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-tab-content') === tabName);
    });
}

// --- 404 Page ---
function render404() {
    return `
    <div class="page-header">
      <div class="container">
        <h1>🔍 Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <br>
        <a href="#/" class="btn btn-primary">← Back to Home</a>
      </div>
    </div>
  `;
}

// --- Toast Notification ---
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
    position: fixed; bottom: 30px; right: 30px; padding: 16px 24px;
    background: ${type === 'success' ? 'var(--emerald)' : 'var(--red)'};
    color: #fff; border-radius: var(--radius-md); font-weight: 600;
    box-shadow: var(--shadow-lg); z-index: 9999;
    animation: fadeInUp 0.3s ease; font-size: 0.95rem;
  `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- Initialize App ---
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hash) {
        window.location.hash = '#/';
    }
    router();
    updateNavbar(); // Set initial navbar state based on stored auth
});


function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const icon = isDark ? 'sun' : 'moon';
    const btn = document.getElementById('themeToggle');
    if (btn) btn.innerHTML = `<i data-lucide="${icon}"></i>`;
    if (window.lucide) window.lucide.createIcons();
}

// Check local storage for theme
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        const btn = document.getElementById('themeToggle');
        if (btn) btn.innerHTML = `<i data-lucide="sun"></i>`;
    }
});
