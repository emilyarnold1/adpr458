/** Shopify CDN: Minification failed

Line 29:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 30:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 31:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 32:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 33:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 34:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 67:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 70:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 71:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 72:4 Transforming const to the configured target environment ("es5") is not supported yet
... and 33 more hidden warnings

**/
function _extends(){return(_extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(t,e){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.LazyLoad=e()}(this,function(){"use strict";var t="undefined"!=typeof window,e=t&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),n=t&&"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype&&"isIntersecting"in window.IntersectionObserverEntry.prototype,o=t&&"classList"in document.createElement("p"),r={elements_selector:"img",container:e||t?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",class_loading:"loading",class_loaded:"loaded",class_error:"error",load_delay:0,auto_unobserve:!0,callback_enter:null,callback_exit:null,callback_reveal:null,callback_loaded:null,callback_error:null,callback_finish:null,use_native:!1},i=function(t,e){var n,o=new t(e);try{n=new CustomEvent("LazyLoad::Initialized",{detail:{instance:o}})}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:o})}window.dispatchEvent(n)};var a=function(t,e){return t.getAttribute("data-"+e)},s=function(t,e,n){var o="data-"+e;null!==n?t.setAttribute(o,n):t.removeAttribute(o)},c=function(t){return"true"===a(t,"was-processed")},l=function(t,e){return s(t,"ll-timeout",e)},u=function(t){return a(t,"ll-timeout")},d=function(t,e){t&&t(e)},f=function(t,e){t._loadingCount+=e,0===t._elements.length&&0===t._loadingCount&&d(t._settings.callback_finish)},_=function(t){for(var e,n=[],o=0;e=t.children[o];o+=1)"SOURCE"===e.tagName&&n.push(e);return n},v=function(t,e,n){n&&t.setAttribute(e,n)},g=function(t,e){v(t,"sizes",a(t,e.data_sizes)),v(t,"srcset",a(t,e.data_srcset)),v(t,"src",a(t,e.data_src))},b={IMG:function(t,e){var n=t.parentNode;n&&"PICTURE"===n.tagName&&_(n).forEach(function(t){g(t,e)});g(t,e)},IFRAME:function(t,e){v(t,"src",a(t,e.data_src))},VIDEO:function(t,e){_(t).forEach(function(t){v(t,"src",a(t,e.data_src))}),v(t,"src",a(t,e.data_src)),t.load()}},m=function(t,e){var n,o,r=e._settings,i=t.tagName,s=b[i];if(s)return s(t,r),f(e,1),void(e._elements=(n=e._elements,o=t,n.filter(function(t){return t!==o})));!function(t,e){var n=a(t,e.data_src),o=a(t,e.data_bg);n&&(t.style.backgroundImage='url("'.concat(n,'")')),o&&(t.style.backgroundImage=o)}(t,r)},h=function(t,e){o?t.classList.add(e):t.className+=(t.className?" ":"")+e},p=function(t,e,n){t.addEventListener(e,n)},y=function(t,e,n){t.removeEventListener(e,n)},E=function(t,e,n){y(t,"load",e),y(t,"loadeddata",e),y(t,"error",n)},w=function(t,e,n){var r=n._settings,i=e?r.class_loaded:r.class_error,a=e?r.callback_loaded:r.callback_error,s=t.target;!function(t,e){o?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")}(s,r.class_loading),h(s,i),d(a,s),f(n,-1)},I=function(t,e){var n=function n(r){w(r,!0,e),E(t,n,o)},o=function o(r){w(r,!1,e),E(t,n,o)};!function(t,e,n){p(t,"load",e),p(t,"loadeddata",e),p(t,"error",n)}(t,n,o)},k=["IMG","IFRAME","VIDEO"],O=function(t,e){var n=e._observer;x(t,e),n&&e._settings.auto_unobserve&&n.unobserve(t)},A=function(t){var e=u(t);e&&(clearTimeout(e),l(t,null))},L=function(t,e){var n=e._settings.load_delay,o=u(t);o||(o=setTimeout(function(){O(t,e),A(t)},n),l(t,o))},x=function(t,e,n){var o=e._settings;!n&&c(t)||(k.indexOf(t.tagName)>-1&&(I(t,e),h(t,o.class_loading)),m(t,e),function(t){s(t,"was-processed","true")}(t),d(o.callback_reveal,t),d(o.callback_set,t))},z=function(t){return!!n&&(t._observer=new IntersectionObserver(function(e){e.forEach(function(e){return function(t){return t.isIntersecting||t.intersectionRatio>0}(e)?function(t,e){var n=e._settings;d(n.callback_enter,t),n.load_delay?L(t,e):O(t,e)}(e.target,t):function(t,e){var n=e._settings;d(n.callback_exit,t),n.load_delay&&A(t)}(e.target,t)})},{root:(e=t._settings).container===document?null:e.container,rootMargin:e.thresholds||e.threshold+"px"}),!0);var e},N=["IMG","IFRAME"],C=function(t,e){return function(t){return t.filter(function(t){return!c(t)})}((n=t||function(t){return t.container.querySelectorAll(t.elements_selector)}(e),Array.prototype.slice.call(n)));var n},M=function(t,e){this._settings=function(t){return _extends({},r,t)}(t),this._loadingCount=0,z(this),this.update(e)};return M.prototype={update:function(t){var n,o=this,r=this._settings;(this._elements=C(t,r),!e&&this._observer)?(function(t){return t.use_native&&"loading"in HTMLImageElement.prototype}(r)&&((n=this)._elements.forEach(function(t){-1!==N.indexOf(t.tagName)&&(t.setAttribute("loading","lazy"),x(t,n))}),this._elements=C(t,r)),this._elements.forEach(function(t){o._observer.observe(t)})):this.loadAll()},destroy:function(){var t=this;this._observer&&(this._elements.forEach(function(e){t._observer.unobserve(e)}),this._observer=null),this._elements=null,this._settings=null},load:function(t,e){x(t,this,e)},loadAll:function(){var t=this;this._elements.forEach(function(e){O(e,t)})}},t&&function(t,e){if(e)if(e.length)for(var n,o=0;n=e[o];o+=1)i(t,n);else i(t,e)}(M,window.lazyLoadOptions),M});

window.Shopify.theme.lazyload = () => {
  new LazyLoad({
    elements_selector: '.lazy',
    class_loading: 'lazy-loading',
    class_loaded: 'lazy-loaded',
    threshold: 300
  })
}

window.Shopify.theme.lazyload()

const activeLocation = location.pathname;
const isProductPage = (/\bproduct\b/).test(document.body.className);
const isCartPage = /\/cart+$/.test(activeLocation);
const isListCollectionPage = /^\/collections+$/.test(activeLocation);
const isCollectionPage = /^\/collections\/[^\/]+$/.test(activeLocation);
const isAccountPage = /^\/account/.test(activeLocation);

function getParams(url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

function getCookie(name) {
  var name = name + '=';
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];

    while (cookie.charAt(0)==' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return '';
}

window.Shopify.theme.collAtc = () => {
  const select = $('.option_selector')

  select.change(function() {
    const productId = $(this).attr('data-select-id')
    const id = $(this).val()
    const variant = window.variants.find(v => v.id === Number(id))

    $(`[data-productid="${productId}"]`).val(variant.id)
    changePrice(variant, productId)
    changeAtcText(variant.quantity, variant.available, productId)

    if (!variant.image.includes('no-image')) {
      changeImage(variant.image, productId)
    }
  })

  function changeImage(image, prodId) {
    $(`#product-${prodId}`).find('img').attr('src', image).attr('data-src', image)
    $(`#product-${prodId}`).find('source').attr('srcset', `${image} 1x`).attr('data-srcset', `${image} 1x`)
  }

  function changePrice(variant, prodId) {
    $(`#product-${prodId}`).find('.regular-price').text(variant.price)
    if (variant.compare_at_price.length) {
      $(`#product-${prodId}`).find('.compare-price').text(variant.compare_at_price)
    }
  }

  function changeAtcText(quantity, available, prodId) {
    if (available && quantity > 0) {
      $(`#product-${prodId}`).find('.button-collection').text(`Add to cart`).removeAttr('disabled')
    } else {
      $(`#product-${prodId}`).find('.button-collection').text(`Sold out`).attr('disabled', 'disabled')
    }
  }
}

window.Shopify.theme.collAtc()

var state = {
  qty: Number($('#quantity').val())
}
/* Pablo - below is where the product page code is set */
if (isProductPage) {
  var isSub = window.isSub;
  var subscription_discount = window.subscription_discount;
  var product = window.product;
  var selectedVariant = $('input[name="type-swatch"]').length !== 0
    ? JSON.parse($('input[name="type-swatch"]:checked').attr('variant'))
    : JSON.parse('null')
  var atcText = "Add to cart"
  var atcTextSold = "Sold out"
  var atc = $('#cta-add-to-cart, #productQuickAdd_button')
  var subDiscount = 0
  var isPreorder = $('#preorder-tos').length
  var totalPrice = $('.product-total')

  if (isPreorder) {
    atcText = 'PRE-ORDER'
    $(atc).attr('disabled', 'disabled')
  }

  $('#preorder-tos').on('change', function() {
    if ($(this).is(':checked')) {
      $(atc).removeAttr('disabled')
    } else {
      $(atc).attr('disabled', 'disabled')
    }
  })

  $('.qtyDown').on('click', function() {
    let value = parseInt(document.getElementById('quantity').value, 10)
    if (value < 2) return value = 1
    value--
    $('#quantity').val(value)

    state.qty = Number($('#quantity').val())
    updatePrices(state.variant)
  })

  $('.qtyUp').on('click', function() {
    let value = parseInt(document.getElementById('quantity').value, 10)
    value++
    $('#quantity').val(value)

    state.qty = Number($('#quantity').val())
    updatePrices(state.variant)
  })

  function formatPrice(price) {
    return Shopify.formatMoney(price, Shopify.currencyFormat)
  }

  if (selectedVariant) {
    state.variant = selectedVariant
  }

  function updateState(variant) {
    if (!history.replaceState || !variant.id) return
    const newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id
    window.history.replaceState({ path: newurl }, '', newurl)
  }

  function updatePrices(variant) {
    switch (state.qty) {
      case 1:
        subDiscount = 0.00
        break
      case 2:
        subDiscount = 0.10
        break
      case 3:
        subDiscount = 0.15
        break
      default:
        subDiscount = 0.10
    }
    if (!subscription_discount){
      subDiscount = 0.00
    }

    const qty = state.qty
    const price = variant.price
    const discountedPrice = price - (price * subDiscount).toFixed()
    const regPrice = formatPrice(price * qty)
    const regDiscountedPrice = formatPrice(discountedPrice * qty)

    if (variant.available) {
      if (!isPreorder) {
        $(atc).removeAttr('disabled')
        if (variant.compare_at_price) {
          $(totalPrice).html(`${formatPrice(price)} - <span class="compare-price">${formatPrice(variant.compare_at_price)}</span>`)
        } else {
          $(totalPrice).html(`${formatPrice(price)}`)
        }
      }

      if (isSub && subscription_discount) {
        if ($('#onetime').is(':checked')) {
          $(atc).html(`${atcText} - ${regPrice}`)
          $('.reg-price').html(`${formatPrice(price)}`)
          $('.sub-price').html(`${formatPrice(discountedPrice)}`)
          if (variant.compare_at_price) {
            $(totalPrice).html(`${formatPrice(price)} - <span class="compare-price">${formatPrice(variant.compare_at_price)}</span>`)
          } else {
            $(totalPrice).html(`${formatPrice(price)}`)
          }
        } else {
          $(atc).html(`${atcText} - ${regDiscountedPrice}`)

          $('.reg-price').html(`${formatPrice(price)}`)
          $('.sub-price').html(`${formatPrice(discountedPrice)}`)
          const compare_at_price = variant.compare_at_price || price
          $(totalPrice).html(`${formatPrice(discountedPrice)} - <span class="compare-price">${formatPrice(compare_at_price)}</span>`)
        }
      } else {
        $(atc).html(`${atcText} - ${regPrice}`)
      }
    } else if (!isPreorder && !variant.available) {
      $('.sub-price').html(`${formatPrice(discountedPrice)}`)
      $(atc).html(atcTextSold).attr('disabled', 'disabled')

      const compare_at_price = product.compare_at_price
      $('.reg-price').html(`${formatPrice(price)}`)
      $('.sub-price').html(`${formatPrice(discountedPrice)}`)
      if (compare_at_price){
        $(totalPrice).html(`${formatPrice(discountedPrice)} - <span class="compare-price">${formatPrice(compare_at_price)}</span>`)
      } else {
        $(totalPrice).html(`${formatPrice(price)}`)
      }

    }
  }

  function updateInfo(variant) {
    const atc = $('#cta-add-to-cart, #productQuickAdd_button')
    state.variant = variant

    if (variant.featured_image) {
      $('.product_featuredImage').attr('src', variant.featured_image.src)
    }

    if (variant.available) {
      updatePrices(variant)
      $('#hideOnSubmit').hide()
      $('#BIS_trigger').hide()
    } else {
      $(atc).html(atcTextSold).attr('disabled', true)
      $('#hideOnSubmit').show()
      $('#BIS_trigger').show()
    }
  }
/* Pablo - Below is the code that runs when a product variant is selected. If we can trigger this after making an option choice it can work. Possibly by having an option choice change a hidden varient select */
  $('.swatch :radio').change(function() {
    const option = $(this).closest('.swatch').attr('data-option')
    const val = $(this).val()

    if (option === 'type') {
      const variant = JSON.parse($(this).attr('variant'))
      $('#product-select').val(val).trigger('change')

      updateInfo(variant)
      updateState(variant)

      $('.purchase-type :radio').change(function() {
        updateInfo(variant)
      })
    }

    if (option === 'qty') {
      $('[name="quantity"]').val(val).trigger('change')
      state.qty = Number(val)
      updatePrices(state.variant)

      if (val === '1') {
        $('[data-period="14"]').addClass('hidden')
        $('[data-period="30"] label').click()
      } else {
        $('[data-period="14"]').removeClass('hidden')
        $('[data-period="30"] label').click()
      }
    }
  })

  if (isSub) {
    /*
    $('[name="selling_plan"]').each(function() {
      $(this).removeAttr('checked')
    })
    $('.product_formInner .button').css('margin-left', '10px')
    $('.swatch-subscription').addClass('hidden')
    $('[name="quantity"]').val('1').trigger('change')
    $('.quantity').removeClass('hidden').val(1)
    $('.installments__modal--trigger').removeClass('hidden')
    state.qty = 1    
    console.log("SUBBED")
    */
    $('.purchase-type :radio').change(function() {
      const val = $(this).val()
      
      console.log("is sub")
      console.log(val)

      if (val === 'autodeliver') {
        $('.swatch-subscription[data-option="frequency"] [data-period="30"] input').click()
        $('.swatch-subscription').removeClass('hidden')
        $('.quantity').addClass('hidden')
        $('.product_formInner .button').css('max-width', '100%')
        $('.product_formInner .button').css('margin-left', '0px')
        state.qty = 2
        $('#2').click()
        $('[name="quantity"]').val('2')
        $('.installments__modal--trigger').addClass('hidden')
      } else {
        $('[name="selling_plan"]').each(function() {
          $(this).removeAttr('checked')
        })

        $('.product_formInner .button').css('margin-left', '10px')
        $('.swatch-subscription').addClass('hidden')
        $('[name="quantity"]').val('1').trigger('change')
        $('.quantity').removeClass('hidden').val(1)
        $('.installments__modal--trigger').removeClass('hidden')
        state.qty = 1
      }

      updateInfo(state.variant)
    })
  }

  const params = getParams(location.href)

  window.onload = () => {
    setTimeout(() => {
      if (params.frequency) {
        $('#sub').click()
        $(`#${params.frequency}`).click()
      }

      if (params.qty) {
        if ($(`#${params.qty}`).length) {
          $(`#${params.qty}`).click()
        } else {
          $(`[data-qty="${params.qty}"]`).click()
        }
      }

      setTimeout(() => {
        if (params.frequency || params.qty) {
          $('#cta-add-to-cart').click()
        }
      }, 500);
    }, 1500);
  }
}

/**
 * Cookie Consent
 */
window.addEventListener('DOMContentLoaded', function(event) {
  var cookieConsent = document.querySelector('.cookieConsent');
  var consentCookie = getCookie('accepted_cookies');
  var newsletterPopup = document.getElementById('newsletter-popup');
  var signedUpCookie = getCookieAlt('signed_up');

  if (consentCookie) {
    hideCookieBar();
  }

  if(!signedUpCookie){
    showNewsletterPopup();
  }

  function hideCookieBar() {
    cookieConsent.classList.remove('cookieConsent-active');
  }

  function showNewsletterPopup() {
    if(newsletterPopup){
      setTimeout( function(){
        console.log("Should show up now");
       newsletterPopup.classList.toggle('hidden');
        document.getElementById('newsletterPopup_overlay').classList.toggle('hidden');
      },20000)
    }
  }
});

/**
 * Product theme
 */
var newsletter = document.getElementById('newsletter-footer');

if (isProductPage) {
  var newsletterTheme = document.querySelector('.product.section').getAttribute('newsletter-theme');

  // Change newsletter based theme
  if (newsletterTheme === 'dark') {
    newsletter.classList.add('newsletter-dark')
  }
}

/**
 * Toggle linklists in mobile navigation
 */
var footer = document.querySelector('.footer');

if (footer) {
var footerLinks = Array.from(footer.querySelectorAll('.footer_section'));
  footerLinks.forEach(function(linklist) {
    var button = linklist.querySelector('.footer_sectionTitle');
    var nestedlist = linklist.querySelector('.footer_links');
    var chevronIcon = linklist.querySelector('.icon_chevron');

    button.addEventListener('click', function(event) {
      event.preventDefault()

      // Rotate icon on click
      if (chevronIcon.classList.contains('icon_chevron-rotated')) {
        chevronIcon.classList.remove('icon_chevron-rotated');
      } else {
        chevronIcon.classList.add('icon_chevron-rotated');
      }

      // Toggle accordions
      if (nestedlist.classList.contains('footer_links-open')) {
        nestedlist.classList.remove('footer_links-open');
      } else {
        nestedlist.classList.add('footer_links-open');
      }
    });
  });
}
function getCookieAlt(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Product Carousel home page
function setEqualHeights() {
  const featureProductContainers = document.querySelectorAll('.featuredProduct_row')
  const featureProductContainersArr = Array.from(featureProductContainers)
  let maxHeigth = 0
  let heights = []
  featureProductContainersArr.map(item => {
    heights.push(item.clientHeight)
  })

  maxHeigth = Math.max(...heights)

  featureProductContainersArr.map(item => {
    item.style.height = maxHeigth + 'px'
  })
}

setEqualHeights()
window.addEventListener('resize', setEqualHeights)

var readMoreText = Shopify.ReadMoreText
var readLessText = Shopify.ReadLessText
let expandableTexts = Array.from(document.querySelectorAll('.expandableText')) || null

if (expandableTexts) {
  expandableTexts.forEach(function(expandableText) {
    let textContainers = Array.from(document.querySelectorAll('.expandableText_text'))
    textContainers.map(textContainer => {

      let textContainerParagraphs = Array.from(textContainer.querySelectorAll('p, h2, h3, h4, a')) || null
      console.log(textContainerParagraphs)
      textContainerParagraphs.map((text, i) => {
        if(i > 2) {
          text.classList.add('hidden')
        }
      })

      let button = expandableText.querySelector('.expandableText_button') || null

      if (button) {
        button.addEventListener('click', function(event) {
          event.preventDefault()
          expandableText.classList.toggle('expandableText-expanded')

          textContainerParagraphs.map((text, i) => {
            if(i > 2) {
              text.classList.toggle('hidden')
            }
          })

          if(button.innerHTML == readMoreText) {
            button.innerHTML = readLessText
          } else {
            button.innerHTML = readMoreText
          }
        })
      }
    })
  })
}

$('#billing_details button[type="button"').attr('onclick', 'submitFormAlt()')

function submitFormAlt() {
  const form = $('#billing_details')
  form.children('button').attr('disabled', true)

  $.ajax({
    type: 'POST',
    data: form.serialize(),
    url: window.location.href,
    success: function () {
      window.location.href = '/account'
    },
    error: function () {
      alert('An error occured. Please reload the page and try again.')
    },
    complete: function() {
      form.children('button').attr('disabled', false)
    }
  })
}

$('.productCardImage_container').on('mouseenter', function() {
  const color = $(this).attr('data-bg')
  $(this).css('background-color', color)
}).on('mouseleave', function() {
  $(this).css('background-color', '#fff')
})

if (location.href.includes('recurring')) {
  $('body').addClass('template-recharge')
  $('.recharge .rc_layout__content').attr('style', 'max-width: initial !important')
}

$('.klarna').click(function() {
  $('.klarna-modal').fadeIn('fast')
})

$('.klarna-modal-close').on('click', function() {
  $('.klarna-modal').fadeOut('fast')
})

$('.header-menu-trigger').on('click', function() {
  $('.header-drawer').toggleClass('header-drawer--open')
  $('#overlay-full').toggle()
})

$('.search--toggle').on('click', function() {
  $('.header-search').toggleClass('header-search--open')
  $('body').toggleClass('locked')

  if ($('.header-search').hasClass('header-search--open')) {
    $('#header-search').focus()
  }
})

$('.size-guide--trigger').on('click', function() {
  $('.size-guide__modal').toggleClass('size-guide__modal--open')
})

$('.apparel-disclaimer--trigger').on('click', function() {
  $('.apparel-disclaimer__modal').toggleClass('apparel-disclaimer__modal--open')
})

$('.loyalty-popup--trigger').on('click', function() {
  $('.loyalty-popup__modal').toggleClass('loyalty-popup__modal--open')
  $('body').toggleClass('fixed-body')
})

$('.purchase-type__modal--trigger').on('click', function() {
  $('.purchase-type__modal').toggleClass('purchase-type__modal--open')
})

$('.installments__modal--trigger').on('click', function() {
  $('.installments__modal').toggleClass('installments__modal--open')
})

$('#overlay-full').on('click', function() {
  if ($('.header-drawer').hasClass('header-drawer--open')) {
    $('.header-drawer').removeClass('header-drawer--open')
  }

  $('#overlay-full').hide()
})

$('#shipping_country').on('change', function() {
  const val = $(this).val()

  location.href = val
})

function renderSearchProducts(products) {
  let markup = ''

  products.forEach(product => {
    markup += `
      <a class="header-search__item" href="${product.url}">
        <img
          src="${product.featured_image.url}"
          alt="${product.featured_image.alt}"
          width="245"
          height="265"
        />

        <div class="header-search__item-title">
          ${product.title}
        </div>
      </a>
    `
  })

  return markup
}

$('#header-search').on('change keyup', function() {
  const val = $(this).val().trim()

  if (!val.length) {
    $('.header-search__recommendations, .header-search__popular').show()
    $('.header-search__results').hide().html('')
    return
  }

  fetch(`/search/suggest.json?q=${val}&resources[type]=product`)
    .then(res => res.json())
    .then(res => {
      const products = res.resources.results.products
        .filter(product => !product.tags.includes('exclude_search'))

      const markup = `
        <div class="header-search__results-title">
          ${products.length} products found
        </div>

        <div class="header-search__results-inner">
          ${renderSearchProducts(products)}
        </div>
      `

      $('.header-search__recommendations, .header-search__popular').hide()
      $('.header-search__results').show().html(markup)
    })
})

$('.header-search__recommendation').on('click', function() {
  const val = $(this).text().trim()

  $('#header-search').val(val).change().trigger('change')
})

$('.header__nav ul li').on('mouseenter', function() {
  if ($(this).siblings().first().hasClass('header__meganav-wrapper')) {
    $('#overlay').show()
  }
})

$('.header__meganav-wrapper, .header__nav ul li').on('mouseenter mouseleave', function() {
  if ($('.header__meganav-wrapper').is(':visible')) {
    $('#overlay').show()
  } else {
    $('#overlay').hide()
  }
})

$('.product_description--toggle').on('click', function() {
  $('.product_description').toggleClass('product_description--open')

  if ($(this).text().trim() === 'Read More') {
    $(this).text('Read Less')
  } else {
    $(this).text('Read More')
  }
})
