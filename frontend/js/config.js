/* ════════════════════════════════════════════════════════════
   RootsBridge – Configuration
   ════════════════════════════════════════════════════════════ */

const CONFIG = {
  // Backend API base URL
  API_URL: 'https://roots-bridge-alumni-connect.vercel.app/api',

  // Supabase configuration (for client-side auth)
  SUPABASE_URL: 'https://mbbmdsgzovcwvkzrxfkr.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_DKSCuFyMvMKYWZbEnDqX2Q_2uglI4ez',
};

// ─── Utility: Get stored session ──────────────────────────
function getSession() {
  const session = localStorage.getItem('rb_session');
  return session ? JSON.parse(session) : null;
}

function setSession(session) {
  localStorage.setItem('rb_session', JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem('rb_session');
  localStorage.removeItem('rb_user');
}

function getUser() {
  const user = localStorage.getItem('rb_user');
  return user ? JSON.parse(user) : null;
}

function setUser(user) {
  localStorage.setItem('rb_user', JSON.stringify(user));
}

function isLoggedIn() {
  return !!getSession();
}

function getUserRole() {
  const user = getUser();
  return user ? user.role : null;
}

function getAuthHeaders() {
  const session = getSession();
  return {
    'Content-Type': 'application/json',
    'Authorization': session ? `Bearer ${session.access_token}` : ''
  };
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function logout() {
  clearSession();
  window.location.href = 'login.html';
}
