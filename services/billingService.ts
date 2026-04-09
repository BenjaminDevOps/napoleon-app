/**
 * billingService.ts — @capgo/native-purchases
 *
 * Remplace cordova-plugin-purchase par l'API Capacitor native.
 * iOS  → StoreKit 2
 * Android → Google Play Billing
 */

import { NativePurchases } from '@capgo/native-purchases';

export const PRODUCT_ID = 'sub_mastermind_monthly';

type Lang = 'en' | 'fr' | 'es';

const isNative = (): boolean =>
  typeof (window as any).Capacitor !== 'undefined' &&
  (window as any).Capacitor.isNativePlatform();

// ─── Messages d'erreur multilingues ────────────────────────────────────────

const msg = {
  en: {
    notAvailable : 'Product not available. Check your connection and try again.',
    purchaseError: 'Error initiating purchase. Please try again.',
    restoreNone  : 'No previous purchases found.',
    restoreError : 'Unable to restore purchases. Please try again.',
    browserMode  : 'Purchase simulation (browser mode)',
  },
  fr: {
    notAvailable : 'Produit non disponible. Vérifiez votre connexion et réessayez.',
    purchaseError: 'Erreur lors de l\'achat. Veuillez réessayer.',
    restoreNone  : 'Aucun achat précédent trouvé.',
    restoreError : 'Impossible de restaurer les achats. Veuillez réessayer.',
    browserMode  : 'Simulation d\'achat (mode navigateur)',
  },
  es: {
    notAvailable : 'Producto no disponible. Verifique su conexión e intente de nuevo.',
    purchaseError: 'Error al iniciar la compra. Por favor, inténtelo de nuevo.',
    restoreNone  : 'No se encontraron compras anteriores.',
    restoreError : 'No se pueden restaurar las compras. Por favor, inténtelo de nuevo.',
    browserMode  : 'Simulación de compra (modo navegador)',
  },
} as const;

const t = (lang: Lang, key: keyof typeof msg.en): string =>
  msg[lang]?.[key] ?? msg.en[key];

// ─── Vérifier si l'abonnement est actif ────────────────────────────────────

const checkActiveSubscription = async (): Promise<boolean> => {
  try {
    const result = await NativePurchases.getPurchases();
    const purchases = result?.purchases ?? [];
    return purchases.some(
      (p: any) =>
        p.productIdentifier === PRODUCT_ID &&
        (p.isActive === true || p.subscriptionState === 'subscribed')
    );
  } catch {
    return false;
  }
};

// ─── Initialisation ─────────────────────────────────────────────────────────

export const initBilling = async (onPurchaseSuccess: () => void): Promise<void> => {
  if (!isNative()) return;

  try {
    // Vérifier un abonnement existant au démarrage
    const active = await checkActiveSubscription();
    if (active) {
      onPurchaseSuccess();
      return;
    }

    // Écouter les nouvelles transactions
    await NativePurchases.addListener('transactionUpdated', async (transaction: any) => {
      if (transaction?.productIdentifier !== PRODUCT_ID) return;

      // Acquittement Android si nécessaire
      if (transaction.isAcknowledged === false && transaction.purchaseToken) {
        try {
          await NativePurchases.acknowledgePurchase({
            purchaseToken: transaction.purchaseToken,
          });
        } catch (e) {
          console.warn('[Billing] Acknowledge error:', e);
        }
      }

      onPurchaseSuccess();
    });
  } catch (error) {
    console.error('[Billing] Init error:', error);
  }
};

// ─── Achat ──────────────────────────────────────────────────────────────────

export const requestPurchase = async (lang: Lang = 'en'): Promise<void> => {
  if (!isNative()) {
    alert(t(lang, 'browserMode'));
    return;
  }

  try {
    await NativePurchases.purchaseProduct({
      productIdentifier: PRODUCT_ID,
      quantity         : 1,
      productType      : 'subs',
    } as any);
  } catch (error: any) {
    // code 2 = cancelled par l'utilisateur → ne pas afficher d'alerte
    if (error?.code !== 2) {
      console.error('[Billing] Purchase error:', error);
      alert(t(lang, 'purchaseError'));
    }
  }
};

// ─── Restaurer les achats (obligatoire App Store Apple) ─────────────────────

export const restorePurchases = async (
  lang: Lang = 'en',
  onRestored: () => void
): Promise<void> => {
  if (!isNative()) {
    alert(t(lang, 'browserMode'));
    return;
  }

  try {
    await NativePurchases.restorePurchases();
    const active = await checkActiveSubscription();

    if (active) {
      onRestored();
    } else {
      alert(t(lang, 'restoreNone'));
    }
  } catch (error) {
    console.error('[Billing] Restore error:', error);
    alert(t(lang, 'restoreError'));
  }
};
