/**
 * Service de facturation In-App (Google Play & Apple App Store)
 * Compatible Capacitor + cordova-plugin-purchase v13+
 *
 * Plateformes supportées :
 *   - Apple App Store (iOS)
 *   - Google Play (Android)
 *
 * Exigences App Store Apple respectées :
 *   - Bouton "Restaurer les achats" disponible
 *   - Vérification + finalisation des transactions
 *   - Gestion des erreurs utilisateur
 */

declare const CdvPurchase: any;
declare const Capacitor: any;

export const PRODUCT_ID = 'sub_mastermind_monthly';

// --- Détection de plateforme ---
const getActivePlatform = (): 'ios' | 'android' | 'browser' => {
  // Capacitor expose la plateforme native
  if (typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform()) {
    return Capacitor.getPlatform() === 'ios' ? 'ios' : 'android';
  }
  return 'browser';
};

// --- Messages d'erreur multilingues ---
const errorMessages = {
  en: {
    notAvailable: 'Product not available. Please check your internet connection and try again.',
    cannotPurchase: 'This product is not available for purchase at this time.',
    noOffer: 'Unable to process purchase. Please try again later.',
    purchaseError: 'Error initiating purchase. Please try again.',
    restoreSuccess: 'Purchases restored successfully!',
    restoreNone: 'No previous purchases found to restore.',
    restoreError: 'Unable to restore purchases. Please try again.',
    browserMode: 'Purchase simulation active (browser mode)',
  },
  fr: {
    notAvailable: 'Produit non disponible. Vérifiez votre connexion internet et réessayez.',
    cannotPurchase: 'Ce produit n\'est pas disponible à l\'achat pour le moment.',
    noOffer: 'Impossible de traiter l\'achat. Veuillez réessayer plus tard.',
    purchaseError: 'Erreur lors de l\'initiation de l\'achat. Veuillez réessayer.',
    restoreSuccess: 'Achats restaurés avec succès !',
    restoreNone: 'Aucun achat précédent trouvé à restaurer.',
    restoreError: 'Impossible de restaurer les achats. Veuillez réessayer.',
    browserMode: 'Simulation d\'achat active (mode navigateur)',
  },
  es: {
    notAvailable: 'Producto no disponible. Verifique su conexión a internet e intente de nuevo.',
    cannotPurchase: 'Este producto no está disponible para compra en este momento.',
    noOffer: 'No se puede procesar la compra. Por favor, inténtelo más tarde.',
    purchaseError: 'Error al iniciar la compra. Por favor, inténtelo de nuevo.',
    restoreSuccess: '¡Compras restauradas con éxito!',
    restoreNone: 'No se encontraron compras anteriores para restaurar.',
    restoreError: 'No se pueden restaurar las compras. Por favor, inténtelo de nuevo.',
    browserMode: 'Simulación de compra activa (modo navegador)',
  },
};

type Lang = 'en' | 'fr' | 'es';

const getMsg = (lang: Lang, key: keyof typeof errorMessages.en): string => {
  return (errorMessages[lang] ?? errorMessages.en)[key];
};

// --- Initialisation du billing ---
export const initBilling = (onPurchaseSuccess: () => void): void => {
  if (typeof CdvPurchase === 'undefined') {
    // Pas en environnement natif Cordova/Capacitor
    return;
  }

  try {
    const { store, ProductType, Platform } = CdvPurchase;
    const platform = getActivePlatform();

    // Choisir la plateforme de facturation selon l'OS natif
    const billingPlatform =
      platform === 'ios' ? Platform.APPLE_APPSTORE : Platform.GOOGLE_PLAY;

    // Enregistrement du produit d'abonnement
    store.register({
      id: PRODUCT_ID,
      type: ProductType.PAID_SUBSCRIPTION,
      platform: billingPlatform,
    });

    // Flux de transaction
    store
      .when()
      .approved((transaction: any) => {
        // Vérification avant de finaliser
        transaction.verify();
      })
      .verified((receipt: any) => {
        // Finalisation — indispensable pour que la transaction soit acquittée
        receipt.finish();
        onPurchaseSuccess();
      })
      .unverified((_receipt: any) => {
        console.error('[Billing] Purchase verification failed');
      });

    // Gestion des erreurs store
    store.error((error: any) => {
      console.error('[Billing] Store error:', error);
    });

    // Initialisation — on passe uniquement la plateforme active
    store.initialize([billingPlatform]);

    // Vérification à la restauration automatique (re-launch de l'app)
    store.ready(() => {
      const product = store.get(PRODUCT_ID, billingPlatform);
      if (product && product.owned) {
        onPurchaseSuccess();
      }
    });
  } catch (error) {
    console.error('[Billing] Initialization error:', error);
  }
};

// --- Achat ---
export const requestPurchase = (lang: Lang = 'en'): void => {
  if (typeof CdvPurchase === 'undefined') {
    alert(getMsg(lang, 'browserMode'));
    return;
  }

  try {
    const { store } = CdvPurchase;
    const platform = getActivePlatform();
    const billingPlatform =
      platform === 'ios'
        ? CdvPurchase.Platform.APPLE_APPSTORE
        : CdvPurchase.Platform.GOOGLE_PLAY;

    const product = store.get(PRODUCT_ID, billingPlatform);

    if (!product) {
      alert(getMsg(lang, 'notAvailable'));
      return;
    }

    if (!product.canPurchase) {
      alert(getMsg(lang, 'cannotPurchase'));
      return;
    }

    const offer = product.getOffer();

    if (!offer) {
      alert(getMsg(lang, 'noOffer'));
      return;
    }

    store.order(offer);
  } catch (error) {
    console.error('[Billing] Purchase request error:', error);
    alert(getMsg(lang, 'purchaseError'));
  }
};

// --- Restaurer les achats (OBLIGATOIRE App Store Apple) ---
export const restorePurchases = (
  lang: Lang = 'en',
  onRestored: () => void
): void => {
  if (typeof CdvPurchase === 'undefined') {
    // Navigateur : simuler une restauration
    alert(getMsg(lang, 'browserMode'));
    return;
  }

  try {
    const { store } = CdvPurchase;

    store.restorePurchases().then(() => {
      const platform = getActivePlatform();
      const billingPlatform =
        platform === 'ios'
          ? CdvPurchase.Platform.APPLE_APPSTORE
          : CdvPurchase.Platform.GOOGLE_PLAY;

      const product = store.get(PRODUCT_ID, billingPlatform);

      if (product && product.owned) {
        onRestored();
        alert(getMsg(lang, 'restoreSuccess'));
      } else {
        alert(getMsg(lang, 'restoreNone'));
      }
    }).catch((err: any) => {
      console.error('[Billing] Restore error:', err);
      alert(getMsg(lang, 'restoreError'));
    });
  } catch (error) {
    console.error('[Billing] Restore exception:', error);
    alert(getMsg(lang, 'restoreError'));
  }
};
