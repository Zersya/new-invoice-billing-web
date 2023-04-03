import {defineStore} from 'pinia'
import api from "~/services/api";
import {AppwriteException} from "appwrite";
import {showToast} from "~/utils/toast";

interface PaymentMethodState {
    type?: string | null,
    subtype?: string | null,
    isLoading: boolean,
}

export const usePaymentMethod = defineStore('invoice-payment-method', {
    state: (): PaymentMethodState => ({
        type: null,
        subtype: null,
        isLoading: false,
    }),
    getters: {
        isFormValid(): boolean {
            return this.type !== undefined
        }
    },
    actions: {
        setType(type?: string | null, subtype?: string | null) {
            this.type = type
            this.subtype = subtype
        },
        async onSetPaymentMethod(invoiceId: string) {
            if (!this.isFormValid) {
                return
            }

            this.isLoading = true

            const config = useRuntimeConfig();

            await api.updateDocument(config.public.databaseID, '6418753f5e769294335b', invoiceId, {
                payment_type: this.type,
                payment_subtype: this.subtype,
                payment_selected_at: new Date(),
            }).catch((e) => {

                if (e instanceof AppwriteException) {
                    showToast.error(e.message)
                }

            }).finally(() => {
                this.isLoading = false
            })

        },

    }
})
