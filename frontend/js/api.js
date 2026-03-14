/* ════════════════════════════════════════════════════════════
   RootsBridge – API Client
   ════════════════════════════════════════════════════════════ */

const API = {
  // ─── Auth ──────────────────────────────────────────────────
  async register(data) {
    const res = await fetch(`${CONFIG.API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async login(email, password) {
    const res = await fetch(`${CONFIG.API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  // ─── Profile ───────────────────────────────────────────────
  async getProfile() {
    const res = await fetch(`${CONFIG.API_URL}/users/profile`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async updateProfile(data) {
    const res = await fetch(`${CONFIG.API_URL}/users/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // ─── Alumni ────────────────────────────────────────────────
  async searchAlumni(params = {}) {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${CONFIG.API_URL}/alumni/search?${qs}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // ─── Jobs ──────────────────────────────────────────────────
  async createJob(data) {
    const res = await fetch(`${CONFIG.API_URL}/jobs/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async listJobs(params = {}) {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${CONFIG.API_URL}/jobs/list?${qs}`);
    return res.json();
  },

  async applyJob(data) {
    const res = await fetch(`${CONFIG.API_URL}/jobs/apply`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // ─── Mentorship ────────────────────────────────────────────
  async requestMentorship(data) {
    const res = await fetch(`${CONFIG.API_URL}/mentorship/request`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async acceptMentorship(data) {
    const res = await fetch(`${CONFIG.API_URL}/mentorship/accept`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async listMentorships(params = {}) {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${CONFIG.API_URL}/mentorship/list?${qs}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // ─── Events ────────────────────────────────────────────────
  async createEvent(data) {
    const res = await fetch(`${CONFIG.API_URL}/events/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async listEvents(params = {}) {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${CONFIG.API_URL}/events/list?${qs}`);
    return res.json();
  },

  async rsvpEvent(data) {
    const res = await fetch(`${CONFIG.API_URL}/events/rsvp`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // ─── Messages ──────────────────────────────────────────────
  async sendMessage(data) {
    const res = await fetch(`${CONFIG.API_URL}/messages/send`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async getConversation(userId) {
    const res = await fetch(`${CONFIG.API_URL}/messages/conversation/${userId}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async getInbox() {
    const res = await fetch(`${CONFIG.API_URL}/messages/inbox`, {
      headers: getAuthHeaders()
    });
    return res.json();
  }
};
