// =====================================================================
//  DÉMARCHES — une entrée par fiche. Informations indicatives à faire
//  valider par les services de la mairie (pièces, coûts, délais).
//  cat : identifiant de catégorie (voir CATEGORIES) ; profils : publics.
// =====================================================================
window.CATEGORIES = [
  { id: "etat-civil", nom: "État civil", icone: "baby", desc: "Naissance, mariage, décès, copies d'actes" },
  { id: "identite", nom: "Identité et résidence", icone: "id-card", desc: "Certificat de résidence, légalisation, carte d'identité" },
  { id: "foncier", nom: "Foncier, urbanisme, habitat", icone: "land-plot", desc: "Parcelles, constructions, domaine public" },
  { id: "economie", nom: "Marchés, taxes, activités", icone: "store", desc: "Emplacements, droits de place, paiements" },
  { id: "associations", nom: "Associations et jeunesse", icone: "users", desc: "Associations, ASC, équipements sportifs" },
  { id: "social", nom: "Solidarité et éducation", icone: "heart-handshake", desc: "Aides sociales, écoles, santé" },
  { id: "signalement", nom: "Signaler un problème", icone: "triangle-alert", desc: "Éclairage, pistes, points d'eau, déchets" }
];

window.PROFILS = [
  { id: "habitant", nom: "Je suis un habitant" },
  { id: "parent", nom: "Je suis parent" },
  { id: "agriculteur", nom: "Je suis agriculteur ou éleveur" },
  { id: "commercant", nom: "Je suis commerçant" },
  { id: "association", nom: "Je représente une association" },
  { id: "diaspora", nom: "Je vis hors de la commune" }
];

window.DEMARCHES = [
  {
    id: "declarer-naissance", cat: "etat-civil", profils: ["parent", "habitant"], populaire: true,
    titre: "Déclarer une naissance",
    resume: "Toute naissance doit être déclarée au centre d'état civil, de préférence dans le mois qui suit.",
    ou: "Centre d'état civil de la mairie ou centre secondaire le plus proche",
    qui: "Le père ou la mère, un parent proche, la personne qui a assisté à la naissance, ou le chef de village",
    pieces: [
      "Certificat ou attestation d'accouchement délivré par la structure de santé (poste, maternité)",
      "Pièce d'identité des parents (carte d'identité ou extrait de naissance)",
      "Acte ou certificat de mariage des parents, s'il y a lieu",
      "À défaut de certificat d'accouchement : deux témoins majeurs"
    ],
    delai: "Dans le mois qui suit la naissance. Jusqu'à un an : déclaration tardive. Au-delà d'un an : jugement d'autorisation d'inscription (voir la fiche dédiée).",
    cout: "À confirmer par la mairie",
    infos: "Déclarer son enfant, c'est lui donner une identité : l'acte de naissance est indispensable pour l'inscription aux examens, la carte d'identité et l'accès aux droits."
  },
  {
    id: "jugement-inscription", cat: "etat-civil", profils: ["parent", "habitant", "diaspora"],
    titre: "Faire inscrire une naissance de plus d'un an",
    resume: "Passé un an, la naissance ne peut être inscrite qu'après un jugement d'autorisation d'inscription.",
    ou: "Tribunal d'instance de Louga, ou audiences foraines organisées dans la commune",
    qui: "Les parents, la personne concernée si elle est majeure, ou son représentant",
    pieces: [
      "Requête adressée au président du tribunal (modèle disponible en mairie)",
      "Certificat de non-inscription délivré par le centre d'état civil",
      "Pièces d'identité des parents ou des témoins",
      "Tout document prouvant la naissance (carnet de santé, certificat d'accouchement)"
    ],
    delai: "Selon le calendrier du tribunal ou des audiences foraines",
    cout: "À confirmer",
    infos: "Une fois le jugement rendu, rapportez-le au centre d'état civil pour que l'acte soit transcrit sur les registres."
  },
  {
    id: "extrait-naissance", cat: "etat-civil", profils: ["habitant", "parent", "diaspora"], populaire: true,
    titre: "Obtenir un extrait ou une copie d'acte de naissance",
    resume: "Pour un examen, une carte d'identité, un passeport ou un dossier administratif.",
    ou: "Centre d'état civil où la naissance a été enregistrée",
    qui: "La personne concernée, ses parents, ou toute personne munie des références de l'acte",
    pieces: [
      "Références de l'acte : numéro, année et centre d'enregistrement (un ancien extrait suffit)",
      "Pièce d'identité du demandeur"
    ],
    delai: "En général le jour même si les registres sont disponibles",
    cout: "À confirmer (timbre éventuel)",
    infos: "Pour une carte d'identité, l'extrait doit souvent dater de moins de six mois."
  },
  {
    id: "mariage", cat: "etat-civil", profils: ["habitant", "diaspora"],
    titre: "Célébrer ou faire constater un mariage",
    resume: "Le mariage civil est célébré ou constaté par l'officier d'état civil de la commune.",
    ou: "Centre d'état civil de la mairie",
    qui: "Les futurs époux, accompagnés de leurs témoins",
    pieces: [
      "Extraits d'acte de naissance des deux époux",
      "Certificats de résidence",
      "Pièces d'identité des époux et des deux témoins",
      "Certificats médicaux prénuptiaux, si demandés",
      "Photos d'identité récentes"
    ],
    delai: "Prendre contact avec l'état civil pour fixer la date",
    cout: "À confirmer",
    infos: "L'officier d'état civil recueille l'option choisie par les époux, conformément au Code de la famille."
  },
  {
    id: "deces", cat: "etat-civil", profils: ["habitant", "diaspora"],
    titre: "Déclarer un décès",
    resume: "La déclaration permet d'établir l'acte de décès, nécessaire pour les démarches de la famille.",
    ou: "Centre d'état civil du lieu du décès",
    qui: "Un parent du défunt ou toute personne ayant connaissance du décès",
    pieces: [
      "Certificat de décès délivré par la structure de santé, ou déclaration de deux témoins",
      "Pièce d'identité ou extrait de naissance du défunt",
      "Pièce d'identité du déclarant"
    ],
    delai: "Le plus tôt possible (délai légal à confirmer auprès de l'état civil)",
    cout: "À confirmer",
    infos: "L'acte de décès est demandé pour la succession, les pensions et la réaffectation des terres du défunt."
  },
  {
    id: "certificat-residence", cat: "identite", profils: ["habitant"], populaire: true,
    titre: "Obtenir un certificat de résidence",
    resume: "Il atteste que vous habitez la commune ; il est demandé pour la carte d'identité, le mariage et de nombreux dossiers.",
    ou: "Mairie, sur attestation du chef de village",
    qui: "Toute personne résidant dans la commune",
    pieces: [
      "Pièce d'identité ou extrait de naissance",
      "Attestation du chef de village ou du délégué de quartier"
    ],
    delai: "En général le jour même",
    cout: "À confirmer",
    infos: "Selon les dossiers, le certificat peut aussi être demandé à la gendarmerie : renseignez-vous auprès de l'organisme qui le réclame."
  },
  {
    id: "legalisation", cat: "identite", profils: ["habitant", "diaspora", "association"],
    titre: "Légaliser une signature ou certifier une copie conforme",
    resume: "Authentifier votre signature sur un document, ou certifier qu'une copie est conforme à l'original.",
    ou: "Mairie (bureau de l'état civil ou secrétariat municipal)",
    qui: "La personne qui signe, présente en personne",
    pieces: [
      "Pièce d'identité en cours de validité",
      "Le document à signer (ne pas le signer à l'avance) ou l'original et ses copies"
    ],
    delai: "Immédiat",
    cout: "À confirmer (timbre éventuel)",
    infos: "La légalisation atteste de la signature, pas du contenu du document."
  },
  {
    id: "carte-identite", cat: "identite", profils: ["habitant", "parent"],
    titre: "Préparer une demande de carte d'identité",
    resume: "La carte est délivrée par les services de l'État ; la mairie fournit plusieurs pièces du dossier.",
    ou: "Commissariat, brigade de gendarmerie ou commission mobile de passage ; pièces à retirer en mairie",
    qui: "Tout Sénégalais, à partir de l'âge requis",
    pieces: [
      "Extrait d'acte de naissance de moins de six mois (mairie)",
      "Certificat de résidence (mairie)",
      "Photos d'identité si demandées",
      "Ancienne carte en cas de renouvellement"
    ],
    delai: "Selon le service de l'État",
    cout: "Selon le service de l'État",
    infos: "Surveillez les annonces de passage des commissions mobiles dans la rubrique Actualités."
  },
  {
    id: "affectation-terre", cat: "foncier", profils: ["agriculteur", "habitant"], populaire: true,
    titre: "Demander l'affectation d'une parcelle",
    resume: "Les terres du domaine national sont affectées par délibération du conseil municipal, pour un usage agricole ou d'habitation.",
    ou: "Secrétariat municipal (dépôt de la demande) ; commission domaniale",
    qui: "Toute personne ou groupement capable de mettre la terre en valeur",
    pieces: [
      "Demande écrite adressée au maire (localisation, superficie, usage prévu)",
      "Pièce d'identité du demandeur, ou statuts et récépissé pour un groupement",
      "Croquis ou coordonnées GPS de la parcelle si possible"
    ],
    etapes: [
      "Dépôt de la demande et remise d'un accusé de réception",
      "Visite de terrain de la commission domaniale, avec le chef de village",
      "Délibération du conseil municipal",
      "Approbation par le représentant de l'État (sous-préfet)",
      "Affichage et notification de la délibération"
    ],
    delai: "Selon le calendrier du conseil municipal",
    cout: "À confirmer (frais de bornage éventuels)",
    infos: "La délibération donne un droit d'usage, pas un titre de propriété. Les héritiers d'un affectataire doivent demander une réaffectation."
  },
  {
    id: "reaffectation", cat: "foncier", profils: ["agriculteur", "habitant", "diaspora"],
    titre: "Demander la réaffectation d'une parcelle (héritiers)",
    resume: "Au décès d'un affectataire, ses héritiers peuvent demander que la parcelle leur soit réaffectée.",
    ou: "Secrétariat municipal ; commission domaniale",
    qui: "Les héritiers, ou leur mandataire",
    pieces: [
      "Demande écrite adressée au maire",
      "Copie de la délibération d'affectation initiale",
      "Acte de décès de l'affectataire",
      "Acte d'hérédité ou document désignant les héritiers",
      "Pièces d'identité des demandeurs"
    ],
    delai: "Selon le calendrier du conseil municipal",
    cout: "À confirmer",
    infos: "Mêmes étapes que pour une affectation : visite, délibération, approbation, affichage."
  },
  {
    id: "construire", cat: "foncier", profils: ["habitant", "commercant", "diaspora"],
    titre: "Construire ou agrandir un bâtiment",
    resume: "Avant de bâtir, déposez un dossier pour vérifier que le projet respecte les règles d'urbanisme.",
    ou: "Mairie (dépôt du dossier), en lien avec les services de l'urbanisme",
    qui: "Le titulaire du droit sur la parcelle",
    pieces: [
      "Document justifiant le droit sur la parcelle (délibération, bail, titre)",
      "Plan de situation et plan de masse",
      "Plans du bâtiment (façades, coupes)",
      "Pièce d'identité du demandeur"
    ],
    delai: "À confirmer",
    cout: "À confirmer",
    infos: "La carte interactive aide à localiser votre parcelle et à préparer le plan de situation."
  },
  {
    id: "domaine-public", cat: "economie", profils: ["commercant", "association"],
    titre: "Occuper le domaine public ou un emplacement au marché",
    resume: "Étal, kiosque, terrasse, cérémonie sur la voie publique : une autorisation est nécessaire.",
    ou: "Secrétariat municipal ou régie du marché",
    qui: "Commerçants, artisans, organisateurs d'événements",
    pieces: [
      "Demande indiquant le lieu, la surface et la durée",
      "Pièce d'identité ou documents de l'entreprise"
    ],
    delai: "À confirmer",
    cout: "Droit de place ou redevance selon le barème communal",
    infos: "Les droits de place financent l'entretien du marché et les services de la commune."
  },
  {
    id: "payer", cat: "economie", profils: ["commercant", "habitant", "diaspora"], populaire: true,
    titre: "Payer une taxe ou une redevance communale",
    resume: "Droits de place, occupation du domaine public, location d'équipements, frais d'état civil.",
    ou: "Mairie (régie de recettes) ; paiement mobile à l'étude",
    qui: "Tout redevable",
    pieces: [
      "Avis ou référence de paiement s'il y a lieu",
      "Pièce d'identité"
    ],
    delai: "Immédiat",
    cout: "Selon le barème voté par le conseil municipal",
    infos: "Exigez toujours une quittance. Le paiement par Wave ou Orange Money est envisagé pour simplifier vos démarches."
  },
  {
    id: "salle-stade", cat: "associations", profils: ["association", "habitant"],
    titre: "Réserver une salle ou un terrain de sport",
    resume: "Salle communale, terrain ou futur stade municipal : réservation pour une activité, une compétition ou un événement.",
    ou: "Secrétariat municipal",
    qui: "Associations, ASC, écoles, particuliers",
    pieces: [
      "Demande indiquant la date, l'horaire, l'activité et le nombre de participants",
      "Pièce d'identité du responsable"
    ],
    delai: "Au moins deux semaines avant l'événement (à confirmer)",
    cout: "Selon le barème communal",
    infos: "Les ASC et les écoles peuvent bénéficier de créneaux réguliers."
  },
  {
    id: "subvention", cat: "associations", profils: ["association"],
    titre: "Demander une subvention ou un appui de la commune",
    resume: "Associations, GIE, groupements de femmes, ASC : solliciter un appui pour un projet d'intérêt local.",
    ou: "Secrétariat municipal",
    qui: "Associations et groupements reconnus",
    pieces: [
      "Lettre de demande adressée au maire",
      "Présentation du projet et budget prévisionnel",
      "Statuts et récépissé de reconnaissance",
      "Dernier rapport d'activités"
    ],
    delai: "Examen lors de la préparation du budget communal",
    cout: "Gratuit",
    infos: "La reconnaissance officielle d'une association relève des services de l'État (préfecture ou sous-préfecture)."
  },
  {
    id: "aide-sociale", cat: "social", profils: ["habitant", "parent"],
    titre: "Demander une aide sociale",
    resume: "Personnes vulnérables, en situation de handicap, familles en difficulté : la commune peut orienter et appuyer.",
    ou: "Mairie, commission ou service chargé de l'action sociale",
    qui: "Toute personne en difficulté, ou un proche",
    pieces: [
      "Lettre ou formulaire de demande",
      "Pièce d'identité",
      "Tout justificatif de la situation (certificat médical, carte d'égalité des chances…)"
    ],
    delai: "Variable",
    cout: "Gratuit",
    infos: "La commune travaille avec les services sociaux de l'État et les partenaires présents sur le territoire."
  },
  {
    id: "ecole", cat: "social", profils: ["parent"],
    titre: "Inscrire son enfant à l'école",
    resume: "L'inscription se fait auprès de l'école ; la commune équipe et entretient les établissements.",
    ou: "Directeur de l'école du village ou du quartier",
    qui: "Les parents ou le tuteur",
    pieces: [
      "Extrait d'acte de naissance de l'enfant",
      "Carnet de vaccination, si demandé"
    ],
    delai: "Avant la rentrée scolaire",
    cout: "Selon l'établissement",
    infos: "Un enfant sans acte de naissance doit être déclaré au plus vite : voir les fiches État civil."
  },
  {
    id: "signaler", cat: "signalement", profils: ["habitant", "agriculteur", "commercant", "diaspora"], populaire: true,
    titre: "Signaler un problème sur la commune",
    resume: "Lampadaire en panne, piste dégradée, borne-fontaine hors service, dépôt d'ordures : prévenez la mairie.",
    ou: "En ligne, depuis le formulaire de signalement",
    qui: "Tout habitant",
    pieces: ["Description du problème", "Localisation (sur la carte) et photo si possible"],
    delai: "Prise en compte par les services techniques",
    cout: "Gratuit",
    infos: "Chaque signalement est localisé : la commune suit ainsi les interventions village par village.",
    lien: "contact.html#signaler"
  },
  {
    id: "distance", cat: "etat-civil", profils: ["diaspora"],
    titre: "Faire une démarche à distance",
    resume: "Vous vivez à Dakar, en France ou ailleurs : un proche peut agir pour vous, ou la mairie peut être contactée par écrit.",
    ou: "Mairie, par courrier, courriel ou par l'intermédiaire d'un proche",
    qui: "Toute personne originaire de la commune",
    pieces: [
      "Procuration signée et légalisée au nom du proche",
      "Copie de votre pièce d'identité",
      "Références de l'acte demandé"
    ],
    delai: "Variable selon la démarche",
    cout: "Selon la démarche",
    infos: "Pour les actes à utiliser à l'étranger, une légalisation par le ministère des Affaires étrangères peut être demandée."
  }
];
