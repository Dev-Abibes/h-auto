# H-Auto - Site Web pour Garage Mécanique

**H-Auto** est une application web moderne conçue pour un garage mécanique, permettant de présenter les services, de gérer les prises de rendez-vous et d'offrir une vitrine professionnelle aux clients.

---

## 🛠️ Structure du Projet

Basé sur les technologies suivantes :
* **Frontend** : React, TypeScript, Vite
* **Styles / UI** : Tailwind CSS (ou autre framework UI configuré)
* **Build / Déploiement** : Node.js / npm

---

## 🚀 Guide d'Installation et de Déploiement sur o2switch

Ce projet est une application web moderne (type SPA - Single Page Application) gérée par Vite. Pour la déployer sur o2switch, vous devez d'abord installer les dépendances et générer les fichiers statiques (build), puis configurer l'application Node.js si un serveur backend/SSR est requis, ou simplement pointer vers le dossier de build.

### Étape 1 : Clonage ou Déploiement via Git
1. Dans votre cPanel o2switch, rendez-vous dans **Git Version Control**.
2. Clonez ou connectez votre dépôt contenant le projet `h-auto`.
3. Effectuez un déploiement de la branche principale (`Deploy HEAD Commit`) vers votre dossier de travail.

### Étape 2 : Configuration des variables d'environnement
1. À la racine de votre projet sur le serveur, dupliquez le fichier `.env.example` et renommez-le en `.env` :
   ```bash
   cp .env.example .env

### Éditez le fichier .env pour y renseigner vos variables de production (URL de l'API, clés de configuration, etc.).

# 1. Se placer dans le dossier du projet
`cd ~/chemin-vers-votre-projet/h-auto`

# 2. Installer les dépendances Node.js
`npm install`

# 3. Générer les fichiers statiques de production (dossier dist/)
`npm run build`

### Étape 3 : Installation des dépendances et Build
Exécutez les commandes suivantes dans votre terminal :

```bash
# 1. Se placer dans le dossier du projet
cd ~/chemin-vers-votre-projet/h-auto

# 2. Installer les dépendances Node.js
npm install

# 3. Générer les fichiers statiques de production (dossier dist/)
npm run build

### Étape 4 : Configuration sur o2switch (Setup Node.js App / Hébergement Statique)

* **Si votre projet est purement statique** (uniquement du HTML/JS/CSS généré dans `dist/`) :
  * Pointez le sous-domaine ou domaine de votre site (via **Domaines** ou **Gestionnaire de fichiers**) directement sur le dossier de build : `/home/votre_user/chemin-vers-votre-projet/h-auto/dist`.

* **Si votre projet intègre un serveur Node.js** :
  1. Allez dans **Setup Node.js App** dans votre cPanel.
  2. Créez une application en renseignant :
     * **Application root** : Le dossier racine de votre application.

* Application startup file : Le fichier de démarrage du serveur (ex: server.js ou dist/server.js). * 

* Redémarrez l'application depuis le panel. * 
