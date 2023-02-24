export const useTesting = () => useState<string>('testing', () => 'testing');
export const usePageTitle = () => useState<string>('pageTitle', () => 'Default');
