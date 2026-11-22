// Sprachwahl für impressum.html und datenschutz.html (?lang=uk / ?lang=pl, Standard: de)
(function(){
  const langs = ["de","uk","pl"];
  const groupLabel = {de:"Sprache", uk:"Мова", pl:"Język"};
  const demoLabel = {de:"Hinweis", uk:"Примітка", pl:"Uwaga"};
  function setLang(l){
    if (!langs.includes(l)) l = "de";
    document.documentElement.lang = l;
    const g = document.querySelector(".lang[role=group]"); if (g) g.setAttribute("aria-label", groupLabel[l]);
    const d = document.querySelector(".demo-banner"); if (d) d.setAttribute("aria-label", demoLabel[l]);
    langs.forEach(k => document.getElementById("lang-" + k).setAttribute("aria-pressed", k === l));
    const q = l === "de" ? "" : "?lang=" + l;
    document.querySelectorAll("a.keep-lang").forEach(a => { a.href = a.getAttribute("href").split(/[?#]/)[0] + q + (a.hash || ""); });
    try { history.replaceState(null, "", location.pathname + q); } catch (e) {}
  }
  langs.forEach(k => document.getElementById("lang-" + k).addEventListener("click", () => setLang(k)));
  setLang(new URLSearchParams(location.search).get("lang") || "de");
})();
