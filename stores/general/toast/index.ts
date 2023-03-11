export const useToast = defineStore('root', {
    state: () => ({
        isToastError: false,
        isToastVisible: false,
        toastMessage: '',
    }),

    getters: {
        getIsToastVisible(): boolean {
            return this.isToastVisible
        }
    },

    actions: {
        setIsToastError(isToastError: boolean) {
            this.isToastError = isToastError
        },

        setToastMessage(toastMessage: string) {
            this.toastMessage = toastMessage
        },

        setIsToastVisible(isToastVisible: boolean) {
            this.isToastVisible = isToastVisible
        }
    }
});
