# Catalogue Pro — application statique (GitHub Pages)

Application de catalogue produits **100 % statique** : aucun serveur, aucun
PHP, aucune base externe. Tout tourne dans le navigateur.

- **3 111 produits** et **3 068 photos** embarqués (mêmes produits que l'ancien site).
- **Classement TOUJOURS alphabétique** : un produit créé ou modifié se range
  automatiquement à sa place (insensible aux accents) ; l'écran est amené sur
  lui (ou sa position est indiquée).
- **Barre de recherche en haut** (nom, marque, pays, code, conditionnement), insensible aux accents.
- **Responsive** : 2 colonnes sur mobile, **3 colonnes sur PC** (largeur
  contenue) ; fiche produit en modale centrée sur PC, panneau bas sur mobile.
- **Appareil photo** pour ajouter un produit (caméra intégrée en HTTPS, sinon
  appareil photo natif). La photo est **convertie en WebP 360×360**, sujet
  centré fond blanc : strictement le même cadre que toutes les photos du
  catalogue. **Capture fiabilisée** : attente d'une vraie trame vidéo
  (`readyState >= 2`), prise sur `requestAnimationFrame`, contrôle anti-photo
  blanche avec nouvelles tentatives automatiques.
- **Restauration des suppressions** : menu **⋯ → ♻️ Restaurer les produits
  supprimés** réaffiche tous les produits supprimés (localement puis partout
  après synchronisation). Le diagnostic (⋯ → ️) précise désormais le nombre
  de modifications **non poussées**.
- **Date/heure de la dernière MAJ affichées en permanence** dans la barre du
  haut, au centre entre le compteur de produits et le badge de sync
  (« MAJ : 23/09/2026 19:11 », **heure de Paris Europe/Paris** sur tous les
  appareils). **La valeur affichée est la date/heure du dernier commit GitHub
  de `data/userdb.json`** (horodatage serveur GitHub, exact), relue après
  chaque envoi réussi, à chaque adoption **et à chaque fusion**. **Une simple
  consultation ne modifie jamais l'horodatage** : la fusion n'est déclenchée
  que si le contenu local diffère réellement du distant (intentions locales),
  et aucun push n'est envoyé dans ce cas. Sur **écran
  étroit** (≤560 px) la barre passe sur deux lignes :
  compteur + badge sync + menu en haut, **MAJ centrée sur sa propre ligne** ;
  les libellés deviennent compacts (`3111/3111`, `GitHub`, `Lecture`,
  `Attente`, `Locale`, `Source KO`) avec le libellé complet en info-bulle —
  rien n'est tronqué. L'horodatage est mis à jour à chaque
  modification locale et repris du dépôt lors des synchronisations ; il est
  conservé au rechargement.
- **Mise à jour automatique au lancement** : à chaque ouverture, l'application
  relit `index.html` **sans cache HTTP** (via le service worker) et le fichier
  `data/userdb.json` (cache cassé par horodatage). Si une nouvelle version du
  catalogue ou des modifications du dépôt sont présentes, elles sont appliquées
  immédiatement avec un message (« Nouvelle version du catalogue chargée »,
  « Mise à jour appliquée : N élément(s) reçu(s) du dépôt »).
- **Envois GitHub accélérés et auto-réparants** : sha mis en cache (un
  aller-retour de moins), mais **invalidé dès qu'un conflit « does not match »
  survient** (un sha neuf est alors relu, jusqu'à 3 tentatives) ; envois
  groupés (modifications rapprochées = un seul commit) ; confirmation locale
  immédiate ; envoi forcé à la fermeture de l'onglet ; **nouvelle tentative
  automatique toutes les 15 s** tant qu'un envoi est en attente, plus une
  relance au retour en ligne / au focus. Un « sync en attente » se résout donc
  tout seul dès que le conflit disparaît.
- **Position de scroll préservée PARTOUT, y compris tout en bas de liste** :
  après un ajout/modification/suppression, la grille est mise à jour **en
  place** (`mutateGrid()` : cartes réutilisées/réordonnées, seules les
  différences sont créées ou retirées, contenu rafraîchi par signature) — aucun
  vidage de grille, donc aucun saut, quel que soit le niveau de défilement.
  Seule une recherche remonte en haut, volontairement. Sur **mobile**,
  où l'ouverture d'un panneau peut remettre le scroll à 0, la position est
  **mémorisée à l'ouverture du panneau** puis restaurée (double scrollTo +
  requestAnimationFrame).
- **Ajout / modification / suppression** de **tous** les produits.
- **Mot de passe `PsP`** demandé **une seule fois par session** pour ajouter / modifier / supprimer.
- **Code-barres EAN-13** (symbologie universelle des caisses) sur **chaque
  carte** et en grand sur la fiche : GTIN-13 construit depuis le code 8
  chiffres (code complété à 12 chiffres + chiffre de contrôle GS1). Ex. code
  `88062573` → EAN-13 `0000880625737`, affiché `0 000880 625737`. Le
  **Code 128 du code interne** reste affiché en secondaire sur la fiche. Les barres encodent
  **exactement** le code (vérifié par décodage dans les tests) ; rendu
  optimisé pour le scan : barres nettes (`crispEdges`), zones calmes blanches,
  module large (30 px en liste, 56 px en fiche).
- **Ultra-léger** : ~14 Ko de JS, ~6 Ko de CSS, zéro dépendance, zéro framework ;
  un seul fichier HTML auto-suffisant (~305 Ko, gzip ~90 Ko) qui marche aussi
  en `file://` et dans les aperçus (CSS/JS inline, aucune ressource externe).
- **Rapide** : données mises en cache, images lazy-load + service worker, rendu par lots de 60.

## Où sont les données ?

| Donnée | Emplacement |
|---|---|
| Catalogue de base | **inline dans `index.html`** (`window.CATALOG`, clés courtes `r,n,m,p,c`) — une seule requête, marche aussi en `file://` |
| Photos catalogue | `img/<code>.webp` (carrés 360×360, centrés, fond blanc) |
| **Base partagée** (ajouts/modifs/suppressions + photos) | **`data/userdb.json` dans le dépôt GitHub**, mis à jour **en temps réel** par l'app via l'API GitHub (commit) |
| Repli local | localStorage `catpro.ch.v1` si pas de jeton / hors-ligne, poussé au retour |

### Sync GitHub temps réel
1. **Aucun réglage n'est nécessaire pour consulter** : quand le site est servi
   par GitHub Pages (`https://PROPRIO.github.io/DEPOT/`), l'application
   **détecte toute seule** le propriétaire et le dépôt depuis l'URL et lit
   `data/userdb.json`. Sur n'importe quel appareil, ouvrez le site : vous
   voyez les dernières modifications. Badge `sync : lecture GitHub`.
2. Sur l'appareil **qui modifie** : créez un jeton **fine-grained** limité à ce
   dépôt, permission **Contents : Read and write**, puis menu **⋯ → Base
   GitHub** → collez uniquement le **jeton** (propriétaire/dépôt sont déjà
   détectés). Badge `sync : GitHub`.
3. Chaque ajout / modification / suppression est **commité immédiatement** dans
   `data/userdb.json` ; les autres appareils l'adoptent au chargement.
   **Réconciliation** : un appareil sans modif locale adopte toujours le
   distant ; s'il a des modifs locales récentes, elles sont fusionnées (local
   prioritaire sur ses refs) puis poussées. **Garde anti-retour** : si le
   dépôt a perdu des modifications déjà poussées, elles sont repoussées au lieu
   d'être écrasées. **Suppressions définitives** : une suppression locale est un
   tombstone qui survit à toute adoption du distant (cache CDN périmé, commit
   perdu) et est repoussée si le dépôt ne la contient pas. Le sha du fichier est
   lu sur la branche d'écriture et un conflit « does not match » déclenche un
   retry automatique.
   Badges : `sync : GitHub` / `sync : lecture GitHub` / `sync : en attente` /
   `sync : source introuvable` / `sync : locale`. Menu **⋯ → ️ Source des
   données / diagnostic** : dépôt résolu, dernière URL lue, résultat, nombre de
   mods locales.

Sans configuration GitHub, tout reste fonctionnel en local (localStorage) ;
menu **⋯ → Exporter / Importer** permet alors un transfert manuel par fichier
JSON.

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
img/                  3 068 photos WebP carrées 360x360
data/userdb.json      base partagée (commitée par l'app via l'API GitHub)
```

Les **sources lisibles/modifiables** sont dans `tools/src/`
(`index.html` gabarit à marqueurs, `app.js`, `style.css`).
**Ne jamais éditer `app/index.html` à la main** : modifier `tools/src/` puis
`python3 tools/build_github.py`.

## Régénérer données / photos

Depuis la racine du projet (hors GitHub) :
```bash
python3 tools/build_github.py     # régénère app/index.html (+ data/userdb.json si absent)
python3 tools/normalize_images.py   # (une fois) carrés 360x360 WebP
```

## Tester

```bash
cd tools/jstest && npm install && cd -
node tools/jstest/app.test.js
```
