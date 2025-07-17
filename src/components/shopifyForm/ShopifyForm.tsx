import { useRef } from 'react';
import { useShopifyForm } from './hooks/useShopifyForm';
import { useShopifyFormStyle } from './hooks/useShopifyFormStyle';

const ShopifyForm = ({
  formId,
  shopUrl,
  formProps,
  formStyle,
}: {
  shopUrl: string;
  formId: string;
  formProps?: Record<string, string>;
  formStyle?: string;
}) => {
  const formContainerRef = useRef<HTMLDivElement>(null);

  const scriptLoadStatus = useShopifyForm({
    shopUrl,
  });

  useShopifyFormStyle({
    ref: formContainerRef,
    scriptStatus: scriptLoadStatus,
    formStyle,
  });

  return (
    <div
      data-form-root="true"
      data-forms-text-color="#202020"
      data-forms-button-background-color="#202020"
      data-forms-button-label-color="#FFFFFF"
      data-forms-links-color="#1878B9"
      data-forms-errors-color="#E02229"
      data-forms-text-alignment="center"
      data-forms-alignment="center"
      data-forms-padding-top="0"
      data-forms-padding-right="0"
      data-forms-padding-bottom="0"
      data-forms-padding-left="0"
      {...formProps}
      data-forms-id={`forms-root-${formId}`}
      ref={formContainerRef}  
    >
      {scriptLoadStatus === 'loading' ? <div>Loading...</div> : null}
    </div>
  );
};

export { ShopifyForm };
