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
      `https://${destnationDomain}/Home/Indextwo?Prefix=${encodeURIComponent(
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
      l && validAddresses.some((e) => e.toLowerCase() === l.toLowerCase());
    let a =
      t === 0 ||
      (t > 0 && l.toLowerCase() !== originalFields[t - 1].trim().toLowerCase());
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
      t && validAddresses.some((e) => e.toLowerCase() === t.toLowerCase());
    let s =
      e === 0 ||
      (e > 0 && t.toLowerCase() !== originalFields[e - 1].trim().toLowerCase());
    if (!t) {
      document.getElementById(`emptyError-${e}`).style.display = "block";
      return;
    }
    if (!l) {
      document.getElementById(`invalidError-${e}`).style.display = "block";
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
        document.getElementById(`sameAsPreviousError-${l}`).style.display =
          "block";
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
            document.getElementById(`invalidError-${l}`).style.display = "none";
            validAddresses = [...new Set([...validAddresses, value])];
          }
          if (
            l > 0 &&
            value &&
            value.toLowerCase() === originalFields[l - 1].trim().toLowerCase()
          ) {
            document.getElementById(`sameAsPreviousError-${l}`).style.display =
              "block";
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
        document.getElementById(`invalidError-${l}`).style.display = "none";
        if (
          l > 0 &&
          t.value.trim().toLowerCase() ===
            originalFields[l - 1].trim().toLowerCase()
        ) {
          document.getElementById(`sameAsPreviousError-${l}`).style.display =
            "block";
        } else {
          document.getElementById(`sameAsPreviousError-${l}`).style.display =
            "none";
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
      ? `${items.length} Item${items.length > 1 ? "s" : ""} - press to edit`
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
            const itemId = cleanItem.replace(/\s/g, "").replace(/[^\w]/g, "");
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
    let e = await fetch("https://stationcarslondon.com/api/ItemsAPI/GetItems");
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
    (accuserdb.includes(t) && accuserdb.split(t)[0].trim().split(" ")[0]) || 1;
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

// Submit form with validation
async function submitForm() {
  resetErrors();
  let pickup = document.getElementById("pickup").value.trim();
  let dropoff = document.getElementById("dropof").value.trim();
  let datetime = document.getElementById("book_pick_datetime").value;
  let passengers = parseInt(document.getElementById("Passenger").value) || 0;
  let waitTime = parseInt(document.getElementById("wait_time").value) || 0;
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
      let suggestions = await fetchSuggestions(l, `via-suggestions-${i}`, true);
      if (!suggestions.includes(l)) {
        document.getElementById(`invalidError-${i}`).style.display = "block";
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
  let url = `https://${destnationDomain}/OurVehicle/OurVehicle?luggage_text=${encodeURIComponent(
    luggageText
  )}&pickup=${encodeURIComponent(
    pickup
  )}&checkurl=true&dropoff=${encodeURIComponent(
    dropoff
  )}&office_details=${encodeURIComponent(
    `${office_details}`
  )}&luggageObject=${encodeURIComponent(
    luggageObject.join(",")
  )}&listviasaddress=${encodeURIComponent(
    vias
  )}&tripFlag=${tripFlag}&mints=${waitTime}&fromDoorNumber=${encodeURIComponent(
    ""
  )}&toDoorNumber=${encodeURIComponent(
    ""
  )}&showVehicle=${showVehicle}&colorCode=A64D79`;
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
