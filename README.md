# Portfolio  Aboubacar Sidiki Diomandé

Site personnel (cybersécurité défensive, réseaux & systèmes) publié sur GitHub Pages :
https://sidhat7.github.io/Portfolio/

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil (recherche, compétences, projets phares, parcours, certifications, contact) |
| `projets.html` | Tous les projets, filtrables par thème |
| `cv.html` | Page CV : aperçu et bouton de téléchargement |
| `projects.js` | **Données des projets** : c'est ici qu'on ajoute ou modifie un projet |
| `script.js` | Menu mobile, rendu des projets, modale, filtres, formulaire de contact |
| `style.css` | Styles communs |
| `assets/` | Photo, favicon et CV (`CV_Diomande.pdf`) |

## Mettre à jour

- **Ajouter un projet** : ajouter un objet dans `projects.js` (`featured: true` pour qu'il apparaisse sur l'accueil, `repo` pour un lien GitHub).
- **CV** : déposer le PDF sous `assets/CV_Diomande.pdf` ; la page `cv.html` active alors automatiquement le bouton de téléchargement et l'aperçu (sinon elle affiche « CV en cours de mise à jour »).
- Le formulaire de contact passe par Formspree.
