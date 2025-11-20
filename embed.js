
// embed.js - Dynamic Taxi Booking Form Loader for SarahZaaraz-ECOM/booking-form
(function() {
  'use strict';
  
  const config = window.TaxiFormConfig || {};
  const defaultConfig = {
    domain: "londontaxis247.co.uk",
    officeDetails: "LNT,Cheap Airport Transfers London,https://cheapairporttransferslondon.com/,02037405467",
    colorCode: "A64D79",
    title: "London Airport Minicab",
    brandColor: "#111d13"
  };
  
  const finalConfig = { ...defaultConfig, ...config };
  
  // Find or create container
  let container = document.getElementById('taxi-booking-form');
  if (!container) {
    container = document.createElement('div');
    container.id = 'taxi-booking-form';
    document.body.appendChild(container);
  }
  
  // Load the full form as a script (it will inject itself)
  const script = document.createElement('script');
  script.src = 'https://raw.githubusercontent.com/SarahZaaraz-ECOM/booking-form/main/form.js';
  script.setAttribute('data-config', btoa(JSON.stringify(finalConfig)));
  container.appendChild(script);
  
  console.log('Taxi Booking Widget loaded with config:', finalConfig);
})();
