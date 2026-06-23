/* ===========================================================
   PandaDash AAC — forms.js
   Handles AJAX submission for the tester sign-up and feedback
   forms via Formspree.

   Both testers/index.html and testers/feedback.html post to
   https://formspree.io/f/mwvdkgyn — change the action attribute
   on either form if you ever need to point it elsewhere.
   =========================================================== */

(function () {
  const forms = document.querySelectorAll("[data-ajax-form]");
  if (!forms.length) return;

  forms.forEach((form) => {
    const statusEl = form.querySelector("[data-form-status]");
    const successTarget = form.getAttribute("data-success-target");
    const successEl = successTarget ? document.querySelector(successTarget) : null;
    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Simple honeypot spam check — real users never fill this in.
      const honeypot = form.querySelector("input[name='_gotcha']");
      if (honeypot && honeypot.value) return;

      const endpoint = form.getAttribute("action") || "";

      if (!endpoint || endpoint.includes("YOUR_FORM_ID")) {
        if (statusEl) {
          statusEl.textContent =
            "This form isn't connected yet — add a Formspree form ID in js/forms.js / the form's action attribute.";
          statusEl.classList.add("is-error");
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }
      if (statusEl) {
        statusEl.textContent = "";
        statusEl.classList.remove("is-error");
      }

      try {
        const data = new FormData(form);
        const res = await fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          form.hidden = true;
          if (successEl) successEl.hidden = false;
        } else {
          throw new Error("Submission failed");
        }
      } catch (err) {
        if (statusEl) {
          statusEl.textContent =
            "Something went wrong sending that — mind trying again, or reaching us on Discord instead?";
          statusEl.classList.add("is-error");
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.getAttribute("data-label") || "Submit";
        }
      }
    });
  });
})();
