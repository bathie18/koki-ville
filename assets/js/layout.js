/* =====================================================================
   Gabarit commun : bandeau, en-tête, menu, recherche, pied de page.
   Les textes viennent de config.js et des fichiers du dossier data/.
   ===================================================================== */
(function () {
  "use strict";
  var S = window.SITE || {};
  var page = document.body.getAttribute("data-page") || "";
  // Textes de config.js insérés dans les pages : <span data-site="nom"></span>
  document.querySelectorAll("[data-site]").forEach(function (e) { var v = S[e.getAttribute("data-site")]; if (typeof v === "string") e.textContent = v; });
  if (S.nom) document.title = document.title.replace(/Coki/g, S.nom);

  var MENU = [
    ["demarches.html", "Démarches", "demarches"],
    ["mairie.html", "La mairie", "mairie"],
    ["territoire.html", "Territoire", "territoire"],
    ["vivre.html", "Vivre à " + S.nom, "vivre"],
    ["projets.html", "Projets", "projets"],
    ["actualites.html", "Actualités", "actualites"],
    ["cooperation.html", "Coopération", "cooperation"]
  ];

  // Pages et mots-clés pour la recherche (en plus des démarches)
  var PAGES = [
    ["mairie.html", "Le maire et le conseil municipal", "mairie élus conseil municipal maire adjoints commissions", "landmark"],
    ["mairie.html#services", "Services municipaux et horaires", "services horaires état civil secrétariat accueil ouverture", "clock"],
    ["mairie.html#transparence", "Budget et délibérations", "budget délibérations transparence comptes administratif documents", "file-text"],
    ["mairie.html#competences", "Compétences de la commune", "compétences transférées décentralisation code collectivités", "scale"],
    ["territoire.html#carte", "Carte interactive de la commune", "carte plan sig localisation villages qwc limite", "map"],
    ["territoire.html", "Le territoire en chiffres", "territoire population superficie villages zones chiffres histoire", "chart-column"],
    ["territoire.html#histoire", "Histoire et patrimoine", "histoire patrimoine lat dior cayor daara bataille", "book-open"],
    ["vivre.html#education", "Écoles et éducation", "école écoles éducation collège lycée élèves tables-bancs daara franco-arabe", "school"],
    ["vivre.html#sante", "Santé", "santé poste de santé maternité soins", "stethoscope"],
    ["vivre.html#eau", "Eau potable", "eau forage borne-fontaine asufor salinité", "droplets"],
    ["vivre.html#agriculture", "Agriculture et élevage", "agriculture élevage arachide mil sésame champs gie", "wheat"],
    ["vivre.html#jeunesse", "Jeunesse et sport", "jeunesse sport asc stade football basket", "trophy"],
    ["vivre.html#daara", "Le Daara de Koki", "daara coran talibés islam culture culte serigne", "moon-star"],
    ["projets.html", "Projets de la commune", "projets forage stade espace vert financement bailleurs", "milestone"],
    ["actualites.html", "Actualités et agenda", "actualités agenda événements infos", "newspaper"],
    ["cooperation.html", "Coopération avec Dijon et partenaires", "coopération dijon france partenaires diaspora jumelage", "handshake"],
    ["contact.html", "Contacter la mairie", "contact téléphone courriel adresse écrire", "mail"],
    ["suivi.html", "Suivre ma demande", "suivi dossier numéro demande avancement état", "search"],
    ["contact.html#signaler", "Signaler un problème", "signaler problème panne éclairage piste déchets", "triangle-alert"]
  ];

  function el(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  window.KK = { esc: esc, norm: norm };

  // ---------- Bandeau + barre utilitaire + en-tête
  var tete = "";
  tete += '<a class="evitement" href="#contenu">Aller au contenu</a>';
  if (S.flash) tete += '<div class="flash" role="status"><div class="wrap"><i data-lucide="info"></i><span>' + esc(S.flash) + "</span></div></div>";
  tete += '<div class="utile"><div class="wrap"><div class="utile-g">' +
    '<span><i data-lucide="phone"></i>' + esc(S.contact && S.contact.telephone) + "</span>" +
    '<span><i data-lucide="map-pin"></i>' + esc(S.region) + "</span></div>" +
    '<div class="utile-d"><a href="suivi.html">Suivre ma demande</a><a href="contact.html#signaler">Signaler un problème</a>' +
    '<a href="' + esc(S.qwc) + '" target="_blank" rel="noopener">Application cartographique</a>' +
    '<span class="langue" title="Version en wolof en préparation"><b>FR</b><i>WO</i></span></div></div></div>';
  tete += '<header class="entete"><div class="wrap">' +
    '<a class="marque" href="index.html"><img src="assets/img/logo-commune.png" alt="" width="54" height="54">' +
    "<span><strong>Commune de " + esc(S.nom) + "</strong><small>" + esc(S.region) + "</small></span></a>" +
    '<nav class="nav" id="nav" aria-label="Menu principal">' +
    '<button class="btn btn-icone nav-fermer" type="button" aria-label="Fermer le menu" style="display:none"><i data-lucide="x"></i></button>' +
    MENU.map(function (m) { return '<a href="' + m[0] + '"' + (m[2] === page ? ' aria-current="page"' : "") + ">" + esc(m[1]) + "</a>"; }).join("") +
    '<a href="contact.html" class="nav-mobile-seul">Contact</a>' +
    "</nav>" +
    '<div class="entete-actions"><a class="btn btn-icone" href="territoire.html#carte" aria-label="Carte interactive" title="Carte interactive"><i data-lucide="map"></i></a>' +
    '<a class="btn btn-plein" href="contact.html">Contact</a>' +
    '<button class="btn btn-icone burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav"><i data-lucide="menu"></i></button></div>' +
    "</div></header>";
  document.body.insertBefore(el(tete), document.body.firstChild);

  // ---------- Pied de page
  var c = S.contact || {};
  var reseaux = Object.keys(S.reseaux || {}).filter(function (k) { return S.reseaux[k]; })
    .map(function (k) { return '<li><a href="' + esc(S.reseaux[k]) + '" target="_blank" rel="noopener">' + k.charAt(0).toUpperCase() + k.slice(1) + "</a></li>"; }).join("");
  var pied = '<footer class="pied"><div class="wrap"><div class="pied-grille">' +
    '<div><div class="pied-marque"><img src="assets/img/logo-commune.png" alt="" width="58" height="58"><div><strong>Commune de ' + esc(S.nom) + "</strong><br><small>" + esc(S.region) + "</small></div></div>" +
    "<p>" + esc(c.adresse) + "<br>Téléphone : " + esc(c.telephone) + "<br>Courriel : " + esc(c.email) + "</p>" +
    '<table class="horaires" aria-label="Horaires d\'ouverture"><tbody>' + (S.horaires || []).map(function (h) { return "<tr><td>" + esc(h[0]) + "</td><td>" + esc(h[1]) + "</td></tr>"; }).join("") + "</tbody></table></div>" +
    '<div><h3>Démarches</h3><ul><li><a href="demarches.html#cat=etat-civil">État civil</a></li><li><a href="demarches.html#cat=foncier">Foncier et urbanisme</a></li><li><a href="demarches.html#cat=economie">Marchés et taxes</a></li><li><a href="demarches.html#cat=associations">Associations</a></li><li><a href="contact.html#signaler">Signaler un problème</a></li><li><a href="suivi.html">Suivre ma demande</a></li></ul></div>' +
    '<div><h3>La commune</h3><ul><li><a href="mairie.html">Le maire et le conseil</a></li><li><a href="mairie.html#transparence">Budget et délibérations</a></li><li><a href="territoire.html">Territoire</a></li><li><a href="projets.html">Projets</a></li><li><a href="cooperation.html">Coopération</a></li></ul></div>' +
    '<div><h3>Suivre la commune</h3><ul><li><a href="actualites.html">Actualités et agenda</a></li><li><a href="' + esc(S.qwc) + '" target="_blank" rel="noopener">Application cartographique</a></li>' + (reseaux || '<li><span>Réseaux sociaux : à renseigner</span></li>') + "</ul></div>" +
    '</div><div class="pied-bas"><span>' + esc(S.pied) + '</span><span><a href="agent.html">Espace agents (démonstration)</a> · <a href="contact.html">Contact</a> · <a href="#" class="haut">Haut de page ↑</a></span></div></div></footer>';
  document.body.appendChild(el(pied));

  // ---------- Menu mobile
  var nav = document.getElementById("nav"), burger = document.querySelector(".burger"), fermer = document.querySelector(".nav-fermer");
  function basculer(o) { nav.classList.toggle("ouvert", o); burger.setAttribute("aria-expanded", o); if (o) fermer.focus(); }
  burger.addEventListener("click", function () { basculer(true); });
  fermer.addEventListener("click", function () { basculer(false); burger.focus(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("ouvert")) { basculer(false); burger.focus(); } });
  var ms = document.querySelector(".nav-mobile-seul");
  function majMobile() { ms.style.display = window.matchMedia("(max-width:980px)").matches ? "" : "none"; }
  majMobile(); window.addEventListener("resize", majMobile);
  document.querySelector(".haut").addEventListener("click", function (e) { e.preventDefault(); window.scrollTo({ top: 0 }); });

  // ---------- Recherche (démarches + pages)
  function indexer() {
    var idx = (window.DEMARCHES || []).map(function (d) {
      return { url: "demarches.html#" + d.id, titre: d.titre, sous: "Démarche · " + d.resume, cle: norm(d.titre + " " + d.resume + " " + (d.pieces || []).join(" ")), icone: "file-text" };
    });
    PAGES.forEach(function (p) { idx.push({ url: p[0], titre: p[1], sous: "Page du site", cle: norm(p[1] + " " + p[2]), icone: p[3] }); });
    return idx;
  }
  window.KK.brancherRecherche = function (form) {
    var input = form.querySelector("input"), box = form.parentNode.querySelector(".suggestions"), idx = indexer(), actif = -1, res = [];
    function rendre() {
      var q = norm(input.value).trim();
      if (q.length < 2) { box.classList.remove("ouvert"); return; }
      var mots = q.split(/\s+/);
      res = idx.map(function (it) {
        var s = 0; mots.forEach(function (m) { if (it.cle.indexOf(m) >= 0) s += 1; if (norm(it.titre).indexOf(m) >= 0) s += 2; });
        return [s, it];
      }).filter(function (x) { return x[0] > 0; }).sort(function (a, b) { return b[0] - a[0]; }).slice(0, 7).map(function (x) { return x[1]; });
      actif = -1;
      box.innerHTML = res.length ? res.map(function (r, i) {
        return '<a href="' + r.url + '" data-i="' + i + '"><i data-lucide="' + r.icone + '"></i><span>' + esc(r.titre) + "<small>" + esc(r.sous.slice(0, 90)) + "</small></span></a>";
      }).join("") : '<div class="vide">Aucun résultat. Essayez « naissance », « terrain », « école »…</div>';
      box.classList.add("ouvert"); icones(box);
    }
    input.addEventListener("input", rendre);
    input.addEventListener("keydown", function (e) {
      var liens = box.querySelectorAll("a");
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault(); if (!liens.length) return;
        actif = (actif + (e.key === "ArrowDown" ? 1 : -1) + liens.length) % liens.length;
        liens.forEach(function (l, i) { l.classList.toggle("actif", i === actif); });
      } else if (e.key === "Escape") box.classList.remove("ouvert");
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (actif >= 0 && res[actif]) location.href = res[actif].url;
      else if (res[0]) location.href = res[0].url;
      else location.href = "demarches.html#q=" + encodeURIComponent(input.value);
    });
    document.addEventListener("click", function (e) { if (!form.parentNode.contains(e.target)) box.classList.remove("ouvert"); });
  };

  // ---------- Contour de la commune en SVG (motif décoratif)
  window.KK.contourSVG = function (cls, w, h) {
    var g = window.LIMITE_COMMUNE; if (!g) return "";
    var ring = g.features[0].geometry.coordinates[0];
    var lat0 = ring.reduce(function (a, p) { return a + p[1]; }, 0) / ring.length, k = Math.cos(lat0 * Math.PI / 180);
    var xs = ring.map(function (p) { return p[0] * k; }), ys = ring.map(function (p) { return p[1]; });
    var minx = Math.min.apply(0, xs), maxx = Math.max.apply(0, xs), miny = Math.min.apply(0, ys), maxy = Math.max.apply(0, ys);
    var m = 12, sc = Math.min((w - 2 * m) / (maxx - minx), (h - 2 * m) / (maxy - miny));
    var ox = (w - (maxx - minx) * sc) / 2, oy = (h - (maxy - miny) * sc) / 2;
    var d = ring.map(function (p, i) { return (i ? "L" : "M") + ((p[0] * k - minx) * sc + ox).toFixed(1) + " " + ((maxy - p[1]) * sc + oy).toFixed(1); }).join("") + "Z";
    var cx = ((-15.984 * k - minx) * sc + ox).toFixed(1), cy = ((maxy - 15.5228) * sc + oy).toFixed(1);
    return '<svg class="' + cls + '" viewBox="0 0 ' + w + " " + h + '" aria-hidden="true"><path class="contour" d="' + d + '"/><circle cx="' + cx + '" cy="' + cy + '" r="7"/></svg>';
  };

  // ---------- Dates
  var MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  var MOIS_L = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  window.KK.date = function (iso, longue) { var d = iso.split("-"); return (+d[2]) + " " + (longue ? MOIS_L : MOIS)[+d[1] - 1] + " " + d[0]; };
  window.KK.dateBloc = function (iso) { var d = iso.split("-"); return "<b>" + (+d[2]) + "</b><span>" + MOIS[+d[1] - 1] + "</span>"; };
  window.KK.actuHTML = function (a) {
    return '<article class="actu"><div class="actu-visuel"><i data-lucide="' + esc(a.icone || "newspaper") + '"></i></div><div class="actu-corps">' +
      '<div class="actu-meta"><span class="etiquette">' + esc(a.rubrique) + "</span><time datetime=\"" + a.date + "\">" + window.KK.date(a.date, true) + "</time>" + (a.demo ? '<span class="etiquette demo">Exemple</span>' : "") + "</div>" +
      "<h3>" + esc(a.titre) + "</h3><p>" + esc(a.texte) + "</p></div></article>";
  };
  window.KK.evtHTML = function (e) {
    return '<div class="evt"><div class="evt-date">' + window.KK.dateBloc(e.date) + "</div><div><h3>" + esc(e.titre) + "</h3><p>" + esc(e.texte) + "</p>" +
      '<small><i data-lucide="map-pin"></i>' + esc(e.lieu) + (e.fin ? " · jusqu'au " + window.KK.date(e.fin, true) : "") + "</small>" + (e.demo ? ' <span class="etiquette demo">Exemple</span>' : "") + "</div></div>";
  };

  // ---------- Carte Leaflet avec la limite communale
  window.KK.carte = function (id, opts) {
    if (!window.L || !document.getElementById(id)) return null;
    var m = L.map(id, { scrollWheelZoom: false }).setView(S.carte.centre, S.carte.zoom);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "© les contributeurs d'OpenStreetMap" }).addTo(m);
    if (window.LIMITE_COMMUNE) {
      var lim = L.geoJSON(window.LIMITE_COMMUNE, { style: { color: "#0b5d3b", weight: 3, fillColor: "#e9b949", fillOpacity: .12 } }).addTo(m);
      lim.bindTooltip("Commune de " + S.nom);
      m.fitBounds(lim.getBounds(), { padding: [20, 20] });
    }
    return m;
  };

  // ---------- Icônes
  function icones(racine) { if (window.lucide) window.lucide.createIcons({ attrs: { "aria-hidden": "true" }, root: racine || document }); }
  window.KK.icones = icones;
  document.addEventListener("DOMContentLoaded", function () { icones(); });
  if (document.readyState !== "loading") icones();
})();
