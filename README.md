# Napoleon Hill AI - Application Mobile

Application mobile interactive basée sur les enseignements de Napoleon Hill, l'auteur de "Réfléchissez et devenez riche". Cette application utilise l'IA DeepSeek pour créer une expérience de coaching personnalisée en anglais, français et espagnol.

## 🌟 Fonctionnalités

- 💬 Chat interactif avec "The Mastermind" alimenté par DeepSeek
- 🎯 Défis quotidiens personnalisés basés sur les 17 Principes du Succès
- 🪞 Auto-suggestion : affirmation quotidienne avec suivi de progression
- 🌍 Support multilingue (Français, Anglais, Espagnol)
- 📱 Application mobile native avec Capacitor
- 💎 Système d'abonnement premium avec achats in-app
- 🎨 Interface utilisateur élégante avec design doré et bleu royal
- 🔒 Limite de 5 messages gratuits pour les utilisateurs non-premium

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ et npm
- Une clé API DeepSeek ([Obtenir ici](https://platform.deepseek.com/api_keys))

### Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/BenjaminDevOps/napoleon-app.git
   cd napoleon-app
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer la clé API**

   Créez un fichier `.env.local` à la racine du projet :
   ```bash
   VITE_DEEPSEEK_API_KEY=votre_clé_api_ici
   ```

   ⚠️ **Important** : Le préfixe `VITE_` est obligatoire pour Vite.

4. **Lancer en mode développement**
   ```bash
   npm run dev
   ```

   L'application sera accessible sur `http://localhost:3000`

## 📱 Déploiement Mobile (Android)

```bash
# Générer les assets (icônes, splash screens)
npm run assets:generate

# Construire l'application
npm run build

# Synchroniser avec Capacitor
npm run cap-sync

# Ouvrir dans Android Studio
npm run cap-open-android
```

## 🛠️ Technologies Utilisées

- **Frontend** : React 19 + TypeScript
- **Build** : Vite 5.4
- **IA** : DeepSeek API (chat completions, appelée via `fetch`)
- **Mobile** : Capacitor 6
- **Achats In-App** : cordova-plugin-purchase
- **Styling** : Tailwind CSS (inline)

## 📚 Documentation

- [Guide de Configuration Complet](CONFIGURATION.md)
- [Rapport d'Audit des Dépendances](DEPENDENCY_AUDIT.md)
- [Configuration Google Play](GOOGLE_PLAY_SETUP.md)

## 🔧 Scripts Disponibles

- `npm run dev` - Lancer le serveur de développement
- `npm run build` - Construire pour la production
- `npm run preview` - Prévisualiser le build de production
- `npm run cap-sync` - Synchroniser avec Capacitor
- `npm run cap-open-android` - Ouvrir dans Android Studio
- `npm run assets:generate` - Générer les assets mobile

## 📂 Structure du Projet

```
napoleon-app/
├── components/          # Composants React
│   ├── ChatWindow.tsx
│   ├── LandingPage.tsx
│   ├── SubscriptionModal.tsx
│   ├── ChallengeModal.tsx
│   └── AutoSuggestion.tsx
├── services/           # Services
│   ├── geminiService.ts   # Intégration DeepSeek
│   └── billingService.ts  # Gestion des achats in-app
├── types.ts           # Définitions TypeScript
├── translations.ts    # Traductions multilingues
├── App.tsx           # Composant principal
└── vite.config.ts    # Configuration Vite
```

## 🔐 Sécurité

- Ne committez **JAMAIS** votre fichier `.env.local`
- Ne partagez **JAMAIS** votre clé API DeepSeek
- Le fichier `.env.local` est déjà dans `.gitignore`

## 🐛 Dépannage

Consultez le [Guide de Configuration](CONFIGURATION.md) pour les problèmes courants :
- Page blanche au démarrage
- Erreur "VITE_DEEPSEEK_API_KEY is missing"
- L'application ne communique pas avec DeepSeek

## 📊 Audit des Dépendances

Un audit complet des dépendances a été effectué. Voir [DEPENDENCY_AUDIT.md](DEPENDENCY_AUDIT.md) pour :
- Liste des packages obsolètes
- Vulnérabilités de sécurité
- Recommandations de mise à jour
- Plan d'action priorisé

## 📝 Changelog

### Version 1.1.0 (Janvier 2026)
- ✅ Migration du service IA de Gemini vers DeepSeek
- ✅ Ajout des défis quotidiens (ChallengeModal) et de l'auto-suggestion (AutoSuggestion)
- ✅ Mise à jour du niveau d'API Android pour la conformité Google Play
- ✅ Ajout du guide de configuration complet
- ✅ Ajout du rapport d'audit des dépendances
- ✅ Support TypeScript pour les variables d'environnement

### Version 1.0.0
- 🎉 Version initiale
- Chat multilingue avec Napoleon Hill AI
- Système d'abonnement premium
- Support mobile Android

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

Ce projet est privé. Tous droits réservés.
