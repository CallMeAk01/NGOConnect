// ============================================================
// NGO CONNECT — Central API vars + origin-aware fetch helper
// ============================================================
// Backend origin is derived from the page origin so the app works
// from localhost, 127.0.0.1, or a LAN IP (backend runs on :3000).
//
// MOCK COPY FIX (2026-08-15): if this copy is ever opened straight from
// disk (file://), there is no real backend and nothing works. Detect it
// and bounce the user to the live, polished copy served on :5500.

if (window.location && window.location.protocol === 'file:') {
  console.warn('[MOCK] This copy only works when served over http. Redirecting you to the live app at http://localhost:5500 ...');
  setTimeout(() => { window.location.href = 'http://localhost:5500/'; }, 1200);
}

const BACKEND_ORIGIN = `${window.location.protocol}//${window.location.hostname}:3000`;
const API_BASE = `${BACKEND_ORIGIN}/api`;
const _DB_PATCHED_FETCH = true; // marks this module loaded

// Bootstrap Gemini key into localStorage for photo verification
(function () {
  if (!localStorage.getItem('GEMINI_KEY')) {
    localStorage.setItem('GEMINI_KEY', 'AQ\u002EAb8RN6KMO-7HafokefGZUfIpwfBECQOul9PupU1kWmLMF9oOoQ');
  }
})();

// --- Redirect any hardcoded localhost:3000 fetch to the current origin ---
// Pages call fetch('http://localhost:3000/api/...'). That hardcoded host
// breaks when the app is opened from 127.0.0.1 or a LAN IP (wrong host/CORS).
// Patching fetch transparently rewrites those URLs to the right backend.
(function patchFetch() {
  const orig = window.fetch.bind(window);
  window.fetch = function (input, init) {
    if (typeof input === 'string') {
      input = input.replace(
        /^https?:\/\/localhost:3000\/api\//,
        `${API_BASE}/`
      );
    }
    return orig(input, init);
  };
})();

// --- Auth helpers (localStorage-backed) ---
function getToken() {
  return localStorage.getItem('token');
}
function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null');
  } catch (e) {
    return null;
  }
}
function setAuth(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}
function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}