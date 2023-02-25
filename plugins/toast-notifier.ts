import {useToast} from "~/stores/general/toast";

export default defineNuxtPlugin((nuxtContext) => {
    const toastStore = useToast()
    nuxtContext.provide('toast', {
        showSuccess(message: string) {
            toastStore.setToastMessage(message)
            toastStore.setIsToastVisible(true)
        },
        showError(message: string) {
            toastStore.setToastMessage(message)
            toastStore.setIsToastError(true)
            toastStore.setIsToastVisible(true)
        },
        hide() {
            toastStore.setIsToastVisible(false)
        }
    })
})
