// ====== CONFIGURATION DU SITE : seul fichier à modifier pour changer les textes courants ======
window.SITE = {
  nom: "Coki",                      // à remplacer quand l'orthographe officielle sera connue (Coki / Koki)
  variante: "Koki",                 // autre graphie, affichée en sous-titre (laisser "" pour la masquer)
  region: "Région de Louga, Sénégal",
  devise: "Une commune qui se projette, ses données au service de ses habitants",
  contact: { adresse: "Hôtel de ville de Coki", telephone: "à renseigner", email: "à renseigner" },
  pied: "© Commune de Coki — Prototype réalisé avec le CEGIT (Centre d'Expertise en Géomatique et Ingénierie Territoriale)",
  carte: { centre: [15.535, -16.017], zoom: 11,
           emprise: [[15.476, -16.095], [15.594, -15.939]] },   // rectangle provisoire, à remplacer par l'emprise officielle
  qwc: "https://demo-cmap.cegitgroup.com/"
};
