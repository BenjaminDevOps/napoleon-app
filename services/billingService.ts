/**
 * Service pour gérer les achats In-App (Google Play & Apple App Store)
 * Utilise l'API moderne CdvPurchase (v13+)
 */

declare const CdvPurchase: any;

export const PRODUCT_ID = 'sub_mastermind_monthly';

export const initBilling = (onPurchaseSuccess: () => void) => {
  if (typeof CdvPurchase === 'undefined') {
    console.warn("CdvPurchase (Store) not available - check if plugin is installed and running on device.");
    return;
  }

  try {
    const { store, ProductType, Platform } = CdvPurchase;

    // Configuration du produit avec l'API v13+
    store.register({
      id: PRODUCT_ID,
      type: ProductType.PAID_SUBSCRIPTION,
      platform: Platform.GOOGLE_PLAY, // Ajusté dynamiquement par le plugin sur iOS
    });

    // Gestion de la validation et des états
    store.when()
      .approved((transaction: any) => {
        console.log("Achat approuvé");
        transaction.verify();
      })
      .verified((receipt: any) => {
        console.log("Achat vérifié");
        receipt.finish();
        onPurchaseSuccess();
      });

    // Vérification de l'abonnement au démarrage
    store.initialize([Platform.GOOGLE_PLAY, Platform.APPLE_APPSTORE]);

    store.ready(() => {
      const product = store.get(PRODUCT_ID);
      if (product && product.owned) {
        onPurchaseSuccess();
      }
    });
  } catch (error) {
    console.error("Billing initialization error:", error);
    // En cas d'erreur, ne pas planter l'app
  }
};

export const requestPurchase = () => {
  if (typeof CdvPurchase !== 'undefined') {
    try {
      const { store } = CdvPurchase;
      store.order(PRODUCT_ID);
    } catch (error) {
      console.error("Purchase request error:", error);
      alert("Error initiating purchase. Please try again.");
    }
  } else {
    console.log("Simulation: Purchase requested in browser environment.");
    alert("Purchase simulation (browser mode)");
  }
};