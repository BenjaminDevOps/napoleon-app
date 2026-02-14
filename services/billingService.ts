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

export const initBilling = (onPurchaseSuccess: () => void) => {
  if (typeof CdvPurchase === 'undefined') {
    console.warn("CdvPurchase not available - running in browser mode");
    return;
  }

  try {
    const { store, ProductType, Platform } = CdvPurchase;

    console.log("=== BILLING DEBUG START ===");
    console.log("Product ID:", PRODUCT_ID);

    // Configuration du produit
    store.register({
      id: PRODUCT_ID,
      type: ProductType.PAID_SUBSCRIPTION,
      platform: Platform.GOOGLE_PLAY,
    });
    console.log("Product registered successfully");

    // Gestion des événements d'achat
    store.when()
      .productUpdated((product: any) => {
        console.log("Product updated:", {
          id: product.id,
          state: product.state,
          canPurchase: product.canPurchase,
          owned: product.owned,
          pricing: product.pricing
        });
      })
      .approved((transaction: any) => {
        console.log("Transaction approved");
        transaction.verify();
      })
      .verified((receipt: any) => {
        console.log("Receipt verified");
        receipt.finish();
        onPurchaseSuccess();
      })
      .unverified((receipt: any) => {
        console.error("Purchase verification failed:", receipt);
      });

    // Gestionnaire d'erreurs
    store.error((error: any) => {
      console.error("Store error:", error);
    });

    // Initialisation
    console.log("Initializing store...");
    store.initialize([Platform.GOOGLE_PLAY, Platform.APPLE_APPSTORE]);

    store.ready(() => {
      console.log("Store is ready");
      const product = store.get(PRODUCT_ID);

      if (!product) {
        console.error("❌ Product not found with ID:", PRODUCT_ID);
        console.error("Available products:", store.products.map((p: any) => p.id));
        return;
      }

      console.log("✅ Product found:", product);

      if (product.owned) {
        console.log("User owns the subscription");
        onPurchaseSuccess();
      } else {
        console.log("User does not own the subscription");
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
      console.log("=== PURCHASE REQUEST START ===");
      console.log("Requesting purchase for:", PRODUCT_ID);

      const product = store.get(PRODUCT_ID);

      if (!product) {
        console.error("❌ Product not found:", PRODUCT_ID);
        console.error("Available products:", store.products.map((p: any) => ({ id: p.id, state: p.state })));
        alert("Product not available. Please check your internet connection and try again.");
        return;
      }

      console.log("Product details:", {
        id: product.id,
        state: product.state,
        canPurchase: product.canPurchase,
        offers: product.offers
      });

      if (!product.canPurchase) {
        console.error("❌ Product cannot be purchased. State:", product.state);
        alert("This product is not available for purchase at the moment.");
        return;
      }

      const offer = product.getOffer();

      if (!offer) {
        console.error("❌ No offer available for product");
        alert("Unable to process purchase. Please try again later.");
        return;
      }

      console.log("Offer details:", offer);
      console.log("Ordering product...");
      store.order(offer);
    } catch (error) {
      console.error("Purchase request error:", error);
      alert("Error initiating purchase. Please check your Google Play connection and try again.");
    }
  } else {
    alert("Purchase simulation (browser mode)");
  }
};