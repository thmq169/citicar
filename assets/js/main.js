var lng = "vi";

(function () {
  "use strict";
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  let selectTopbar = select("#topbar");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("d-none");
        selectTopbar.classList.add("d-none");
      } else {
        selectHeader.classList.remove("d-none");
        selectTopbar.classList.remove("d-none");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  /**
   * Owl Carousel
   */
  $(".owl-carousel-car-brands.owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 6,
      },
    },
  });

  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    nav: false,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });

  var owl = $(".owl-carousel");
  owl.owlCarousel();
  $(".portfolio-carousel-btn-next").click(function () {
    owl.trigger("next.owl.carousel");
  });
  $(".portfolio-carousel-btn-prev").click(function () {
    owl.trigger("prev.owl.carousel", [300]);
  });

  getLanguage();
})();

var language;

function setLanguage() {
  history.pushState("", "", `?lng=${lng}`);
  location.reload();
}

function getLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  lng = urlParams.get("lng");
  console.log(lng);

  if (lng == null) {
    lng = "vi";
  }

  if (lng == "vi") {
    $("#setLanguage").html("EN<i class='flag-united-kingdom flag m-0'></i>");
  } else if (lng == "en") {
    $("#setLanguage").html("VI");
  } else {
    window.location.href = "http://127.0.0.1:5500/";
  }

  $.ajax({
    url: "assets/languages/" + lng + ".json",
    dataType: "json",
    async: false,
    dataType: "json",
    success: function (lang) {
      language = lang;
    },
  });

  if (lng == "vi") {
    lng = "en";
  } else if (lng == "en") {
    lng = "vi";
  }
  //

  $("#hero-title").text(language["hero-title"]);
  $("#hero-1").text(language["hero-1"]);
  $("#hero-2").text(language["hero-2"]);
  $("#hero-3").text(language["hero-3"]);
  $("#hero-btn").text(language["hero-btn"]);

  $("#service-title").text(language["services"].title);
  $("#service-subtitle").text(language["services"].subtitle);
  $(".service-head").each(function (index) {
    $(this).text(language["services"].heads[index]);
  });
  $(".service-desc").each(function (index) {
    $(this).text(language["services"].descs[index]);
  });

  $("#feature-title").text(language["features"].title);
  $(".feature-head").each(function (index) {
    $(this).text(language["features"].heads[index]);
  });
  $(".feature-desc").each(function (index) {
    $(this).text(language["features"].descs[index]);
  });

  $("#faq-title").text(language["faqs"].title);
  $("#faq-btn").text(language["faqs"].button);
  $(".faq-head").each(function (index) {
    $(this).text(language["faqs"].heads[index]);
  });
  $(".faq-desc").each(function (index) {
    $(this).html(language["faqs"].descs[index]);
  });

  $("#contact-title").text(language["contacts"].title);
  $("#contact-subtitle").html(language["contacts"].subtitle);
  $("#contact-btn").text(language["contacts"].button);
  $(".contact-footer-description").text(language["contacts"].footer);
  $(".contact-head").each(function (index) {
    $(this).text(language["contacts"].heads[index]);
  });
  $(".contact-desc").each(function (index) {
    $(this).text(language["contacts"].desc[index]);
  });
  $(".contact-address").html(language["contacts"].address);
}

// Check if the browser supports the 'popstate' event
if (window.history && window.history.pushState) {
  window.addEventListener("popstate", function (event) {
    // Handle the back button event here
    getLanguage();
    console.log("Back button pressed");
  });
} else {
  // Fallback for older browsers
  window.addEventListener("hashchange", function (event) {
    // Handle the back button event here
    getLanguage();
    console.log("Back button pressed");
  });
}
