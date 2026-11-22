// Sprachwahl für impressum.html und datenschutz.html (?lang=uk / ?lang=pl, Standard: de)
(function(){
  const langs = ["de","uk","pl"];
  const groupLabel = {de:"Sprache", uk:"Мова", pl:"Język"};
  const demoLabel = {de:"Hinweis", uk:"Примітка", pl:"Uwaga"};
  // Footer-Links und Seitentitel; „Impressum“ bleibt als Begriff, in UA/PL mit Erklärung
  const t = {
    home:    {de:"Start", uk:"Головна", pl:"Start"},
    imprint: {de:"Impressum", uk:"Impressum (вихідні дані)", pl:"Impressum (nota prawna)"},
    privacy: {de:"Datenschutz", uk:"Захист даних", pl:"Ochrona danych"}
  };
  const page = location.pathname.includes("datenschutz") ? "privacy" : "imprint";
  const pageTitle = {de:{imprint:"Impressum", privacy:"Datenschutz"}, uk:{imprint:"Impressum (вихідні дані)", privacy:"Захист даних"}, pl:{imprint:"Impressum (nota prawna)", privacy:"Ochrona danych"}};
  function setLang(l){
    if (!langs.includes(l)) l = "de";
    document.documentElement.lang = l;
    const g = document.querySelector(".lang[role=group]"); if (g) g.setAttribute("aria-label", groupLabel[l]);
    const d = document.querySelector(".demo-banner"); if (d) d.setAttribute("aria-label", demoLabel[l]);
    langs.forEach(k => document.getElementById("lang-" + k).setAttribute("aria-pressed", k === l));
    document.querySelectorAll("[data-t]").forEach(el => { el.textContent = t[el.dataset.t][l]; });
    document.title = pageTitle[l][page] + " · Lena Hoffmann Hair (Demo)";
    const q = l === "de" ? "" : "?lang=" + l;
    document.querySelectorAll("a.keep-lang").forEach(a => { a.href = a.getAttribute("href").split(/[?#]/)[0] + q + (a.hash || ""); });
    try { history.replaceState(null, "", location.pathname + q); } catch (e) {}
  }
  langs.forEach(k => document.getElementById("lang-" + k).addEventListener("click", () => setLang(k)));
  setLang(new URLSearchParams(location.search).get("lang") || "de");
})();
