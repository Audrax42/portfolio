# Portfolio d'Axel Denis

Site personnel statique, en français (`/`) et en anglais (`/en/`), publié avec GitHub Pages.

## Modifier le contenu

Tous les textes se trouvent dans `src/content/fr.mjs` et `src/content/en.mjs`. Après une modification :

```bash
node build.mjs
```

La commande régénère `index.html` et `en/index.html`. Il suffit ensuite de publier ces fichiers ; aucune autre étape de build n'est nécessaire.

| Fichier | Rôle |
| --- | --- |
| `src/content/*.mjs` | Les textes, projets, compétences et liens |
| `src/render.mjs` | Le gabarit HTML commun aux deux langues |
| `styles.css` | La mise en page |
| `main.js` | Image fixe qui change, carte du homelab, animations |
| `assets/` | Photos, CV en PDF, favicon |

## Publication

Le site est publié par GitHub Pages depuis la branche `main` de ce dépôt (dossier racine), sur le domaine **https://axeldenis.me** (fichier `CNAME`).

- DNS chez Namecheap : enregistrements `A` de `axeldenis.me` vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, et `www` en `CNAME` vers `audrax42.github.io`.
- Dans *Settings → Pages*, le domaine personnalisé est `axeldenis.me` et *Enforce HTTPS* est coché.
- L'adresse `SITE` de `src/render.mjs` vaut `https://axeldenis.me/` : elle sert aux liens canoniques et à l'aperçu sur les réseaux sociaux.

## Crédits photographiques

Les photographies proviennent de Wikimedia Commons, sous licences CC BY et CC BY-SA. Elles sont créditées dans le pied de page du site. Ces images ont été redimensionnées et recadrées pour le site.
