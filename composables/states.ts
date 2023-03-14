export const useTesting = () => useState<string>('testing', () => 'testing');
export const usePageTitle = () => useState<string>('pageTitle', () => 'Default');

export const useRootLoading = () => useState<boolean>('rootLoading', () => false);

export const useModalFormMerchant = () => useState<boolean>('modalFormMerchant', () => false);
