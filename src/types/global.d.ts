export {};

declare global {
  interface Window {
    Shopify: {
      shop?: string;
      customerPrivacy?: unknown;
      [key: string]: any;
    } | null | undefined;

    ShopifyForms?: {
      currentPageType?: string;
      [key: string]: any;
    };
  }
}