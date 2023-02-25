export const useToast = defineStore('root', {
    state: () => ({
        isToastError: false,
        isToastVisible: false,
        toastMessage: '',
    }),

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
