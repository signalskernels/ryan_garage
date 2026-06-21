// Shared submit handler for every lead form on the site (contact, service
// request, hero estimate). Loaded once globally from the Base layout so any
// number of [data-lead-form] blocks on a page are wired without duplicate JS.
//
// Posts urlencoded to "/" — captured by Netlify Forms in production; a no-op
// (still shows success UX) on the static preview which has no form backend.
function wireLeadForms() {
  document.querySelectorAll<HTMLElement>('[data-lead-form]').forEach((wrap) => {
    if (wrap.dataset.wired) return;
    const form = wrap.querySelector<HTMLFormElement>('form');
    const success = wrap.querySelector<HTMLElement>('[data-lead-success]');
    if (!form) return;
    wrap.dataset.wired = '1';
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const body = new URLSearchParams();
      data.forEach((v, k) => body.append(k, String(v)));
      const btn = form.querySelector<HTMLButtonElement>('button[type=submit]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      try {
        await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
      } catch (_) { /* preview has no backend — still show success */ }
      form.hidden = true;
      if (success) { success.hidden = false; success.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    });
  });
}
wireLeadForms();
