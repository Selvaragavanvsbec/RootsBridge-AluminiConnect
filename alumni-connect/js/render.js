/* ============================================================
   render.js — DOM rendering functions for AlumniConnect
   ============================================================ */

/**
 * Render alumni cards into #alumniGrid
 * @param {Array} data - Array of alumni objects from data.js
 */
function renderAlumni(data) {
  const grid = document.getElementById('alumniGrid');

  if (data.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--muted);">
        <i class="fas fa-search" style="font-size:2rem; margin-bottom:1rem; display:block; opacity:0.3;"></i>
        No alumni found matching your search.
      </div>`;
    return;
  }

  grid.innerHTML = data.map(a => `
    <div class="alumni-card">
      <span class="alumni-batch">${a.batch}</span>
      <div class="alumni-card-top">
        <div class="alumni-avatar">${a.initials}</div>
        <div>
          <div class="alumni-name">${a.name}</div>
          <div class="alumni-role">${a.role}</div>
        </div>
      </div>
      <div class="alumni-company">
        <i class="fas fa-building"></i>
        ${a.company} &nbsp;·&nbsp; ${a.industry}
      </div>
      <div class="alumni-tags">
        ${a.tags.map(t => `<span class="alumni-tag">${t}</span>`).join('')}
      </div>
      <div class="alumni-actions">
        <button class="alumni-btn connect"
          onclick="showToast('Connection request sent to ${a.name}!')">
          Connect
        </button>
        <button class="alumni-btn"
          onclick="showToast('Message feature coming soon!')">
          <i class="fas fa-comment"></i> Message
        </button>
      </div>
    </div>
  `).join('');
}

/**
 * Render event cards into #eventsList
 */
function renderEvents() {
  const list = document.getElementById('eventsList');

  list.innerHTML = eventsData.map(e => `
    <div class="event-card reveal">
      <div class="event-date-block">
        <div class="event-month">${e.month}</div>
        <div class="event-day">${e.day}</div>
      </div>
      <div>
        <div class="event-title">${e.title}</div>
        <div class="event-meta">
          <i class="fas fa-map-marker-alt"></i> ${e.location}
        </div>
        <span class="event-badge ${e.badge}">${e.type}</span>
      </div>
    </div>
  `).join('');
}

/**
 * Render testimonial/story cards into #storiesGrid
 */
function renderStories() {
  const grid = document.getElementById('storiesGrid');

  grid.innerHTML = storiesData.map(s => `
    <div class="story-card reveal">
      <p class="story-text">${s.text}</p>
      <div class="story-author">
        <div class="story-avatar">${s.initials}</div>
        <div>
          <div class="story-author-name">${s.name}</div>
          <div class="story-author-info">${s.info}</div>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Render job listing cards into #jobsGrid
 */
function renderJobs() {
  const grid = document.getElementById('jobsGrid');

  grid.innerHTML = jobsData.map(j => `
    <div class="job-card reveal"
      onclick="showToast('Opening job: ${j.title}')">
      <div class="job-company-logo">${j.logo}</div>
      <div class="job-title">${j.title}</div>
      <div class="job-company">${j.company}</div>
      <div class="job-details">
        <span class="job-detail">
          <i class="fas fa-map-marker-alt"></i> ${j.location}
        </span>
        <span class="job-detail">
          <i class="fas fa-clock"></i> ${j.type}
        </span>
        <span class="job-detail">
          <i class="fas fa-coins"></i> ${j.salary}
        </span>
      </div>
      <div class="job-referral">
        <i class="fas fa-user-check"></i>
        Referral by ${j.referral}
      </div>
    </div>
  `).join('');
}

/**
 * Filter alumni cards based on search input and dropdowns
 * Called by oninput / onchange on the filter controls in index.html
 */
function filterAlumni() {
  const query    = document.getElementById('alumniSearch').value.toLowerCase().trim();
  const batch    = document.getElementById('batchFilter').value;
  const industry = document.getElementById('industryFilter').value;

  const filtered = alumniData.filter(a => {
    const matchesQuery =
      !query ||
      a.name.toLowerCase().includes(query)    ||
      a.company.toLowerCase().includes(query) ||
      a.tags.some(t => t.toLowerCase().includes(query));

    const matchesBatch    = !batch    || a.batch    === batch;
    const matchesIndustry = !industry || a.industry === industry;

    return matchesQuery && matchesBatch && matchesIndustry;
  });

  renderAlumni(filtered);
  // Re-observe newly created reveal elements
  observeReveal();
}
