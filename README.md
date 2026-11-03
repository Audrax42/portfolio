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

## Publier sur GitHub Pages

1. Créer un dépôt nommé **`Audrax42.github.io`** sur GitHub.
2. Pousser ce dossier sur la branche `main`.
3. Dans *Settings → Pages*, choisir *Deploy from a branch*, branche `main`, dossier `/ (root)`.

Le site est alors en ligne à l'adresse `https://audrax42.github.io/`.

## Passer au domaine axeldenis.fr

1. Chez le registraire, créer pour `axeldenis.fr` quatre enregistrements `A` vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153` et `185.199.111.153`, plus un `CNAME` pour `www` vers `audrax42.github.io`.
2. Dans *Settings → Pages → Custom domain*, saisir `axeldenis.fr` (GitHub crée le fichier `CNAME`), puis cocher *Enforce HTTPS*.
3. Dans `src/render.mjs`, remplacer `SITE` par `https://axeldenis.fr/` et relancer `node build.mjs`, pour que les liens canoniques et l'aperçu des réseaux sociaux pointent vers le nouveau domaine.

## Crédits photographiques

Les photographies proviennent de Wikimedia Commons, sous licences CC BY et CC BY-SA. Elles sont créditées dans le pied de page du site. Ces images ont été redimensionnées et recadrées pour le site.
