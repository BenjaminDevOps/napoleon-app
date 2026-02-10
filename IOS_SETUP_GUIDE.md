# 📱 Guide iOS - The Mastermind App
## To-Do Liste Complète - Étape par Étape

---

## ✅ PARTIE 1 : PRÉPARATION (Sur le Mac de votre amie)

### 1.1 Vérifier Xcode
- [ ] Ouvrir **Mac App Store**
- [ ] Rechercher "Xcode"
- [ ] Si pas installé : **Installer Xcode** (gratuit, ~12 GB, prend 30-60 min)
- [ ] Si déjà installé : **Mettre à jour** vers la dernière version
- [ ] Lancer Xcode une première fois pour accepter les licences

### 1.2 Installer les outils de ligne de commande
- [ ] Ouvrir **Terminal** (Applications → Utilitaires → Terminal)
- [ ] Taper : `xcode-select --install`
- [ ] Appuyer sur **Entrée** et **Installer** dans la fenêtre qui apparaît
- [ ] Attendre la fin de l'installation

### 1.3 Vérifier Node.js
- [ ] Dans Terminal, taper : `node --version`
- [ ] Si Node n'est pas installé :
  - [ ] Aller sur https://nodejs.org/
  - [ ] Télécharger la version **LTS** (recommandée)
  - [ ] Installer le fichier .pkg téléchargé
  - [ ] Vérifier à nouveau : `node --version` (doit afficher v20.x.x ou v22.x.x)

---

## ✅ PARTIE 2 : TÉLÉCHARGER LE PROJET

### 2.1 Choisir un emplacement
- [ ] Ouvrir **Terminal**
- [ ] Aller dans le dossier Documents : `cd ~/Documents`
- [ ] Créer un dossier projets : `mkdir projets`
- [ ] Entrer dans ce dossier : `cd projets`

### 2.2 Cloner le projet
- [ ] Cloner le repository : `git clone https://github.com/BenjaminDevOps/napoleon-app.git`
- [ ] Entrer dans le dossier : `cd napoleon-app`
- [ ] Passer sur la branche iOS : `git checkout claude/ios-setup-mjzm5qfb33dlhune-V7y6i`
- [ ] Vérifier que vous êtes sur la bonne branche : `git branch` (doit afficher * en vert)

---

## ✅ PARTIE 3 : INSTALLER LES DÉPENDANCES

### 3.1 Installation NPM
- [ ] Dans Terminal (dans le dossier napoleon-app), taper : `npm install`
- [ ] Attendre la fin (peut prendre 2-5 minutes)
- [ ] Vérifier qu'il n'y a pas d'erreur rouge

### 3.2 Builder l'application web
- [ ] Taper : `npm run build`
- [ ] Attendre la fin du build
- [ ] Vérifier qu'un dossier **www** a été créé

---

## ✅ PARTIE 4 : AJOUTER LA PLATEFORME iOS

### 4.1 Ajouter iOS
- [ ] Taper : `npm run cap-add-ios`
- [ ] Attendre la fin (crée le dossier ios/)
- [ ] Vérifier qu'un dossier **ios** a été créé

### 4.2 Synchroniser les fichiers
- [ ] Taper : `npm run cap-sync-ios`
- [ ] Attendre la fin

---

## ✅ PARTIE 5 : CONFIGURATION XCODE

### 5.1 Ouvrir le projet dans Xcode
- [ ] Taper : `npm run cap-open-ios`
- [ ] Xcode doit s'ouvrir automatiquement avec le projet

### 5.2 Configurer le compte développeur
- [ ] Dans Xcode, cliquer sur **App** (icône bleue) dans la colonne de gauche
- [ ] Sélectionner l'onglet **Signing & Capabilities**
- [ ] Sous "Team", cliquer sur le menu déroulant
- [ ] Si vous n'avez pas encore ajouté votre compte Apple :
  - [ ] Cliquer sur **Add Account...**
  - [ ] Se connecter avec votre compte Apple (celui avec Apple Developer si vous l'avez)
  - [ ] Sélectionner votre compte dans "Team"

### 5.3 Vérifier la configuration
- [ ] Vérifier que **Bundle Identifier** affiche : `com.napoleonhill.app`
- [ ] Vérifier que **Display Name** affiche : `The Mastermind`
- [ ] S'assurer qu'il n'y a pas d'erreur rouge dans cette section

---

## ✅ PARTIE 6 : TESTER SUR SIMULATEUR

### 6.1 Choisir un simulateur
- [ ] En haut de Xcode, à gauche du bouton ▶️, cliquer sur le menu déroulant
- [ ] Sélectionner **iPhone 15 Pro** (ou un autre modèle récent)

### 6.2 Lancer l'application
- [ ] Cliquer sur le bouton **▶️ Play** en haut à gauche
- [ ] Attendre le build (première fois : 1-2 minutes)
- [ ] Le simulateur iPhone doit s'ouvrir
- [ ] L'application **The Mastermind** doit apparaître et se lancer

### 6.3 Tester l'application
- [ ] Vérifier que la landing page s'affiche correctement
- [ ] Sélectionner une langue (EN/FR/ES)
- [ ] Cliquer sur "Consult the Master"
- [ ] Tester l'onglet Chat
- [ ] Tester l'onglet Affirmation
- [ ] Vérifier que tout fonctionne

---

## ✅ PARTIE 7 : TESTER SUR VOTRE IPHONE (Optionnel)

### 7.1 Préparer votre iPhone
- [ ] Brancher votre iPhone au Mac avec un câble USB
- [ ] Sur l'iPhone : **Faire confiance à cet ordinateur** (popup)
- [ ] Sur l'iPhone : Aller dans **Réglages → Confidentialité et Sécurité**
- [ ] Activer **Mode Développeur** (en bas)
- [ ] Redémarrer l'iPhone si demandé

### 7.2 Sélectionner votre iPhone dans Xcode
- [ ] En haut de Xcode, cliquer sur le menu déroulant (là où c'était "iPhone 15 Pro")
- [ ] Sélectionner votre iPhone (doit apparaître avec son nom)
- [ ] Cliquer sur **▶️ Play**
- [ ] Attendre le build et l'installation

### 7.3 Autoriser l'app sur votre iPhone
- [ ] Sur l'iPhone : **Réglages → Général → Gestion des profils et de l'appareil**
- [ ] Cliquer sur votre profil développeur
- [ ] Cliquer sur **Faire confiance à...**
- [ ] Retourner à l'écran d'accueil
- [ ] Lancer **The Mastermind**

### 7.4 Tester l'application
- [ ] Vérifier que tout fonctionne comme sur le simulateur

---

## ✅ PARTIE 8 : NOTES IMPORTANTES

### 8.1 Limitations sans Apple Developer Account ($99/an)
- ⚠️ L'app installée sur votre iPhone expirera après **7 jours**
- ⚠️ Vous ne pouvez pas publier sur l'**App Store**
- ⚠️ Vous devez **réinstaller** l'app tous les 7 jours

### 8.2 Avec Apple Developer Account ($99/an)
- ✅ L'app reste installée **1 an**
- ✅ Vous pouvez **publier sur l'App Store**
- ✅ Vous avez accès aux **analytics et TestFlight**

### 8.3 Si vous faites des modifications
- [ ] Modifier le code dans VS Code ou votre éditeur
- [ ] Dans Terminal : `npm run build`
- [ ] Dans Terminal : `npm run cap-sync-ios`
- [ ] Dans Xcode : Relancer avec ▶️

---

## 🆘 EN CAS DE PROBLÈME

### Erreur "Command not found"
→ Node.js n'est pas installé, reprendre Partie 1.3

### Erreur "xcode-select: error"
→ Xcode Command Line Tools pas installés, reprendre Partie 1.2

### Erreur "Failed to install the app"
→ Vérifier que le Bundle ID est unique et que vous avez sélectionné une Team

### L'app ne s'ouvre pas sur iPhone
→ Vérifier que vous avez "fait confiance" au profil (Partie 7.3)

### Build failed dans Xcode
→ Vérifier que Xcode est à jour et que tous les npm install sont réussis

---

## 📞 CONTACT

Si vous êtes bloqué, notez :
- Le message d'erreur exact
- À quelle étape vous êtes
- Capture d'écran si possible

---

## ✨ FÉLICITATIONS !

Une fois tous ces points cochés, vous aurez :
- ✅ L'application qui tourne sur simulateur iPhone
- ✅ (Optionnel) L'application installée sur votre iPhone physique
- ✅ Un projet prêt pour le développement iOS

**Prochaine étape** : S'inscrire à l'Apple Developer Program pour publier sur l'App Store !

---

**Créé le** : 10 février 2026
**Projet** : The Mastermind (Napoleon Hill AI)
**Branche iOS** : claude/ios-setup-mjzm5qfb33dlhune-V7y6i
