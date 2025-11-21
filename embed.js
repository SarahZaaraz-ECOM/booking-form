// embed.js – Universal London Minicab Form Widget (2025 version)
(function () {
  const scriptTag = document.currentScript;
  const id = "london-minicab-widget-" + Date.now();
  const container = document.createElement("div");
  container.id = id;
  scriptTag.insertAdjacentElement("afterend", container);

  // === USER CAN CUSTOMIZE THESE ===
  const office_details = scriptTag.getAttribute("data-office") || "LNT,London Taxis Near Me, https://www.londontaxisnearme.com/, 02038131432";
  const color_code = scriptTag.getAttribute("data-color") || "ffc000";
  const destnationDomain = scriptTag.getAttribute("data-domain") || "booking.londontaxis247.co.uk";
  const baseUrl = scriptTag.getAttribute("data-base") || scriptTag.src.split("/embed.js")[0];
  // ===============================

  // Inject config globally (used by form.js)
  window.office_details = office_details;
  window.color_code = color_code;
  window.destnationDomain = destnationDomain;

  // Load the form
  fetch(`${baseUrl}/form.html`)
    .then(r => r.text())
    .then(html => {
      container.innerHTML = html;

      // Load CSS
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = `${baseUrl}/form.css?t=${Date.now()}`;
      document.head.appendChild(css);

      // Load JS + re-init everything
      const js = document.createElement("script");
      js.src = `${baseUrl}/form.js?t=${Date.now()}`;
      js.onload = () => {
        setupModal("airportListModal1", "pickup");
        setupModal("airportListModal2", "dropof");
        loadItems();
        setDefaultDateTime();
        setupAutocomplete("pickup", "pickup-suggestions");
        setupAutocomplete("dropof", "dropof-suggestions");
        const itemsInput = document.getElementById("items-input");
        if (itemsInput) itemsInput.addEventListener("click", toggleItemsSideMenu);
      };
      document.body.appendChild(js);
    })
    .catch(() => {
      container.innerHTML = `<p style="color:red; text-align:center; font-weight:bold;">Failed to load booking form</p>`;
    });
})();
