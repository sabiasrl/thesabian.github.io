(function () {
  var STORAGE_KEY = "sabia-web-lang";
  var isItalianPage = /web-it\.html$/i.test(location.pathname);
  var isEnglishPage = /web\.html$/i.test(location.pathname);
  if (!isItalianPage && !isEnglishPage) return;

  var params = new URLSearchParams(location.search);
  var forced = params.get("lang");
  if (forced === "en" || forced === "it") {
    try {
      localStorage.setItem(STORAGE_KEY, forced);
    } catch (e) {}
  }

  var stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (e) {}

  var preferred = forced || stored;
  if (!preferred) {
    var nav = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    preferred = nav.indexOf("it") === 0 ? "it" : "en";
  }

  if (preferred === "it" && isEnglishPage && forced !== "en") {
    var target = "web-it.html";
    if (location.search) target += location.search.replace(/([?&])lang=en(&|$)/, "$1").replace(/[?&]$/, "");
    location.replace(target);
    return;
  }

  if (preferred === "en" && isItalianPage && forced !== "it") {
    var targetEn = "web.html";
    if (location.search) targetEn += location.search.replace(/([?&])lang=it(&|$)/, "$1").replace(/[?&]$/, "");
    location.replace(targetEn);
    return;
  }

  document.querySelectorAll("[data-lang-set]").forEach(function (link) {
    link.addEventListener("click", function () {
      var lang = link.getAttribute("data-lang-set");
      if (lang) {
        try {
          localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {}
      }
    });
  });
})();
