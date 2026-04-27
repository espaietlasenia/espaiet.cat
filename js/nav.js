document.addEventListener('DOMContentLoaded', function () {

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 920) {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = new FormData(form);
    status.textContent = "Enviant...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        window.location.href = "gracies.html";
      } else {
        status.textContent = "Hi ha hagut un problema en enviar el missatge. Torna-ho a provar.";
      }
    } catch (error) {
      status.textContent = "No s'ha pogut enviar el missatge. Torna-ho a provar més tard.";
    }
  });

  // ✅ GOOGLE ANALYTICS (amb cookies)
  function loadGoogleAnalytics() {
    if (window.gaLoaded) return;
    window.gaLoaded = true;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-M9WPRN668H";
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", "G-M9WPRN668H");
  }

  const consent = localStorage.getItem("cookie-consent");

  if (consent === "accepted") {
    loadGoogleAnalytics();
  }
  
	const banner = document.getElementById("cookie-banner");
	const acceptBtn = document.getElementById("accept-cookies");
	const rejectBtn = document.getElementById("reject-cookies");

	// Mostrar només si no hi ha decisió
	if (!localStorage.getItem("cookie-consent")) {
	  banner.style.display = "flex";
	} else {
	  banner.style.display = "none";
	}

	// Acceptar
	acceptBtn?.addEventListener("click", function () {
	  localStorage.setItem("cookie-consent", "accepted");
	  banner.style.display = "none";
	  loadGoogleAnalytics(); // 👈 activa analytics
	});

	// Rebutjar
	rejectBtn?.addEventListener("click", function () {
	  localStorage.setItem("cookie-consent", "rejected");
	  banner.style.display = "none";
	});  

});