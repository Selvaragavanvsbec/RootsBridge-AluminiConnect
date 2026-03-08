/* ============================================================
   modal.js — Modal / Auth dialog logic for AlumniConnect
   ============================================================ */

/**
 * Open the join/login modal overlay
 */
function openModal() {
  document.getElementById('modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Close the modal overlay
 */
function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Close modal when clicking the dark overlay (not the modal box itself)
 * @param {MouseEvent} event
 */
function closeModalOutside(event) {
  if (event.target.id === 'modal') {
    closeModal();
  }
}

/**
 * Switch between Sign Up and Log In tabs inside the modal
 * @param {HTMLElement} el       - The tab element that was clicked
 * @param {string}      formId   - ID of the form div to show ('signupForm' | 'loginForm')
 */
function switchTab(el, formId) {
  // Remove active from all tabs
  document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');

  // Show the selected form, hide the other
  document.getElementById('signupForm').style.display =
    formId === 'signupForm' ? 'block' : 'none';
  document.getElementById('loginForm').style.display  =
    formId === 'loginForm'  ? 'block' : 'none';
}

/**
 * Handle the Sign Up form submission
 * (In a real app, this would POST to an API endpoint)
 */
function register() {
  const name  = document.querySelector('#signupForm input[type="text"]').value.trim();
  const email = document.querySelector('#signupForm input[type="email"]').value.trim();
  const year  = document.querySelectorAll('#signupForm input[type="text"]')[1]?.value.trim();
  const pass  = document.querySelector('#signupForm input[type="password"]').value;

  // Basic validation
  if (!name || !email || !pass) {
    showToast('Please fill in all required fields.');
    return;
  }

  if (!email.includes('@')) {
    showToast('Please enter a valid email address.');
    return;
  }

  if (pass.length < 6) {
    showToast('Password must be at least 6 characters.');
    return;
  }

  closeModal();
  showToast(`Welcome, ${name}! Please verify your email to get started.`);
}

/**
 * Handle the Log In form submission
 * (In a real app, this would POST credentials to an API)
 */
function login() {
  const email = document.querySelector('#loginForm input[type="email"]').value.trim();
  const pass  = document.querySelector('#loginForm input[type="password"]').value;

  if (!email || !pass) {
    showToast('Please enter your email and password.');
    return;
  }

  closeModal();
  showToast('Welcome back! You are now logged in.');
}

/* ── KEYBOARD SHORTCUT: Escape closes modal ── */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});
