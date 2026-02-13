# 🐛 Guide de Debug - Abonnement Google Play

## ✅ Corrections Appliquées

### 1. **Auto-Suggestion (Affirmation) - Réinitialisation 24h**
Le compteur d'affirmations se réinitialise maintenant automatiquement toutes les 24h :
- Stockage de la date `lastResetDate` dans localStorage
- Vérification automatique au chargement du composant
- Réinitialisation si la date a changé

### 2. **Billing Service - Logs Détaillés**
J'ai ajouté des logs complets avec emojis pour faciliter le debug :
- 🛒 Initialisation du billing
- 📦 Enregistrement du produit
- 📱 Mise à jour du produit
- ✅ Achat approuvé/vérifié/terminé
- ❌ Erreurs détaillées

---

## 🔍 Comment Debugger l'Abonnement

### **Étape 1 : Activer Chrome DevTools**

Sur votre ordinateur :

1. Ouvrir **Chrome**
2. Aller sur : `chrome://inspect`
3. Brancher votre appareil Android en USB
4. Activer le **Mode Développeur** sur Android
5. Activer **Débogage USB** dans les options développeur
6. Sur Chrome, vous devriez voir votre appareil
7. Cliquer sur **Inspect** sous "The Mastermind" ou "Napoleon Hill AI"

Vous verrez maintenant la console JavaScript en temps réel !

### **Étape 2 : Tester l'Abonnement**

1. Ouvrir l'application sur votre appareil Android
2. Déclencher le paywall (dépasser la limite de messages gratuits)
3. Cliquer sur le bouton "S'abonner"
4. **Regarder les logs dans Chrome DevTools**

### **Étape 3 : Analyser les Logs**

Vous devriez voir ces logs si tout fonctionne :

```
🛒 Initializing billing service...
📦 Product registered: sub_mastermind_monthly:1-mastermind-monthly
🔄 Initializing store platforms...
✅ Store is ready
📦 Product loaded: [object Object]
💰 Product details - Price: 9.99€, State: valid
ℹ️ User does not own this subscription
```

Puis quand vous cliquez sur "S'abonner" :

```
🛒 Requesting purchase for: sub_mastermind_monthly:1-mastermind-monthly
💳 Initiating purchase flow...
✅ Purchase order placed
```

Et après le paiement :

```
✅ Purchase approved: [transaction]
✅ Purchase verified: [receipt]
✅ Purchase finished: [purchase]
```

---

## ❌ Erreurs Possibles et Solutions

### **Erreur 1 : `Product sub_mastermind_monthly:1-mastermind-monthly not found`**

**Problème** : Le produit n'existe pas dans Google Play Console

**Solution** :
1. Aller sur [Google Play Console](https://play.google.com/console)
2. Sélectionner votre application
3. Aller dans **Monétisation → Produits → Abonnements**
4. Vérifier que le produit **`sub_mastermind_monthly:1-mastermind-monthly`** existe
5. S'assurer que le produit est **Actif** (pas en brouillon)
6. Vérifier que l'ID est exactement : `sub_mastermind_monthly:1-mastermind-monthly`

### **Erreur 2 : `Product cannot be purchased. State: ...`**

**Problème** : Le produit existe mais n'est pas disponible à l'achat

**Causes possibles** :
- Le produit est en brouillon (pas publié)
- L'application n'est pas en version "test" sur le Play Store
- Le compte de test n'a pas accès au produit

**Solution** :
1. Dans Play Console → **Tests internes/fermés**
2. Créer une **piste de test** si ce n'est pas fait
3. Ajouter des **testeurs** (adresse Gmail)
4. Publier une version de test de l'app
5. Les testeurs doivent rejoindre le test via le lien fourni
6. Dans **Monétisation → Produits**, activer le produit pour les testeurs

### **Erreur 3 : `No offer available for product`**

**Problème** : Le produit n'a pas d'offre (prix) configurée

**Solution** :
1. Dans Play Console → **Produits → Abonnements**
2. Ouvrir le produit `sub_mastermind_monthly:1-mastermind-monthly`
3. Vérifier qu'un **prix** est défini
4. S'assurer que le prix est disponible dans votre pays

### **Erreur 4 : `⚠️ CdvPurchase not available`**

**Problème** : Le plugin n'est pas installé ou l'app ne tourne pas sur un vrai appareil

**Solution** :
1. Vérifier que vous testez sur un **vrai appareil Android** (pas un émulateur)
2. Vérifier l'installation du plugin :
   ```bash
   npm install cordova-plugin-purchase
   npx cap sync android
   ```
3. Rebuild l'app Android :
   ```bash
   npm run build
   npx cap sync android
   npx cap open android
   ```
4. Dans Android Studio, faire **Build → Rebuild Project**

### **Erreur 5 : Payment cancelled**

**Problème** : L'utilisateur a annulé le paiement

**Solution** : C'est normal, le log affichera `ℹ️ User cancelled the payment`

---

## 🧪 Configuration du Mode Test Google Play

### **1. Créer une Piste de Test**

1. Play Console → **Tests → Tests internes**
2. Créer une nouvelle version
3. Upload l'APK ou l'AAB
4. Publier la version de test

### **2. Ajouter des Testeurs**

1. Play Console → **Tests → Tests internes → Testeurs**
2. Cliquer sur **Créer une liste de testeurs**
3. Ajouter les adresses Gmail des testeurs
4. Copier le **lien de test** et l'envoyer aux testeurs

### **3. Configuration des Licences de Test**

1. Play Console → **Configuration → Compte de test de licence**
2. Ajouter les comptes Gmail des testeurs
3. Ces comptes pourront tester les achats **gratuitement** (pas de vraie transaction)

---

## 📋 Checklist Complète

Avant de tester l'abonnement :

- [ ] Le produit `sub_mastermind_monthly:1-mastermind-monthly` existe dans Play Console
- [ ] Le produit est **Actif** (pas en brouillon)
- [ ] Un **prix** est défini pour le produit
- [ ] Une **piste de test** (interne ou fermée) est créée
- [ ] L'app est publiée sur cette piste de test
- [ ] Vous êtes ajouté comme **testeur**
- [ ] Vous avez rejoint le test via le lien fourni
- [ ] L'app est installée depuis le Play Store (version test)
- [ ] Vous testez sur un **appareil Android réel** (pas émulateur)
- [ ] Chrome DevTools est ouvert pour voir les logs

---

## 🔧 Commandes Utiles

### Rebuild complet de l'app :
```bash
npm run build
npx cap sync android
npx cap open android
```

### Vérifier les plugins installés :
```bash
npx cap ls
```

### Nettoyer et rebuild Android :
```bash
cd android
./gradlew clean
cd ..
npx cap sync android
```

---

## 💡 Astuce : Tester sans Vraie Transaction

Pour tester sans payer :

1. **Compte de test de licence** (recommandé)
   - Ajouter votre Gmail dans Play Console → Compte de test de licence
   - Les achats seront simulés, pas de vrai paiement

2. **Carte de test Google**
   - Utiliser une carte de test fournie par Google
   - Pas de vraie transaction

---

## 📞 Prochaines Étapes

1. **Faire un test complet** :
   - Installer l'app depuis le Play Store (version test)
   - Ouvrir Chrome DevTools
   - Déclencher le paywall
   - Cliquer sur "S'abonner"
   - **Copier tous les logs** que vous voyez

2. **Si ça ne fonctionne toujours pas** :
   - Envoyer les logs complets
   - Indiquer à quelle étape ça bloque
   - Vérifier que toutes les cases de la checklist sont cochées

---

**Date** : 13 février 2026
**Branche** : claude/audit-dependencies-mjzm5qfb33dlhune-V7y6i
**Produit ID** : sub_mastermind_monthly:1-mastermind-monthly
