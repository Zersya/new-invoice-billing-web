import {useToast} from "~/stores/general/toast";

export const showToast = {
    success(message: string) {
        const toastStore = useToast()

        toastStore.setToastMessage(message)
        toastStore.setIsToastVisible(true)
    },
    error(message: string) {
        const toastStore = useToast()

        toastStore.setToastMessage(message)
        toastStore.setIsToastError(true)
        toastStore.setIsToastVisible(true)
    },
    hide() {
        const toastStore = useToast()

        toastStore.setIsToastVisible(false)
    }
}
