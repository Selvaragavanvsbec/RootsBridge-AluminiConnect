/* ════════════════════════════════════════════════════════════
   RootsBridge – Shared UI Utilities
   ════════════════════════════════════════════════════════════ */

// ─── Toast Notifications ──────────────────────────────────
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.innerHTML = '<div class="toast-dot"></div><span id="toast-msg"></span>';
    document.body.appendChild(toast);
  }
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// ─── Modal Utilities ──────────────────────────────────────
function showModal(id) {
  document.getElementById(id)?.classList.add('show');
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('show');
}

// Close modals by clicking backdrop
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('show');
  }
});

// ─── Navigation Bar Generator ─────────────────────────────
function renderNav(activePage) {
  const user = getUser();
  const role = getUserRole();
  const initials = user ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : '?';

  const menuItems = [
    { href: 'dashboard.html', label: '📊 Dashboard', id: 'dashboard' },
    { href: 'alumni.html', label: '🎓 Alumni', id: 'alumni' },
    { href: 'jobs.html', label: '💼 Jobs', id: 'jobs' },
    { href: 'mentorship.html', label: '🤝 Mentorship', id: 'mentorship' },
    { href: 'events.html', label: '🗓️ Events', id: 'events' },
    { href: 'messages.html', label: '💬 Messages', id: 'messages' },
    { href: 'profile.html', label: '👤 Profile', id: 'profile' },
  ];

  if (role === 'admin') {
    menuItems.push({ href: 'admin.html', label: '⚙️ Admin', id: 'admin' });
  }

  const nav = document.getElementById('main-nav');
  if (!nav) return;

  nav.innerHTML = `
    <nav class="dash-nav">
      <div class="container dash-nav-inner">
        <a href="index.html" class="logo">
          <div class="logo-mark">
            <svg viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="5" r="3" fill="white"/>
              <circle cx="4" cy="15" r="2.5" fill="white" opacity=".7"/>
              <circle cx="16" cy="15" r="2.5" fill="white" opacity=".7"/>
              <line x1="10" y1="8" x2="4" y2="12.5" stroke="white" stroke-width="1.6"/>
              <line x1="10" y1="8" x2="16" y2="12.5" stroke="white" stroke-width="1.6"/>
            </svg>
          </div>
          Roots<em>Bridge</em>
        </a>
        <div class="dash-menu">
          ${menuItems.map(item => `
            <a href="${item.href}" class="${activePage === item.id ? 'active' : ''}">${item.label}</a>
          `).join('')}
        </div>
        <div class="dash-user">
          <div>
            <div class="dash-username">${user ? user.full_name : 'Guest'}</div>
            <div class="dash-role">${role || 'user'}</div>
          </div>
          <div class="dash-avatar" onclick="toggleUserMenu()">${initials}</div>
          <button class="dash-logout" onclick="logout()">Logout</button>
        </div>
      </div>
    </nav>
  `;
}

// ─── Date Formatting ──────────────────────────────────────
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatTime(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h);
  return `${hour > 12 ? hour - 12 : hour}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
}

function timeAgo(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = (now - d) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff/86400)}d ago`;
  return formatDate(dateStr);
}

// ─── Initials Avatar ──────────────────────────────────────
function getInitials(name) {
  return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
}

const avatarColors = [
  'linear-gradient(135deg,#059669,#10B981)',
  'linear-gradient(135deg,#D4A847,#A07820)',
  'linear-gradient(135deg,#3B82F6,#1D4ED8)',
  'linear-gradient(135deg,#EC4899,#BE185D)',
  'linear-gradient(135deg,#F97316,#C2410C)',
  'linear-gradient(135deg,#8B5CF6,#6D28D9)',
];

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
}
