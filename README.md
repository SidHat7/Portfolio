# Portfolio  Aboubacar Sidiki Diomandé

Site personnel (cybersécurité défensive, réseaux & systèmes) publié sur GitHub Pages :
https://sidhat7.github.io/Portfolio/

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil (recherche, compétences, projets phares, parcours, certifications, contact) |
| `projets.html` | Tous les projets, filtrables par thème |
| `cv.html` | Page CV : 4 versions (cybersécurité, agent de sécurité, job étudiant, intérim), téléchargement et aperçu |
| `projects.js` | **Données des projets** : c'est ici qu'on ajoute ou modifie un projet |
| `script.js` | Menu mobile, rendu des projets, modale, filtres, formulaire de contact |
| `style.css` | Styles communs |
| `assets/` | Photo, favicon et CV (`CV_Diomande.pdf`) |

## Mettre à jour

- **Ajouter un projet** : ajouter un objet dans `projects.js` (`featured: true` pour qu'il apparaisse sur l'accueil, `repo` pour un lien GitHub).
- **CV** : déposer les PDF dans `assets/cv/` avec ces noms exacts : `CV_Cybersecurite.pdf`, `CV_Agent_Securite.pdf`, `CV_Job_Etudiant.pdf`, `CV_Interim.pdf`. Chaque bouton de téléchargement s'active automatiquement dès que son fichier est présent (sinon « Bientôt disponible »).
- Le formulaire de contact passe par Formspree.
