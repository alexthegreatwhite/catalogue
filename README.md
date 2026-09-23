# Catalogue Pro — application statique (GitHub Pages)

Application de catalogue produits **100 % statique** : aucun serveur, aucun
PHP, aucune base externe. Tout tourne dans le navigateur.

- **3 111 produits** et **3 068 photos** embarqués (mêmes produits que l'ancien site).
- **Barre de recherche en haut** (nom, marque, pays, code, conditionnement), insensible aux accents.
- **Responsive** : grille adaptée mobile (2 colonnes) et PC (jusqu'à 8+).
- **Appareil photo** pour ajouter un produit (caméra intégrée en HTTPS, sinon appareil photo natif).
- **Ajout / modification / suppression** de **tous** les produits.
- **Mot de passe `PsP`** demandé **une seule fois par session** pour ajouter / modifier / supprimer.
- **Code-barres Code 128** du code (8 chiffres, préfixe 88) sur chaque fiche.
- **Ultra-léger** : ~14 Ko de JS, ~6 Ko de CSS, zéro dépendance, zéro framework ;
  un seul fichier HTML auto-suffisant (~305 Ko, gzip ~90 Ko) qui marche aussi
  en `file://` et dans les aperçus (CSS/JS inline, aucune ressource externe).
- **Rapide** : données mises en cache, images lazy-load + service worker, rendu par lots de 60.

## Où sont les données ?

| Donnée | Emplacement |
|---|---|
| Catalogue de base | **inline dans `index.html`** (`window.CATALOG`, clés courtes `r,n,m,p,c`) — une seule requête, marche aussi en `file://` |
| Photos | `img/<code>.jpg` (360 px, ~9 Ko chacune) |
| Ajouts / modifications / suppressions | **localStorage du navigateur** (`catpro.ch.v1`) |
| Photos prises | localStorage (`catpro.ch.v1`, section `ph`, en JPEG 600 px) |

Comme GitHub Pages est statique, les modifications sont **locales à chaque
navigateur**. Pour les transférer d'un appareil à l'autre : menu **⋯ →
Exporter mes modifications** (fichier JSON), puis **⋯ → Importer** sur l'autre
appareil.

## Mots de passe

`PsP`, vérifié côté client par empreinte FNV-1a salée (`PASS_HASH` dans
`app.js`). Demoré une fois par session (`sessionStorage`). C'est un verrou de
confort, pas une sécurité serveur (impossible en statique).

## Mettre en ligne sur GitHub Pages

1. Créez un dépôt GitHub (ex. `catalogue`).
2. Poussez **tout le contenu de ce dossier** à la racine du dépôt :
   ```bash
   git init
   git add .
   git commit -m "Catalogue Pro"
   git branch -M main
   git remote add origin https://github.com/VOTRE_COMPTE/catalogue.git
   git push -u origin main
   ```
   (Le dossier fait ~30 Mo à cause des photos : si `git push` est lent,
   utilisez GitHub Desktop ou découpez en plusieurs commits.)
3. Dans le dépôt : **Settings → Pages → Branch : `main` / folder : `/ (root)`** → Save.
4. Attendez ~1 min, ouvrez `https://VOTRE_COMPTE.github.io/catalogue/`.

> Sur `github.io` vous êtes en **HTTPS** : la caméra intégrée (demande
> d'autorisation du navigateur) et le service worker fonctionnent.

## Structure

```
index.html            FICHIER AUTO-SUFFISANT généré : CSS + JS + catalogue
                      (3 111 produits) inline → une seule requête
sw.js                 service worker (cache coquille + images)
manifest.webmanifest  installation en application
img/                  3 068 photos (360 px)
```

Les **sources lisibles/modifiables** sont dans `tools/src/`
(`index.html` gabarit à marqueurs, `app.js`, `style.css`).
**Ne jamais éditer `app/index.html` à la main** : modifier `tools/src/` puis
`python3 tools/build_github.py`.

## Régénérer données / photos

Depuis la racine du projet (hors GitHub) :
```bash
python3 tools/build_github.py     # reconstruit data/products.json + img/
```

## Tester

```bash
cd tools/jstest && npm install && cd -
node tools/jstest/app.test.js
```
