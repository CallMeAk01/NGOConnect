// ============================================================
// NGO CONNECT — Auth (Login/Register) Page
// ============================================================

function renderAuth() {
  return `
    <div class="page-header">
      <div class="container">
        <h1>🔐 Welcome to NGO CONNECT</h1>
        <p>Sign in or create an account to access your dashboard</p>
      </div>
    </div>
    <section class="section"><div class="container">
      <div class="auth-container">
        <div class="auth-card animate-in">
          <div data-tab-group="auth">
            <div class="tabs" style="justify-content:center;">
              <div class="tab active" data-tab="login" onclick="switchTab('auth','login')">Login</div>
              <div class="tab" data-tab="register" onclick="switchTab('auth','register')">Register</div>
            </div>

            <div class="tab-content active" data-tab-content="login">
              <div class="form-group"><label class="form-label">Email or Phone</label><input type="text" class="form-input" id="loginEmail" placeholder="Enter your email or phone"></div>
              <div class="form-group"><label class="form-label">Password</label><input type="password" class="form-input" id="loginPassword" placeholder="Enter your password"></div>
              <button class="btn btn-primary" style="width:100%;justify-content:center;margin-bottom:1rem;" onclick="handleLogin()">Login</button>
              <div class="text-center" style="margin-bottom:1rem;"><a href="#" style="font-size:0.85rem;">Forgot Password?</a></div>
              <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;">
                <div style="flex:1;height:1px;background:var(--border-color);"></div>
                <span style="color:var(--text-muted);font-size:0.85rem;">or</span>
                <div style="flex:1;height:1px;background:var(--border-color);"></div>
              </div>
              <button class="btn btn-secondary" style="width:100%;justify-content:center;gap:0.5rem;font-weight:600;" onclick="handleGoogleLogin()">
                <svg width="18" height="18" viewBox="0 0 48 48" style="flex-shrink:0">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Continue with Google
              </button>
            </div>

            <div class="tab-content" data-tab-content="register">
              <div class="form-group"><label class="form-label">Full Name</label><input type="text" class="form-input" id="registerName" placeholder="Your full name"></div>
              <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" id="registerEmail" placeholder="your@email.com"></div>
              <div class="form-group"><label class="form-label">Phone</label><input type="tel" class="form-input" id="registerPhone" placeholder="+91 XXXXX XXXXX"></div>
              <div class="form-group"><label class="form-label">Password</label><input type="password" class="form-input" id="registerPassword" placeholder="Create a password"></div>
              <div class="form-group">
                <label class="form-label">I am a...</label>
                <select class="form-select" id="registerRole">
                  <option value="REPORTER">📱 Reporter</option>
                  <option value="NGO">🏢 NGO / Animal Welfare Org</option>
                  <option value="DONOR">💰 Donor</option>
                </select>
              </div>
              <button class="btn btn-primary" style="width:100%;justify-content:center;margin-bottom:1rem;" onclick="handleRegister()">Create Account</button>
              <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;">
                <div style="flex:1;height:1px;background:var(--border-color);"></div>
                <span style="color:var(--text-muted);font-size:0.85rem;">or</span>
                <div style="flex:1;height:1px;background:var(--border-color);"></div>
              </div>
              <button class="btn btn-secondary" style="width:100%;justify-content:center;gap:0.5rem;font-weight:600;" onclick="handleGoogleLogin()">
                <svg width="18" height="18" viewBox="0 0 48 48" style="flex-shrink:0">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div></section>`;
}

function initAuthPage() { }

// ─── Google OAuth ─────────────────────────────────────────────────────────────

/**
 * Redirect browser to the backend Google OAuth initiation endpoint.
 * The backend (Passport) will handle the redirect to Google's consent screen.
 */
function handleGoogleLogin() {
  // Google OAuth creds are placeholders on this machine — never hard-redirect
  // to Google, or users hit an "Access blocked — client was not found" page.
  showToast('Google login is not configured yet — use email/password for now', 'info');
}

/**
 * Called when Google redirects back to #/auth/callback.
 * Parses the JWT + user from the query string and stores them.
 */
function handleGoogleCallback() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const userStr = params.get('user');

  if (!token || !userStr) {
    showToast('Google login failed — missing data in callback');
    navigate('/login');
    return;
  }

  try {
    const user = JSON.parse(decodeURIComponent(userStr));
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    if (typeof updateNavbar === 'function') updateNavbar();
    showToast('✅ Signed in with Google!');

    const role = (user.role || 'REPORTER').toUpperCase();
    const dashMap = {
      REPORTER: '/dashboard/reporter',
      NGO: '/dashboard/ngo',
      DONOR: '/dashboard/donor',
      ADMIN: '/dashboard/reporter',
    };
    setTimeout(() => navigate(dashMap[role] || '/dashboard/reporter'), 800);
  } catch (e) {
    console.error('Google callback parse error:', e);
    showToast('Google login failed — please try again');
    navigate('/login');
  }
}

// ─── Email / Password Auth ────────────────────────────────────────────────────

async function handleLogin() {
  const email = document.getElementById('loginEmail')?.value;
  const password = document.getElementById('loginPassword')?.value;

  if (!email || !password) {
    showToast('Please enter both email and password');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      showToast('✅ Login successful!');
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (typeof updateNavbar === 'function') updateNavbar();

      const role = data.user.role.toUpperCase();
      const dashMap = { REPORTER: '/dashboard/reporter', NGO: '/dashboard/ngo', DONOR: '/dashboard/donor', ADMIN: '/dashboard/reporter' };
      setTimeout(() => navigate(dashMap[role] || '/dashboard/reporter'), 1000);
    } else {
      showToast(data.message || 'Login failed');
    }
  } catch (e) {
    console.error(e);
    showToast('Network error during login');
  }
}

async function handleRegister() {
  const name = document.getElementById('registerName')?.value;
  const email = document.getElementById('registerEmail')?.value;
  const password = document.getElementById('registerPassword')?.value;
  const roleValue = document.getElementById('registerRole')?.value;

  if (!email || !password || !name) {
    showToast('Please fill all required fields');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: roleValue })
    });

    const data = await res.json();

    if (res.ok) {
      showToast('✅ Account created. Please login!');
      switchTab('auth', 'login');
      if (document.getElementById('loginEmail')) document.getElementById('loginEmail').value = email;
    } else {
      showToast(data.message || 'Registration failed');
    }
  } catch (e) {
    console.error(e);
    showToast('Network error during registration');
  }
}
