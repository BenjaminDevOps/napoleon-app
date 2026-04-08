import { NativePurchases } from '@capgo/native-purchases';

export const PRODUCT_ID = 'sub_mastermind_monthly';

export const initBilling = (onPurchaseSuccess: () => void): void => {
  // Écoute les mises à jour d'achat (succès après purchaseProduct)
  NativePurchases.addListener('purchasesUpdate', (data: any) => {
    if (data?.customerInfo?.activeSubscriptions?.includes(PRODUCT_ID)) {
      onPurchaseSuccess();
    }
  });

  // Vérifie l'abonnement existant au démarrage
  NativePurchases.getCustomerInfo()
    .then((data: any) => {
      if (data?.customerInfo?.activeSubscriptions?.includes(PRODUCT_ID)) {
        onPurchaseSuccess();
      }
    })
    .catch((err: any) => {
      console.warn('NativePurchases non disponible (navigateur ?):', err);
    });
};

export const requestPurchase = async (): Promise<void> => {
  try {
    await NativePurchases.purchaseProduct({ productIdentifier: PRODUCT_ID });
  } catch (err: any) {
    if (!err?.userCancelled) {
      console.error("Erreur lors de l'achat:", err);
    }
  }
};
