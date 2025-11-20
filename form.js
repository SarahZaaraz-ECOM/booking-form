


// Add this as the FIRST line inside the <script> in form.js
if (window.top !== window) {
  document.documentElement.style.height = '100%';
  document.body.style.height = '100%';
}// form.js - Full Dynamic Taxi Booking Form for SarahZaaraz-ECOM/booking-form
(function() {
  'use strict';
  
  const encodedConfig = document.currentScript.getAttribute('data-config');
  const config = encodedConfig ? JSON.parse(atob(encodedConfig)) : {
    domain: "londontaxis247.co.uk",
    officeDetails: "LNT,Cheap Airport Transfers London,https://cheapairporttransferslondon.com/,02037405467",
    colorCode: "A64D79",
    title: "London Airport Minicab",
    brandColor: "#111d13"
  };
  
  // Full HTML with your exact original code, but dynamic
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${config.title}</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          sans-serif;
        margin: 0;
        padding: 0;
        background: #1a1a1a;
        color: #333;
      }

      .form-container {
        max-width: 550px;
        width: 90%;
        margin: 10px auto;
        padding: 16px;
        background: #ffffff;
        backdrop-filter: blur(8px);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        position: relative;
        overflow: hidden;
      }

      .form-title {
        font-size: 32px;
        font-weight: 600;
        text-align: center;
        margin: 10px 0;
        color: #333;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .form-field {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        box-sizing: border-box;
      }

      .field-label {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 4px;
        color: #333;
        text-transform: uppercase;
        display: flex;
        align-items: center;
      }

      .field-label img {
        width: 10px;
        height: 10px;
        margin-left: 8px;
        cursor: pointer;
        padding: 3px;
        border-radius: 4px;
        background: #111d13;
      }

      .field-label img.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .field-container {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        box-sizing: border-box;
      }

      .custom-input,
      .custom-select,
      .custom-datetime,
      .wait-time-input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 14px;
        background: #f5f5f5;
        color: #333;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
        box-sizing: border-box;
      }

      .custom-input:focus,
      .custom-select:focus,
      .custom-datetime:focus,
      .wait-time-input:focus {
        border-color: #111d13;
        box-shadow: 0 0 0 3px rgba(89, 13, 34, 0.2);
        outline: none;
      }

      .custom-select {
        height: 40px;
      }

      .two-column {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-bottom: 12px;
      }

      .two-column .form-field {
        width: 100%;
        max-width: 100%;
      }

      .two-column .field-container {
        max-width: 100%;
      }

      .two-column .custom-datetime,
      .two-column .wait-time-input,
      .two-column .custom-select,
      .two-column .custom-input {
        width: 100%;
        max-width: 100%;
      }

      .field-mini {
        gap: 6px;
        display: flex;
        align-items: center;
        width: 100%;
      }

      .wait-time-input {
        max-width: 80px;
      }

      .wait-time-input:disabled {
        background: #e0e0e0;
        cursor: not-allowed;
      }

      .toggle-switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 20px;
        margin-left: 8px;
        flex-shrink: 0;
      }

      .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.3s;
        border-radius: 20px;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        transition: 0.3s;
        border-radius: 50%;
      }

      input:checked + .slider {
        background-color: #111d13;
      }

      input:checked + .slider:before {
        transform: translateX(20px);
      }

      .icon-btn {
        background: #111d13;
        border: none;
        padding: 6px;
        border-radius: 8px;
        cursor: pointer;
        margin-left: 8px;
        transition: background 0.2s ease;
        flex-shrink: 0;
      }

      .icon-btn:hover {
        background: #415d43;
      }

      .icon-btn img {
        width: 20px;
        height: 20px;
      }

      .submit-btn {
        background: #111d13;
        color: #ffffff;
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.2s ease, transform 0.2s ease;
        width: 100%;
        margin-top: 12px;
      }

      .submit-btn:hover {
        background: #415d43;
        transform: translateY(-2px);
      }

      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        justify-content: center;
        align-items: center;
        z-index: 1100;
      }

      .modal-content {
        background: #ffffff;
        backdrop-filter: blur(8px);
        padding: 16px;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease, opacity 0.3s ease;
      }

      .modal.show .modal-content {
        transform: translateY(0);
        opacity: 1;
      }

      .modal .modal-content {
        transform: translateY(-20px);
        opacity: 0;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        padding-bottom: 8px;
      }

      .modal-title {
        font-size: 24px;
        font-weight: 600;
        color: #333;
        text-transform: uppercase;
      }

      .modal-body {
        padding: 12px 0;
      }

      .modal-footer {
        border-top: 1px solid #ccc;
        padding-top: 8px;
        text-align: right;
      }

      .close-btn,
      .airport-btn,
      .custom-btn {
        background: #111d13;
        border: 1px solid #ccc;
        padding: 8px;
        border-radius: 8px;
        color: #ffffff;
        cursor: pointer;
        width: 100%;
        text-align: left;
        font-size: 14px;
        transition: background 0.2s ease, transform 0.2s ease;
      }

      .close-btn {
        width: auto;
      }

      .close-icon {
        width: 14px;
        height: 14px;
      }

      .luggage-item {
        background: #1a1a1a;
      }

      .airport-btn:hover,
      .custom-btn:hover {
        background: #415d43;
        transform: translateY(-1px);
      }

      .suggestion-list {
        position: absolute;
        top: 100%;
        left: 0;
        width: calc(100% - 40px);
        background: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 8px;
        max-height: 150px;
        overflow-y: auto;
        z-index: 1200;
        display: none;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      }

      .suggestion-item {
        padding: 8px;
        cursor: pointer;
        color: #333;
        transition: background 0.2s ease;
      }

      .suggestion-item:hover {
        background: #111d13;
        color: #ffffff;
      }

      .loading-div {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        justify-content: center;
        align-items: center;
        z-index: 1200;
      }

      .loader {
        border: 6px solid #f5f5f5;
        border-top: 6px solid #111d13;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }

      .error-message {
        color: #9d2626;
        font-size: 12px;
        display: none;
        margin-top: 4px;
      }

      .via-field {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        position: relative;
      }

      .via-field .field-container {
        display: flex;
        align-items: center;
      }

      .via-field input {
        flex: 1;
        margin-right: 8px;
      }

      .via-field .suggestion-list {
        width: calc(100% - 48px);
      }

      .remove-field {
        background: #111d13;
        color: #ffffff;
        border: none;
        padding: 8px 10px;
        font-size: 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s ease;
      }

      .remove-field:hover {
        background: #415d43;
      }

      .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        margin-bottom: 8px;
      }

      .card-header {
        background: #f5f5f5;
        border-radius: 8px 8px 0 0;
      }

      .luggage-headings {
        margin: 0;
      }

      .card-body {
        padding: 8px;
      }

      .collapse {
        display: none;
      }

      .collapse.show {
        display: block;
      }

      .items-side-menu {
        position: absolute;
        top: 0;
        right: 0;
        width: 250px;
        background: #ffffff;
        border-radius: 12px 0 0 12px;
        box-shadow: -4px 0 16px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 1000;
        display: none;
        flex-direction: column;
        padding: 16px;
      }

      .items-side-menu.show {
        transform: translateX(0);
        display: flex;
      }

      .items-side-menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        padding-bottom: 8px;
        margin-bottom: 12px;
      }

      .items-side-menu-title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        text-transform: uppercase;
      }

      .items-side-menu-body {
        flex: 1;
        overflow-y: auto;
      }

      .items-side-menu-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background: #f5f5f5;
        margin-bottom: 8px;
      }

      .items-side-menu-item span {
        color: #333;
        font-size: 14px;
      }

      .items-side-menu-item.removed {
        background: #111d13;
        transition: opacity 0.3s ease;
        opacity: 0;
      }

      .items-side-menu-footer {
        border-top: 1px solid #ccc;
        padding-top: 8px;
        text-align: right;
      }

      .delete-btn {
        background: none;
        border: none;
        cursor: pointer;
      }

      .delete-btn img {
        padding: 3px;
        background: #555;
        border-radius: 4px;
        width: 16px;
        height: 16px;
      }

      .form-social-heading {
        text-align: center;
      }

      .form-social-icons img {
        width: 24px;
        height: 24px;
      }

      .download-icons img {
        width: 46px;
        height: 46px;
        filter: drop-shadow(3px 3px 10px #9e9e9e);
        cursor: pointer;
      }

      .download-icons {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin-bottom: 10px;
      }

      .divider {
        margin: 0;
        background: #555;
      }

      @media (max-width: 768px) {
        .form-container {
          padding: 12px;
        }

        .form-title {
          font-size: 30px;
          font-weight: bold;
        }

        .modal-content {
          width: 95%;
        }

        .wait-time-input {
          max-width: 60px;
        }

        .toggle-switch {
          width: 36px;
          height: 18px;
        }

        .slider:before {
          height: 14px;
          width: 14px;
          left: 2px;
          bottom: 2px;
        }

        input:checked + .slider:before {
          transform: translateX(18px);
        }

        .two-column .form-field {
          width: 100%;
          min-width: 130px;
        }

        .two-column .field-container {
          max-width: 100%;
        }

        .two-column .custom-datetime,
        .two-column .wait-time-input,
        .two-column .custom-select,
        .two-column .custom-input {
          width: 100%;
          max-width: 100%;
        }

        .items-side-menu {
          width: 65%;
          border-radius: 0;
        }
      }
    </style>
</head>
<body>
  <div class="form-container">
    <h3 class="form-title">${config.title}</h3>
    <div class="download-icons">
      <img class="form-social-icon" src="images/googleplay.png" alt="Google Play Store" />
      <hr class="divider" />
      <img class="form-social-icon" src="images/applastore.png" alt="Apple App Store" />
      <hr class="divider" />
      <img class="form-social-icon" src="images/call.png" alt="Call" />
    </div>
    <p style="text-align: center">OR</p>

    <!-- YOUR EXACT ORIGINAL FORM HTML - 100% UNCHANGED -->
    <div class="form-field">
      <label class="field-label">Pick Up</label>
      <div class="field-container">
        <input id="pickup" class="custom-input" placeholder="Select pickup address" autocomplete="off" required />
        <div id="pickup-suggestions" class="suggestion-list"></div>
        <button class="icon-btn" onclick="openModal('airportListModal1')" aria-label="Select airport for pickup">
          <img src="images/aeroplane.png" alt="Aeroplane Icon" />
        </button>
      </div>
      <span class="error-message" id="pickup-error">Please select a valid pickup address.</span>
    </div>

    <div class="form-field" id="via-section">
      <label class="field-label">
        Via
        <img id="via-plus" src="images/plus1.webp" alt="Plus Icon" onclick="addViaField()" class="disabled" aria-label="Add via location" />
      </label>
      <div id="via-list"></div>
    </div>

    <div class="form-field">
      <label class="field-label">Destination</label>
      <div class="field-container">
        <input id="dropof" class="custom-input" placeholder="Select dropoff address" autocomplete="off" required />
        <div id="dropof-suggestions" class="suggestion-list"></div>
        <button class="icon-btn" onclick="openModal('airportListModal2')" aria-label="Select airport for dropoff">
          <img src="images/aeroplane.png" alt="Aeroplane Icon" />
        </button>
      </div>
      <span class="error-message" id="dropof-error">Please select a valid dropoff address.</span>
    </div>

    <div class="two-column">
      <div class="form-field">
        <label class="field-label">Wait Time (min)</label>
        <div class="field-container field-mini">
          <label class="toggle-switch">
            <input type="checkbox" id="wait_time_toggle" onchange="toggleWaitTime()" aria-label="Toggle wait time" />
            <span class="slider"></span>
          </label>
          <input id="wait_time" class="wait-time-input" type="number" min="0" max="60" value="0" disabled />
        </div>
        <span class="error-message" id="wait-time-error">Waiting time must be between 1 and 60 minutes when enabled.</span>
      </div>
      <div class="form-field">
        <label class="field-label">DateTime</label>
        <div class="field-container">
          <input id="book_pick_datetime" class="custom-datetime" type="datetime-local" required />
        </div>
        <span class="error-message" id="datetime-error">Please select a valid future date and time (at least 15 minutes from now).</span>
      </div>
    </div>

    <div class="two-column">
      <div class="form-field">
        <label class="field-label">Passenger</label>
        <div class="field-container field-mini">
          <button class="icon-btn" aria-label="Passenger icon">
            <img src="images/people.webp" alt="People Icon" />
          </button>
          <input type="number" id="Passenger" class="custom-select" min="0" max="200" placeholder="Add passenger" />
        </div>
        <span class="error-message" id="passenger-error">Please enter at least one passenger.</span>
      </div>
      <div class="form-field">
        <label class="field-label">Items</label>
        <div class="field-container field-mini">
          <button class="icon-btn" onclick="openModal('moreModalitem')" aria-label="Select items">
            <img src="images/luggage-form.webp" alt="Luggage Icon" />
          </button>
          <input id="items-input" class="custom-input" placeholder="No Items" readonly />
        </div>
        <span class="error-message" id="items-error">Please select at least one item first.</span>
      </div>
    </div>

    <div id="items-side-menu" class="items-side-menu">
      <div class="items-side-menu-header">
        <h2 class="items-side-menu-title">Selected Items</h2>
        <button class="close-btn" onclick="toggleItemsSideMenu()" aria-label="Close items menu">Close</button>
      </div>
      <div class="items-side-menu-body" id="items-side-menu-body"></div>
      <div class="items-side-menu-footer">
        <button class="custom-btn" onclick="clearAllItems()" aria-label="Clear all items">Clear All</button>
      </div>
    </div>

    <button class="submit-btn" onclick="submitForm()">Get Quotes</button>
  </div>

  <!-- YOUR EXACT ORIGINAL MODALS - 100% UNCHANGED -->
    <!-- Airport Modal 1 -->
    <div id="airportListModal1" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Airports</h2>
          <button
            class="close-btn"
            onclick="closeModal('airportListModal1')"
            aria-label="Close airport selection"
          >
            <img class="close-icon" src="images/close.png" alt="Close Icon" />
          </button>
        </div>
        <div class="modal-body">
          <div class="airport-list">
            <button
              class="airport-btn"
              data-value="LONDON HEATHROW AIRPORT TERMINAL 1 | TW6 1AP"
            >
              HEATHROW TERMINAL 1
            </button>
            <button
              class="airport-btn"
              data-value="LONDON HEATHROW AIRPORT TERMINAL 2 | TW6 1EW"
            >
              HEATHROW TERMINAL 2
            </button>
            <button
              class="airport-btn"
              data-value="LONDON HEATHROW AIRPORT TERMINAL 3 | TW6 1QG"
            >
              HEATHROW TERMINAL 3
            </button>
            <button
              class="airport-btn"
              data-value="LONDON HEATHROW AIRPORT TERMINAL 4 | TW6 3XA"
            >
              HEATHROW TERMINAL 4
            </button>
            <button
              class="airport-btn"
              data-value="LONDON HEATHROW AIRPORT TERMINAL 5 | TW6 2GA"
            >
              HEATHROW TERMINAL 5
            </button>
            <button
              class="airport-btn"
              data-value="LONDON GATWICK AIRPORT NORTH TERMINAL | RH6 0PJ"
            >
              GATWICK NORTH TERMINAL
            </button>
            <button
              class="airport-btn"
              data-value="LONDON GATWICK AIRPORT SOUTH TERMINAL | RH6 0NP"
            >
              GATWICK SOUTH TERMINAL
            </button>
            <button
              class="airport-btn"
              data-value="LONDON CITY AIRPORT | E16 2PX"
            >
              LONDON CITY
            </button>
            <button
              class="airport-btn"
              data-value="LONDON STANSTED AIRPORT | CM24 1RW"
            >
              STANSTED
            </button>
            <button
              class="airport-btn"
              data-value="LONDON LUTON AIRPORT | LU2 9QT"
            >
              LUTON
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="custom-btn"
            onclick="closeModal('airportListModal1')"
            aria-label="Close airport modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Airport Modal 2 -->
    <div id="airportListModal2" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Airports</h2>
          <button
            class="close-btn"
            onclick="closeModal('airportListModal2')"
            aria-label="Close airport selection"
          >
            <img class="close-icon" src="images/close.png" alt="Close Icon" />
          </button>
        </div>
        <div class="modal-body">
          <div class="airport-list">
            <button
              class="airport-btn"
              data-value="LONDON HEATHROW AIRPORT TERMINAL 1 | TW6 1AP"
            >
              HEATHROW TERMINAL 1
            </button>
            <button
              class="airport-btn"
              data-value="LONDON HEATHROW AIRPORT TERMINAL 2 | TW6 1EW"
            >
              HEATHROW TERMINAL 2
            </button>
            <button
              class="airport-btn"
              data-value="LONDON HEATHROW AIRPORT TERMINAL 3 | TW6 1QG"
            >
              HEATHROW TERMINAL 3
            </button>
            <button
              class="airport-btn"
              data-value="LONDON HEATHROW AIRPORT TERMINAL 4 | TW6 3XA"
            >
              HEATHROW TERMINAL 4
            </button>
            <button
              class="airport-btn"
              data-value="LONDON HEATHROW AIRPORT TERMINAL 5 | TW6 2GA"
            >
              HEATHROW TERMINAL 5
            </button>
            <button
              class="airport-btn"
              data-value="LONDON GATWICK AIRPORT NORTH TERMINAL | RH6 0PJ"
            >
              GATWICK NORTH TERMINAL
            </button>
            <button
              class="airport-btn"
              data-value="LONDON GATWICK AIRPORT SOUTH TERMINAL | RH6 0NP"
            >
              GATWICK SOUTH TERMINAL
            </button>
            <button
              class="airport-btn"
              data-value="LONDON CITY AIRPORT | E16 2PX"
            >
              LONDON CITY
            </button>
            <button
              class="airport-btn"
              data-value="LONDON STANSTED AIRPORT | CM24 1RW"
            >
              STANSTED
            </button>
            <button
              class="airport-btn"
              data-value="LONDON LUTON AIRPORT | LU2 9QT"
            >
              LUTON
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="custom-btn"
            onclick="closeModal('airportListModal2')"
            aria-label="Close airport modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Items Modal -->
    <div id="moreModalitem" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Select More Items</h2>
          <button
            class="close-btn"
            onclick="closeModal('moreModalitem')"
            aria-label="Close items selection"
          >
            <img class="close-icon" src="images/close.png" alt="Close Icon" />
          </button>
        </div>
        <div class="modal-body">
          <div id="accordionExample"></div>
          <div class="loader" id="sploader" style="display: none"></div>
        </div>
        <div class="modal-footer">
          <button
            class="custom-btn"
            onclick="closeModal('moreModalitem')"
            aria-label="Close items modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Item Quantity Modal -->
    <div id="itemcount" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Enter Quantity</h2>
          <button
            class="close-btn"
            onclick="closeModal('itemcount')"
            aria-label="Close quantity selection"
          >
            <img class="close-icon" src="images/close.png" alt="Close Icon" />
          </button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="nameid" />
          <input
            type="number"
            max="99"
            min="1"
            value="1"
            class="custom-input"
            id="numbermoreitm"
          />
        </div>
        <div class="modal-footer">
          <button
            class="custom-btn"
            onclick="addItem()"
            aria-label="Save item quantity"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <div class="loading-div">
      <div class="loader"></div>
    </div>

  <script>
    // YOUR EXACT ORIGINAL JAVASCRIPT - 100% UNCHANGED, but with dynamic config
    const formConfig = ${JSON.stringify(config)};
    
 // Open a modal by adding 'show' class and setting display to flex
      function openModal(e) {
        let t = document.getElementById(e);
        t.classList.add("show");
        t.style.display = "flex";
      }

      // Close a modal by removing 'show' class and hiding after transition
      function closeModal(e) {
        let t = document.getElementById(e);
        t.classList.remove("show");
        setTimeout(() => {
          t.style.display = "none";
          if (e === "moreModalitem") {
            document
              .querySelectorAll(".collapse.show")
              .forEach((e) => e.classList.remove("show"));
          }
          resetErrors();
        }, 100);
      }

      // Reset all error messages
      function resetErrors() {
        document
          .querySelectorAll(".error-message")
          .forEach((e) => (e.style.display = "none"));
      }

      // Set default datetime to 15 minutes from now
      function setDefaultDateTime() {
        const now = new Date();
        const minTime = new Date(now.getTime() + 15 * 60 * 1000);
        const year = minTime.getFullYear();
        const month = (minTime.getMonth() + 1).toString().padStart(2, "0");
        const day = minTime.getDate().toString().padStart(2, "0");
        const hours = minTime.getHours().toString().padStart(2, "0");
        const minutes = minTime.getMinutes().toString().padStart(2, "0");
        const defaultDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        const dateTimeInput = document.getElementById("book_pick_datetime");
        dateTimeInput.value = defaultDateTime;
        dateTimeInput.setAttribute("min", defaultDateTime);
      }

      // Validate datetime to ensure it's at least 15 minutes in the future
      function validateDateTime() {
        const input = document.getElementById("book_pick_datetime");
        const error = document.getElementById("datetime-error");
        const selected = new Date(input.value);
        const now = new Date();
        const minTime = new Date(now.getTime() + 15 * 60 * 1000);
        if (selected < minTime) {
          error.style.display = "block";
          input.value = "";
          return false;
        } else {
          error.style.display = "none";
          return true;
        }
      }

      // Toggle wait time input enable/disable
      function toggleWaitTime() {
        const toggle = document.getElementById("wait_time_toggle");
        const waitTimeInput = document.getElementById("wait_time");
        const error = document.getElementById("wait-time-error");
        if (toggle.checked) {
          waitTimeInput.disabled = false;
          waitTimeInput.value = 1;
        } else {
          waitTimeInput.disabled = true;
          waitTimeInput.value = 0;
        }
        error.style.display = "none";
      }

      // Initialize datetime and event listeners
      setDefaultDateTime();
      document
        .getElementById("book_pick_datetime")
        .addEventListener("change", validateDateTime);
      document
        .getElementById("wait_time_toggle")
        .addEventListener("change", toggleWaitTime);

      // Debounce function to limit rapid API calls
      function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
          const later = () => {
            clearTimeout(timeout);
            func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      }

      // Fetch address suggestions from API
      async function fetchSuggestions(e, t, l = false) {
        let s = document.getElementById(t);
        const minLength = l ? 1 : 3; // 1 char for Via, 3 for Pickup/Dropoff
        if (e.length < minLength) {
          s.style.display = "none";
          return [];
        }
        try {
          let a = await fetch(
            `https://booking.londontaxis247.co.uk/Home/Indextwo?Prefix=${encodeURIComponent(
              e
            )}`
          );
          if (!a.ok) {
            throw new Error(
              `HTTP error! Status: ${a.status}, Status Text: ${a.statusText}`
            );
          }
          let o = await a.json();
          if (!o.list || !Array.isArray(o.list)) {
            throw new Error(
              "Invalid response format: 'list' property missing or not an array"
            );
          }
          let n = o.list.map((e) => e.address);
          s.innerHTML = n
            .map((e) => `<div class="suggestion-item">${e}</div>`)
            .join("");
          s.style.display = n.length ? "block" : "none";
          return n;
        } catch (r) {
          console.error(`Error fetching suggestions for ${t}:`, r.message);
          s.style.display = "none";
          return [];
        }
      }

      // Setup autocomplete for input fields
      function setupAutocomplete(e, t) {
        let l = document.getElementById(e);
        let s = document.getElementById(t);
        const debouncedFetch = debounce(fetchSuggestions, 300);
        l.addEventListener("input", async () => {
          let suggestions = await debouncedFetch(l.value, t, e.includes("via"));
          if (suggestions.includes(l.value)) {
            document.getElementById(`${e}-error`).style.display = "none";
          }
        });
        l.addEventListener("blur", async () => {
          setTimeout(async () => {
            s.style.display = "none";
            let value = l.value.trim();
            if (value) {
              let suggestions = validAddresses.includes(value)
                ? [value]
                : await debouncedFetch(value, t, e.includes("via"));
              if (!suggestions.includes(value)) {
                document.getElementById(`${e}-error`).style.display = "block";
                document.getElementById(`${e}-error`).textContent =
                  "Please select a valid address from the suggestions.";
              } else {
                document.getElementById(`${e}-error`).style.display = "none";
                validAddresses = [...new Set([...validAddresses, value])];
              }
            }
          }, 200);
        });
        s.addEventListener("click", (t) => {
          if (t.target.classList.contains("suggestion-item")) {
            l.value = t.target.textContent;
            document.getElementById(`${e}-error`).style.display = "none";
            validAddresses = [...new Set([...validAddresses, l.value])];
            s.style.display = "none";
          }
        });
      }

      let originalFields = [];
      let validAddresses = [];
      const maxFields = 7;

      // Update Via plus button state
      function updateViaPlusButton() {
        let e = document.getElementById("via-plus");
        if (originalFields.length === 0) {
          e.classList.remove("disabled");
          e.style.pointerEvents = "auto";
        } else {
          let t = originalFields.length - 1;
          let l = originalFields[t].trim();
          let s =
            l &&
            validAddresses.some((e) => e.toLowerCase() === l.toLowerCase());
          let a =
            t === 0 ||
            (t > 0 &&
              l.toLowerCase() !== originalFields[t - 1].trim().toLowerCase());
          if (s && a && originalFields.length < 7) {
            e.classList.remove("disabled");
            e.style.pointerEvents = "auto";
          } else {
            e.classList.add("disabled");
            e.style.pointerEvents = "none";
          }
        }
      }

      // Add a new Via field
      function addViaField() {
        if (originalFields.length >= 7) return;
        if (originalFields.length > 0) {
          let e = originalFields.length - 1;
          let t = originalFields[e].trim();
          let l =
            t &&
            validAddresses.some((e) => e.toLowerCase() === t.toLowerCase());
          let s =
            e === 0 ||
            (e > 0 &&
              t.toLowerCase() !== originalFields[e - 1].trim().toLowerCase());
          if (!t) {
            document.getElementById(`emptyError-${e}`).style.display = "block";
            return;
          }
          if (!l) {
            document.getElementById(`invalidError-${e}`).style.display =
              "block";
            return;
          }
          if (!s) {
            document.getElementById(`sameAsPreviousError-${e}`).style.display =
              "block";
            return;
          }
        }
        originalFields.push("");
        renderViaFields();
        updateViaPlusButton();
      }

      // Render Via fields
      function renderViaFields() {
        let e = document.getElementById("via-list");
        e.innerHTML = "";
        originalFields.forEach((t, l) => {
          e.innerHTML += `
                    <div class="form-field via-field">
                        <div class="field-container">
                            <input value="${t}" data-index="${l}" class="custom-input via-input" type="text" placeholder="Enter a Location" autocomplete="off" aria-label="Via location ${
            l + 1
          }">
                            <div id="via-suggestions-${l}" class="suggestion-list"></div>
                            <button class="remove-field" data-index="${l}" aria-label="Remove via location ${
            l + 1
          }">X</button>
                        </div>
                        <span class="error-message" id="emptyError-${l}" style="display: none;">This field cannot be empty.</span>
                        <span class="error-message" id="invalidError-${l}" style="display: none;">Invalid value. Please select from the list.</span>
                        <span class="error-message" id="sameAsPreviousError-${l}" style="display: none;">Value must differ from the previous Via field.</span>
                    </div>`;
        });
        applyViaAutocomplete();
        document.querySelectorAll(".remove-field").forEach((e) => {
          e.addEventListener("click", () => {
            let t = parseInt(e.getAttribute("data-index"), 10);
            originalFields.splice(t, 1);
            renderViaFields();
            updateViaPlusButton();
          });
        });
        updateViaPlusButton();
      }

      // Apply autocomplete to Via fields
      function applyViaAutocomplete() {
        document.querySelectorAll(".via-field").forEach((e) => {
          let t = e.querySelector(".via-input");
          let l = parseInt(t.getAttribute("data-index"), 10);
          let s = e.querySelector(`#via-suggestions-${l}`);
          const debouncedFetch = debounce(fetchSuggestions, 300);
          t.addEventListener("input", async () => {
            originalFields[l] = t.value;
            document.getElementById(`emptyError-${l}`).style.display = "none";
            document.getElementById(`invalidError-${l}`).style.display = "none";
            document.getElementById(`sameAsPreviousError-${l}`).style.display =
              "none";
            let suggestions = await debouncedFetch(
              t.value,
              `via-suggestions-${l}`,
              true
            );
            validAddresses = [...new Set([...validAddresses, ...suggestions])];
            if (
              l > 0 &&
              t.value.trim().toLowerCase() ===
                originalFields[l - 1].trim().toLowerCase()
            ) {
              document.getElementById(
                `sameAsPreviousError-${l}`
              ).style.display = "block";
            }
            updateViaPlusButton();
          });
          t.addEventListener("blur", async () => {
            setTimeout(async () => {
              s.style.display = "none";
              let value = t.value.trim();
              if (value) {
                let suggestions = validAddresses.includes(value)
                  ? [value]
                  : await debouncedFetch(value, `via-suggestions-${l}`, true);
                if (!suggestions.includes(value)) {
                  document.getElementById(`invalidError-${l}`).style.display =
                    "block";
                  document.getElementById(`invalidError-${l}`).textContent =
                    "Invalid value. Please select from the list.";
                } else {
                  document.getElementById(`invalidError-${l}`).style.display =
                    "none";
                  validAddresses = [...new Set([...validAddresses, value])];
                }
                if (
                  l > 0 &&
                  value &&
                  value.toLowerCase() ===
                    originalFields[l - 1].trim().toLowerCase()
                ) {
                  document.getElementById(
                    `sameAsPreviousError-${l}`
                  ).style.display = "block";
                }
              }
              updateViaPlusButton();
            }, 200);
          });
          s.addEventListener("click", (e) => {
            if (e.target.classList.contains("suggestion-item")) {
              t.value = e.target.textContent;
              originalFields[l] = t.value;
              validAddresses = [...new Set([...validAddresses, t.value])];
              s.style.display = "none";
              document.getElementById(`emptyError-${l}`).style.display = "none";
              document.getElementById(`invalidError-${l}`).style.display =
                "none";
              if (
                l > 0 &&
                t.value.trim().toLowerCase() ===
                  originalFields[l - 1].trim().toLowerCase()
              ) {
                document.getElementById(
                  `sameAsPreviousError-${l}`
                ).style.display = "block";
              } else {
                document.getElementById(
                  `sameAsPreviousError-${l}`
                ).style.display = "none";
              }
              updateViaPlusButton();
            }
          });
        });
      }

      let accuserdb = "";

      // Update items input display
      function updateItemsInput() {
        const itemsInput = document.getElementById("items-input");
        const items = accuserdb
          ? accuserdb.split(",").filter((item) => item.trim())
          : [];
        itemsInput.value =
          items.length > 0
            ? `${items.length} Item${
                items.length > 1 ? "s" : ""
              } - press to edit`
            : "No Items";
      }

      // Set sidebar height to match form container
      function setSideMenuHeight() {
        const formContainer = document.querySelector(".form-container");
        const sideMenu = document.getElementById("items-side-menu");
        const formHeight = formContainer.offsetHeight;
        sideMenu.style.height = `${formHeight}px`;
      }

      // Toggle items sidebar visibility
      function toggleItemsSideMenu() {
        const sideMenu = document.getElementById("items-side-menu");
        const itemsError = document.getElementById("items-error");
        const items = accuserdb
          ? accuserdb.split(",").filter((item) => item.trim())
          : [];
        console.log(
          "toggleItemsSideMenu called, accuserdb:",
          accuserdb,
          "items:",
          items
        );

        if (!sideMenu) {
          console.error("Sidebar element not found!");
          return;
        }

        const isVisible = sideMenu.classList.contains("show");
        if (isVisible) {
          console.log("Closing sidebar");
          sideMenu.classList.remove("show");
          setTimeout(() => {
            sideMenu.style.display = "none";
            console.log("Sidebar closed, display: none");
          }, 200);
        } else if (items.length > 0) {
          console.log("Opening sidebar");
          itemsError.style.display = "none";
          sideMenu.style.display = "flex";
          setSideMenuHeight();
          setTimeout(() => {
            sideMenu.classList.add("show");
            renderItemsSideMenu();
            console.log("Sidebar opened, show class added");
          }, 100);
        } else {
          console.log("Cannot open sidebar: no items");
          itemsError.style.display = "block";
          setTimeout(() => {
            itemsError.style.display = "none";
          }, 3000);
        }
      }

      // Render items in sidebar
      function renderItemsSideMenu() {
        const sideMenuBody = document.getElementById("items-side-menu-body");
        if (!sideMenuBody) {
          console.error("items-side-menu-body not found!");
          return;
        }
        const items = accuserdb
          ? accuserdb.split(",").filter((item) => item.trim())
          : [];
        console.log("renderItemsSideMenu called, items:", items);
        sideMenuBody.innerHTML =
          items.length > 0
            ? items
                .map((item, index) => {
                  const cleanItem = item.trim();
                  const itemId = cleanItem
                    .replace(/\s/g, "")
                    .replace(/[^\w]/g, "");
                  return `
                        <div class="items-side-menu-item" id="side-item-${itemId}">
                            <span>${cleanItem}</span>
                            <button class="delete-btn" onclick="removeItemFromSideMenu(${index}, '${itemId}'); event.stopPropagation();" aria-label="Remove ${cleanItem}">
                                <img src="images/delete.jpg" alt="Delete">
                            </button>
                        </div>`;
                })
                .join("")
            : "<div>No items selected.</div>";
        if (items.length === 0) {
          console.log("No items, triggering toggleItemsSideMenu to close");
          toggleItemsSideMenu();
        } else {
          console.log("Items remain, keeping sidebar open");
          const sideMenu = document.getElementById("items-side-menu");
          sideMenu.style.display = "flex";
          sideMenu.classList.add("show");
        }
      }

      // Remove item from sidebar
      function removeItemFromSideMenu(index, itemId) {
        console.log(
          "removeItemFromSideMenu called, index:",
          index,
          "itemId:",
          itemId,
          "accuserdb before:",
          accuserdb
        );
        let items = accuserdb.split(",");
        items.splice(index, 1);
        accuserdb = items.join(",");
        console.log("accuserdb after:", accuserdb);
        const itemElement = document.getElementById(`side-item-${itemId}`);
        if (itemElement) {
          itemElement.classList.add("removed");
          setTimeout(() => {
            itemElement.remove();
            updateItemsInput();
            renderItemsSideMenu();
          }, 300);
        } else {
          updateItemsInput();
          renderItemsSideMenu();
        }
      }

      // Clear all items from accuserdb
      function clearAllItems() {
        console.log("clearAllItems called, resetting accuserdb");
        accuserdb = "";
        updateItemsInput();
        renderItemsSideMenu();
      }

      // Load items for the items modal
      async function loadItems() {
        document.getElementById("sploader").style.display = "block";
        try {
          let e = await fetch(
            "https://stationcarslondon.com/api/ItemsAPI/GetItems"
          );
          if (!e.ok) {
            throw new Error(
              `HTTP error! Status: ${e.status}, Status Text: ${e.statusText}`
            );
          }
          let t = await e.json();
          if (!t.data || !Array.isArray(t.data)) {
            throw new Error(
              "Invalid response format: 'data' property missing or not an array"
            );
          }
          let l = t.data;
          let s = document.getElementById("accordionExample");
          l.forEach((e, t) => {
            let l = document.createElement("div");
            l.className = "card";
            l.innerHTML = `
                        <div class="card-header" id="heading${t}">
                            <h3 class="luggage-headings">
                                <button class="custom-btn collapsed" type="button" onclick="toggleCollapse('collapse${t}')" aria-label="Toggle ${
              e.itemname
            }">${e.itemname}</button>
                            </h3>
                        </div>
                        <div id="collapse${t}" class="collapse">
                            <div class="card-body">
                                ${e.itemsubchild
                                  .map(
                                    (e, t) =>
                                      `<button type="button" data-idss="${t}" luggagetype="${e.type}" class="custom-btn luggage-item" onclick="selectItem(this)" aria-label="Select ${e.name}">${e.name}</button>`
                                  )
                                  .join("")}
                            </div>
                        </div>`;
            s.appendChild(l);
          });
          document.getElementById("sploader").style.display = "none";
        } catch (a) {
          console.error("Error loading items:", a.message);
          document.getElementById("sploader").style.display = "none";
        }
      }

      // Toggle accordion collapse
      function toggleCollapse(e) {
        let t = document.getElementById(e);
        let l = t.classList.contains("show");
        document
          .querySelectorAll(".collapse.show")
          .forEach((e) => e.classList.remove("show"));
        if (!l) t.classList.add("show");
      }

      // Select an item from the items modal
      function selectItem(e) {
        let t = e.textContent;
        let l = e.getAttribute("luggagetype");
        document.getElementById("nameid").value = t;
        document.getElementById("numbermoreitm").value =
          (accuserdb.includes(t) &&
            accuserdb.split(t)[0].trim().split(" ")[0]) ||
          1;
        closeModal("moreModalitem");
        openModal("itemcount");
      }

      // Add item to accuserdb
      function addItem() {
        let e = document.getElementById("nameid").value.trim();
        let t = document.getElementById("numbermoreitm").value;
        let l =
          document
            .querySelector(".luggage-item[data-idss][luggagetype]")
            .getAttribute("luggagetype") || "checkin";
        let s = e.replace(/\s/g, "").replace(/[^\w]/g, "");
        let a = `${t} ${e}`;
        if (accuserdb.includes(e)) {
          let o = accuserdb.split(",");
          let n = o.map((t) => (t.includes(e) ? a : t));
          accuserdb = n.join(",");
        } else {
          accuserdb = accuserdb ? accuserdb + "," + a : a;
        }
        updateItemsInput();
        renderItemsSideMenu();
        closeModal("itemcount");
      }

      // Setup airport modal buttons
      function setupModal(e, t) {
        let l = document.getElementById(e);
        let s = l.querySelectorAll(".airport-btn");
        let a = document.getElementById(t);
        s.forEach((l) => {
          l.addEventListener("click", () => {
            a.value = l.getAttribute("data-value");
            validAddresses = [...new Set([...validAddresses, a.value])];
            document.getElementById(`${t}-error`).style.display = "none";
            closeModal(e);
          });
        });
      }


    // Modified submitForm to use config
      // Submit form with validation
      async function submitForm() {
        resetErrors();
        let pickup = document.getElementById("pickup").value.trim();
        let dropoff = document.getElementById("dropof").value.trim();
        let datetime = document.getElementById("book_pick_datetime").value;
        let passengers =
          parseInt(document.getElementById("Passenger").value) || 0;
        let waitTime =
          parseInt(document.getElementById("wait_time").value) || 0;
        let toggle = document.getElementById("wait_time_toggle").checked;
        let tripFlag = waitTime > 0 ? "WR" : "single";
        let vias = originalFields
          .map((e) => e.trim().replace(/\|,/g, "@"))
          .filter((e) => e)
          .join("@");
        let items = accuserdb
          ? accuserdb.split(",").map((item) => {
              const [quantity, ...nameParts] = item.trim().split(" ");
              const name = nameParts.join(" ");
              return {
                sendval: `${quantity}@${name}`,
                type: `${quantity} ${
                  document
                    .querySelector(`.luggage-item[data-idss][luggagetype]`)
                    .getAttribute("luggagetype") || "checkin"
                }`,
              };
            })
          : [];
        let isValid = true;

        if (!pickup) {
          document.getElementById("pickup-error").style.display = "block";
          document.getElementById("pickup-error").textContent =
            "Please select a valid pickup address.";
          isValid = false;
        }
        if (!dropoff) {
          document.getElementById("dropof-error").style.display = "block";
          document.getElementById("dropof-error").textContent =
            "Please select a valid dropoff address.";
          isValid = false;
        }
        if (!datetime || !validateDateTime()) {
          document.getElementById("datetime-error").style.display = "block";
          isValid = false;
        }
        if (passengers <= 0) {
          document.getElementById("passenger-error").style.display = "block";
          document.getElementById("passenger-error").textContent =
            "Please enter at least one passenger.";
          isValid = false;
        }
        if (pickup && !validAddresses.includes(pickup)) {
          let suggestions = await fetchSuggestions(
            pickup,
            "pickup-suggestions",
            false
          );
          if (!suggestions.includes(pickup)) {
            document.getElementById("pickup-error").style.display = "block";
            document.getElementById("pickup-error").textContent =
              "Invalid pickup address. Please select from the suggestions.";
            isValid = false;
          } else {
            validAddresses = [...new Set([...validAddresses, pickup])];
          }
        }
        if (dropoff && !validAddresses.includes(dropoff)) {
          let suggestions = await fetchSuggestions(
            dropoff,
            "dropof-suggestions",
            false
          );
          if (!suggestions.includes(dropoff)) {
            document.getElementById("dropof-error").style.display = "block";
            document.getElementById("dropof-error").textContent =
              "Invalid dropoff address. Please select from the suggestions.";
            isValid = false;
          } else {
            validAddresses = [...new Set([...validAddresses, dropoff])];
          }
        }
        for (let i = 0; i < originalFields.length; i++) {
          let l = originalFields[i].trim();
          if (l === "") {
            document.getElementById(`emptyError-${i}`).style.display = "block";
            isValid = false;
          } else if (!validAddresses.includes(l)) {
            let suggestions = await fetchSuggestions(
              l,
              `via-suggestions-${i}`,
              true
            );
            if (!suggestions.includes(l)) {
              document.getElementById(`invalidError-${i}`).style.display =
                "block";
              document.getElementById(`invalidError-${i}`).textContent =
                "Invalid value. Please select from the list.";
              isValid = false;
            } else {
              validAddresses = [...new Set([...validAddresses, l])];
            }
          }
          if (
            i > 0 &&
            l &&
            l.toLowerCase() === originalFields[i - 1].trim().toLowerCase()
          ) {
            document.getElementById(`sameAsPreviousError-${i}`).style.display =
              "block";
            isValid = false;
          }
        }
        if (toggle && (waitTime < 1 || waitTime > 60)) {
          document.getElementById("wait-time-error").style.display = "block";
          isValid = false;
        }

        if (!isValid) {
          console.log("Form validation failed:", {
            pickup,
            dropoff,
            datetime,
            passengers,
            waitTime,
            tripFlag,
            vias,
          });
          alert("Please correct the errors in the form before submitting.");
          return;
        }

        let specialItems = [
          "TV(lessthan30inches)",
          "Ironingboard",
          "Musicspeaker(Large)",
          "Mirror(upto60x36inches)",
          "Rug(upto24x84inches)",
          "SingleMattress",
          "Bedsidetable(45x55cm)",
          "Microwaveoven",
          "Vacuumcleaner",
          "TVstand",
          "Largemusicalinstrumentcase(upto60x24inches)",
          "TV(30to60inches)",
        ];
        let luggageText = items
          .map((e) => e.sendval)
          .filter((e) => e)
          .join(",");
        let showVehicle = false;
        items.forEach((e) => {
          if (e.sendval) {
            let t = e.sendval.split("@")[1].replace(/\s/g, "");
            if (specialItems.includes(t)) showVehicle = true;
          }
        });
        let cabinCount = 0;
        let checkinCount = 0;
        let extraPassengers = 0;
        items.forEach((e) => {
          if (e.type) {
            let [t, l] = e.type.split(" ");
            if (l === "cabin") cabinCount += parseInt(t) || 0;
            else if (l === "checkin") checkinCount += parseInt(t) || 0;
            else if (l === "passenger") extraPassengers += parseInt(t) || 0;
          }
        });
        let [date, time] = datetime.split("T");
        let [hours, minutes] = time.split(":");
        let luggageObject = [
          cabinCount,
          checkinCount,
          passengers + extraPassengers,
          date,
          hours,
          minutes,
        ];

      let url = \`https://booking.\${formConfig.domain}/OurVehicle/OurVehicle?luggage_text=\${encodeURIComponent(luggageText)}&pickup=\${encodeURIComponent(pickup)}&checkurl=true&dropoff=\${encodeURIComponent(dropoff)}&office_details=\${encodeURIComponent(formConfig.officeDetails)}&luggageObject=\${encodeURIComponent(luggageObject.join(","))}&listviasaddress=\${encodeURIComponent(vias)}&tripFlag=\${tripFlag}&mints=\${waitTime}&fromDoorNumber=\${encodeURIComponent("")} &toDoorNumber=\${encodeURIComponent("")} &showVehicle=\${showVehicle}&colorCode=\${formConfig.colorCode}\`;

 console.log("Submitting form with URL:", url);
        document.querySelector(".loading-div").style.display = "flex";
        document.body.style.overflow = "hidden";
        try {
          window.location.href = url;
        } catch (h) {
          console.error("Error navigating to URL:", h.message);
          alert("Error: Unable to submit the form. Please try again later.");
          document.querySelector(".loading-div").style.display = "none";
          document.body.style.overflow = "";
        }
        window.addEventListener(
          "pageshow",
          () => {
            document.querySelector(".loading-div").style.display = "none";
            document.body.style.overflow = "";
          },
          { once: true }
        );
      }

      // Initialize event listeners
      document.addEventListener("DOMContentLoaded", () => {
        setupAutocomplete("pickup", "pickup-suggestions");
        setupAutocomplete("dropof", "dropof-suggestions");
        setupModal("airportListModal1", "pickup");
        setupModal("airportListModal2", "dropof");
        loadItems();
        toggleWaitTime();
        updateItemsInput();
        document
          .getElementById("items-input")
          .addEventListener("click", toggleItemsSideMenu);
        document.addEventListener("click", (e) => {
          const sideMenu = document.getElementById("items-side-menu");
          const itemsInput = document.getElementById("items-input");
          if (!sideMenu || !itemsInput) {
            console.error("Sidebar or items-input not found!");
            return;
          }
          if (
            sideMenu.classList.contains("show") &&
            !sideMenu.contains(e.target) &&
            !itemsInput.contains(e.target)
          ) {
            console.log("Outside click detected, closing sidebar");
            toggleItemsSideMenu();
          }
        });
        window.addEventListener("resize", setSideMenuHeight);
        setSideMenuHeight();
      });
  </script>
</body>
</html>`;

  // Inject the HTML into a shadow DOM for isolation (works in any embed)
  const container = document.getElementById('taxi-booking-form') || document.currentScript.parentNode;
  const shadowHost = document.createElement('div');
  shadowHost.innerHTML = '<style>iframe { width: 100%; height: 800px; border: none; }</style><iframe srcdoc="' + fullHtml.replace(/"/g, '&quot;').replace(/'/g, '&#39;') + '"></iframe>';
  container.appendChild(shadowHost.firstChild);
  
  console.log('Full form injected with config:', config);
})();
