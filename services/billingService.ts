/**
 * Service pour gérer les achats In-App (Google Play & Apple App Store)
 * Utilise l'API moderne CdvPurchase (v13+)
 */

declare const CdvPurchase: any;

export const PRODUCT_ID = '1_mastermind_monthly';

export const initBilling = (onPurchaseSuccess: () => void) => {
  if (typeof CdvPurchase === 'undefined') {
    console.warn("⚠️ CdvPurchase not available - plugin may not be installed or app not running on device");
    console.warn("Test mode enabled: subscription will be simulated");
    return;
  }

  try {
    const { store, ProductType, Platform, LogLevel } = CdvPurchase;

    // Activer les logs détaillés en mode debug
    store.verbosity = LogLevel.DEBUG;
    console.log("🛒 Initializing billing service...");

    // Configuration du produit avec l'API v13+
    store.register({
      id: PRODUCT_ID,
      type: ProductType.PAID_SUBSCRIPTION,
      platform: Platform.GOOGLE_PLAY, // Ajusté dynamiquement par le plugin sur iOS
    });
    console.log(`📦 Product registered: ${PRODUCT_ID}`);

    // Gestion des erreurs
    store.when()
      .productUpdated((product: any) => {
        console.log("📱 Product updated:", product);
        if (product.id === PRODUCT_ID) {
          console.log(`💰 Product details - Price: ${product.pricing?.price}, State: ${product.state}`);
        }
      })
      .approved((transaction: any) => {
        console.log("✅ Purchase approved:", transaction);
        transaction.verify();
      })
      .verified((receipt: any) => {
        console.log("✅ Purchase verified:", receipt);
        receipt.finish();
        onPurchaseSuccess();
      })
      .finished((purchase: any) => {
        console.log("✅ Purchase finished:", purchase);
      })
      .receiptUpdated((receipt: any) => {
        console.log("📃 Receipt updated:", receipt);
      })
      .unverified((receipt: any) => {
        console.error("❌ Purchase could not be verified:", receipt);
      });

    // Gestionnaire d'erreurs global
    store.error((error: any) => {
      console.error("❌ Store error:", error);
      if (error.code === store.ErrorCode.PAYMENT_CANCELLED) {
        console.log("ℹ️ User cancelled the payment");
      }
    });

    // Vérification de l'abonnement au démarrage
    console.log("🔄 Initializing store platforms...");
    store.initialize([Platform.GOOGLE_PLAY, Platform.APPLE_APPSTORE]);

    store.ready(() => {
      console.log("✅ Store is ready");
      const product = store.get(PRODUCT_ID);

      if (!product) {
        console.error(`❌ Product ${PRODUCT_ID} not found in store`);
        console.error("⚠️ Make sure the product is created in Google Play Console and published");
        return;
      }

      console.log(`📦 Product loaded:`, product);

      if (product.owned) {
        console.log("✅ User already owns this subscription");
        onPurchaseSuccess();
      } else {
        console.log("ℹ️ User does not own this subscription");
      }
    });
  } catch (error) {
    console.error("❌ Billing initialization error:", error);
    console.error("Stack:", (error as Error).stack);
  }
};

export const requestPurchase = () => {
  if (typeof CdvPurchase !== 'undefined') {
    try {
      const { store } = CdvPurchase;
      console.log(`🛒 Requesting purchase for: ${PRODUCT_ID}`);

      const product = store.get(PRODUCT_ID);

      if (!product) {
        console.error(`❌ Product ${PRODUCT_ID} not found`);
        alert("Product not available. Please check your internet connection and try again.");
        return;
      }

      if (!product.canPurchase) {
        console.error(`❌ Product cannot be purchased. State: ${product.state}`);
        alert("This product is not available for purchase at the moment.");
        return;
      }

      console.log(`💳 Initiating purchase flow...`);
      const offer = product.getOffer();

      if (!offer) {
        console.error(`❌ No offer available for product ${PRODUCT_ID}`);
        alert("Unable to process purchase. Please try again later.");
        return;
      }

      store.order(offer);
      console.log("✅ Purchase order placed");
    } catch (error) {
      console.error("❌ Purchase request error:", error);
      console.error("Stack:", (error as Error).stack);
      alert("Error initiating purchase. Please check your Google Play connection and try again.");
    }
  } else {
    console.log("⚠️ Browser mode - simulating purchase");
    console.log("In production, this would open Google Play billing dialog");
    alert("✅ Purchase simulation (browser mode)\n\nOn a real device, this would open the Google Play payment dialog.");
  }
};