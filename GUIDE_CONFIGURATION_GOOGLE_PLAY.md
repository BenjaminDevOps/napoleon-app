# 🛒 Guide Complet : Configurer l'Abonnement Google Play

## ❌ Erreur Actuelle

**Message affiché** : "Product not available. Please check your internet connection and try again."

**Cause** : Le produit `sub_mastermind_monthly:1-mastermind-monthly` n'est pas trouvé dans Google Play Store.

---

## ✅ Solution : Configuration Google Play Console (Étape par Étape)

### **ÉTAPE 1 : Accéder à Google Play Console**

1. Aller sur : https://play.google.com/console
2. Se connecter avec votre compte développeur Google
3. Sélectionner votre application dans la liste

---

### **ÉTAPE 2 : Créer le Produit d'Abonnement**

1. Dans le menu de gauche, cliquer sur **"Monétisation"**
2. Puis cliquer sur **"Produits → Abonnements"**
3. Cliquer sur **"Créer un abonnement"** (bouton en haut à droite)

#### Configuration du produit :

**ID du produit (abonnement)** (TRÈS IMPORTANT ⚠️) :
```
sub_mastermind_monthly
```

**ID de l'offre (forfait de base)** :
```
1-mastermind-monthly
```
⚠️ **Ces IDs doivent être EXACTEMENT ceux-ci**
💡 **Note** : L'ID de l'offre doit commencer par un chiffre ou une lettre minuscule

**Nom** :
```
Master Mind Monthly Subscription
```

**Description** :
```
Access to unlimited AI coaching sessions based on Napoleon Hill's principles. Daily affirmations and Master Mind guidance.
```

**Prix** :
- Choisir votre devise (EUR, USD, etc.)
- Entrer le prix : `9.99`
- Période de facturation : **1 mois**
- Type d'abonnement : **Renouvellement automatique**

---

### **ÉTAPE 3 : Configurer les Détails de l'Abonnement**

1. **Période d'essai gratuit** (optionnel) :
   - Si vous voulez offrir un essai gratuit, cocher la case
   - Exemple : 7 jours gratuits

2. **Période de grâce** :
   - Laisser par défaut (3 jours)

3. **Réactivation** :
   - Laisser par défaut

4. Cliquer sur **"Enregistrer"**

---

### **ÉTAPE 4 : ACTIVER le Produit** ⚠️ CRITIQUE

Le produit doit être **ACTIF**, pas en brouillon !

1. Après avoir créé le produit, vous verrez son statut
2. Si le statut est **"Brouillon"**, cliquer sur **"Activer"**
3. Le statut doit passer à **"Actif"** ✅

⚠️ **Sans cette étape, le produit ne sera PAS disponible dans l'app !**

---

### **ÉTAPE 5 : Vérifier les IDs**

1. Dans la liste des abonnements, vérifier :
   - **ID d'abonnement** : `sub_mastermind_monthly`
   - **ID de forfait de base** : `1-mastermind-monthly`

2. Si les IDs sont différents :
   - Me donner vos IDs exacts
   - Je modifierai le code pour utiliser vos IDs

---

### **ÉTAPE 6 : Créer une Version de Test**

Pour tester les achats sans payer :

1. Dans le menu de gauche, aller sur **"Version"**
2. Puis **"Tests → Tests internes"** (ou Tests fermés)
3. Cliquer sur **"Créer une version"**
4. Upload votre APK ou AAB
5. Cliquer sur **"Examiner la version"**
6. Puis **"Démarrer le déploiement"**

---

### **ÉTAPE 7 : Ajouter des Testeurs**

1. Toujours dans **"Tests internes"**, aller dans l'onglet **"Testeurs"**
2. Cliquer sur **"Créer une liste"**
3. Donner un nom à la liste : "Beta Testers"
4. Ajouter les adresses Gmail des testeurs (un par ligne)
5. Copier le **lien de participation** affiché
6. Envoyer ce lien aux testeurs

---

### **ÉTAPE 8 : Configurer les Comptes de Test** (IMPORTANT pour tester gratuitement)

Pour ne pas payer pendant les tests :

1. Dans le menu de gauche, aller sur **"Configuration"**
2. Puis **"Compte de test de licence"**
3. Ajouter les adresses Gmail des testeurs
4. Cliquer sur **"Enregistrer"**

✅ Ces comptes pourront tester les achats **gratuitement** (aucune vraie transaction)

---

### **ÉTAPE 9 : Lier l'Application au Play Store**

Vérifier que votre app est bien liée :

1. Dans Android Studio, ouvrir : `android/app/build.gradle`
2. Vérifier que `applicationId` correspond à votre package :
   ```gradle
   applicationId "com.napoleonhill.app"
   ```

3. Dans Google Play Console, vérifier que le **Package name** correspond :
   - Menu **"Configuration → Infos sur l'application"**
   - Vérifier le champ **"Package name"**

---

## 🔄 Après la Configuration

### Rebuild l'application :

```bash
# 1. Nettoyer
cd android
./gradlew clean
cd ..

# 2. Rebuild web
npm run build

# 3. Sync Capacitor
npx cap sync android

# 4. Ouvrir Android Studio
npx cap open android
```

### Dans Android Studio :

1. **Build → Clean Project**
2. **Build → Rebuild Project**
3. Créer un **Signed APK/AAB**
4. Uploader sur Google Play Console (Tests internes)

### Installer et tester :

1. Les testeurs doivent cliquer sur le **lien de participation**
2. Rejoindre le programme de test
3. Installer l'app depuis le Play Store (version test)
4. Tester l'abonnement

---

## 🔍 Vérification avec Chrome DevTools

Pour voir exactement ce qui se passe :

1. Sur votre PC : Ouvrir Chrome
2. Aller sur : `chrome://inspect`
3. Brancher votre téléphone Android en USB
4. Cliquer sur **"Inspect"** sous votre app
5. Ouvrir l'onglet **"Console"**
6. Relancer l'app et regarder les logs

### Logs attendus si tout fonctionne :

```
🛒 Initializing billing service...
📦 Product registered: sub_mastermind_monthly:1-mastermind-monthly
🔄 Initializing store platforms...
✅ Store is ready
📱 Product updated: [object]
💰 Product details - Price: 9.99€, State: valid
ℹ️ User does not own this subscription
```

### Si le produit n'est pas trouvé :

```
✅ Store is ready
❌ Product sub_mastermind_monthly:1-mastermind-monthly not found in store
⚠️ Make sure the product is created in Google Play Console and published
```

---

## 📋 Checklist Complète

Avant de tester, vérifier que :

- [ ] L'abonnement `sub_mastermind_monthly` existe dans Play Console
- [ ] Le forfait de base `1-mastermind-monthly` est créé
- [ ] Les IDs sont EXACTEMENT : `sub_mastermind_monthly` et `1-mastermind-monthly`
- [ ] Le statut du produit est **"Actif"** (pas "Brouillon")
- [ ] Un prix est défini (ex: 9.99€)
- [ ] Une version de test est créée (Tests internes ou fermés)
- [ ] L'APK/AAB est uploadé sur cette version de test
- [ ] Des testeurs sont ajoutés
- [ ] Les testeurs ont rejoint le programme via le lien
- [ ] Les comptes de test de licence sont configurés
- [ ] L'app est installée depuis le Play Store (version test)
- [ ] Le `applicationId` correspond au package dans Play Console

---

## ❓ Questions Fréquentes

### Q1 : Puis-je changer l'ID du produit ?

**Non**, une fois créé, l'ID ne peut pas être changé. Vous devez :
- Soit créer un nouveau produit avec le bon ID
- Soit modifier le code de l'app pour utiliser votre ID existant

### Q2 : Combien de temps avant que le produit soit disponible ?

**Immédiat** pour les tests internes, une fois le produit activé.

### Q3 : Dois-je vraiment payer pendant les tests ?

**Non**, si vous configurez les **Comptes de test de licence**, les achats seront simulés gratuitement.

### Q4 : L'app est en "Brouillon" dans Play Console, est-ce un problème ?

**Oui**, l'app doit être publiée au moins en **Tests internes** pour que le billing fonctionne.

---

## 🆘 Si Ça Ne Fonctionne Toujours Pas

Envoyez-moi :

1. **Capture d'écran** de la liste des abonnements dans Play Console
2. **L'ID exact** de votre produit d'abonnement
3. **Les logs** de Chrome DevTools (tout ce qui commence par 🛒📦✅❌)
4. Le **statut** de votre produit (Actif/Brouillon)

---

**Créé le** : 13 février 2026
**App** : The Mastermind (Napoleon Hill AI)
**Product ID complet** : `sub_mastermind_monthly:1-mastermind-monthly`
- **ID Abonnement** : `sub_mastermind_monthly`
- **ID Forfait de base** : `1-mastermind-monthly`
