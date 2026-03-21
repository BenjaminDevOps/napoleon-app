/**
 * Service pour gérer les achats In-App (Apple App Store & Google Play)
 * Utilise l'API CdvPurchase v13+
 */

declare const CdvPurchase: any;

export const PRODUCT_ID = 'sub_mastermind_monthly';

export const initBilling = (onPurchaseSuccess: () => void) => {
  if (typeof CdvPurchase === 'undefined') {
    console.warn('CdvPurchase not available — running in browser or plugin not loaded.');
    return;
  }

  const { store, ProductType, Platform } = CdvPurchase;

  // Enregistrement pour les deux plateformes
  store.register([
    {
      id: PRODUCT_ID,
      type: ProductType.PAID_SUBSCRIPTION,
      platform: Platform.APPLE_APPSTORE,
    },
    {
      id: PRODUCT_ID,
      type: ProductType.PAID_SUBSCRIPTION,
      platform: Platform.GOOGLE_PLAY,
    },
  ]);

  // Validation et finalisation des transactions
  store.when()
    .approved((transaction: any) => {
      console.log('[IAP] Transaction approuvée — vérification...');
      transaction.verify();
    })
    .verified((receipt: any) => {
      console.log('[IAP] Reçu vérifié — accès premium accordé');
      receipt.finish();
      onPurchaseSuccess();
    });

  // Initialisation des deux stores
  store.initialize([Platform.APPLE_APPSTORE, Platform.GOOGLE_PLAY]);

  // Vérification de l'abonnement existant au démarrage
  store.ready(() => {
    const product = store.get(PRODUCT_ID);
    if (product?.owned) {
      console.log('[IAP] Abonnement actif détecté');
      onPurchaseSuccess();
    }
  });
};

export const requestPurchase = async () => {
  if (typeof CdvPurchase === 'undefined') {
    alert('Simulation: Purchase requested in browser environment.');
    return;
  }

  const { store } = CdvPurchase;
  const product = store.get(PRODUCT_ID);
  const offer = product?.getOffer();

  if (offer) {
    try {
      await offer.order();
    } catch (err) {
      console.error('[IAP] Erreur lors de la commande:', err);
    }
  } else {
    console.warn('[IAP] Offre introuvable pour', PRODUCT_ID);
  }
};
