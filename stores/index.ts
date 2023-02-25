export const useRoot = defineStore('root', {
    state: () => ({
        isDarkMode: false
    }),

    actions: {
        setIsDarkMode(isDarkMode: boolean) {
            this.isDarkMode = isDarkMode
        }
    }
});
