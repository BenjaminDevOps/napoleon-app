/**
 * Service pour gérer les achats In-App (Google Play & Apple App Store)
 * Utilise l'API moderne CdvPurchase (v13+)
 */

declare const CdvPurchase: any;

// Format Google Play Billing : utiliser uniquement l'ID d'abonnement
// Le plugin cordova-plugin-purchase gère automatiquement les forfaits de base
// ID abonnement: sub_mastermind_monthly
// ID forfait de base dans Google Play Console: 1-mastermind-monthly
export const PRODUCT_ID = 'sub_mastermind_monthly';

// Vrai uniquement si le plugin natif est chargé (appareil réel) - jamais dans un navigateur
export const isNativeBillingAvailable = (): boolean => typeof CdvPurchase !== 'undefined';

export const initBilling = (onPurchaseSuccess: () => void) => {
  if (typeof CdvPurchase === 'undefined') {
    return;
  }

  try {
    const { store, ProductType, Platform } = CdvPurchase;

    // Configuration du produit
    store.register({
      id: PRODUCT_ID,
      type: ProductType.PAID_SUBSCRIPTION,
      platform: Platform.GOOGLE_PLAY,
    });

    // Gestion des événements d'achat
    store.when()
      .approved((transaction: any) => {
        transaction.verify();
      })
      .verified((receipt: any) => {
        receipt.finish();
        onPurchaseSuccess();
      })
      .unverified((receipt: any) => {
        console.error("Purchase verification failed");
      });

    // Gestionnaire d'erreurs
    store.error((error: any) => {
      console.error("Store error:", error);
    });

    // Initialisation
    store.initialize([Platform.GOOGLE_PLAY, Platform.APPLE_APPSTORE]);

    store.ready(() => {
      const product = store.get(PRODUCT_ID);

      if (product && product.owned) {
        onPurchaseSuccess();
      }
    });
  } catch (error) {
    console.error("Billing initialization error:", error);
  }
};

export const requestPurchase = () => {
  if (typeof CdvPurchase !== 'undefined') {
    try {
      const { store } = CdvPurchase;
      const product = store.get(PRODUCT_ID);

      if (!product) {
        alert("Product not available. Please check your internet connection and try again.");
        return;
      }

      if (!product.canPurchase) {
        alert("This product is not available for purchase at the moment.");
        return;
      }

      const offer = product.getOffer();

      if (!offer) {
        alert("Unable to process purchase. Please try again later.");
        return;
      }

      store.order(offer);
    } catch (error) {
      console.error("Purchase request error:", error);
      alert("Error initiating purchase. Please check your Google Play connection and try again.");
    }
  } else {
    alert("Purchase simulation (browser mode)");
  }
};