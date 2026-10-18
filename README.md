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
| `assets/` | Photo, favicon, polices (`fonts/`) et CV (`cv/`) |
| `.well-known/security.txt` | Contact pour signaler une vulnérabilité (à renouveler avant la date `Expires`) |

## Mettre à jour

- **Ajouter un projet** : ajouter un objet dans `projects.js` (`featured: true` pour qu'il apparaisse sur l'accueil, `repo` pour un lien GitHub).
- **CV** : déposer les PDF dans `assets/cv/` avec ces noms exacts : `CV_Cybersecurite.pdf`, `CV_Agent_Securite.pdf`, `CV_Job_Etudiant.pdf`, `CV_Interim.pdf`. Chaque bouton de téléchargement s'active automatiquement dès que son fichier est présent (sinon « Bientôt disponible »).
- Le formulaire de contact passe par Formspree.

## Sécurité

- Site 100 % statique, aucune ressource tierce chargée : polices hébergées localement (RGPD), CSP stricte (`default-src 'none'`) dans chaque page.
- L'adresse email est assemblée en JavaScript au survol, pour ne pas être lisible par les robots collecteurs.
- Formulaire : champ piège `_gotcha` et limite d'un envoi par minute. Activer aussi le reCAPTCHA dans le tableau de bord Formspree.
- `security.txt` : penser à repousser la date `Expires` chaque année.
