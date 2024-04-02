// Used by some shops to implement custom logic
var tomitProductInventoryInfo = {};
tomitProductInventoryInfo.showCurrentVariantInformation = function() {};
tomitProductInventoryInfo.requestCustomerLocation = function() {};
tomitProductInventoryInfo.getProductsInventoryInformation = function() {};
tomitProductInventoryInfo.listInventory = function() {};
tomitProductInventoryInfo.loadedProducts = [];

class ProductInventoryInfo {

  originalATCButtonHTML = null;
  cart = null;
  initialized = false;
  data = { variants: {} };
  lastLocationChangeTime = 0;

  constructor() {

    // Prevent multiple instances
    if (window.jtcProductInventoryInfoStarted) {
      console.debug("ProductInventoryInfo already started");
      return;
    }
    window.jtcProductInventoryInfoStarted = true;

    console.debug("Starting...");

    if (document.readyState === "complete" || document.readyState === "loaded") {
      console.debug("DOM already loaded, init...")
      this.init();
    } else {
      console.debug("DOM not loaded, waiting for DOMContentLoaded event...")
      window.addEventListener('DOMContentLoaded', () => {
        this.init();
      });

      this.delayedInit();
    }
  }

  // On some shops, we're never getting the DOMContentLoaded event for some reason
  // So we try to start it "manually" by checking the document.readyState
  delayedInit() {
    console.debug("Delayed init...");
    setTimeout(() => {
      if (document.readyState === "complete" || document.readyState === "loaded") {
        this.init();
      } else {
        this.delayedInit();
      }
    }, 1000);
  }

  async init() {
    try {

      console.debug("Init...");

      if (this.initialized) { return; }
      this.initialized = true;

      await this.fetchSettings();

      this.addWidgetHolder();
      this.applyCustomStyles();
      this.setVariantChangeEvents();
      this.addLocationField();

      window.addEventListener('locationchange', () => {

        // return if the location change is less than 100 milliseconds ago
        // Prevents themes from spamming the location change event
        if (Date.now() - this.lastLocationChangeTime < 100) {
          console.debug("Location change event ignored");
          return;
        }
        this.lastLocationChangeTime = Date.now();

        console.debug(`Location change event ${location.href}`);
        if (this.isProductPage()) {
          this.processProductVariant();
        };
      });

      if (this.isProductPage()) {
        await this.processProductVariant();
      }

      if (this.isCartPage()) {
        if (this.settings.cartShowInventory) {
          await this.processVariantList();
        }

        if (this.settings.cartWarningMultiplePickupEnabled) {
          await this.showCartWarningMultiplePickup();
        }

        if (this.settings.cartWarningInvalidLocationEnabled) {
          await this.showCartWarningOneLocation();
        }
      }

      if (this.isCollectionPage()) {
        if (this.settings.collectionShowInventory) {
          console.debug("Processing collection page...");
          await this.processVariantList();
        }
      }

      // Some shops implement custom logic which depend on this event
      // Their custom code can stop the execution and prevent our code to run
      // As we can't control the custom code, we need to wrap it in a try/catch
      this.dispatchLoadedEvent();

    } catch (e) {
      this.bugsnagNotify(e);
      console.error(e);
    }
  }

  // Some shops implement custom logic which depend on this event
  dispatchLoadedEvent() {
    var ev = new CustomEvent("tomitLoaded", {
      detail: {
        message: 'Inventory Information Loaded'
      },
      bubbles: true,
      cancelable: true
    });

    console.debug("Dispatching tomitLoaded event...");
    document.dispatchEvent(ev);
  }

  /**
   * 0 = custom position using theme editing
   * 1 = before ATC button
   * 2 = after ATC button
  **/
  addWidgetHolder() {
    if (this.settings.snippetPosition === 0) {
      console.debug("addWidgetHolder - custom position");
      return;
    }

    // detect and remove existing widget holder
    const existingWidgetHolder = document.getElementById("inventoryLocationInformation");
    if (existingWidgetHolder) {
      console.debug("addWidgetHolder - removing existing widget holder");
      existingWidgetHolder.parentNode.removeChild(existingWidgetHolder);
    }

    const atcBtn = this.getAtcButton();
    if (!atcBtn) {
      console.debug("addWidgetHolder - ATC button not found");
      return;
    }

    // create the following element:
    // <div id="inventoryLocationInformation" style='margin 20px 0'"><span class="inventoryLocationLoading"></span></div>
    const appWidget = document.createElement("div");
    appWidget.setAttribute("id", "inventoryLocationInformation");
    appWidget.setAttribute("style", "margin: 20px 0;");
    appWidget.innerHTML = "<span class='inventoryLocationLoading'></span>";

    if (this.settings.snippetPosition === 1) {
      console.debug("addWidgetHolder - before ATC button");
      atcBtn.insertAdjacentElement("beforebegin", appWidget);

    } else if (this.settings.snippetPosition === 2) {
      console.debug("addWidgetHolder - after ATC button");
      atcBtn.insertAdjacentElement("afterend", appWidget);
    }
  }

  fetchShopCartItems() {
    if (this.cart) {
      return this.cart;
    }
    let url = "/cart.js";
    return fetch(url)
        .then(response => response.json())
        .then(res => {
          this.cart = res;
          return res;
        } );
  }

  getShop () {
    return Shopify.shop;
  }

  apiBase() {
    const devStores = [
      'teststore43232432.myshopify.com'
    ];

    // Development
    if (devStores.includes(this.getShop())) {
      return 'https://jtc-inventory-info.ap.ngrok.io';

    // Production
    } else {
      return 'https://api.shopify-inventory.jtcinteractive.com';
    }
  }

  addLocationField() {
    if (this.settings.pickupEnabled && !this.getPickupLocationInput()) {
      const atcBtn = this.getAtcButton();

      if (atcBtn) {
        console.debug("addLocationField - adding location field");
        const input = document.createElement("input");
        input.setAttribute("class", "PickupLocation");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", "properties[Pickup Location]");
        atcBtn.insertAdjacentElement("afterend", input);
      } else {
        console.debug("addLocationField - ATC button not found");
      }
    }
  }

  async fetchSettings() {
    const url = `${this.apiBase()}/shop/${this.getShop()}/settings`;
    return fetch(url).then(response => response.json()).then(res => {
      this.settings = res.settings;
      return res;
    });
  }

  getVariantLocations(variantID, lat, lon) {
    const url = `${this.apiBase()}/shop/${this.getShop()}/variant_locations/${variantID}?lat=${lat}&lon=${lon}`;

    if (isNaN(variantID) || variantID < 1000) {
      console.debug("Invalid variant ID: " + variantID);
      return;
    }

    // const listLocationsUrl = this.routes.listLocations;
    // const url = `${listLocationsUrl}/${variantID}?lat=${lat}&lon=${lon}`;

    console.debug("Fetching locations for variant " + variantID + "...");

    return fetch(url).then(response => response.json()).then(res => {
      this.data.variants[variantID] = { locations: res.locations, settings: res.settings };
      this.dispatchVariantLocationsLoadedEvent(variantID, res.locations);
      return res.locations;
    });
  }

  // This must stay as-is for compatibility with customizations made by some shops
  dispatchVariantLocationsLoadedEvent(variantID, locations) {
    var ev = new CustomEvent("jtcVariantLocationsLoaded", {
      detail: {
        message: 'Variant locations loaded',
        variantID: variantID,
        locations: locations
      },
      bubbles: true,
      cancelable: true
    });

    console.debug(`Dispatching jtcVariantLocationsLoaded event for ${variantID}...`);
    document.dispatchEvent(ev);
  }

  filterLocations(locations) {
    // Only enabled locations
    locations = locations.filter(location => location.enabled);

    if (this.settings.hideEmptyLocations) {
      locations = locations.filter(location => location.stock > 0);
    }

    // Customer distance must be greather than the location's max distance
    if (this.settings.geoEnabled) {
      locations = locations.filter(location => (location.maxDistance === null || location.maxDistance === 0) || location.distance <= location.maxDistance);
    }

    // Country exclusion rules
    locations = this.geoFilterLocations(locations);

    if (this.settings.groupedLocationsEnable) {
      console.debug("Adding grouped locations...");
      locations = this.groupedLocation(locations).concat(locations);
    }

    // If any location has a `primary` flag set to true, only show that one
    // But only if it has any stock
    const primaryLocation = locations.find(location => location.primary);
    if (primaryLocation && primaryLocation.stock > 0) {
      console.debug("Setting primary location: ", primaryLocation);
      locations = [primaryLocation];
    }

    if (this.settings.geoEnabled && this.settings.geoSortLocations) {
      locations = locations.sort((a, b) => a.distance - b.distance);
    } else {
      locations = locations.sort((a, b) => a.order - b.order);
    }

    console.debug("Filtered locations: ", locations.length)

    return locations;
  }

  geoFilterLocations(locations) {
    const { userCountryCode } = this.settings;

    return locations.filter(location => {
      if (location.geoWhiteList && location.geoWhiteList.length > 0 && !location.geoWhiteList.includes(userCountryCode)) {
        return false;
      }

      return !(location.geoBlackList && location.geoBlackList.length > 0 && location.geoBlackList.includes(userCountryCode));
    });
  }

  groupedLocation(locations) {
    return [{
      id: "grouped",
      name: this.settings.groupedLocationsContent || "Grouped",
      stock: locations.reduce((acc, location) => acc + location.stock, 0),
      order: -1 // make sure it's always first
    }];
  }

  // Hide Inventory block when no inventory information is found
  hideInventoryBlock(container) {
    if (this.settings.noInventoryHide) {
      console.debug("hideInventoryBlock: partial")

      const locationsBlock = container.querySelector('#tomit_inventory_list');
      if (locationsBlock) { container.removeChild(locationsBlock); }

      if (!this.settings.noInventoryTextContent) {
        console.debug("hideInventoryBlock: full");
        container.style.display = 'none';
      }
    }
  }

  displayUnavailableText(container) {
    if (this.settings.noInventoryTextContent) {
      console.debug("displayUnavailableText: true")
      container.innerHTML += '<span class="tomitUnavailable">' + this.settings.noInventoryTextContent + '</span>';
    }
  }

  hasAnyStock(locations) {
    locations = this.filterLocations(locations);
    for (const location of locations) {
      if (location.stock > 0) {
        console.debug("Has stock")
        return true;
      }
    }
    console.debug("No stock")
    return false;
  }

  stockText(stock, noHtml = false) {
    const { displayLocStockText } = this.settings;
    if (this.settings.useThresholdValues == false) { return stock; }
    if (displayLocStockText.length === 0) { return stock; }

    // Otherwise, return the text and color
    const stockLevel = displayLocStockText.find((locIndex) => {
      return locIndex.amount >= stock || (locIndex.amount === null && locIndex.id > 0);
    });

    if (stockLevel) {
      if (noHtml) {
        return stockLevel.text;
      }
      return `
        <span class='tomitInStock threshold-${displayLocStockText.indexOf(stockLevel)} tomItInventoryLocationHighStock'">
          ${stockLevel.text}
        </span>
      `;
    }

    // If the tresold is not found, return the stock number
    return stock;
  }

  renderLocations(container, locations) {
    console.debug("renderLocations");

    let locationsHTML = "<ul id='tomit_inventory_list'>";

    locations.forEach(location => {

      locationsHTML += `
        <li data-loc="${location.id}" class='tomitIsInStock'>
          <small>
            <span class='location'>${location.name}:</span>
      `

      // Server calculates distance based on lat/lon or country code
      if (this.settings.geoEnabled && this.settings.geoShowDistance && location.distance) {
        locationsHTML += `
            <span class='distance'>(${location.distance} ${this.settings.geoDistanceUnit})</span>`
      }

      locationsHTML += `
            <strong class="stockCount">
              ${this.stockText(location.stock)}
            </strong>
          </small>
        </li>`;
    });
    locationsHTML += "</ul>";
    container.innerHTML = locationsHTML;

    container.style.display = "block";
  }

  renderPickupLocationsDropdown(container, locations) {

    console.debug("renderPickupLocationsDropdown");

    const selectedLoc = localStorage.getItem("TomITSelectedLocation");
    const options = [];
    const pickupLocationField = this.getPickupLocationInput();
    locations.forEach(location => {
      const selectOption = document.createElement('option');
      selectOption.text = location.name + ' - ' + this.stockText(location.stock, true);
      selectOption.value = "pickup " + location.name;
      selectOption.dataset.loc = location.id;

      if (location.stock <= 0) {
        selectOption.disabled = true;

      } else {
        if (selectedLoc === "pickup " + location.name) {
          pickupLocationField.value = location.name;
          selectOption.selected = true;
        }
      }
      options.push(selectOption);
    });

    const selectEl = document.createElement('select');
    selectEl.onchange = this.changePickupEventHandler;
    selectEl.name = 'properties[Shipping Option]';

    if (!this.settings.pickupShipToMeHide) {
      const firstOption = document.createElement('option');
      firstOption.text = this.settings.pickupShipToMeText;
      selectEl.appendChild(firstOption);
    }

    options.forEach(option => {
      selectEl.appendChild(option);
    });

    container.innerHTML = '';
    container.prepend(selectEl);
  }

  changePickupEventHandler(e) {
    const pickupLocationField = this.getPickupLocationInput();
    pickupLocationField.value = e.target.value;
    localStorage.setItem("TomITSelectedLocation", e.target.value);
  }

  renderPickupLocations(container, locations) {

    console.debug("renderPickupLocations");

    const selectedGlobalLocation = localStorage.getItem("TomITGlobalSelectedLocation");
    const selectedLoc = localStorage.getItem("TomITSelectedLocation");

    if (this.settings.pickupUseDropdown) {
      this.renderPickupLocationsDropdown(container, locations);
      return;
    }

    const options = [];
    const pickupLocationField = this.getPickupLocationInput();
    locations.forEach(location => {
      let pickupDisabled = '';
      let pickupStyle = '';

      var checked = '';

      if (location.stock <= 0) {
        pickupDisabled = 'disabled';
        pickupStyle = 'style="opacity:.8";';
      }

      if((selectedLoc === "pickup " + location.name && location.stock > 0) && (selectedGlobalLocation == null || selectedGlobalLocation === location.id)) {
        checked ='checked';
        pickupLocationField.value = location.name;
      }

      const radioSelectBtn = `<input class="pickup-location-radio" type="radio" name="properties[Shipping Option]" value="pickup ${location.name}" ${pickupDisabled}  ${checked} />`;

      const item = `<li><label ${pickupStyle}>${radioSelectBtn} ${location.name}: <strong>${this.stockText(location.stock)}</strong></label></li>`;

      options.push(item);
    });

    container.innerHTML = options.join('');
    const _this = this;
    document.querySelectorAll('.pickup-location-radio').forEach(locationRadio => {
      locationRadio.addEventListener('click', function (e) {
        _this.changePickupEventHandler(e);
      })
    });

    if (!this.settings.pickupShipToMeHide) {
      const shipToMeRadio = document.createElement("li");
      console.debug("pickupShipToMeText: " + this.settings.pickupShipToMeText)
      shipToMeRadio.innerHTML = `<label><input type="radio" name="properties[Shipping Option]" value="Ship To Me" checked="checked">${this.settings.pickupShipToMeText}</label>`;
      container.prepend(shipToMeRadio);
    }
  }

  isVisible(element) {
    return window.getComputedStyle(element).display !== "none";
  }

  getPickupLocationInput() {
    return document.querySelector('input[name="properties[Pickup Location]"]');
  }

  getAtcButton() {
    const that = this;

    let atcBtn = document.querySelector("form[action='/cart/add'] button[name='add']") == null ?
        document.querySelector("form[action='/cart/add'] input[name='add']") :
        document.querySelector("form[action='/cart/add'] button[name='add']");

    if (!atcBtn || !that.isVisible(atcBtn)) {
      atcBtn = document.querySelector("button[name='add']") == null ?
          document.querySelector("form input[name='add']") :
          document.querySelector("button[name='add']");
    }

    // Find an ATC button using a brute force method
    if (!atcBtn || !that.isVisible(atcBtn)) {
      var elements = Array.from(document.querySelectorAll("*"));
      var searchedText = "add to cart";

      elements.some(function(element) {
        var text = element.textContent.trim();
        if (
            text.toLowerCase().includes(searchedText.toLowerCase()) &&
            element.tagName.toLowerCase() === "button" &&
            that.isVisible(element)
        ) {
          atcBtn = element;
          return true;
        }
      });
    }

    if (!atcBtn) {
      this.bugsnagNotify("Unable to find ATC button");
      return;
    }

    return atcBtn;
  }

  enableAtcButton(atcBtn) {
    console.debug("enableAtcButton");
    atcBtn.removeAttribute("disabled");
    atcBtn.innerHTML = this.originalATCButtonHTML;
  }

  disableAtcButton(atcBtn, disableText) {
    console.debug(`disableAtcButton using text: ${disableText}`);
    atcBtn.setAttribute("disabled", "disabled");
    atcBtn.innerHTML = `<span>${disableText}</span>`;
  }

  updateATCButton(locations) {

    let atcBtn = this.getAtcButton();

    if ((this.settings.geoEnabled && this.settings.geoATCNoInventoryDisable) || this.settings.displayNoAnyStockDisable) {
      if (!atcBtn) { return; }

      if (!this.originalATCButtonHTML) {
        console.debug(`Saving original ATC button HTML`)
        this.originalATCButtonHTML = atcBtn.innerHTML;
      }
    }

    const variantID = this.getVariantId();
    const sellOutOfStock = this.continueSellingOutOfStock(variantID);
    const isTracked = this.isTracked(variantID);

    console.debug(`sellOutOfStock: ${sellOutOfStock}`);
    console.debug(`isTracked: ${isTracked}`);

    // Disable the ATC button when:
    // - no locations have stock
    // - AND "continue selling out of stock" is disabled
    // - AND the product is tracked
    if (this.settings.displayNoAnyStockDisable) {
      if (!this.hasAnyStock(locations) && !sellOutOfStock && isTracked) {
        console.debug("displayNoAnyStockDisable: disable");
        this.disableAtcButton(atcBtn, this.settings.displayNoAnyStockText);
      } else {
        console.debug("displayNoAnyStockDisable: enable");
        this.enableAtcButton(atcBtn);
      }
    }

    // Disable the ATC button if the closest location has no stock
    if (this.settings.geoEnabled && this.settings.geoATCNoInventoryDisable && locations.length > 0) {
      const closestLocation = locations.sort ((a, b) => a.distance - b.distance)[0];

      if (closestLocation.stock <= 0 && isTracked) {
        console.debug("geoATCNoInventoryDisable: disable");
        this.disableAtcButton(atcBtn, this.settings.geoATCNoInventoryText);
      } else {
        console.debug("geoATCNoInventoryDisable: enable");
        this.enableAtcButton(atcBtn);
      }
    }
  }

  // Do we have 0 available locations because of the geo filters?
  // isGeoExcluded(variantID) {
  //   const variant = this.data.variants[variantID];
  //   if (!variant) { return false; }

  //   let locations = this.geoFilterLocations(variant.locations);
  //   locations = locations.filter(location => location.stock > 0);

  //   const isExcluded = locations.length === 0;
  //   console.debug(`isGeoExcluded: ${isExcluded}`);

  //   return isExcluded;
  // }

  // availableForSale is one of the following states:
  // - tracked and have stock
  // - tracked, no stock but have "continue selling when out of stock" enabled
  // - not tracked
  // isAvailableForSale(variantID) {
  //   const variant = this.data.variants[variantID];
  //   if (!variant) { return false; }
  //   return variant.settings.availableForSale;
  // }

  continueSellingOutOfStock(variantID) {
    const variant = this.data.variants[variantID];
    if (!variant) { return false; }
    return variant.settings.continueSellingOutOfStock;
  }

  isTracked(variantID) {
    const variant = this.data.variants[variantID];
    if (!variant) { return false; }
    return variant.settings.tracked;
  }

  async requestPosition() {
    var options = {
      enableHighAccuracy: true,
      timeout:    5000,
      maximumAge: 0,
    };

    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(
          pos => { resolve(pos); },
          err => { reject (err); },
          options);
    });
  }

  async getGeoLocation() {
    if (!this.settings.geoEnabled || !this.settings.geoUseBrowserLoc || !('geolocation' in navigator)) {
      console.debug("Geo location disabled or not supported");
      return [0, 0];
    }

    let position;
    try {
      position = await this.requestPosition();
      return [position.coords.latitude, position.coords.longitude];
    } catch (error) {
      console.debug(`Error getting position: ${error}`);
      return [0, 0];
    }
  }

  getVariantId() {
    const urlParams = new URLSearchParams(window.location.search);
    let variantId = urlParams.get('variant');
    if (variantId) { return variantId; }

    if (ShopifyAnalytics && ShopifyAnalytics.meta) {
      try {
        const atcForm = document.querySelector("form[action='/cart/add']");
        const variants = ShopifyAnalytics.meta.product.variants;

        if (atcForm) {
          variantId = variants.find((variant) => {
            let variantInput = atcForm.querySelector(`input[type='hidden'][value='${variant.id}']`);
            if (variantInput) { return variantInput.value; }
          });

          if (!variantId) {
            variantId = variants.find((variant) => {
              let variantInput = atcForm.querySelector(`option[data-variant-id='${variant.id}'][selected]`);
              if (variantInput) { return variantInput.value; }
            });
          }

          if (!variantId) {
            variantId = variants.find((variant) => {
              let variantInput = atcForm.querySelector(`option[value='${variant.id}'][selected]`);
              if (variantInput) { return variantInput.value; }
            });
          }
        }

        if (!variantId) { variantId = variants[0]; }

        return variantId.id;
      } catch (e) {
        this.bugsnagNotify(e);
      }
    }

    return variantId;
  }

  isCartPage() {
    return window.location.href.search('cart') > -1;
  }

  isProductPage() {
    return window.location.href.search('/products/') > -1;
  }

  isCollectionPage() {
    const hasCollectionsInUrl = window.location.href.search('collections') > 0;
    if (!hasCollectionsInUrl) {
      return;
    }

    return window.location.href.search('/products/') === -1;
  }

  getRelevantVariantIds() {
    return Array.from(
      document.querySelectorAll('[data-tomit-variant-id]'))
        .map(el => el.getAttribute('data-tomit-variant-id')
    );
  }

  async processVariant(container, variantId) {
    console.debug(`Processing variant ${variantId}`);
    const geoloc = await this.getGeoLocation();
    const locations = await this.getVariantLocations(variantId, geoloc[0], geoloc[1]);
    const displayLocations = this.filterLocations(locations);

    // Continue execution without rendering to support shop customizations
    if (!container) { return displayLocations; }

    if (this.isProductPage() && this.settings.pickupEnabled) {
      this.renderPickupLocations(container, displayLocations);
    } else {
      this.renderLocations(container, displayLocations);
    }

    if (!this.hasAnyStock(displayLocations)) {
      this.hideInventoryBlock(container);
      this.displayUnavailableText(container);
    }

    return displayLocations;
  }

  // Product page
  async processProductVariant() {
    console.debug('Processing single variant');
    const container = this.getWidgetContainer();
    const variantId = this.getVariantId();
    const displayLocations = await this.processVariant(container, variantId);
    this.updateATCButton(displayLocations);
  }

  // Cart & colleciton pages
  async processVariantList() {
    console.debug('Processing variant list');
    const variantsIds = this.getRelevantVariantIds();
    variantsIds.forEach(variantId => {
      const container = document.querySelector(`[data-tomit-variant-id='${variantId}']`);
      this.processVariant(container, variantId);
    });
  }

  getWidgetContainer() {
    return document.getElementsByClassName('inventoryLocationLoading')[0];
  }

  applyCustomStyles(styles) {
    console.debug("applyCustomStyles start");
    const style = document.createElement('style');

    styles = this.settings.displayCssCustomStyles ?? '';
    if (this.settings.displayBulletPointsHide) {
      styles += '.inventoryLocationLoading li { list-style-type: none; }';
    }

    styles += `.location { color: ${this.settings.displayLocationFontColor }; font-size: ${this.settings.displayLocationFontSize}px; }`;
    styles += `.stockCount { color:${this.settings.displayInventoryFontColor }; font-size: ${this.settings.displayInventoryFontSize}px; }`;

    if (this.settings.displayLocStockText.length > 0) {
      this.settings.displayLocStockText.forEach((item, index) => {
        styles += `.threshold-${index} { color: ${item.color_hex} !important; }`;
      });
    }

    if (this.settings.advancedCartPageWarningEnable) {
      styles += '#multiplePickupWarning { background-color: #ffffd7; border: 1px solid gray; width: 100%; margin-bottom: 10px;padding: 7px; font-size: .8em; border-radius:10px; text-align:center;} #multiplePickupWarning small { display:block; }';
    }

    style.innerHTML = styles;
    document.head.appendChild(style);
    console.debug("applyCustomStyles end");
  }

  setVariantChangeEvents() {
    console.debug("setVariantChangeEvents start");

    history.pushState = ( f => function pushState(){
      f.apply(this, arguments);
      window.dispatchEvent(new Event('pushState'));
      window.dispatchEvent(new Event('locationchange'));
    })(history.pushState);

    history.replaceState = ( f => function replaceState(){

      f.apply(this, arguments);

      window.dispatchEvent(new Event('replaceState'));
      window.dispatchEvent(new Event('locationchange'));
    })(history.replaceState);

    window.addEventListener('popstate',()=>{
      window.dispatchEvent(new Event('locationchange'));
    });

    console.debug("setVariantChangeEvents end");
  }

  bugsnagNotify(msg) {
    if (typeof Bugsnag !== "undefined") {
      Bugsnag.notify(msg);
    }
  }

  async showCartWarningMultiplePickup() {
    const cart = await this.fetchShopCartItems();
    if (!cart) { return; }

    const multiplePickup = cart.items.some((item, index) => {
      return item.properties &&
             cart.items[0].properties &&
             item.properties["Shipping Option"] !== cart.items[0].properties["Shipping Option"];
    });

    if (!multiplePickup) { return; }
    this.renderWarningMessage(this.settings.cartWarningMultiplePickupTitle, this.settings.cartWarningMultiplePickupMessage);
  }

  renderWarningMessage(title, message) {
    const firstDiv = document.createElement("div");
    const dataDiv = document.createElement("div");
    var strong = document.createElement("strong");
    var small = document.createElement("small");

    firstDiv.style.width = '100%';
    firstDiv.appendChild(dataDiv);
    strong.innerHTML = title;
    small.innerHTML = message;
    dataDiv.id = 'multiplePickupWarning';
    strong.append(small);
    dataDiv.append(strong);

    const checkout = document.getElementsByName("checkout");
    if (checkout.length > 0) {
      checkout[checkout.length-1].parentNode.insertBefore(firstDiv, checkout[checkout.length-1]);

      if(this.settings.cartDisableCheckout) {
        checkout[checkout.length-1].disabled = true;
      }
    }
  }

  // Enforces that all items must be shipped from a single location.
  // At least one location must:
  // - Have stock for all items
  // - Not be disabled
  async showCartWarningOneLocation() {
    const cart = await this.fetchShopCartItems();
    if (!cart) { return; }

    // Get the locations for each variant
    var locations = [];
    for (const item of cart.items) {
      const variantLocations = await this.getVariantLocations(item.variant_id);
      locations[item.variant_id] = variantLocations;
    }

    // Get locations which have stock for all items
    // Location must not be disabled
    let validLocations = [];
    cart.items.forEach(item => {

      // Get locations for this variant
      const variantLocations = locations[item.variant_id];
      console.debug(`Variant ${item.variant_id} locations:`, variantLocations);

      // Filter out locations which don't have stock for this variant
      const validVariantLocations = variantLocations.filter(location => {
        return location.stock >= item.quantity && !location.disabled;
      });

      // If this is the first variant, set the valid locations to the locations
      if (validLocations.length === 0) {
        validLocations = validVariantLocations;

      // Otherwise, filter out locations which don't have stock for this variant
      } else {
        validLocations = validLocations.filter(location => {
          return validVariantLocations.some(validLocation => {
            return validLocation.id === location.id;
          });
        });
      }
    });

    // If there are no valid locations, show the warning
    if (validLocations.length === 0) {
      this.showCartWarningInvalidLocation();;
    } else {
      this.hideCartWarningInvalidLocation();
    }
  }

  showCartWarningInvalidLocation() {
    this.renderWarningMessage(this.settings.cartWarningInvalidLocationTitle, this.settings.cartWarningInvalidLocationMessage);
  }

  hideCartWarningInvalidLocation() {
    var multipleLocationWarning = document.getElementById('multipleLocationWarning');
    if (multipleLocationWarning) {
      multipleLocationWarning.parentNode.removeChild(multipleLocationWarning);

      // Enable the checkout button
      var checkout = document.getElementsByName("checkout");
      checkout[0].disabled = false;
    }
  }
}

var jtcProductInventoryInfo = new ProductInventoryInfo();
