/* =====================================================================
   Comportements propres à chaque page (accueil, démarches, carte, etc.)
   ===================================================================== */
(function () {
  "use strict";
  var S = window.SITE || {}, K = window.KK, page = document.body.getAttribute("data-page");
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  // ---------- Recherche (accueil et démarches)
  $$(".recherche form").forEach(function (f) { K.brancherRecherche(f); });

  // ---------- Motif du héros : contour réel de la commune
  var motif = $("#hero-motif");
  if (motif) motif.innerHTML = K.contourSVG("hero-motif", 600, 520);

  // ---------- Actualités et agenda
  var actus = window.ACTUALITES || [], agenda = (window.AGENDA || []).slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
  var zA = $("#actus"), zE = $("#agenda");
  if (zA) { var n = +(zA.getAttribute("data-nombre") || actus.length); zA.innerHTML = actus.slice(0, n).map(K.actuHTML).join(""); }
  if (zE) { var m = +(zE.getAttribute("data-nombre") || agenda.length); zE.innerHTML = agenda.slice(0, m).map(K.evtHTML).join(""); }

  // ---------- Démarches les plus demandées (accueil)
  var pop = $("#populaires");
  if (pop) pop.innerHTML = (window.DEMARCHES || []).filter(function (d) { return d.populaire; }).map(function (d) {
    return '<a class="dem" href="demarches.html#' + d.id + '"><span class="pastille"><i data-lucide="file-text"></i></span><span><h3>' + K.esc(d.titre) + "</h3><p>" + K.esc(d.resume) + '</p></span><i class="chevron" data-lucide="chevron-right"></i></a>';
  }).join("");

  // ---------- Page Démarches
  if (page === "demarches") demarches();
  function demarches() {
    var D = window.DEMARCHES, C = window.CATEGORIES, P = window.PROFILS;
    var etat = { cat: "", profil: "", q: "" };
    var catBox = $("#f-cat"), proBox = $("#f-profil"), liste = $("#dem-liste"), champ = $("#dem-q"), compteur = $("#dem-compteur");
    catBox.innerHTML = '<button type="button" data-cat="" aria-pressed="true"><i data-lucide="layers"></i>Toutes<span class="nb">' + D.length + "</span></button>" +
      C.map(function (c) { var nb = D.filter(function (d) { return d.cat === c.id; }).length; return '<button type="button" data-cat="' + c.id + '" aria-pressed="false"><i data-lucide="' + c.icone + '"></i>' + K.esc(c.nom) + '<span class="nb">' + nb + "</span></button>"; }).join("");
    proBox.innerHTML = '<button type="button" data-profil="" aria-pressed="true"><i data-lucide="users-round"></i>Tous les publics</button>' +
      P.map(function (p) { return '<button type="button" data-profil="' + p.id + '" aria-pressed="false"><i data-lucide="chevron-right"></i>' + K.esc(p.nom) + "</button>"; }).join("");
    function nomCat(id) { var c = C.filter(function (x) { return x.id === id; })[0]; return c ? c : { nom: "", icone: "file-text" }; }
    function rendre() {
      var q = K.norm(etat.q).trim(), mots = q ? q.split(/\s+/) : [];
      var r = D.filter(function (d) {
        if (etat.cat && d.cat !== etat.cat) return false;
        if (etat.profil && d.profils.indexOf(etat.profil) < 0) return false;
        var t = K.norm(d.titre + " " + d.resume + " " + d.pieces.join(" ") + " " + nomCat(d.cat).nom);
        return mots.every(function (m) { return t.indexOf(m) >= 0; });
      });
      compteur.textContent = r.length + (r.length > 1 ? " démarches" : " démarche");
      liste.innerHTML = r.length ? r.map(function (d) {
        return '<button class="dem" type="button" data-id="' + d.id + '"><span class="pastille' + (d.cat === "signalement" ? " rouge" : "") + '"><i data-lucide="' + nomCat(d.cat).icone + '"></i></span><span><h3>' + K.esc(d.titre) + (K.formulaireDe && K.formulaireDe(d.id) ? ' <span class="etiquette en-ligne">En ligne</span>' : "") + "</h3><p>" + K.esc(d.resume) + '</p></span><i class="chevron" data-lucide="chevron-right"></i></button>';
      }).join("") : '<div class="dem-vide">Aucune démarche ne correspond. Contactez la mairie : nous vous orienterons.</div>';
      K.icones(liste);
    }
    function presser(box, attr, val) { $$("button", box).forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute(attr) === val); }); }
    catBox.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; etat.cat = b.getAttribute("data-cat"); presser(catBox, "data-cat", etat.cat); rendre(); });
    proBox.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; etat.profil = b.getAttribute("data-profil"); presser(proBox, "data-profil", etat.profil); rendre(); });
    champ.addEventListener("input", function () { etat.q = champ.value; rendre(); });
    liste.addEventListener("click", function (e) { var b = e.target.closest(".dem"); if (b) ouvrir(b.getAttribute("data-id")); });

    var dlg = $("#fiche"), dernier = null;
    function ouvrir(id) {
      var d = D.filter(function (x) { return x.id === id; })[0]; if (!d) return;
      if (d.lien) { location.href = d.lien; return; }
      dernier = document.activeElement;
      var c = nomCat(d.cat);
      dlg.innerHTML = '<div class="fiche-tete"><span class="etiquette">' + K.esc(c.nom) + '</span><h2 id="fiche-titre">' + K.esc(d.titre) + "</h2><p>" + K.esc(d.resume) + '</p><button class="fiche-fermer" type="button" aria-label="Fermer la fiche"><i data-lucide="x"></i></button></div>' +
        '<div class="fiche-corps"><div class="fiche-infos"><div><b><i data-lucide="map-pin"></i>Où ?</b>' + K.esc(d.ou) + '</div><div><b><i data-lucide="clock"></i>Délai</b>' + K.esc(d.delai) + '</div><div><b><i data-lucide="hand-coins"></i>Coût</b>' + K.esc(d.cout) + "</div></div>" +
        '<div><h3>Qui peut faire la démarche ?</h3><p style="margin:0">' + K.esc(d.qui) + "</p></div>" +
        '<div><h3>Pièces à fournir <small style="font-weight:500;color:var(--gris)">(cochez au fur et à mesure)</small></h3><ul class="coches">' + d.pieces.map(function (p, i) { return '<li><input type="checkbox" id="pc' + i + '"><label for="pc' + i + '">' + K.esc(p) + "</label></li>"; }).join("") + "</ul></div>" +
        (d.etapes ? '<div><h3>Les étapes</h3><ol class="etapes">' + d.etapes.map(function (s) { return "<li>" + K.esc(s) + "</li>"; }).join("") + "</ol></div>" : "") +
        (d.infos ? '<div class="bon-a-savoir"><b>Bon à savoir.</b> ' + K.esc(d.infos) + "</div>" : "") +
        '<div class="avertissement" style="margin:0"><i data-lucide="info"></i><span>Informations indicatives à confirmer auprès des services de la mairie avant de vous déplacer.</span></div>' +
        '<div class="fiche-actions">' + (K.formulaireDe && K.formulaireDe(d.id) ? '<a class="btn btn-or" href="' + K.formulaireDe(d.id) + '"><i data-lucide="send"></i>Faire la demande en ligne</a>' : "") +
        '<button class="btn btn-plein" type="button" data-action="imprimer"><i data-lucide="printer"></i>Imprimer ma liste</button><a class="btn btn-ligne" href="contact.html"><i data-lucide="mail"></i>Poser une question</a></div></div>';
      dlg.setAttribute("aria-labelledby", "fiche-titre");
      K.icones(dlg);
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
      history.replaceState(null, "", "#" + d.id);
      $(".fiche-fermer", dlg).focus();
    }
    function fermer() { if (dlg.open) dlg.close(); }
    dlg.addEventListener("close", function () { history.replaceState(null, "", location.pathname + location.search); if (dernier) dernier.focus(); });
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg) fermer();
      if (e.target.closest(".fiche-fermer")) fermer();
      if (e.target.closest('[data-action="imprimer"]')) window.print();
    });

    function lireHash() {
      var h = decodeURIComponent(location.hash.slice(1));
      if (h.indexOf("cat=") === 0) { etat.cat = h.slice(4); presser(catBox, "data-cat", etat.cat); }
      else if (h.indexOf("q=") === 0) { etat.q = h.slice(2); champ.value = etat.q; }
      rendre();
      if (h && D.some(function (d) { return d.id === h; })) ouvrir(h);
    }
    window.addEventListener("hashchange", lireHash);
    lireHash();
  }

  // ---------- Cartes
  if ($("#carte-commune")) K.carte("carte-commune");

  // ---------- Horaires et coordonnées (pages Mairie et Contact)
  var hTr = (S.horaires || []).map(function (h) { return "<tr><td>" + K.esc(h[0]) + "</td><td>" + K.esc(h[1]) + "</td></tr>"; }).join("");
  $$("#horaires-mairie tbody, #horaires-contact tbody").forEach(function (t) { t.innerHTML = hTr; });
  var c = S.contact || {};
  if ($("#tel-mairie")) { $("#tel-mairie").textContent = c.telephone; $("#mail-mairie").textContent = c.email; }
  if ($("#contact-adresse")) $("#contact-adresse").innerHTML = "<b>" + K.esc(c.adresse) + "</b><br>Téléphone : " + K.esc(c.telephone) + "<br>Courriel : " + K.esc(c.email) + (c.whatsapp ? "<br>WhatsApp : " + K.esc(c.whatsapp) : "");

  // ---------- Lien vers l'application cartographique
  $$("[data-qwc]").forEach(function (a) { a.href = S.qwc; });
  K.icones();
})();
