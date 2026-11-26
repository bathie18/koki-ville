// =====================================================================
//  FORMULAIRES EN LIGNE — DÉMONSTRATION
//  Chaque formulaire est décrit ici (étapes et champs). Les envois sont
//  conservés dans le navigateur (localStorage) : rien n'est transmis.
//  En production, remplacer l'enregistrement par l'envoi vers le
//  service de la mairie (API, formulaire en ligne, base de données).
//
//  Types de champs : texte, tel, email, date, nombre, liste, choix,
//  zone (texte long), fichier, case (case à cocher).
// =====================================================================
(function () {
  // Étape commune : identité du demandeur
  var DEMANDEUR = {
    titre: "Vos coordonnées",
    champs: [
      { n: "prenom", label: "Prénom", type: "texte", req: true, auto: "given-name" },
      { n: "nom", label: "Nom", type: "texte", req: true, auto: "family-name" },
      { n: "tel", label: "Téléphone", type: "tel", req: true, aide: "Vous serez prévenu par SMS de l'avancement.", placeholder: "77 000 00 00", auto: "tel" },
      { n: "email", label: "Courriel (facultatif)", type: "email", auto: "email" },
      { n: "village", label: "Village ou quartier de résidence", type: "texte", req: true },
      { n: "residence", label: "Vous résidez", type: "choix", req: true, options: ["Dans la commune", "Ailleurs au Sénégal", "À l'étranger"] }
    ]
  };
  var RETRAIT = { n: "retrait", label: "Mode de retrait", type: "choix", req: true, options: ["Au guichet de la mairie", "Par un proche muni d'une procuration", "Envoi par courriel (copie numérique)"] };

  window.FORMULAIRES = {
    "extrait-naissance": {
      titre: "Demande d'extrait ou de copie d'acte de naissance", prefixe: "EC", demarche: "extrait-naissance", icone: "baby",
      intro: "Recevez votre document au guichet ou demandez-le pour un proche. Munissez-vous des références de l'acte si vous les avez.",
      delai: "48 heures ouvrées", service: "État civil",
      etapes: [DEMANDEUR, {
        titre: "L'acte demandé", champs: [
          { n: "type", label: "Document souhaité", type: "liste", req: true, options: ["Extrait d'acte de naissance", "Copie littérale d'acte de naissance", "Bulletin de naissance"] },
          { n: "pour", label: "L'acte concerne", type: "choix", req: true, options: ["Moi-même", "Mon enfant", "Un autre membre de ma famille"] },
          { n: "titulaire", label: "Prénom et nom de la personne sur l'acte", type: "texte", req: true },
          { n: "naissance", label: "Date de naissance", type: "date", req: true },
          { n: "pere", label: "Prénom et nom du père", type: "texte" },
          { n: "mere", label: "Prénom et nom de la mère", type: "texte" },
          { n: "numero", label: "Numéro et année de l'acte (si connus)", type: "texte", placeholder: "Ex. 245 / 2010", aide: "Indiqués sur un ancien extrait." },
          { n: "exemplaires", label: "Nombre d'exemplaires", type: "nombre", req: true, min: 1, max: 10, valeur: 1 },
          { n: "motif", label: "Motif de la demande", type: "liste", options: ["Carte d'identité ou passeport", "Inscription scolaire ou examen", "Mariage", "Dossier administratif", "Autre"] }
        ]
      }, { titre: "Retrait et pièces", champs: [RETRAIT, { n: "piece", label: "Copie de votre pièce d'identité", type: "fichier", req: true }] }]
    },

    "certificat-residence": {
      titre: "Demande de certificat de résidence", prefixe: "CR", demarche: "certificat-residence", icone: "id-card",
      intro: "Le certificat atteste que vous habitez la commune. Une attestation du chef de village est demandée.",
      delai: "24 heures ouvrées", service: "Secrétariat municipal",
      etapes: [DEMANDEUR, {
        titre: "Votre résidence", champs: [
          { n: "depuis", label: "Vous habitez ce village depuis", type: "liste", req: true, options: ["Moins d'un an", "1 à 5 ans", "Plus de 5 ans", "Depuis toujours"] },
          { n: "chef", label: "Nom du chef de village ou du délégué de quartier", type: "texte", req: true },
          { n: "motif", label: "Le certificat est demandé pour", type: "liste", req: true, options: ["Carte d'identité", "Mariage", "Dossier scolaire ou d'emploi", "Ouverture de compte", "Autre"] }
        ]
      }, { titre: "Pièces justificatives", champs: [
        { n: "piece", label: "Copie de votre pièce d'identité ou de votre extrait de naissance", type: "fichier", req: true },
        { n: "attestation", label: "Attestation du chef de village (photo)", type: "fichier", req: true },
        RETRAIT
      ] }]
    },

    "declarer-naissance": {
      titre: "Préparer la déclaration d'une naissance", prefixe: "DN", demarche: "declarer-naissance", icone: "baby",
      intro: "Remplissez les informations à l'avance : l'officier d'état civil n'aura plus qu'à vérifier et enregistrer la déclaration lors de votre passage.",
      delai: "Rendez-vous proposé sous 48 heures", service: "État civil",
      etapes: [DEMANDEUR, {
        titre: "L'enfant", champs: [
          { n: "enfant_prenom", label: "Prénom(s) de l'enfant", type: "texte", req: true },
          { n: "enfant_nom", label: "Nom de l'enfant", type: "texte", req: true },
          { n: "sexe", label: "Sexe", type: "choix", req: true, options: ["Féminin", "Masculin"] },
          { n: "date", label: "Date de naissance", type: "date", req: true, max: "aujourdhui" },
          { n: "heure", label: "Heure de naissance", type: "texte", placeholder: "Ex. 06 h 30" },
          { n: "lieu", label: "Lieu de naissance", type: "liste", req: true, options: ["Poste ou centre de santé", "Maternité", "Domicile", "Autre"] }
        ]
      }, {
        titre: "Les parents", champs: [
          { n: "pere", label: "Prénom et nom du père", type: "texte", req: true },
          { n: "pere_ne", label: "Date de naissance du père", type: "date" },
          { n: "mere", label: "Prénom et nom de la mère", type: "texte", req: true },
          { n: "mere_ne", label: "Date de naissance de la mère", type: "date" },
          { n: "maries", label: "Les parents sont mariés", type: "choix", req: true, options: ["Oui", "Non"] },
          { n: "declarant", label: "Vous êtes", type: "liste", req: true, options: ["Le père", "La mère", "Un parent proche", "Le chef de village", "Autre personne présente à la naissance"] }
        ]
      }, { titre: "Pièces", champs: [
        { n: "certificat", label: "Certificat d'accouchement (photo)", type: "fichier", req: true, aide: "Délivré par la structure de santé." },
        { n: "id_parents", label: "Pièces d'identité des parents", type: "fichier" },
        { n: "rdv", label: "Créneau souhaité pour passer à la mairie", type: "liste", req: true, options: ["Dès que possible", "En matinée", "En après-midi"] }
      ] }]
    },

    "affectation-terre": {
      titre: "Demande d'affectation d'une parcelle", prefixe: "AF", demarche: "affectation-terre", icone: "land-plot",
      intro: "Votre demande sera enregistrée, puis examinée par la commission domaniale avant d'être présentée au conseil municipal.",
      delai: "Selon le calendrier de la commission domaniale", service: "Commission domaniale",
      etapes: [DEMANDEUR, {
        titre: "La parcelle", champs: [
          { n: "demandeur_type", label: "La demande est faite", type: "choix", req: true, options: ["À titre individuel", "Pour un groupement (GIE, association, groupement de femmes)"] },
          { n: "groupement", label: "Nom du groupement (le cas échéant)", type: "texte" },
          { n: "usage", label: "Usage prévu", type: "liste", req: true, options: ["Agriculture", "Maraîchage", "Élevage", "Habitation", "Activité économique", "Équipement collectif"] },
          { n: "localite", label: "Village le plus proche", type: "texte", req: true },
          { n: "surface", label: "Superficie souhaitée", type: "texte", req: true, placeholder: "Ex. 2 ha ou 400 m²" },
          { n: "position", label: "Position de la parcelle", type: "texte", aide: "Coordonnées GPS ou description (près du forage, route de Louga…).", placeholder: "15.5123, -16.0021" },
          { n: "projet", label: "Décrivez votre projet de mise en valeur", type: "zone", req: true }
        ]
      }, { titre: "Pièces", champs: [
        { n: "piece", label: "Pièce d'identité, ou statuts et récépissé du groupement", type: "fichier", req: true },
        { n: "croquis", label: "Croquis ou plan de la parcelle (facultatif)", type: "fichier" }
      ] }]
    },

    "domaine-public": {
      titre: "Demande d'emplacement ou d'occupation du domaine public", prefixe: "OP", demarche: "domaine-public", icone: "store",
      intro: "Étal au marché, kiosque, cérémonie ou événement sur la voie publique.",
      delai: "5 jours ouvrés", service: "Régie du marché",
      etapes: [DEMANDEUR, {
        titre: "L'occupation", champs: [
          { n: "objet", label: "Objet", type: "liste", req: true, options: ["Étal au marché hebdomadaire", "Kiosque ou boutique", "Cérémonie familiale", "Manifestation ou événement", "Dépôt de matériaux"] },
          { n: "lieu", label: "Lieu", type: "texte", req: true },
          { n: "surface", label: "Surface (m²)", type: "nombre", min: 1, max: 2000 },
          { n: "debut", label: "Date de début", type: "date", req: true, min: "aujourdhui" },
          { n: "fin", label: "Date de fin", type: "date" },
          { n: "activite", label: "Activité exercée", type: "texte" }
        ]
      }]
    },

    "salle-stade": {
      titre: "Réservation d'une salle ou d'un terrain", prefixe: "RS", demarche: "salle-stade", icone: "trophy",
      intro: "Réservez un équipement communal pour une activité, une compétition ou un événement.",
      delai: "Réponse sous 72 heures", service: "Secrétariat municipal",
      etapes: [DEMANDEUR, {
        titre: "La réservation", champs: [
          { n: "equipement", label: "Équipement", type: "liste", req: true, options: ["Salle de réunion de la mairie", "Terrain de football", "Stade municipal (à venir)", "Place publique"] },
          { n: "structure", label: "Structure", type: "texte", req: true, placeholder: "ASC, école, association, particulier…" },
          { n: "date", label: "Date", type: "date", req: true, min: "aujourdhui" },
          { n: "creneau", label: "Créneau", type: "liste", req: true, options: ["Matin", "Après-midi", "Soirée", "Journée entière"] },
          { n: "participants", label: "Nombre de participants attendus", type: "nombre", min: 1, max: 5000 },
          { n: "activite", label: "Activité", type: "zone", req: true }
        ]
      }]
    },

    "subvention": {
      titre: "Demande de subvention ou d'appui", prefixe: "SB", demarche: "subvention", icone: "users",
      intro: "Associations, GIE, groupements de femmes, ASC : présentez votre projet d'intérêt local.",
      delai: "Examen lors de la préparation du budget", service: "Secrétariat municipal",
      etapes: [DEMANDEUR, {
        titre: "Votre structure", champs: [
          { n: "structure", label: "Nom de la structure", type: "texte", req: true },
          { n: "forme", label: "Forme", type: "liste", req: true, options: ["Association", "GIE", "Groupement de femmes", "ASC", "Coopérative", "Autre"] },
          { n: "membres", label: "Nombre de membres", type: "nombre", min: 1 },
          { n: "recepisse", label: "Numéro de récépissé (si reconnu)", type: "texte" }
        ]
      }, {
        titre: "Le projet", champs: [
          { n: "projet", label: "Titre du projet", type: "texte", req: true },
          { n: "domaine", label: "Domaine", type: "liste", req: true, options: ["Agriculture, élevage", "Éducation, alphabétisation", "Santé, hygiène", "Jeunesse, sport, culture", "Environnement", "Activité économique des femmes"] },
          { n: "description", label: "Description et bénéficiaires", type: "zone", req: true },
          { n: "budget", label: "Budget total (FCFA)", type: "nombre", req: true, min: 0 },
          { n: "demande", label: "Montant demandé à la commune (FCFA)", type: "nombre", req: true, min: 0 },
          { n: "dossier", label: "Statuts, budget détaillé (facultatif)", type: "fichier" }
        ]
      }]
    },

    "payer": {
      titre: "Payer une taxe ou une redevance", prefixe: "PA", demarche: "payer", icone: "hand-coins", paiement: true,
      intro: "Réglez un droit de place, une redevance ou des frais administratifs par paiement mobile. Un reçu vous est remis immédiatement.",
      delai: "Immédiat", service: "Régie de recettes",
      etapes: [{
        titre: "Le paiement", champs: [
          { n: "payeur", label: "Prénom et nom", type: "texte", req: true },
          { n: "tel", label: "Numéro de téléphone pour le paiement", type: "tel", req: true, placeholder: "77 000 00 00" },
          { n: "nature", label: "Nature du paiement", type: "liste", req: true, options: ["Droit de place au marché", "Occupation du domaine public", "Location d'équipement communal", "Frais d'état civil", "Autre redevance"] },
          { n: "reference", label: "Référence de l'avis (si vous en avez un)", type: "texte", placeholder: "Ex. AV-2026-0412" },
          { n: "montant", label: "Montant (FCFA)", type: "nombre", req: true, min: 100, max: 5000000 },
          { n: "operateur", label: "Moyen de paiement", type: "choix", req: true, options: ["Wave", "Orange Money", "Free Money"] }
        ]
      }]
    },

    "signalement": {
      titre: "Signalement", prefixe: "SIG", service: "Services techniques", delai: "Prise en compte sous 72 heures", icone: "triangle-alert"
    },
    "message": {
      titre: "Message à la mairie", prefixe: "MSG", service: "Secrétariat municipal", delai: "Réponse sous 5 jours ouvrés", icone: "mail"
    }
  };

  // Statuts successifs d'un dossier (la démonstration les fait avancer avec le temps)
  window.STATUTS = [
    { id: "recu", nom: "Reçu", desc: "Votre demande est enregistrée." },
    { id: "instruction", nom: "En cours de traitement", desc: "Le service vérifie votre demande et vos pièces." },
    { id: "pret", nom: "Traité", desc: "Votre demande est traitée : document prêt ou réponse envoyée." }
  ];

  // Données d'exemple pour l'espace agents (fictives)
  window.DEMO_DOSSIERS = [
    { num: "EC-2026-1184", form: "extrait-naissance", date: "2026-11-24T09:12", statut: "pret", d: { prenom: "Aïssatou", nom: "Diop", village: "Coki", type: "Extrait d'acte de naissance" } },
    { num: "CR-2026-0457", form: "certificat-residence", date: "2026-11-24T11:40", statut: "pret", d: { prenom: "Moussa", nom: "Fall", village: "Belel Diop", motif: "Carte d'identité" } },
    { num: "AF-2026-0093", form: "affectation-terre", date: "2026-11-23T15:05", statut: "instruction", d: { prenom: "Groupement", nom: "Jappo", village: "Coki", usage: "Maraîchage", surface: "1,5 ha" } },
    { num: "DN-2026-0312", form: "declarer-naissance", date: "2026-11-25T08:30", statut: "instruction", d: { prenom: "Mamadou", nom: "Sow", village: "Coki", enfant_prenom: "Fatou" } },
    { num: "OP-2026-0201", form: "domaine-public", date: "2026-11-25T10:18", statut: "recu", d: { prenom: "Khady", nom: "Ndiaye", village: "Coki", objet: "Étal au marché hebdomadaire" } },
    { num: "SB-2026-0044", form: "subvention", date: "2026-11-22T16:47", statut: "instruction", d: { prenom: "ASC", nom: "Jamm", village: "Coki", projet: "Tournoi de la jeunesse" } }
  ];
  window.DEMO_SIGNALEMENTS = [
    { num: "SIG-2026-3021", date: "2026-11-25T07:50", statut: "recu", type: "Éclairage", village: "Coki", pos: [15.51892, -16.10438], desc: "Lampadaire éteint près de la place du marché." },
    { num: "SIG-2026-3017", date: "2026-11-24T18:22", statut: "instruction", type: "Point d'eau", village: "Belel Diop", pos: [15.49696, -16.00018], desc: "Fuite au pied de la borne-fontaine." },
    { num: "SIG-2026-3012", date: "2026-11-23T12:10", statut: "pret", type: "Piste ou route", village: "Village de la zone nord", pos: [15.56838, -16.02446], desc: "Ravinement important après la pluie, passage difficile pour les charrettes." },
    { num: "SIG-2026-3008", date: "2026-11-22T09:31", statut: "instruction", type: "Déchets", village: "Coki", pos: [15.50176, -15.99119], desc: "Dépôt sauvage derrière l'école élémentaire." },
    { num: "SIG-2026-3004", date: "2026-11-21T15:44", statut: "pret", type: "École ou bâtiment", village: "Village de la zone est", pos: [15.48518, -15.92983], desc: "Toiture d'une salle de classe endommagée." },
    { num: "SIG-2026-2999", date: "2026-11-20T10:05", statut: "recu", type: "Éclairage", village: "Village de la zone ouest", pos: [15.5304, -16.07762], desc: "Deux lampadaires solaires hors service." },
    { num: "SIG-2026-2995", date: "2026-11-19T17:12", statut: "pret", type: "Point d'eau", village: "Village de la zone sud", pos: [15.45155, -15.97509], desc: "Robinet cassé à l'abreuvoir." },
    { num: "SIG-2026-2990", date: "2026-11-18T08:40", statut: "instruction", type: "Piste ou route", village: "Village de la zone centre", pos: [15.53102, -16.04853], desc: "Arbre tombé en travers de la piste." }
  ];
})();
