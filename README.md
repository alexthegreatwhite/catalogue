# Catalogue Pro — application statique (GitHub Pages)

Application de catalogue produits **100 % statique** : aucun serveur, aucun
PHP, aucune base externe. Tout tourne dans le navigateur. Installable en
application (PWA : `manifest.webmanifest` + service worker).

- **3 111 produits** et **3 068 photos** embarqués dans le catalogue de base ;
  le nombre affiché tient compte en temps réel de la base partagée
  (suppressions et ajouts synchronisés via GitHub).
- **Classement TOUJOURS alphabétique** : un produit créé ou modifié se range
  automatiquement à sa place (insensible aux accents) ; l'écran est amené sur
  lui (ou sa position est indiquée).
- **Barre de recherche en haut** (nom, marque, pays, code, conditionnement,
  **description**), insensible aux accents, multi-mots : **tous** les mots
  saisis doivent se trouver dans le produit (ET strict, appliqué à chaque
  frappe) — un produit qui ne contient pas un des mots saisis n'est jamais
  affiché. La correspondance se fait **n'importe où dans le texte, y compris
  à l'intérieur d'un mot ou d'un code** : « 062574 » trouve le produit
  « 88062574 », « pignon » trouve « champignon ».
- **1re lettre en majuscule automatiquement** : **dès la frappe** dans les
  champs Nom, Marque, Pays, Description (la première lettre tapée passe en
  majuscule, position du curseur préservée), et en filet de sécurité à
  l'enregistrement (`cap1()`, création ou modification ; les écritures sans
  casse, ex. sinogrammes, restent inchangées). **Tous les produits existants
  ont été migrés** : catalogue inline dans `index.html` et base partagée
  `data/userdb.json` (migration re-appliquée le 30/09/2026 après un merge
  régressif sur `data/userdb.json`). De plus, l'**affichage** normalise
  systématiquement (`mk()` + `cap1`) et le **cache local de chaque appareil
  s'auto-soigne** à chaque reconstruction (`healCH()`, qui sauvegarde puis
  repousse la casse correcte) : une minuscule ancienne ne peut plus resurgir,
  même si un push/merge régressif ou un cache local réintroduit des données
  brutes — les appareils se resynchronisent d'eux-mêmes au lancement.
- **Catégories & sous-catégories** : bandeau de chips sous la barre de
  recherche (qui ne bouge pas) : **Boissons, Épicerie, Surgelé, Bazar** ; la
  rangée de sous-catégories (boissons sucrées/alcoolisées ; snacks, thés/cafés/confitures,
  sauces/pâtes, conserves, riz, épices, nouilles / vermicelles / galettes de riz, huiles / vinaigres, produits secs, farines,
  sucres ; fritures, fruits/légumes, viandes, poissons, plats préparés,
  desserts, accompagnement) n'apparaît que lorsqu'une catégorie est choisie. La recherche porte
  toujours sur TOUT le catalogue (quel que soit le rayon choisi) ; choisir une
  catégorie ou une sous-catégorie efface la recherche. Produits, catégories et
  sous-catégories affichés par ordre alphabétique. Chaque produit porte
  une clé `g` (catégorie) et `sg` (sous-catégorie) dans le catalogue inline et
  `data/userdb.json` ; le formulaire ajout/modif propose deux listes
  dépendantes ; les cartes et la fiche affichent un badge coloré. Défilement
  des rangées : swipe au doigt, maintien+glisser à la souris, ou flèches ‹ ›.
- **Mode lot (classement en masse)** : menu **⋯ → 🗂️ Classer plusieurs
  produits** : une barre fixe apparaît en bas ; touchez les cartes pour les
  sélectionner (coche bleue), ou **« + Résultats »** pour prendre d'un coup
  toute la liste affichée — la recherche et les chips servent donc de tri
  préalable ; choisissez catégorie + sous-catégorie puis **« Appliquer »** :
  tous les produits sélectionnés sont classés, enregistrés et synchronisés.
  « ✕ » quitte le mode sans rien changer.
- **Confort mobile** : zoom désactivé (viewport verrouillé + gestes iOS/double-tap
  bloqués) ; la barre d'état (compteur · MAJ · sync) tient **sur une seule
  ligne** partout : compteur `2989/3001`, MAJ `30/09 16:11`, badge sync court
  (`GitHub`, `Lecture`, `Attente`, `Locale`, `Source KO`) avec le libellé
  complet en info-bulle. Les **catégories s'affichent sous cette barre** ;
  visibles à l'arrivée sur la page, elles **se masquent dès qu'on scrolle** —
  une **petite flèche discrète (▾) accrochée sous la barre d'état, centrée
  sous la date de MAJ** (mini-onglet de 44 px, ne prend aucune ligne) la fait
  redescendre à la demande ; **cette flèche disparaît dès que la barre des
  catégories est affichée** ; le repli se fait **instantanément au scroll vers
  le bas**, et la barre **revient en scrollant vers le haut** (après ~160 px
  de remontée cumulée — jamais sur un petit premier scroll ; le compteur se
  remet à zéro dès qu'on redescend) ; quand les catégories sont repliées, les
  produits démarrent juste sous la barre d'état. Sur ordinateur,
  **survoler la barre d'état** (compteur · MAJ ·
  sync) fait aussi apparaître les catégories — elles ne se replient **jamais**
  au départ du curseur : uniquement via le bouton flèche ou un scroll (haut
  ou bas). Le panneau des catégories est un **OVERLAY opaque** (fond blanc,
  ombre légère, **aucun voile ni assombrissement de l'écran**) qui flotte
  au-dessus de la grille et s'ouvre/ferme par transform + opacity → **le
  catalogue ne se décale jamais** — **sauf tout en haut de la page**, où la
  barre repasse **dans le flux** et décale le catalogue afin de ne pas masquer
  les premiers produits. La barre **reste ouverte après la
  sélection** d'une catégorie ou d'une sous-catégorie (les sauts de scroll
  programmés au moment du choix sont ignorés par la logique montrer/masquer).
  Sur ordinateur, si le curseur **n'est pas sur la barre** (panneau ou barre
  d'état) pendant **2 secondes**, la barre overlay se replie toute seule ;
  elle reste ouverte tant que le curseur y reste (et toujours, tout en haut
  de la page, où elle est dans le flux).
- **Responsive** : grille à 2 colonnes sur mobile (colonnes auto ≥ 160 px),
  **3 colonnes sur PC** (≥ 760 px, largeur contenue) ; fiche produit en modale
  centrée sur PC (≥ 820 px), panneau bas sur mobile.
- **Bouton retour smartphone** (bouton Android, geste iOS) : quand une fiche,
  un formulaire ou un panneau est ouvert, le retour **ferme d'abord l'overlay**
  et revient à la grille ; il ne quitte le site que lorsque plus rien n'est
  ouvert (History API ; la caméra se ferme seule avant le formulaire ;
  désactivé silencieusement là où l'historique est indisponible, ex.
  `file://`). Barre d'état de l'app installée **blanche**, fondue avec
  l'en-tête (`theme_color`).
- **Description du produit** (facultative, 600 caractères max) : visible **sous
  le nom sur chaque carte** (tronquée à 2 lignes, masquée si vide) et **en
  entier sur la fiche** (sauts de ligne conservés, « Non renseignée » si vide).
  Ses mots sont **cherchables** dans la barre de recherche.
- **Code-barres caisse (Code 128)** sur **chaque carte** et en grand sur la
  fiche — voir la section dédiée ci-dessous.
- **Code produit de 4 à 13 chiffres, tel que saisi** : les chiffres sont
  extraits de la saisie, **aucun préfixe « 88 » n'est ajouté** pour les nouveaux
  produits (les codes existants du catalogue restent inchangés). Un indice sous
  le champ confirme le code enregistré et son nombre de chiffres.
- **Appareil photo** pour ajouter un produit (caméra intégrée en HTTPS, sinon
  appareil photo natif). La photo est **convertie en WebP 360×360**, sujet
  centré fond blanc : strictement le même cadre que toutes les photos du
  catalogue. **Capture fiabilisée** : attente d'une vraie trame vidéo
  (`readyState >= 2`), prise sur `requestAnimationFrame`, contrôle anti-photo
  blanche avec nouvelles tentatives automatiques.
- **Suppressions** : le bouton « ♻️ Restaurer les produits supprimés » a été
  **retiré** du menu ⋯ (une suppression est définitive). Seul recours : recréer
  un produit avec le même code — l'enregistrement retire automatiquement son
  tombstone et le réaffiche immédiatement, ici et partout après synchronisation.
  Une suppression **ou un changement de code** écrit un **tombstone daté** dans
  la base partagée pour **tous** les produits (catalogue de base **ou** fiche
  créée) : une fiche supprimée ou renommée sur un appareil ne peut plus être
  ressuscitée par un appareil dont le cache local est périmé (c'était la cause
  des doublons après changement de code). Le diagnostic (⋯ → ℹ️ Source des données /
  diagnostic) précise le dépôt résolu, la dernière URL lue, le résultat et le
  nombre de modifications **non poussées**.
- **Date/heure de la dernière MAJ affichées en permanence** dans la barre du
  haut, au centre entre le compteur de produits et le badge de sync
  (« MAJ : 23/09/2026 19:11 », **heure de Paris Europe/Paris** sur tous les
  appareils). **La valeur affichée est la date/heure du dernier commit GitHub
  de `data/userdb.json`** (horodatage serveur GitHub, exact), relue après
  chaque envoi réussi, à chaque adoption **et à chaque fusion**. **Une simple
  consultation ne modifie jamais l'horodatage** : la fusion n'est déclenchée
  que si le contenu local diffère réellement du distant (intentions locales),
  et aucun push n'est envoyé dans ce cas. Sur **écran étroit** (≤ 560 px) la
  barre passe sur deux lignes : compteur + badge sync + menu en haut, **MAJ
  centrée sur sa propre ligne** ; les libellés deviennent compacts
  (`3111/3111`, `GitHub`, `Lecture`, `Attente`, `Locale`, `Source KO`) avec le
  libellé complet en info-bulle — rien n'est tronqué. L'horodatage est mis à
  jour à chaque modification locale et repris du dépôt lors des
  synchronisations ; il est conservé au rechargement.
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
  différences sont créées ou retirées, contenu rafraîchi par signature —
  nom, marque, pays, conditionnement, photo **et description**) — aucun vidage
  de grille, donc aucun saut, quel que soit le niveau de défilement. Seule une
  recherche remonte en haut, volontairement. Sur **mobile**, où l'ouverture
  d'un panneau peut remettre le scroll à 0, la position est **mémorisée à
  l'ouverture du panneau** puis restaurée (double scrollTo +
  requestAnimationFrame).
- **Ajout / modification / suppression** de **tous** les produits.
- **Mot de passe** demandé **une seule fois par session** pour ajouter /
  modifier / supprimer (valeur communiquée séparément ; seule une empreinte
  salée figure dans `index.html`, jamais en clair dans ce README).
- **Ultra-léger** : zéro dépendance, zéro framework ; un seul fichier HTML
  auto-suffisant (~333 Ko, gzip ~70 Ko) qui marche aussi en `file://` et dans
  les aperçus (CSS/JS inline, aucune ressource externe).
- **Rapide** : données mises en cache, images lazy-load + service worker,
  rendu par lots de 60.

## Code-barres caisse (Code 128)

Chaque produit porte **un seul code-barres**, affiché sur sa carte et en grand
sur sa fiche : celui que la caisse doit scanner.

**Valeur scannée** : le code produit complété par des « 0 » à gauche pour
faire **13 chiffres au total** — **uniquement dans le code-barres** ; le code
affiché à l'écran (badge de la carte, fiche, formulaire) reste **exactement le
code saisi**.

| Code produit | Valeur scannée par la caisse |
|---|---|
| `88062573` (8 chiffres) | `0000088062573` |
| `123456789012` (12 chiffres) | `0123456789012` |
| `3017620422003` (13 chiffres) | `3017620422003` (**tel quel, aucun « 0 » ajouté**) |

**Symbologie : Code 128** (universellement prise en charge par les caisses),
et non EAN-13 : un EAN-13 imposerait un chiffre de contrôle GS1 en 13ᵉ
position et ne peut donc pas porter la valeur ci-dessus — la caisse la
rejetterait ou afficherait un autre numéro. Le Code 128 encode **exactement**
les 13 caractères attendus.

Détails d'implémentation :
- encodage conforme à la spécification Code 128 : caractère de **checksum**
  (modulo 103) et motif de **STOP** complet (`2331112`) — les barres ont été
  **vérifiées par décodage** (tous les produits du catalogue décodent la
  valeur attendue) ;
- encodage compact : paires de chiffres (Code C) pour les longueurs paires,
  premier chiffre en Code B puis bascule en Code C pour les longueurs
  impaires (13 chiffres → 123 modules) ;
- rendu optimisé pour le scan : barres nettes (`shape-rendering:
  crispEdges`), zones calmes blanches (fond et marges CSS), hauteur 34 px en
  liste et 56 px en fiche ;
- chaque SVG porte `data-code` et `aria-label` avec la valeur scannée.

## Description du produit

- Champ **Description** du formulaire (ajout/modification, après
  Conditionnement) : facultatif, **600 caractères max**, plusieurs lignes
  possibles.
- **Carte** (écran principal) : la description s'affiche **sous le nom du
  produit**, en gris, **tronquée à 2 lignes** avec « … » ; rien ne s'affiche si
  elle est vide (la grille des produits sans description reste inchangée).
- **Fiche produit** : section « Description » (entre Conditionnement et le
  code-barres), texte complet, sauts de ligne conservés, « Non renseignée » si
  vide. Le texte est échappé (aucune injection HTML possible).
- **Recherche** : les mots de la description sont inclus dans l'index de
  recherche (insensible aux accents, comme le reste).
- **Stockage / sync** : clé `d` des enregistrements de `data/userdb.json` ;
  suit exactement le même circuit que les autres champs (commit GitHub,
  fusion, export/import). Les produits existants sans `d` affichent
  « Non renseignée ».

## Photos créées : fichiers dédiés + détourage IA automatique (Gemini)

- **Les photos ne sont plus stockées dans `data/userdb.json`** (le fichier est
  passé de ~1 Mo à ~230 Ko) : chaque photo prise dans l'app est commitée en
  fichier **`img/<code>-u.webp`** (« u » = utilisateur ; les
  `img/<code>.webp` du catalogue de base ne sont **jamais** écrasés — un
  produit de base re-photographié garde son photo d'origine en repli).
  `data/userdb.json` ne porte qu'un **marqueur de version**
  (`"ph": { "<code>": "u<horodatage ms>" }`) qui construit l'URL affichée
  (`img/<code>-u.webp?v=…`, cache cassé à chaque nouvelle version) et permet
  d'arbitrer les conflits entre appareils (marqueur le plus récent gagne).
- **Détourage IA automatique, en arrière-plan** (API Gemini, palier gratuit) :
  à chaque **nouveau produit créé**, la photo est mise en file ; la création
  n'est **jamais bloquée** — la fiche apparaît tout de suite avec la photo
  originale et, quand le traitement se termine (~5-15 s), la photo de la carte
  est **remplacée en direct** (produit isolé sur **fond blanc pur**, 360×360
  WebP, poids inchangé) avec un toast « ✨ ».
  - **Prompt de fidélité strict** : le produit doit rester identique (textes,
    logos, codes-barres, couleurs, textures), entier, centré, sans ombre ni
    reflet ni ajout. Le résultat de l'IA est utilisé **tel quel** (pas de
    contrôle qualité automatique).
  - **Robustesse** : erreurs réseau/quota (429, 5xx) → réessai différé avec
    temporisation, jusqu'à 4 tentatives ; au-delà, la **photo d'origine est
    conservée** (toast discret). Clé refusée (401/403) → la file est vidée,
    photos d'origine conservées. La file **survit à la fermeture de l'app** et
    repart au lancement ou au retour en ligne.
  - **Clé Gemini partagée, intégrée au code** : tous les utilisateurs ayant le
    **mot de passe** du catalogue en bénéficient automatiquement — **aucune
    clé à saisir**. (La création d'un produit exige déjà le mot de passe, donc
    l'IA est de fait réservée aux utilisateurs déverrouillés.)
    - ⚠️ **Sécurité** : le site étant 100 % statique (aucun serveur), la clé
      est **visible dans le code source** (`index.html`, variable `AI_KEY`).
      Créez-la sur **aistudio.google.com**, **limitez-la à l'API « Generative
      Language API »** et **restez au palier gratuit** (aucune facturation
      possible). Pour la changer : remplacer la valeur de `AI_KEY` (une ligne).
      Laisser le placeholder désactive l'IA.
  - Les **photos existantes ne sont jamais retraitées** ; la version pré-IA
  n'est **pas conservée** (le fichier traité remplace l'original — choix
  assumé pour garder le dépôt léger).
  - Transparence : les images renvoyées par Gemini portent un filigrane
    **SynthID invisible** (aucun effet sur l'affichage).
- **Hors-ligne / sans jeton** : la photo est conservée en local et part en
  fichier automatiquement au retour de la connexion. Un **changement de code**
  recopie le fichier photo en arrière-plan (`img/<ancien>-u.webp` →
  `img/<nouveau>-u.webp`) ; entre-temps, l'ancien fichier est affiché.
- Toutes les écritures GitHub (photos puis `data/userdb.json`) passent par une
  **file sérielle** (l'API impose des commits séquentiels), avec sha rejoué en
  cas de conflit et **garde anti-commit inchangé** (pas de commit vide si le
  contenu est identique au dernier envoi).

## Où sont les données ?

| Donnée | Emplacement |
|---|---|
| Catalogue de base | **inline dans `index.html`** (`window.CATALOG`, clés courtes `r,n,m,p,c`) — une seule requête, marche aussi en `file://` |
| Photos catalogue | `img/<code>.webp` (carrés 360×360, centrés, fond blanc) |
| **Base partagée** (ajouts/modifs/suppressions + marqueurs de version photo + descriptions) | **`data/userdb.json` dans le dépôt GitHub**, mis à jour **en temps réel** par l'app via l'API GitHub (commit) |
| Repli local | localStorage (`catpro.ch.v1`, `catpro.gh.v1`, `catpro.rev.v1`, `catpro.ok`) si pas de jeton / hors-ligne, poussé au retour |

Format de `data/userdb.json` :
```json
{
  "up":  { "<code>": { "r": "<code>", "n": "nom", "m": "marque", "p": "pays", "c": "conditionnement", "d": "description", "_t": 1790931154736 } },
  "del": { "<code>": 1790931154736 },
  "ph":  { "<code>": "u1790931154736" },
  "_maj": "<horodatage ISO du dernier commit>"
}
```
`_t` = horodatage (ms) de la dernière écriture de la fiche ; la valeur d'une
entrée `del` = horodatage (ms) de la suppression (tombstone) ; la valeur d'une
entrée `ph` = **marqueur de version** de la photo (les octets de l'image sont
dans le fichier `img/<code>-u.webp`, pas ici — d'où un `userdb.json` léger).
Les écritures antérieures à ce mécanisme (fiches sans `_t`, tombstones à `1`,
photos en data-URL) sont prises en charge : toute écriture datée les remplace,
et à égalité le local gagne (comportement historique). Les anciennes photos en
data-URL sont **migrées automatiquement** en fichiers `img/<code>-u.webp` au
premier lancement avec jeton.

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
   distant ; s'il a des modifs locales, elles sont fusionnées avec le distant
   **au plus récent** (« dernier écrivant gagne » : chaque écriture porte un
   horodatage — `_t` des fiches, valeur du tombstone pour les suppressions ;
   à égalité, le local gagne) puis poussées. **Garde anti-retour** : si le
   dépôt a perdu des modifications déjà poussées, elles sont repoussées au lieu
   d'être écrasées. **Suppressions définitives** : une suppression locale (ou
   un changement de code, qui supprime l'ancien code) écrit un **tombstone
   daté** pour **tous** les produits — base ou créés — qui survit à toute
   adoption du distant (cache CDN périmé, commit perdu) et ne peut être écarté
   que par une écriture strictement plus récente (ex. re-création du même
   code). Un appareil au cache local périmé ne peut donc plus ressusciter une
   fiche supprimée ou renommée ailleurs. Le sha du fichier est
   lu sur la branche d'écriture et un conflit « does not match » déclenche un
   retry automatique.
   Badges : `sync : GitHub` / `sync : lecture GitHub` / `sync : en attente` /
   `sync : source introuvable` / `sync : locale`. Menu **⋯ → ℹ️ Source des
   données / diagnostic** : dépôt résolu, dernière URL lue, résultat, nombre de
   mods locales.

Sans configuration GitHub, tout reste fonctionnel en local (localStorage) ;
menu **⋯ → ⬇️ Exporter mes modifications / ⬆️ Importer des modifications**
permet alors un transfert manuel par fichier JSON (les descriptions voyagent
avec).

Le menu **⋯** contient : 🔄 Synchroniser avec GitHub · ⚙️ Base GitHub
(owner/repo/jeton) · ℹ️ Source des données / diagnostic · ⬇️ Exporter mes
modifications · ⬆️ Importer des modifications.

## Fiche produit

Panneau (modale centrée sur PC, panneau bas sur mobile) avec : photo grand
format, nom, code produit en badge, marque, pays d'origine, conditionnement,
**description**, **code-barres caisse** (seul code-barres de la fiche, sans
texte à côté) et les boutons **✏️ Modifier** / **🗑 Supprimer** (mot de passe
requis).

## Mot de passe

Valeur communiquée séparément à l'équipe — **jamais écrite dans ce README ni
en clair dans le code** : seule l'empreinte FNV-1a salée (`PASS_HASH`) figure
dans `index.html`. Demandé une fois par session (`sessionStorage`). C'est un
verrou de confort, pas une sécurité serveur (impossible en statique).

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
   (Le dossier fait ~24 Mo à cause des photos : si `git push` est lent,
   utilisez GitHub Desktop ou découpez en plusieurs commits.)
3. Dans le dépôt : **Settings → Pages → Branch : `main` / folder : `/ (root)`** → Save.
4. Attendez ~1 min, ouvrez `https://VOTRE_COMPTE.github.io/catalogue/`.

> Sur `github.io` vous êtes en **HTTPS** : la caméra intégrée (demande
> d'autorisation du navigateur) et le service worker fonctionnent.

## Structure

```
index.html            FICHIER AUTO-SUFFISANT : CSS + JS + catalogue de base
                      (3 111 produits) inline → une seule requête
sw.js                 service worker (coquille + données en cache, images
                      cache-first bornées, index.html/userdb toujours frais)
manifest.webmanifest  installation en application (standalone, icônes any + maskable)
img/                  3 068 photos WebP carrées 360×360 du catalogue de base
                      (img/<code>.webp) + photos créées/détourées par l'app
                      (img/<code>-u.webp, « u » = utilisateur)
icons/                icônes PWA (192, 512, maskable 512, apple-touch)
data/userdb.json      base partagée (commitée par l'app via l'API GitHub)
README.md             ce fichier
```

Le dépôt est **auto-portant** : `index.html` est le fichier unique à modifier
pour faire évoluer l'application (CSS, JS et catalogue y sont inline) — pas de
build, pas de dépendance, pas d'outil externe. Les produits ajoutés/modifiés
vivent dans `data/userdb.json`, écrit par l'application elle-même : ne pas le
modifier à la main pendant que le site est utilisé (risque d'écraser les
modifications en cours de sync).
