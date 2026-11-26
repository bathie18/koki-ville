# koki-ville — prototype du site de la commune de Coki / Koki

Site statique (HTML, CSS, JavaScript), sans outil de compilation ni service externe :
Leaflet, les icônes (Lucide) et les polices (Fraunces, Manrope) sont inclus dans `assets/vendor` et `assets/fonts`.
Seul le fond de carte vient d'OpenStreetMap.
Hébergement : GitHub Pages (dépôt `bathie18/koki-ville`).

## Pages

| Page | Contenu |
|---|---|
| `index.html` | Accueil : recherche, accès directs, actualités, démarches les plus demandées, agenda, chiffres, projets |
| `demarches.html` | 19 démarches filtrables par thème et par public, fiche détaillée (pièces à cocher, étapes, impression) |
| `mairie.html` | Mot du maire, conseil municipal, services, compétences de la commune, budget et délibérations |
| `territoire.html` | Chiffres clés, carte interactive (limite communale réelle), histoire et patrimoine |
| `vivre.html` | Éducation, santé, eau, agriculture, jeunesse et sport, Daara |
| `projets.html` | Projets de la commune et leur avancement |
| `actualites.html` | Actualités et agenda |
| `cooperation.html` | Coopération avec Dijon, diaspora et partenaires |
| `contact.html` | Formulaire de contact et signalement localisé sur la carte |
| `formulaire.html?f=…` | Démarches en ligne en plusieurs étapes, avec accusé de réception |
| `suivi.html` | Suivi d'un dossier par son numéro |
| `agent.html` | Espace agents (démonstration) : demandes, signalements sur carte, paiements, messages |

Liens directs vers une fiche : `demarches.html#declarer-naissance`, vers un thème : `demarches.html#cat=foncier`.

## Fichiers à modifier

- `config.js` : nom de la commune (Coki / Koki), maire, contacts, horaires, bandeau d'information, réseaux sociaux, pied de page, lien de l'application cartographique.
- `data/demarches.js` : les fiches de démarches (pièces, coûts, délais, étapes).
- `data/actualites.js` : actualités et agenda (`demo: true` affiche un badge « Exemple »).
- `data/limite.js` : limite communale (WGS84), issue de `limite_coki.geojson`.
- Les textes des pages sont dans les fichiers `.html`.

## Formulaires en ligne (démonstration)

Décrits dans `data/formulaires.js`, affichés par `assets/js/formulaires.js` :
extrait d'acte de naissance, certificat de résidence, déclaration de naissance, affectation de parcelle,
occupation du domaine public, réservation d'équipement, subvention, paiement (Wave, Orange Money, Free Money simulés),
plus le message et le signalement de `contact.html`.

- Chaque envoi crée un numéro de dossier (ex. `EC-2026-1184`) et un accusé de réception imprimable.
- Les dossiers sont enregistrés **dans le navigateur uniquement** (`localStorage`) : rien n'est transmis.
- Le statut avance seul pour la démonstration (reçu, puis en cours après 3 min, traité après 10 min) ;
  l'espace agents permet aussi de le changer à la main.
- Dossiers et signalements d'exemple (fictifs) : `DEMO_DOSSIERS` et `DEMO_SIGNALEMENTS` dans `data/formulaires.js`.

Pour la mise en production, deux fonctions sont à remplacer dans `assets/js/formulaires.js` :
`KK.store.enregistrer()` (envoi au service de la mairie) et `KK.store.statut()` (lecture du statut réel).
Les signalements, avec leurs coordonnées, peuvent alimenter directement une table PostGIS affichée dans QWC.

## Publication

Dépôt GitHub > Settings > Pages > branche `main`, dossier `/ (root)`.
Les anciens fichiers `assets/site.js` et `assets/style.css` ne sont plus utilisés et peuvent être supprimés.

## Limites du prototype

- Les formulaires enregistrent les demandes sur l'appareil de l'utilisateur seulement (voir plus haut).
- Pièces, coûts et délais des démarches : indicatifs, à valider par les services de la mairie.
- À fournir par la mairie : contacts, horaires, composition du conseil, photos, documents budgétaires.
