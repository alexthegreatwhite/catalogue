# Rapport de comparaison — Paris Store ⇄ catalogue (repo `alexthegreatwhite/catalogue`)

**Date :** 2026-10-10 · **Sources :** https://paris-store.com/produits/ (268 pages listing + fiches produit + sitemap) et dépôt GitHub (commit `70e060c`, 2026-10-10 11:43 UTC).

## Méthode
1. **Extraction site** : 3 206 produits listés (12/page × 268 pages) avec code (SKU), nom, nom chinois, photo ; sitemap produits = 3 210 URLs ; fiches produit individuelles pour marque, pays d'origine, conditionnement, catégories.
2. **Extraction repo** : catalogue inline `index.html` (`window.CATALOG`, 3 111 produits, codes `88` + référence site) + base partagée `data/userdb.json` (1 654 fiches `up`, 165 tombstones `del`, 110 marqueurs photo `ph`).
3. **Comparaison** par code (référence site ↔ `88`+référence) puis par nom normalisé (insensible aux accents/casse).

## Chiffres clés
| Indicateur | Valeur |
|---|---|
| Produits listés sur paris-store.com | 3 206 (+ 4 masqués du listing, présents au sitemap) |
| Produits affichés par votre app avant update | 3 038 (3 111 base − overrides/suppressions + 1 654 `up`) |
| Produits site **déjà présents** dans le repo (par code) | 3 091 |
| Produits site **absents** du repo → **ajoutés** | **113** |
| Cas particuliers non doublonnés | 4 (voir ci-dessous) |
| Produits site correspondant à un tombstone (supprimés volontairement) | 0 |
| Fiches existantes modifiées ou supprimées par l'update | **0** (ajouts uniquement) |

## Les 113 produits ajoutés
Chaque fiche créée dans `data/userdb.json` (« up ») porte : code `88`+référence site, nom, marque, pays, conditionnement, **description = nom chinois + libellé anglais du site** (cherchable dans l'app), catégorie/sous-catégorie (`g`/`sg`), marqueur photo `ph` → `img/<code>-u.webp` (WebP 360×360, fond blanc, sujet centré — standard du repo).

| Code site | Code repo | Nom | Marque | Pays | Cond. | Catégorie / sous-catégorie |
|---|---|---|---|---|---|---|
| 000476 | `88000476` | Liqueur de gingembre – 50 cl | DISTILLERIES MATHA | France | — | boissons / boissons-alcoolisees |
| 000618 | `88000618` | Sate en poudre – 200g | Lakovo | France | — | epicerie / epices-assaisonnements |
| 001363 | `88001363` | Sate en poudre – 1kg | Lakovo | France | — | epicerie / epices-assaisonnements |
| 003326 | `88003326` | Pâte d’arachides – 500g | DAK | France | 6UN/CT | epicerie / sauces |
| 003849 | `88003849` | Boisson thé vert | ITO EN | Allemagne | — | boissons / boissons-sucrees |
| 003850 | `88003850` | Boisson thé vert saveur matcha | ITO EN | Chine | — | boissons / boissons-sucrees |
| 003851 | `88003851` | Sauce sésame grillé 241G | KEWPIE | Pologne | 12/CRN | epicerie / sauces |
| 003852 | `88003852` | Sauce sésame grillé 949G | KEWPIE | Pologne | 6/CTN | epicerie / sauces |
| 010291 | `88010291` | Bonbons de la chance C5920 300G | — | — | 20UN/CTN | epicerie / snacks-sucres |
| 010336 | `88010336` | Kumquat confit 150G | Eaglobe | Chine | — | epicerie / snacks-sucres |
| 010534 | `88010534` | Pate de soja piment – 280g | Eaglobe | Chine | — | epicerie / sauces |
| 013046 | `88013046` | Haricot mungo – 1kg | Eaglobe | Chine | 10UN/CT | epicerie / produits-secs |
| 015194 | `88015194` | Nouilles instantanée saveur Tom Yum 60Gx5 | Wing Man Trading | Chine | — | epicerie / nouilles-instantanees |
| 017011 | `88017011` | Racine de lotus confit – 150g | Eaglobe | Chine | 50UN/CT | epicerie / produits-secs |
| 017393 | `88017393` | Bonbons arôme fraise 100G | Wing Man Trading | Chine | 30/CTNS | epicerie / snacks-sucres |
| 020495 | `88020495` | Préparation dessert sésame 160G | Torto | Hong Kong | — | epicerie / snacks-sucres |
| 020528 | `88020528` | Boisson au soja noir – 250ml | Vitasoy | Hong Kong | 48/CTN | boissons / boissons-sucrees |
| 020530 | `88020530` | Boisson au soja – 250ml | Vitasoy | Hong Kong | 48/CTN | boissons / boissons-sucrees |
| 020590 | `88020590` | Nouilles instantanée saveur abalone et poulet 70Gx5 | Shun Shun Fuk | Chine | 12UN/CTN | epicerie / nouilles-instantanees |
| 020692 | `88020692` | Nouilles instantanée langouste 70Gx5 | Wing Man Trading | Chine | 12UN/CTN | epicerie / nouilles-instantanees |
| 020709 | `88020709` | Boisson au thé saveur citron – 250ml | Vita | Hong Kong | 48/CTN | boissons / boissons-sucrees |
| 030454 | `88030454` | Préparation sauce curry medium Hot 92G | S&B | Japon | 24/CT | epicerie / sauces |
| 030505 | `88030505` | Chapelure 230G | QUEEN’S CHEF | Japon | 24UN/CT | epicerie / farines-poudres |
| 030580 | `88030580` | Sauce Teriyaki 1.9L | Kikkoman | Japon | 4UN/CTN | epicerie / sauces |
| 030962 | `88030962` | Préparation sauce curry légumes medium Hot 230G | S&B | Japon | 30/CT | epicerie / sauces |
| 030963 | `88030963` | Sauce Hinode alcool 14% – 400ml | Hinode | Japon | — | boissons / boissons-alcoolisees |
| 030978 | `88030978` | Biscuit au Wazabi 54G | Bright Noble Trading | Japon | — | epicerie / snacks-sales |
| 031107 | `88031107` | Bouillon de poisson (Dashi) – 1kg | WISMETTAC FOODS INC | Japon | — | epicerie / epices-assaisonnements |
| 031108 | `88031108` | Soupe instantanée miso tofu 150.4G | HIKARI MISO | Japon | — | epicerie / epices-assaisonnements |
| 031109 | `88031109` | Soupe instantanée miso tofu frit aburaage 155.2G | HIKARI MISO | Japon | — | epicerie / epices-assaisonnements |
| 031110 | `88031110` | Soupe instantanée miso wakame 156G | HIKARI MISO | Japon | — | epicerie / epices-assaisonnements |
| 031148 | `88031148` | Tofu Extra Ferme – 308g | MORINAGA | Japon | 12UN/CT | epicerie / conserves-salees |
| 031239 | `88031239` | Saké aromatisé au matcha 8,5% 180ml | Hinode | Japon | 30UN/CT | boissons / boissons-alcoolisees |
| 031240 | `88031240` | Riz Sushi 1 kg | Shinode | Japon | 10UN/CT | epicerie / riz |
| 031244 | `88031244` | Riz Sushi 10 kg | Shinode | Japon | 10UN/CT | epicerie / riz |
| 031247 | `88031247` | Saké aromatisé au yuzu 8,5% 180ml | Hinode | Japon | 30UN/CT | boissons / boissons-alcoolisees |
| 040307 | `88040307` | Préparation boisson gingembre et thé vert matcha | Gold Kili | Singapour | — | epicerie / thes-cafes |
| 040797 | `88040797` | Soja jaune préparé 380G | OH GUAN HING SESAME | Singapour | 24UN/CTN | epicerie / sauces |
| 050464 | `88050464` | Perles bubble tea arome Litchi | HELM WING CORP | Taiwan | 8/CTN | epicerie / conserves-sucrees |
| 060002 | `88060002` | Agar Agar en poudre 25G | PLATAPIANTONG BRAND | Thaïlande | 240P/CT | epicerie / farines-poudres |
| 060416 | `88060416` | Mangoustan entier au sirop – 565g | Twin Elephants | Thaïlande | 24/CTN | epicerie / conserves-sucrees |
| 060961 | `88060961` | Pousse de bambou – 300g | Penta | Thaïlande | 36UN/CT | epicerie / conserves-salees |
| 062101 | `88062101` | Sauce sriracha extrêmement piquant – 450ml | Thai Dancer | Thaïlande | X12/CT | epicerie / sauces |
| 062561 | `88062561` | Sauce sriracha saveur yuzu – 200ml | Thai Dancer | Thaïlande | X12/CT | epicerie / sauces |
| 062562 | `88062562` | Sauce sriracha saveur gochujang – 200ml | Thai Dancer | Thaïlande | X12/CT | epicerie / sauces |
| 080002 | `88080002` | Préparation pour soupe saveur tamarin – 40g | KNORR | Philippines | 144UN/CTN | epicerie / epices-assaisonnements |
| 130001 | `88130001` | Infusion amincissante et vitalisante | Mei Li | Sri Lanka | 24UN/CT | epicerie / thes-cafes |
| 130002 | `88130002` | Infusion amincissante et drainante | Mei Li | Sri Lanka | 24UN/CT | epicerie / thes-cafes |
| 130003 | `88130003` | Infusion Détox | Mei Li | Sri Lanka | 24UN/CT | epicerie / thes-cafes |
| 140125 | `88140125` | Riz Basmati Express 250g | Tilda | Royaume-Uni | 6UN/CT | epicerie / riz |
| 140126 | `88140126` | Riz sauté aux oeufs 250g | — | — | 6UN/CT | epicerie / riz |
| 140130 | `88140130` | Riz aux légumes 250g | Tilda | Royaume-Uni | 6UN/CT | epicerie / riz |
| 140132 | `88140132` | Riz collant 250g | — | — | 6UN/CT | epicerie / riz |
| 160113 | `88160113` | Algues grillées saveur wazabi – 3x4g | A+HoSan | Corée du Sud | 24UN/CTN | epicerie / snacks-sales |
| 160298 | `88160298` | Sirop de maïs – 700g | — | — | — | epicerie / thes-cafes |
| 160334 | `88160334` | Sirop de sucre brun – 600g | NOK CHA WON | Corée du Sud | 12/CTN | epicerie / thes-cafes |
| 160353 | `88160353` | Nouilles instantanées saveur ramen au fromage | Ottogi | Corée du Sud | 20UN/CTN | epicerie / nouilles-instantanees |
| 160410 | `88160410` | Nouilles Joogmyun 900G | Beksul | Corée du Sud | — | epicerie / nouilles-instantanees |
| 160413 | `88160413` | Kimchi végétarien – 150G | Bibigo | Corée du Sud | — | epicerie / conserves-salees |
| 160540 | `88160540` | Rapokki instantané saveur curry cup 145G | YOUNG POONG | Corée du Sud | 16UN/CTN | epicerie / nouilles-instantanees |
| 160618 | `88160618` | Algue séché pour salade – 50g | Otoki | Corée du Sud | 30UN/CTN | epicerie / snacks-sales |
| 160643 | `88160643` | Préparation boisson citron aromatisé matcha 580g | A+HoSan | Corée du Sud | 20UN/CT | epicerie / thes-cafes |
| 160644 | `88160644` | Original Veggie Korean Corndog 240g | Bibigo | Corée Corée du Sud | 12UN/CT | surgele / bouchees-raviolis |
| 160645 | `88160645` | Original Chicken Korean Corndog 160g | Bibigo | Corée Corée du Sud | 12UN/CT | surgele / bouchees-raviolis |
| 160646 | `88160646` | Corndog pommes de terre poulet | Bibigo | Corée | 12UN/CT | surgele / bouchees-raviolis |
| 160647 | `88160647` | Gaufrettes coréennes glacées et fourrées saveur Matcha | CJ Foods | Corée du Sud | 4BX/CTN | surgele / desserts |
| 160648 | `88160648` | Gaufrettes coréennes glacées et fourrées saveur Haricot rouge | CJ Foods | — | 4BX/CTN | surgele / desserts |
| 160649 | `88160649` | Gaufrettes coréennes glacées et fourrées saveur Chocolat | CJ Foods | — | 4BX/CTN | surgele / desserts |
| 160650 | `88160650` | Gaufrettes coréennes glacées et fourrées saveur Châtaigne | CJ Foods | Corée du Sud | 4BX/CTN | surgele / desserts |
| 180094 | `88180094` | Noix de coco confit 100G | Vinawang | Vietnam | 50/CT | epicerie / snacks-sucres |
| 180166 | `88180166` | Noix de coco confit 75G | Vinawang | Vietnam | 50/CT | epicerie / snacks-sucres |
| 180240 | `88180240` | Noix de coco confit 150G | — | Vietnam | 36/CT | epicerie / snacks-sucres |
| 180348 | `88180348` | Mélange de fruits confits 500G | — | Vietnam | 12/CT | epicerie / snacks-sucres |
| 180497 | `88180497` | Mélange de fruits confits 300G | — | Vietnam | 24/CTN | epicerie / snacks-sucres |
| 180534 | `88180534` | Gingembre confit 100G | — | Vietnam | — | epicerie / snacks-sucres |
| 180548 | `88180548` | Graines de lotus sucré – 150g | Vinawang | Vietnam | — | epicerie / snacks-sucres |
| 180634 | `88180634` | Melon confit 5KG | — | — | 4/CT | epicerie / snacks-sucres |
| 180654 | `88180654` | Confit mélange 380G | — | Vietnam | 24/CT | epicerie / snacks-sucres |
| 181258 | `88181258` | Mélange confiseries 250G | Vinawang | Vietnam | — | epicerie / snacks-sucres |
| 181383 | `88181383` | Bananes séchées – 250g | — | Vietnam | 36UN/CT | epicerie / snacks-sucres |
| 181764 | `88181764` | Mélange d’épices Phô – 100g | Eaglobe | Vietnam | 30UN/C | epicerie / epices-assaisonnements |
| 210189 | `88210189` | Sauce curry jaune – 350g | Pasco | Royaume-Uni | X6/CT | epicerie / sauces |
| 230094 | `88230094` | Bonbons gommes à macher au gingembre – Saveurs variées | sina | Indonésie | 72UN/CT | epicerie / snacks-sucres |
| 230095 | `88230095` | Bonbons gommes à macher au gingembre – Saveurs variées | sina | — | 72UN/CT | epicerie / snacks-sucres |
| 280001 | `88280001` | Concentré de soupe ramen Shoyu 1kg | Ajinomoto | Japon | 10UN/CT | epicerie / epices-assaisonnements |
| 280002 | `88280002` | Concentré de soupe ramen Miso 1kg | Ajinomoto | Japon | 10UN/CT | epicerie / epices-assaisonnements |
| 280003 | `88280003` | Concentré de soupe ramen Shio 1kg | Ajinomoto | Japon | 10UN/CT | epicerie / epices-assaisonnements |
| 280004 | `88280004` | Concentré de soupe ramen Tonko 1kg | Ajinomoto | Japon | 10UN/CT | epicerie / epices-assaisonnements |
| 310050 | `88310050` | Confiture de banane – 330g | Royal | Martinique | — | epicerie / thes-cafes |
| 310054 | `88310054` | Confiture de tamarin – 330g | Royal | Martinique | — | epicerie / thes-cafes |
| 310126 | `88310126` | Gelée de groseille – 330g | Royal | Martinique | — | epicerie / thes-cafes |
| 503869 | `88503869` | Flocon d’avoine aux noix et sésame | HM BRAND | Chine | 16/CTN | epicerie / produits-secs |
| 504441 | `88504441` | Rouleau soja 180G | Eaglobe | Chine | — | epicerie / produits-secs |
| 504675 | `88504675` | Poudre de soja pour boisson instantanée | BINGQUAN | Chine | 30/CTN | epicerie / thes-cafes |
| 504676 | `88504676` | Poudre de tofu pour boisson instantanée | BINGQUAN | — | 30/CTN | epicerie / thes-cafes |
| 504677 | `88504677` | Poudre de tofu saveur noix de coco pour boisson instantanée | BINGQUAN | Chine | 30/CTN | epicerie / thes-cafes |
| 504691 | `88504691` | Maïs jaune 220g | Nongsao | Chine | 30/CTN | epicerie / conserves-salees |
| 504692 | `88504692` | Maïs noir 220g | Nongsao | Chine | 30/CTN | epicerie / conserves-salees |
| 504693 | `88504693` | Maïs multicolors 220g | Nongsao | Chine | 30/CTN | epicerie / conserves-salees |
| 504694 | `88504694` | Patate douce grillée – 500g | Nongsao | — | 6UN/CTN | epicerie / conserves-salees |
| 504708 | `88504708` | Torsade croustillante 108G | HUANGLAOWU | Chine | — | epicerie / snacks-sucres |
| 504709 | `88504709` | Crackers saveur BBQ 170G | HUANGLAOWU | Chine | — | epicerie / snacks-sales |
| 504710 | `88504710` | Crackers saveur épicé 170G | HUANGLAOWU | Chine | — | epicerie / snacks-sales |
| 504711 | `88504711` | Confiserie aux graines de courge 168G | HUANGLAOWU | Chine | 30/CTN | epicerie / snacks-sucres |
| 504712 | `88504712` | Confiserie aux graines de sésame 168G | HUANGLAOWU | Chine | 30/CTN | epicerie / snacks-sucres |
| 504713 | `88504713` | Confiserie aux cacahuètes 168G | HUANGLAOWU | Chine | 30/CTN | epicerie / snacks-sucres |
| 504714 | `88504714` | Confiserie aux fruits à coque 168G | HUANGLAOWU | — | 30/CTN | epicerie / snacks-sucres |
| 504715 | `88504715` | Tranches de konjac épicées | YANJIN PUZI | Chine | — | epicerie / snacks-sales |
| 504716 | `88504716` | Tranches de konjac sésame | YANJIN PUZI | Chine | — | epicerie / snacks-sales |
| 504720 | `88504720` | Mangue séchée 160G | YANJINPUZI | Chine | 30/CTN | epicerie / snacks-sucres |
| 504725 | `88504725` | Sauce pour viande braisé ( goût sucré ) 200g | HAIDILAO | Chine | 20UN/CT | epicerie / sauces |
| 504726 | `88504726` | Sauce pour viande ( double cuisson ) 150g | HAIDILAO | Chine | 20UN/CT | epicerie / sauces |
| 504727 | `88504727` | Assaisonement pour poulet au piment séché 120g | HAIDILAO | Chine | 20UN/CT | epicerie / epices-assaisonnements |

## Catégories : mapping appris + corrections
Le mapping site→repo (`g`/`sg`) a été **appris sur les 3 082 produits communs** (catégorie WooCommerce la plus profonde → catégorie/sous-catégorie majoritaire dans le repo). 7 fiches dont le site se trompe manifestement de rayon ont été reclassées à la main, en suivant les conventions du repo :

| Code | Produit | Catégorie site (erronée) | Classé dans le repo |
|---|---|---|---|
| 010291 | Bonbons de la chance C5920 300G | boissons | epicerie / snacks-sucres |
| 031107 | Bouillon de poisson (Dashi) – 1kg | boissons | epicerie / epices-assaisonnements |
| 160353 | Nouilles instantanées saveur ramen au fromage | boissons | epicerie / nouilles-instantanees |
| 160643 | Préparation boisson citron aromatisé matcha | boissons | epicerie / thes-cafes |
| 031148 | Tofu Extra Ferme – 308g | surgelés (legumes-assaisonnes-surgeles) | epicerie / conserves-salees (convention « Tofu ferme » du repo) |
| 504725 | Sauce pour viande braisé (goût sucré) | nouilles (!) | epicerie / sauces |
| 040797 | Soja jaune préparé 380G (pâte fermentée) | conserves | epicerie / sauces |

## Cas particuliers (non ajoutés, pour éviter doublons/conflits)
1. **`003805` « Lait concentré sucré en tube 300g »** : déjà dans le repo sous le code `880038015` (même nom, marque Régilait) — le code du repo semble contenir un chiffre de trop (`88`+`0038015` au lieu de `88`+`003805`). **Recommandation** : renommer la fiche dans l'app (✏️ Modifier) en `88003805` si vous voulez retrouver la référence site ; non ajouté pour ne pas créer de doublon.
2. **`002810`** : le site publie **deux produits différents sous le même SKU** (« Purée de piments antillais 90g » *et* « Sauce Chien 180g »). Le repo contient la purée (`88002810`). La Sauce Chien n'est **pas** ajoutée : deux fiches avec le même code-barres casserait le scan caisse. À trancher côté site (ou avec un code interne dédié).
3. **Fiche site « Riz parfumé Battambang » (SKU « 240128 240129 »)** : double référence côté site ; le repo possède déjà `88240128` et `88240129`. Rien à faire.
4. **4 produits au sitemap mais absents du listing** (boisson-longan…, gyoza-legumes, purée-de-piments…, raviolis-japchae) : tous déjà présents dans le repo.

## Photos
113 images sources (JPG site, fonds blancs) → converties au pipeline du repo : contain 360×360, centrage, fond blanc pur, WebP q80 (≈ 3–15 Ko chacune, 1,37 Mo au total). Vérification visuelle par mosaïque + contrôle format/coins blancs. L'image `181764` n'étant plus dans `wpallimport/files/`, elle a été reprise depuis `uploads/2026/01/181764.jpg`.

## Intégration
Voir `LISEZ-MOI-UPLOAD.txt` : upload via l'interface GitHub du dossier `img/` (113 .webp) puis remplacement de `data/userdb.json`. L'application fusionnera automatiquement au prochain lancement (+113 au compteur, photos, badges catégories, codes-barres Code 128).
