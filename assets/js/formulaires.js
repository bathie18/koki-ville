/* =====================================================================
   Formulaires en ligne — DÉMONSTRATION
   Les dossiers sont conservés dans le navigateur (localStorage).
   Pour la mise en production : remplacer KK.store.enregistrer() par un
   envoi vers le service de la mairie et KK.store.statut() par une
   lecture du statut réel.
   ===================================================================== */
(function () {
  "use strict";
  var K = window.KK, F = window.FORMULAIRES || {}, ST = window.STATUTS || [];
  var page = document.body.getAttribute("data-page");
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  var esc = K.esc;

  // ------------------------------------------------------------------ Stockage
  var CLE = "koki-dossiers", CLE_STATUTS = "koki-statuts";
  function lire(cle, def) { try { return JSON.parse(localStorage.getItem(cle)) || def; } catch (e) { return def; } }
  function ecrire(cle, v) { try { localStorage.setItem(cle, JSON.stringify(v)); return true; } catch (e) { return false; } }
  var memoire = null; // si localStorage est indisponible (navigation privée stricte)

  K.store = {
    mesDossiers: function () { return memoire || lire(CLE, []); },
    enregistrer: function (form, donnees, extra) {
      var f = F[form] || {}, an = new Date().getFullYear();
      var rec = Object.assign({
        num: (f.prefixe || "DOS") + "-" + an + "-" + String(Math.floor(1000 + Math.random() * 9000)),
        form: form, date: new Date().toISOString().slice(0, 16), d: donnees, local: true
      }, extra || {});
      var tous = this.mesDossiers(); tous.unshift(rec);
      if (!ecrire(CLE, tous)) memoire = tous;
      return rec;
    },
    tous: function () {
      var mes = this.mesDossiers();
      var demo = (window.DEMO_DOSSIERS || []).map(function (x) { return Object.assign({ demo: true }, x); });
      var sig = (window.DEMO_SIGNALEMENTS || []).map(function (x) { return Object.assign({ demo: true, form: "signalement", d: { village: x.village, type: x.type, description: x.desc } }, x); });
      return mes.concat(demo, sig);
    },
    trouver: function (num) { num = String(num || "").trim().toUpperCase(); return this.tous().filter(function (r) { return r.num === num; })[0]; },
    // Statut : choisi par un agent (espace agents) ou, à défaut, simulé selon le temps écoulé
    statut: function (r) {
      var forces = lire(CLE_STATUTS, {});
      if (forces[r.num]) return forces[r.num];
      if (r.statut) return r.statut;
      var min = (Date.now() - new Date(r.date).getTime()) / 60000;
      return min < 3 ? "recu" : (min < 10 ? "instruction" : "pret");
    },
    changerStatut: function (num, s) { var forces = lire(CLE_STATUTS, {}); forces[num] = s; ecrire(CLE_STATUTS, forces); },
    reinitialiser: function () { try { localStorage.removeItem(CLE); localStorage.removeItem(CLE_STATUTS); } catch (e) {} memoire = null; }
  };
  function nomStatut(id) { var s = ST.filter(function (x) { return x.id === id; })[0]; return s ? s.nom : id; }
  function badge(id) { return '<span class="statut statut-' + id + '">' + esc(nomStatut(id)) + "</span>"; }
  function dateH(iso) { var d = new Date(iso); return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) + " à " + d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }); }
  function aujourdhui() { return new Date().toISOString().slice(0, 10); }
  function nomDemandeur(r) { var d = r.d || {}; return [d.prenom, d.nom].filter(Boolean).join(" ") || d.payeur || "—"; }

  // ------------------------------------------------------------------ Champs
  function champHTML(c, id) {
    var req = c.req ? " required" : "", lab = "<span>" + esc(c.label) + (c.req ? ' <abbr title="obligatoire">*</abbr>' : "") + "</span>";
    var aide = c.aide ? '<span class="aide">' + esc(c.aide) + "</span>" : "";
    var auto = c.auto ? ' autocomplete="' + c.auto + '"' : "";
    var ph = c.placeholder ? ' placeholder="' + esc(c.placeholder) + '"' : "";
    function lim(v) { return v === "aujourdhui" ? aujourdhui() : v; }
    switch (c.type) {
      case "liste":
        return "<label>" + lab + aide + '<select name="' + c.n + '"' + req + '><option value="">Choisir…</option>' + c.options.map(function (o) { return "<option>" + esc(o) + "</option>"; }).join("") + "</select></label>";
      case "choix":
        return '<fieldset class="choix"><legend>' + lab + "</legend>" + aide + '<div class="choix-options">' + c.options.map(function (o, i) {
          return '<label><input type="radio" name="' + c.n + '" value="' + esc(o) + '"' + (i === 0 ? req : "") + "><span>" + esc(o) + "</span></label>";
        }).join("") + "</div></fieldset>";
      case "zone":
        return "<label>" + lab + aide + '<textarea name="' + c.n + '" rows="4"' + req + ph + "></textarea></label>";
      case "fichier":
        return "<label>" + lab + aide + '<input type="file" name="' + c.n + '" accept="image/*,.pdf"' + req + "></label>";
      case "case":
        return '<label class="case"><input type="checkbox" name="' + c.n + '"' + req + "><span>" + lab + "</span></label>";
      default:
        var t = { texte: "text", tel: "tel", email: "email", date: "date", nombre: "number" }[c.type] || "text";
        var extra = (c.min != null ? ' min="' + lim(c.min) + '"' : "") + (c.max != null ? ' max="' + lim(c.max) + '"' : "") + (c.valeur != null ? ' value="' + c.valeur + '"' : "");
        if (c.type === "tel") extra += ' pattern="[0-9 +]{9,16}" inputmode="tel"';
        return "<label>" + lab + aide + '<input type="' + t + '" name="' + c.n + '"' + req + auto + ph + extra + "></label>";
    }
  }
  function valeurs(form, f) {
    var d = {}, fichiers = [];
    f.etapes.forEach(function (e) {
      e.champs.forEach(function (c) {
        if (c.type === "fichier") { var inp = form.elements[c.n]; if (inp && inp.files && inp.files[0]) { d[c.n] = inp.files[0].name; fichiers.push(inp.files[0].name); } return; }
        if (c.type === "choix") { var r = form.querySelector('input[name="' + c.n + '"]:checked'); if (r) d[c.n] = r.value; return; }
        if (c.type === "case") { d[c.n] = form.elements[c.n].checked ? "Oui" : "Non"; return; }
        var v = form.elements[c.n] && form.elements[c.n].value; if (v) d[c.n] = v;
      });
    });
    return { d: d, fichiers: fichiers };
  }
  function libelle(f, n) { var l = n; f.etapes.forEach(function (e) { e.champs.forEach(function (c) { if (c.n === n) l = c.label.replace(/ \(.*\)$/, ""); }); }); return l; }
  function valeurAffichee(f, n, v) {
    var c = null; f.etapes.forEach(function (e) { e.champs.forEach(function (x) { if (x.n === n) c = x; }); });
    if (c && c.type === "date" && /^\d{4}-\d{2}-\d{2}$/.test(v)) return K.date(v, true);
    if (c && c.type === "nombre" && /montant|budget|demande/.test(n)) return Number(v).toLocaleString("fr-FR") + " FCFA";
    return v;
  }
  function recap(f, d) {
    return '<table class="recap"><tbody>' + Object.keys(d).map(function (n) {
      return "<tr><th>" + esc(libelle(f, n)) + "</th><td>" + esc(valeurAffichee(f, n, d[n])) + "</td></tr>";
    }).join("") + "</tbody></table>";
  }

  // ------------------------------------------------------------------ Page formulaire
  if (page === "formulaire") (function () {
    var id = new URLSearchParams(location.search).get("f"), f = F[id], zone = $("#zone-formulaire");
    if (!f || !f.etapes) {
      zone.innerHTML = '<div class="encart"><h2>Formulaire introuvable</h2><p>Choisissez une démarche dans la liste.</p><a class="btn btn-plein" href="demarches.html">Voir les démarches</a></div>';
      return;
    }
    document.title = f.titre + " — " + document.title.split(" — ").pop();
    $("#form-titre").textContent = f.titre; $("#form-intro").textContent = f.intro;
    $("#form-ariane").innerHTML = '<a href="index.html">Accueil</a> › <a href="demarches.html">Démarches</a> › ' + esc(f.titre);
    var etapes = f.etapes.concat([{ titre: f.paiement ? "Vérification et paiement" : "Vérification et envoi", verif: true }]);
    var n = 0;
    zone.innerHTML =
      '<div class="form-grille"><aside><ol class="stepper" aria-label="Étapes">' + etapes.map(function (e, i) { return '<li data-i="' + i + '"><span>' + (i + 1) + "</span>" + esc(e.titre) + "</li>"; }).join("") + "</ol>" +
      '<div class="encart encart-info"><p><b>Service :</b> ' + esc(f.service) + "<br><b>Délai indicatif :</b> " + esc(f.delai) + "</p>" +
      (f.demarche ? '<a class="lien-fleche" href="demarches.html#' + f.demarche + '">Voir la fiche de la démarche <i data-lucide="arrow-right"></i></a>' : "") + "</div></aside>" +
      '<form class="form carte-form" novalidate>' + etapes.map(function (e, i) {
        return '<section class="etape" data-i="' + i + '"' + (i ? " hidden" : "") + '><h2 class="etape-titre" tabindex="-1">' + (i + 1) + ". " + esc(e.titre) + "</h2>" +
          (e.verif ? '<div class="recap-zone"></div><label class="case"><input type="checkbox" name="certifie" required><span>Je certifie l\'exactitude des informations fournies.</span></label>' +
            '<div class="avertissement" style="margin:0"><i data-lucide="info"></i><span>Démonstration : la demande est enregistrée sur cet appareil uniquement et n\'est pas transmise à la mairie.</span></div>'
            : e.champs.map(function (c, k) { return champHTML(c, id + k); }).join("")) +
          '<div class="etape-nav">' + (i ? '<button class="btn btn-ligne" type="button" data-nav="-1"><i data-lucide="arrow-left"></i>Précédent</button>' : "<span></span>") +
          (e.verif ? '<button class="btn btn-plein" type="submit"><i data-lucide="' + (f.paiement ? "hand-coins" : "send") + '"></i>' + (f.paiement ? "Payer" : "Envoyer ma demande") + "</button>"
            : '<button class="btn btn-plein" type="button" data-nav="1">Continuer<i data-lucide="arrow-right"></i></button>') + "</div></section>";
      }).join("") + "</form></div>";
    var form = $("form", zone);
    function aller(i) {
      n = i;
      $$(".etape", form).forEach(function (s) { s.hidden = +s.getAttribute("data-i") !== n; });
      $$(".stepper li", zone).forEach(function (li) { var k = +li.getAttribute("data-i"); li.className = k < n ? "fait" : (k === n ? "actif" : ""); });
      if (etapes[n].verif) $(".recap-zone", form).innerHTML = recap(f, valeurs(form, f).d);
      var t = $('.etape[data-i="' + n + '"] .etape-titre', form); t.focus({ preventScroll: true });
      window.scrollTo({ top: zone.getBoundingClientRect().top + window.scrollY - 110 });
    }
    function etapeValide() {
      var champs = $$('.etape[data-i="' + n + '"] input, .etape[data-i="' + n + '"] select, .etape[data-i="' + n + '"] textarea', form);
      for (var i = 0; i < champs.length; i++) if (!champs[i].checkValidity()) { champs[i].reportValidity(); return false; }
      return true;
    }
    form.addEventListener("click", function (e) {
      var b = e.target.closest("[data-nav]"); if (!b) return;
      var dir = +b.getAttribute("data-nav");
      if (dir > 0 && !etapeValide()) return;
      aller(n + dir);
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault(); if (!etapeValide()) return;
      var v = valeurs(form, f);
      if (f.paiement) return payer(v);
      afficherAccuse(K.store.enregistrer(id, v.d, { fichiers: v.fichiers }));
    });
    function payer(v) {
      zone.innerHTML = '<div class="encart attente" role="status"><div class="sablier"></div><h2>Confirmez le paiement sur votre téléphone</h2>' +
        "<p>Une demande de paiement de <b>" + Number(v.d.montant).toLocaleString("fr-FR") + " FCFA</b> a été envoyée au " + esc(v.d.tel) + " via <b>" + esc(v.d.operateur) + "</b>.</p><p class=\"aide\">Démonstration : aucune somme n'est prélevée.</p></div>";
      setTimeout(function () {
        var rec = K.store.enregistrer(id, v.d, { statut: "pret", transaction: v.d.operateur.slice(0, 2).toUpperCase() + Date.now().toString().slice(-8) });
        afficherAccuse(rec);
      }, 2600);
    }
    function afficherAccuse(rec) {
      var paie = !!f.paiement;
      zone.innerHTML = '<div class="accuse" id="accuse"><div class="accuse-tete"><span class="accuse-ok"><i data-lucide="check"></i></span><div><h2 tabindex="-1">' +
        (paie ? "Paiement effectué" : "Votre demande est enregistrée") + "</h2><p>" + (paie ? "Conservez ce reçu." : "Conservez votre numéro de dossier pour suivre votre demande.") + "</p></div></div>" +
        '<div class="accuse-num"><span>' + (paie ? "Reçu n°" : "Dossier n°") + "</span><b>" + esc(rec.num) + "</b></div>" +
        '<dl class="accuse-infos"><div><dt>Démarche</dt><dd>' + esc(f.titre) + "</dd></div><div><dt>Date</dt><dd>" + dateH(rec.date) + "</dd></div><div><dt>Service</dt><dd>" + esc(f.service) + "</dd></div>" +
        (paie ? "<div><dt>Transaction</dt><dd>" + esc(rec.transaction) + "</dd></div>" : "<div><dt>Délai indicatif</dt><dd>" + esc(f.delai) + "</dd></div>") + "</dl>" +
        "<details><summary>Récapitulatif de la demande</summary>" + recap(f, rec.d) + (rec.fichiers && rec.fichiers.length ? "<p><b>Pièces jointes :</b> " + rec.fichiers.map(esc).join(", ") + "</p>" : "") + "</details>" +
        (paie ? "" : '<p class="aide">Vous serez prévenu par SMS au ' + esc(rec.d.tel || "") + " lorsque votre demande sera traitée (démonstration).</p>") +
        '<div class="fiche-actions"><button class="btn btn-plein" type="button" onclick="window.print()"><i data-lucide="printer"></i>Imprimer</button>' +
        (paie ? "" : '<a class="btn btn-ligne" href="suivi.html#' + rec.num + '"><i data-lucide="search"></i>Suivre ma demande</a>') +
        '<a class="btn btn-ligne" href="demarches.html">Autres démarches</a></div></div>';
      K.icones(zone); $("#accuse h2").focus();
      window.scrollTo({ top: zone.getBoundingClientRect().top + window.scrollY - 110 });
    }
    aller(0); K.icones(zone);
  })();

  // ------------------------------------------------------------------ Page suivi
  if (page === "suivi") (function () {
    var res = $("#suivi-resultat"), champ = $("#suivi-num"), liste = $("#mes-dossiers");
    function afficher(num) {
      var r = K.store.trouver(num);
      if (!r) { res.innerHTML = '<div class="avertissement"><i data-lucide="info"></i><span>Aucun dossier ne correspond au numéro « ' + esc(num) + " ». Vérifiez la saisie (exemple : EC-2026-1184).</span></div>"; K.icones(res); return; }
      var f = F[r.form] || {}, s = K.store.statut(r), idx = ST.map(function (x) { return x.id; }).indexOf(s);
      res.innerHTML = '<div class="encart suivi-carte"><div class="suivi-tete"><div><span class="surtitre">' + esc(f.service || "") + "</span><h2>" + esc(r.num) + "</h2><p>" + esc(f.titre || "") + " · déposé le " + dateH(r.date) + "</p></div>" + badge(s) + "</div>" +
        '<ol class="frise-statut">' + ST.map(function (x, i) { return '<li class="' + (i < idx ? "fait" : i === idx ? "actif" : "") + '"><b>' + esc(x.nom) + "</b><span>" + esc(x.desc) + "</span></li>"; }).join("") + "</ol>" +
        (s === "pret" ? '<div class="bon-a-savoir"><b>Votre demande est traitée.</b> ' + (r.form === "signalement" ? "L'intervention a été réalisée ou programmée." : "Présentez-vous au guichet avec votre pièce d'identité et ce numéro.") + "</div>" : "") +
        (r.demo ? '<p class="aide">Dossier d\'exemple (démonstration).</p>' : '<p class="aide">Démonstration : le dossier avance automatiquement après quelques minutes.</p>') + "</div>";
      K.icones(res);
    }
    function listeMes() {
      var mes = K.store.mesDossiers();
      liste.innerHTML = mes.length ? mes.map(function (r) {
        var f = F[r.form] || {};
        return '<button class="dem" type="button" data-num="' + r.num + '"><span class="pastille"><i data-lucide="' + (f.icone || "file-text") + '"></i></span><span><h3>' + esc(r.num) + "</h3><p>" + esc(f.titre || "") + " · " + dateH(r.date) + "</p></span>" + badge(K.store.statut(r)) + "</button>";
      }).join("") : '<div class="dem-vide">Aucune demande déposée depuis cet appareil. <a href="demarches.html">Faire une démarche</a></div>';
      K.icones(liste);
    }
    $("#suivi-form").addEventListener("submit", function (e) { e.preventDefault(); history.replaceState(null, "", "#" + champ.value.trim().toUpperCase()); afficher(champ.value); });
    liste.addEventListener("click", function (e) { var b = e.target.closest("[data-num]"); if (b) { champ.value = b.getAttribute("data-num"); afficher(champ.value); res.scrollIntoView({ behavior: "smooth" }); } });
    listeMes();
    if (location.hash.length > 1) { champ.value = decodeURIComponent(location.hash.slice(1)); afficher(champ.value); }
  })();

  // ------------------------------------------------------------------ Contact : message et signalement
  if (page === "contact") (function () {
    var fm = $("#form-message");
    fm.addEventListener("submit", function (e) {
      e.preventDefault(); if (!fm.reportValidity()) return;
      var d = {}; ["nom", "contact", "objet", "message"].forEach(function (k) { d[k] = fm.elements[k].value; });
      var r = K.store.enregistrer("message", { prenom: d.nom, tel: d.contact, objet: d.objet, message: d.message });
      $("#conf-message").innerHTML = "<b>Message enregistré : " + esc(r.num) + ".</b> La mairie vous répondra sous 5 jours ouvrés (démonstration : rien n'est transmis). <a href=\"suivi.html#" + r.num + "\">Suivre</a>";
      $("#conf-message").classList.add("ok"); fm.reset();
    });
    var mc = K.carte("carte-signal"), repere = null, champLoc = $("#sig-loc");
    function poser(ll) { if (repere) repere.setLatLng(ll); else repere = L.marker(ll).addTo(mc); champLoc.value = ll.lat.toFixed(5) + ", " + ll.lng.toFixed(5); }
    if (mc) mc.on("click", function (e) { poser(e.latlng); });
    $("#sig-geoloc").addEventListener("click", function () {
      if (!navigator.geolocation || !mc) return;
      navigator.geolocation.getCurrentPosition(function (p) { var ll = L.latLng(p.coords.latitude, p.coords.longitude); poser(ll); mc.setView(ll, 15); });
    });
    var fs = $("#form-signal");
    fs.addEventListener("submit", function (e) {
      e.preventDefault(); if (!fs.reportValidity()) return;
      var type = fs.querySelector('input[name="type"]:checked'), lab = type ? type.parentNode.textContent.trim() : "";
      var pos = champLoc.value ? champLoc.value.split(",").map(Number) : null;
      var photo = fs.elements.photo.files[0];
      var r = K.store.enregistrer("signalement", { type: lab, village: fs.elements.village.value, description: fs.elements.description.value, localisation: champLoc.value || "Non précisée" },
        { pos: pos, type: lab, village: fs.elements.village.value, desc: fs.elements.description.value, fichiers: photo ? [photo.name] : [] });
      var c = $("#conf-signal");
      c.innerHTML = "<b>Signalement enregistré : " + esc(r.num) + ".</b> Il est transmis aux services techniques et apparaît sur la carte de suivi des interventions (démonstration). <a href=\"suivi.html#" + r.num + "\">Suivre ce signalement</a>";
      c.classList.add("ok"); c.setAttribute("tabindex", "-1"); c.focus();
      fs.reset(); if (repere && mc) { mc.removeLayer(repere); repere = null; }
    });
  })();

  // ------------------------------------------------------------------ Espace agents (démonstration)
  if (page === "agent") (function () {
    var vue = "demandes", filtre = "", carte = null, couche = null;
    var COUL = { recu: "#c8402f", instruction: "#d89a14", pret: "#0b5d3b" };
    function rendre() {
      var tous = K.store.tous();
      var dem = tous.filter(function (r) { return r.form !== "signalement" && r.form !== "message" && r.form !== "payer"; });
      var sig = tous.filter(function (r) { return r.form === "signalement"; });
      var msg = tous.filter(function (r) { return r.form === "message"; });
      var pay = tous.filter(function (r) { return r.form === "payer"; });
      function nb(l, s) { return l.filter(function (r) { return K.store.statut(r) === s; }).length; }
      var encaisse = pay.reduce(function (a, r) { return a + (+r.d.montant || 0); }, 0);
      $("#kpi").innerHTML =
        '<div class="chiffre"><b>' + nb(dem, "recu") + "</b><span>demandes à traiter</span></div>" +
        '<div class="chiffre"><b>' + nb(dem, "instruction") + "</b><span>demandes en cours</span></div>" +
        '<div class="chiffre"><b>' + (sig.length - nb(sig, "pret")) + "</b><span>signalements ouverts</span></div>" +
        '<div class="chiffre"><b>' + encaisse.toLocaleString("fr-FR") + "</b><span>FCFA encaissés en ligne</span></div>";
      var l = vue === "demandes" ? dem : vue === "signalements" ? sig : vue === "messages" ? msg : pay;
      if (filtre) l = l.filter(function (r) { return K.store.statut(r) === filtre; });
      $$(".onglets button").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-vue") === vue); });
      $("#zone-carte").hidden = vue !== "signalements";
      $("#tableau").innerHTML = '<table class="table"><thead><tr><th>N°</th><th>Date</th><th>' + (vue === "signalements" ? "Type" : "Démarche") + "</th><th>" + (vue === "signalements" ? "Village" : "Demandeur") + "</th><th>" + (vue === "signalements" ? "Description" : "Détail") + "</th><th>Statut</th></tr></thead><tbody>" +
        (l.length ? l.map(function (r) {
          var f = F[r.form] || {}, s = K.store.statut(r), d = r.d || {};
          var det = vue === "signalements" ? (r.desc || d.description) : (d.type || d.motif || d.usage || d.objet || d.projet || d.nature || d.enfant_prenom && ("Enfant : " + d.enfant_prenom) || d.message || "");
          return "<tr><td><b>" + esc(r.num) + "</b>" + (r.demo ? "" : ' <span class="etiquette">Nouveau</span>') + "</td><td>" + dateH(r.date) + "</td><td>" + esc(vue === "signalements" ? r.type : f.titre) + "</td><td>" + esc(vue === "signalements" ? r.village : nomDemandeur(r) + (d.village ? " · " + d.village : "")) + "</td><td>" + esc(String(det || "").slice(0, 80)) + "</td>" +
            '<td><select data-num="' + r.num + '" aria-label="Statut du dossier ' + r.num + '">' + ST.map(function (x) { return '<option value="' + x.id + '"' + (x.id === s ? " selected" : "") + ">" + esc(x.nom) + "</option>"; }).join("") + "</select></td></tr>";
        }).join("") : '<tr><td colspan="6" class="aide">Aucun élément.</td></tr>') + "</tbody></table>";
      if (vue === "signalements") dessinerCarte(sig);
    }
    function dessinerCarte(sig) {
      if (!carte) carte = K.carte("carte-agent");
      if (!carte) return;
      setTimeout(function () { carte.invalidateSize(); }, 50);
      if (couche) carte.removeLayer(couche);
      couche = L.layerGroup(sig.filter(function (r) { return r.pos; }).map(function (r) {
        var s = K.store.statut(r);
        return L.circleMarker(r.pos, { radius: 9, color: "#fff", weight: 2, fillColor: COUL[s], fillOpacity: .95 })
          .bindPopup("<b>" + esc(r.num) + "</b><br>" + esc(r.type) + " · " + esc(r.village) + "<br>" + esc(r.desc || "") + "<br>" + nomStatut(s));
      })).addTo(carte);
    }
    $(".onglets").addEventListener("click", function (e) { var b = e.target.closest("[data-vue]"); if (b) { vue = b.getAttribute("data-vue"); rendre(); } });
    $("#filtre-statut").addEventListener("change", function (e) { filtre = e.target.value; rendre(); });
    $("#tableau").addEventListener("change", function (e) { var s = e.target.closest("select[data-num]"); if (s) { K.store.changerStatut(s.getAttribute("data-num"), s.value); rendre(); } });
    $("#reinit").addEventListener("click", function () { if (window.confirm("Effacer les demandes de démonstration enregistrées sur cet appareil ?")) { K.store.reinitialiser(); rendre(); } });
    rendre();
  })();

  // ------------------------------------------------------------------ Boutons « Faire la demande en ligne » (démarches)
  K.formulaireDe = function (idDemarche) { var f = F[idDemarche]; return f && f.etapes ? "formulaire.html?f=" + idDemarche : null; };
})();
