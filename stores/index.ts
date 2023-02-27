export const useRoot = defineStore('root', {
    state: () => ({
        isDarkMode: false,
        isRootLoading: false
    }),

    actions: {
        setIsDarkMode(isDarkMode: boolean) {
            this.isDarkMode = isDarkMode
        },

        setRootLoading(isRootLoading: boolean) {
            this.isRootLoading = isRootLoading
        }
    }
});
