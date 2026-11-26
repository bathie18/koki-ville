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

Liens directs vers une fiche : `demarches.html#declarer-naissance`, vers un thème : `demarches.html#cat=foncier`.

## Fichiers à modifier

- `config.js` : nom de la commune (Coki / Koki), maire, contacts, horaires, bandeau d'information, réseaux sociaux, pied de page, lien de l'application cartographique.
- `data/demarches.js` : les fiches de démarches (pièces, coûts, délais, étapes).
- `data/actualites.js` : actualités et agenda (`demo: true` affiche un badge « Exemple »).
- `data/limite.js` : limite communale (WGS84), issue de `limite_coki.geojson`.
- Les textes des pages sont dans les fichiers `.html`.

## Publication

Dépôt GitHub > Settings > Pages > branche `main`, dossier `/ (root)`.
Les anciens fichiers `assets/site.js` et `assets/style.css` ne sont plus utilisés et peuvent être supprimés.

## Limites du prototype

- Les formulaires (contact, signalement) ne transmettent rien : ils affichent une confirmation de démonstration.
  En production, les brancher sur un service (formulaire en ligne, API de la mairie ou base PostGIS des signalements).
- Pièces, coûts et délais des démarches : indicatifs, à valider par les services de la mairie.
- À fournir par la mairie : contacts, horaires, composition du conseil, photos, documents budgétaires.
