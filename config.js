// =====================================================================
//  CONFIGURATION DU SITE — fichier principal à modifier pour les textes
//  courants (nom, contacts, horaires, bandeau d'information, carte…).
//  Les démarches sont dans data/demarches.js, les actualités et l'agenda
//  dans data/actualites.js.
// =====================================================================
window.SITE = {
  nom: "Coki",                     // à remplacer quand l'orthographe officielle sera connue (Coki / Koki)
  variante: "Koki",                // autre graphie, affichée en sous-titre ("" pour la masquer)
  region: "Région de Louga · Sénégal",
  devise: "Une commune qui se projette, ses données au service de ses habitants",
  bienvenue: "Dalal ak jàmm",      // « Bienvenue » en wolof, affiché sur l'accueil

  maire: "Abdou Karim SY",
  contact: {
    adresse: "Hôtel de ville de Coki, Coki, département de Louga",
    telephone: "à renseigner",
    email: "à renseigner",
    whatsapp: ""                   // ex. "+221 77 000 00 00" (laisser vide pour masquer)
  },
  horaires: [
    ["Lundi – jeudi", "8 h – 13 h · 15 h – 17 h (à confirmer)"],
    ["Vendredi", "8 h – 13 h (à confirmer)"],
    ["Samedi, dimanche", "Fermé"]
  ],

  // Bandeau d'information en haut de toutes les pages ("" pour le masquer)
  flash: "Prototype de démonstration : contenus indicatifs, à valider par les services de la mairie.",

  reseaux: { facebook: "", youtube: "", tiktok: "" },   // liens vers les pages officielles

  pied: "© Commune de Coki — Prototype réalisé avec le CEGIT (Centre d'Expertise en Géomatique et Ingénierie Territoriale)",

  carte: { centre: [15.518, -16.008], zoom: 11 },     // la limite communale réelle est dans data/limite.js
  qwc: "https://demo-cmap.cegitgroup.com/"            // application cartographique de la commune
};
