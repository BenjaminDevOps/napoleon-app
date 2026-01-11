# Configuration Google Play Console pour les Achats In-App

## 🎯 Objectif
Activer l'abonnement "Master Mind Monthly" dans l'application Napoleon Hill AI.

## ⚠️ Important
Les achats in-app Google Play **ne fonctionnent PAS** sur un APK installé manuellement. L'app doit être distribuée via Google Play Console, même en mode test.

---

## 📱 Prérequis

1. **Compte Google Play Developer** ($25 USD, frais unique)
   - Créer sur : https://play.google.com/console/signup

2. **Application créée dans Play Console**
   - Nom : Napoleon Hill AI
   - Package : `com.napoleonhill.app` (doit correspondre à votre app)

---

## 🔑 Étape 1 : Générer une clé de signature

Les achats in-app nécessitent une signature d'application valide.

### Option A : Utiliser Android Studio

```bash
# Dans Android Studio :
# Build > Generate Signed Bundle/APK > Android App Bundle
# Create new keystore avec ces infos :

Keystore path: C:\Users\diamo\napoleon-keystore.jks
Password: [CHOISIR MOT DE PASSE SÉCURISÉ]
Alias: napoleon-key
Validity: 25 years
```

**⚠️ CRITIQUE** : Sauvegarder le keystore et le mot de passe en lieu sûr ! Si vous les perdez, vous ne pourrez plus mettre à jour l'app.

### Option B : Ligne de commande

```bash
keytool -genkey -v -keystore napoleon-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias napoleon-key
```

---

## 📦 Étape 2 : Créer un App Bundle (AAB)

Google Play nécessite un AAB (pas un APK) pour les nouvelles apps.

### Dans Android Studio :

1. **Build > Generate Signed Bundle/APK**
2. Sélectionner **Android App Bundle**
3. Choisir votre keystore créé à l'étape 1
4. Build variant : **release**
5. Le fichier `.aab` sera généré dans `android/app/release/`

---

## 🎮 Étape 3 : Uploader l'app sur Google Play Console

### 3.1 Créer l'application

1. Aller sur https://play.google.com/console
2. **Toutes les applications > Créer une application**
3. Remplir :
   - Nom : **Napoleon Hill AI**
   - Langue par défaut : Français
   - Type : **Application**
   - Gratuit/payant : **Gratuit** (avec achats intégrés)

### 3.2 Uploader l'AAB en Internal Testing

1. Aller dans **Production > Tests internes**
2. Créer une nouvelle version
3. **Uploader** le fichier `.aab` généré
4. Remplir les notes de version
5. **Enregistrer** et **Lancer le test interne**

---

## 💰 Étape 4 : Créer le produit d'abonnement

### 4.1 Activer le compte marchand

1. Dans Play Console : **Monétisation > Configuration**
2. **Créer un compte marchand** (ou lier un compte existant)
3. Remplir les informations fiscales et bancaires

### 4.2 Créer l'abonnement

1. Aller dans **Monétisation > Produits > Abonnements**
2. Cliquer sur **Créer un abonnement**
3. Remplir :

```
ID du produit : sub_mastermind_monthly
(⚠️ DOIT correspondre à billingService.ts ligne 8)

Nom : Master Mind Monthly Subscription
Description : Accès illimité aux conseils de Napoleon Hill

Période de facturation : Mensuel (1 mois)
Prix : €4.99 (ou votre choix)

Période d'essai gratuit : (optionnel) 7 jours
```

4. **Activer** le produit
5. Ajouter des traductions (EN, ES) si nécessaire

---

## 👥 Étape 5 : Ajouter des testeurs

Les achats in-app ne fonctionnent que pour les comptes autorisés en phase de test.

### 5.1 Créer une liste de testeurs

1. Aller dans **Tests internes > Testeurs**
2. Créer une liste d'adresses email
3. Ajouter les emails des testeurs (dont le vôtre)

### 5.2 Accepter l'invitation

Les testeurs recevront un email avec un lien pour installer l'app via Play Store (mode test).

---

## 🧪 Étape 6 : Tester l'abonnement

### 6.1 Installer l'app en mode test

1. Ouvrir le lien reçu par email (testeur)
2. Accepter de devenir testeur
3. Installer l'app depuis le Play Store

### 6.2 Tester l'achat

1. Lancer l'app
2. Envoyer 5 messages pour déclencher le paywall
3. Cliquer sur **"Upgrade to Premium"**
4. Le processus d'achat Google Play doit s'ouvrir
5. En mode test, vous ne serez **pas débité**

### 6.3 Vérifier dans les logs

```bash
# Voir les logs Android :
adb logcat | grep -i "cdvpurchase\|billing"
```

Logs attendus :
```
CdvPurchase: init()
CdvPurchase: startServiceConnection() -> Success
CdvPurchase: Product registered: sub_mastermind_monthly
```

---

## 🎫 Licences de test (optionnel)

Pour tester sans limites, créer des **licences de test** :

1. Play Console : **Configuration > Accès aux licences de test**
2. Ajouter des comptes Gmail
3. Ces comptes peuvent faire des achats tests illimités gratuitement

---

## ❌ Dépannage

### Erreur : "BILLING_UNAVAILABLE"

**Causes possibles :**
- App pas uploadée sur Play Console
- APK installé manuellement (sideload) au lieu de Play Store
- Compte pas ajouté comme testeur
- Produit d'abonnement pas créé ou pas activé
- Mauvaise signature de l'app

**Solutions :**
1. Vérifier que l'app est bien en "Internal Testing"
2. Installer via le lien Play Store (pas APK direct)
3. Vérifier que le compte email est dans la liste des testeurs
4. Attendre 2-3 heures après création du produit (propagation)

### Erreur : "Item not found"

**Cause :** L'ID du produit ne correspond pas

**Solution :**
- Vérifier que `sub_mastermind_monthly` existe dans Play Console
- Vérifier `billingService.ts` ligne 8 : `PRODUCT_ID`

### Le bouton ne fait rien

**Causes possibles :**
- Plugin pas initialisé
- App en mode développement web (pas device Android)

**Solution :**
- Tester sur un vrai appareil Android
- Vérifier les logs : `adb logcat | grep Capacitor`

---

## 📊 Vérifier les achats

Une fois testé, vous pouvez voir les transactions dans :
- **Play Console > Rapports financiers > Transactions**
- Les achats tests apparaissent avec la mention "Test"

---

## 🚀 Publication finale

Une fois les tests validés :

1. **Production > Tests internes** → Promouvoir vers **Tests fermés**
2. Tester avec plus d'utilisateurs
3. **Tests fermés** → Promouvoir vers **Production**
4. Soumettre pour examen Google (24-48h)
5. Publication 🎉

---

## 📝 Checklist finale

- [ ] Compte Google Play Developer créé et payé
- [ ] Keystore généré et sauvegardé
- [ ] App Bundle (AAB) généré avec release signing
- [ ] App uploadée en Internal Testing
- [ ] Compte marchand configuré
- [ ] Produit `sub_mastermind_monthly` créé et activé (€4.99/mois)
- [ ] Testeurs ajoutés avec emails
- [ ] App installée via Play Store (lien testeur)
- [ ] Achat test réussi
- [ ] Abonnement vérifié dans l'app

---

## 🔗 Liens utiles

- Google Play Console : https://play.google.com/console
- Documentation achats in-app : https://developer.android.com/google/play/billing
- Plugin cordova-plugin-purchase : https://github.com/j3k0/cordova-plugin-purchase
- Support Google Play : https://support.google.com/googleplay/android-developer

---

## 💡 Astuce

Pour accélérer les tests :
1. Mettre `VITE_DEV_MODE=false` dans `.env.local` pour tester le vrai flow du paywall
2. Réduire temporairement `MAX_FREE_MESSAGES` à 2 dans `types.ts`
3. Rebuild et tester

---

**Dernière mise à jour** : 2026-01-11
