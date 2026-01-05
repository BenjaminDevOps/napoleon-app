# Guide de Configuration - Napoleon Hill AI

## 🔧 Configuration de l'API Gemini

### Étape 1 : Obtenir une clé API

1. Rendez-vous sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Connectez-vous avec votre compte Google
3. Créez une nouvelle clé API
4. Copiez la clé générée

### Étape 2 : Configurer l'application

1. Créez un fichier `.env.local` à la racine du projet :
   ```bash
   # Sur Windows PowerShell
   New-Item -Path .env.local -ItemType File

   # Sur Linux/Mac
   touch .env.local
   ```

2. Ouvrez le fichier `.env.local` et ajoutez votre clé API :
   ```
   VITE_GEMINI_API_KEY=votre_clé_api_ici
   ```

   **Important** :
   - Le préfixe `VITE_` est **obligatoire** pour que Vite expose la variable
   - Remplacez `votre_clé_api_ici` par votre vraie clé API

### Étape 3 : Installer les dépendances

```bash
npm install
```

### Étape 4 : Lancer l'application

Pour le développement :
```bash
npm run dev
```

Pour construire l'application :
```bash
npm run build
```

Pour prévisualiser la version de production :
```bash
npm run preview
```

## 📱 Configuration Mobile (Android)

Pour déployer sur Android :

1. Ajouter la plateforme Android (une seule fois) :
   ```bash
   npm run cap-add-android
   ```

2. Générer les assets (icônes, splash screens) :
   ```bash
   npm run assets:generate
   ```

3. Construire et synchroniser :
   ```bash
   npm run build
   npm run cap-sync
   ```

4. Ouvrir dans Android Studio :
   ```bash
   npm run cap-open-android
   ```

## ⚠️ Problèmes Courants

### L'application ne communique pas avec Gemini

**Symptômes** : Page blanche, la landing page disparaît, pas de réponses de l'IA

**Solutions** :

1. ✅ Vérifiez que `.env.local` existe et contient `GEMINI_API_KEY=votre_clé`
2. ✅ Assurez-vous que la clé API est valide et active
3. ✅ Relancez le serveur de développement après avoir modifié `.env.local`
4. ✅ Si le problème persiste, supprimez le dossier `www` et reconstruisez :
   ```bash
   # Windows
   Remove-Item -Recurse -Force www
   npm run build

   # Linux/Mac
   rm -rf www
   npm run build
   ```

### Erreur "VITE_GEMINI_API_KEY is missing"

Cela signifie que Vite n'a pas trouvé la clé API. Vérifiez :

1. Le fichier `.env.local` est bien à la racine du projet (même niveau que `package.json`)
2. Le nom de la variable est exactement `VITE_GEMINI_API_KEY` (sensible à la casse)
3. Le préfixe `VITE_` est présent (requis par Vite)
4. Il n'y a pas d'espace avant ou après le `=`
5. Vous avez bien relancé `npm run dev` après avoir créé le fichier

### Pourquoi VITE_ ?

Vite requiert le préfixe `VITE_` pour toutes les variables d'environnement exposées au code client. C'est une mesure de sécurité pour éviter d'exposer accidentellement des secrets serveur.

## 🔒 Sécurité

**IMPORTANT** : Ne committez jamais votre fichier `.env.local` ou vos clés API dans Git !

Le fichier `.env.local` est déjà dans `.gitignore`, mais vérifiez toujours avant de push.

## 📚 Documentation Supplémentaire

- [Documentation Vite](https://vitejs.dev/)
- [Documentation Capacitor](https://capacitorjs.com/)
- [Documentation Google Gemini](https://ai.google.dev/docs)
