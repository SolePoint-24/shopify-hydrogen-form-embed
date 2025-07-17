import { useEffect, type RefObject } from 'react';

export function useShopifyFormStyle({
  ref,
  scriptStatus,
  formStyle,
}: {
  ref: RefObject<HTMLDivElement | null>;
  scriptStatus: 'loading' | 'ready' | 'error' | 'idle';
  formStyle?: string;
}) {
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (scriptStatus === 'ready' && ref.current && !!formStyle) {
      const injectStyleInShadowDOM = () => {
        const formEmbedEl = ref.current!.querySelector('form-embed');
        const shadowRootEl = (formEmbedEl as any)?.shadowRoot;

        if (shadowRootEl) {
          const style = document.createElement('style');
          style.textContent = formStyle;
          shadowRootEl.appendChild(style);
        }
      };

      const waitForFormEmbed = () => {
        const formEmbedEl = ref.current!.querySelector('form-embed');
        if (formEmbedEl) {
          injectStyleInShadowDOM();
        } else {
          timer = setTimeout(waitForFormEmbed, 100);
        }
      };

      timer = setTimeout(waitForFormEmbed, 500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [ref, scriptStatus, formStyle]);
}
