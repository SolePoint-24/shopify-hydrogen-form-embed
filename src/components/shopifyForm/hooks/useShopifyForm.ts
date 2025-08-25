import { useEffect } from 'react';
import {
  useLazyScriptLoad,
  type ScriptStatus,
} from '../../../hooks/useLazyScriptLoad';

// 'icecream-cakes-melbourne.myshopify.com'
const useShopifyForm = ({ shopUrl }: { shopUrl: string }): ScriptStatus => {
  const { loadScript: loadShopifyFormScript, status: scriptLoadStatus } =
    useLazyScriptLoad(
      'https://cdn.shopify.com/extensions/b7bffa7f-3cdd-4adf-8b5e-155850befa0b/forms-1629/assets/loader.js',
    );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const maxRetryCount = 5;
    let currentRetryCount = 0;
    const injectShopifyScript = () => {
      const shopifyReady =
        typeof window.Shopify === 'object' &&
        window.Shopify !== null &&
        'customerPrivacy' in window.Shopify;

      if (shopifyReady) {
        // ✅ Set Shopify.shop without interfering with getters/setters
        if (!('shop' in window.Shopify!)) {
          window.Shopify!.shop = shopUrl;
        }

        // ✅ Set ShopifyForms safely
        window.ShopifyForms = window.ShopifyForms || {};
        window.ShopifyForms.currentPageType = 'index';

        // ✅ Dynamically load the Forms loader script
        loadShopifyFormScript();
      } else {
        if (currentRetryCount <= maxRetryCount) {
          setTimeout(injectShopifyScript, 100);
          currentRetryCount++;
        }
      }
    };
    injectShopifyScript();
  }, []);

  return scriptLoadStatus;
};

export { useShopifyForm };
