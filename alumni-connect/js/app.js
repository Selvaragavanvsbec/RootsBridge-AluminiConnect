/* ============================================================
   app.js — Entry point. Initialises AlumniConnect on DOM ready.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* 1. Render all dynamic sections from data */
  renderAlumni(alumniData);
  renderEvents();
  renderStories();
  renderJobs();

  /* 2. Kick off UI behaviours */
  initNavbarScroll();
  initNavLinkClose();
  initActiveNavHighlight();

  /* 3. Start scroll-reveal observer (slight delay so DOM has settled) */
  setTimeout(observeReveal, 150);

  /* 4. Log version info to console */
  console.log('%cAlumniConnect v1.0', 'color:#c9a84c; font-size:1.2rem; font-weight:bold;');
  console.log('%cBuilt with HTML · CSS · Vanilla JS', 'color:#7a7265;');
});
