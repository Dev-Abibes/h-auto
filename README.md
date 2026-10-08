# H-AUTO — Site Web Officiel du Garage Mécanique (Cormontreuil)

**H-AUTO** (*Services Auto Horizon*) est le site vitrine professionnel du garage mécanique situé au **5 rue des remouleurs, 51350 Cormontreuil**. Il présente l'ensemble des prestations d'entretien et de réparation automobile toutes marques, la galerie photos de l'atelier, les avis clients vérifiés ainsi que le module de prise de rendez-vous et de demande de devis en ligne.

---

## 🛠️ Technologies & Architecture du Projet

* **Frontend** : React 19, TypeScript, Vite 6
* **Styles & UI** : Tailwind CSS 4, Lucide Icons, Motion
* **Type d'application** : Application Web Statique (SPA — *Single Page Application*)
* **Dossier de production pré-compilé** : Le dossier **`dist/`** est déjà généré et inclus dans le projet avec son fichier **`.htaccess`** préconfiguré pour Apache / LiteSpeed (o2switch).

```text
h-auto/
├── index.html                        # Point d'entrée HTML source (SEO local & Schema.org)
├── package.json                      # Dépendances et scripts (dev, build, lint)
├── public/
│   └── .htaccess                     # Règles Apache o2switch (HTTPS + routage SPA + cache)
├── src/                              # Code source React + TypeScript
│   ├── App.tsx                       # Composant principal
│   ├── data.ts                       # Prestations, tarifs, horaires, photos et avis
│   ├── types.ts                      # Interfaces TypeScript
│   ├── assets/images/                # Photos haute définition de l'atelier H-AUTO
│   └── components/                   # Composants de l'interface (Header, Hero, Services, etc.)
└── dist/                             # ⚡ DOSSIER PRÊT À METTRE EN LIGNE SUR O2SWITCH
    ├── .htaccess                     # Redirection HTTPS + routage SPA vers index.html
    ├── index.html                    # Fichier HTML final minifié
    └── assets/                       # Fichiers CSS, JS et images compilés
```

---

## 🚀 Guide Complet : Comment installer ce site sur o2switch (Étape par Étape)

> 💡 **Information importante sur Node.js chez o2switch** :
> Ce site ne nécessite **aucun serveur Node.js en arrière-plan** (*pas besoin d'utiliser "Setup Node.js App"* dans cPanel). Une fois compilé dans le dossier **`dist/`** (qui est déjà présent dans ce projet), le site fonctionne comme un site statique ultra-rapide directement lu par le serveur web Apache/LiteSpeed d'o2switch.

Vous avez le choix entre **2 méthodes** pour mettre le site en ligne sur o2switch :

---

### ✅ Méthode 1 (Recommandée & la plus simple) : Envoi direct du dossier `dist/` via le Gestionnaire de fichiers cPanel

Comme le dossier **`dist/`** est déjà compilé dans ce projet, vous n'avez aucune commande à taper.

#### Étape 1 : Récupérer le dossier `dist/` sur votre ordinateur
1. Téléchargez l'archive `.zip` du projet depuis votre espace de travail (ou clonez votre dépôt Git).
2. Décompressez le fichier `.zip` sur votre ordinateur.
3. Ouvrez le dossier du projet et repérez le sous-dossier **`dist/`**. À l'intérieur de `dist/`, vous trouverez :
   * `index.html`
   * `.htaccess` *(fichier parfois masqué par défaut sur Windows/Mac)*
   * le dossier `assets/` *(contenant les fichiers `.css`, `.js` et les photos `.jpg`)*

#### Étape 2 : Ouvrir le Gestionnaire de fichiers sur o2switch
1. Connectez-vous à votre interface **cPanel o2switch**.
2. Dans la rubrique **Fichiers**, cliquez sur **Gestionnaire de fichiers** (*File Manager*).
3. En haut à droite du Gestionnaire de fichiers, cliquez sur le bouton **Paramètres** (roue dentée), cochez la case **« Afficher les fichiers masqués (dotfiles) »** puis cliquez sur **Save**. *(Indispensable pour voir le fichier `.htaccess`)*.

#### Étape 3 : Aller dans le dossier de votre nom de domaine
1. Dans l'arborescence à gauche :
   * Si vous installez le site sur votre **domaine principal** : double-cliquez sur le dossier **`public_html`**.
   * Si vous installez le site sur un **domaine supplémentaire / sous-domaine** : ouvrez le dossier correspondant à ce domaine (vérifiable dans **cPanel > Domaines**).
2. Si le dossier contient une page d'attente par défaut d'o2switch (ex. `index.php` ou `default.html`), supprimez-la pour partir d'un dossier propre.

#### Étape 4 : Transférer les fichiers de `dist/` dans `public_html`
1. Pour transférer tout d'un seul coup, sur votre ordinateur, entrez **à l'intérieur** du dossier `dist/`, sélectionnez son contenu (`index.html`, `.htaccess`, et le dossier `assets/`) et compressez-les ensemble dans une archive **`site-hauto.zip`**.
2. Dans le Gestionnaire de fichiers o2switch (en étant bien dans `public_html`), cliquez sur **Charger** (*Upload*) dans la barre du haut.
3. Glissez-déposez votre fichier **`site-hauto.zip`**.
4. Une fois le chargement à 100%, revenez dans `public_html`, faites un **clic droit sur `site-hauto.zip` > Extraire** (*Extract*) vers `/public_html`.
5. Supprimez ensuite le fichier `site-hauto.zip` du serveur.
6. Vérifiez que votre dossier `/public_html/` contient directement :
   ```text
   /public_html/
   ├── .htaccess
   ├── index.html
   └── assets/
   ```
   *(Attention : les fichiers ne doivent pas être dans `/public_html/dist/index.html`, mais bien directement dans `/public_html/index.html`)*.

#### Étape 5 : Activer le HTTPS (Certificat SSL gratuit Let's Encrypt)
1. Retournez sur l'accueil de votre **cPanel o2switch**.
2. Dans la rubrique **Sécurité**, cliquez sur **Let's Encrypt SSL**.
3. Cliquez sur **+ Issue** en face de votre nom de domaine (ex: `h-auto.fr` et `www.h-auto.fr`), puis validez.
4. Votre site est immédiatement en ligne, sécurisé en HTTPS !

---

### ⚙️ Méthode 2 (Avancée) : Déploiement via Git / Terminal SSH sur o2switch

Si vous modifiez régulièrement le code source (`src/`) et souhaitez compiler le projet directement sur o2switch ou sur votre machine :

#### Étape 1 : Cloner le dépôt via Git Version Control
1. Dans votre cPanel o2switch, ouvrez **Git™ Version Control**.
2. Cliquez sur **Create** et renseignez l'URL de votre dépôt Git ainsi que le chemin du dépôt sur le serveur (ex: `/home/votre_user/repositories/h-auto`).

#### Étape 2 : Compiler le projet (en local ou via Terminal cPanel)
Si vous modifiez le code dans `src/`, régénérez le dossier `dist/` avec les commandes suivantes :

```bash
# 1. Se placer dans le dossier du projet
cd ~/repositories/h-auto

# 2. (Optionnel) Copier le fichier d'exemple des variables d'environnement
cp .env.example .env

# 3. Installer les dépendances
npm install

# 4. Générer le dossier de production dist/
npm run build
```

#### Étape 3 : Relier le dossier `dist/` à votre nom de domaine
Une fois le dossier `dist/` généré, choisissez l'une des deux options suivantes :

* **Option A — Copier le contenu de `dist/` vers `public_html/`** :
  ```bash
  cp -r ~/repositories/h-auto/dist/. ~/public_html/
  ```
* **Option B — Pointer directement votre domaine sur le dossier `dist/`** :
  1. Allez dans **cPanel > Domaines**.
  2. Cliquez sur **Gérer** à droite de votre domaine `h-auto.fr`.
  3. Modifiez la **Racine du document (Document Root)** pour qu'elle pointe vers :
     `/home/votre_user/repositories/h-auto/dist`
  4. Cliquez sur **Mettre à jour**.

---

## 🔒 Rôle du fichier `.htaccess` inclus (`public/.htaccess` et `dist/.htaccess`)

Le fichier `.htaccess` généré automatiquement dans `dist/.htaccess` configure votre hébergement o2switch pour :
1. **Forcer le HTTPS** : Redirige automatiquement les visiteurs `http://` vers `https://`.
2. **Gérer le routage React (SPA)** : Redirige les URL vers `index.html` sans erreur 404.
3. **Optimiser la vitesse de chargement** : Active la mise en cache navigateur pour les images, le CSS et le JavaScript. 
