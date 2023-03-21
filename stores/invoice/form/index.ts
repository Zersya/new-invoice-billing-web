import {defineStore} from 'pinia'
import api from "~/services/api";
import {AppwriteException} from "appwrite";
import {Invoice} from "~/types/invoice";
import {useFetchMerchant} from "~/stores/merchant";
import {Client} from "~/types/client";
import {useFormMerchant} from "~/stores/merchant/form";

interface FormInvoiceState {
    id?: string
    number: string
    client_id: string
    merchant_id: string
    client: Client | null
    isLoadingSubmit: boolean
    isLoadingDelete: boolean

}

export const useFormInvoice = defineStore('formInvoice', {
    state: (): FormInvoiceState => ({
        id: '',
        number: '',
        client_id: '',
        merchant_id: '',
        client: null,
        isLoadingSubmit: false,
        isLoadingDelete: false
    }),
    getters: {
        isFormValid(): boolean {
            return this.number !== '' && this.client_id !== ''
        }
    },
    actions: {
        setInvoice(invoice: Invoice) {
            this.id = invoice.$id
            this.number = invoice.number
            this.client_id = invoice.client_id
            this.merchant_id = invoice.merchant_id
        },
        setNumber(number?: number) {
            const date = new Date()
            const year = date.getFullYear().toString().substr(-2)
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const num = number?.toString().padStart(4, '0')

            this.number = `INV-${year}-${month}-${num}`
        },

        setClient(client: Client | null) {
            this.client_id = client?.$id ?? ''
            this.client = client
        },

        setMerchantId(merchant_id: string) {
            this.merchant_id = merchant_id
        },

        reset() {
            this.id = ''
            this.number = ''
            this.client_id = ''
            this.merchant_id = ''
            this.isLoadingSubmit = false
        },

        async onSubmitDelete() {
            if (!this.id) {
                return
            }

            this.isLoadingDelete = true

            const config = useRuntimeConfig();

            await api.deleteDocument(config.public.databaseID, '6418753f5e769294335b', this.id).then((_) => {
                useNuxtApp().$toast.showSuccess('Invoice deleted successfully')
            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    useNuxtApp().$toast.showError(reason.message)
                }

            }).finally(() => {
                this.isLoadingDelete = false
            })
        },

        async onSubmitUpdate() {
            if (!this.isFormValid || !this.id) {
                return
            }

            this.isLoadingSubmit = true

            const config = useRuntimeConfig();

            await api.updateDocument(config.public.databaseID, '6418753f5e769294335b', this.id, {
                number: this.number,
                client_id: this.client_id,
                client_name: this.client?.name,
            }).then((_) => {
                useNuxtApp().$toast.showSuccess('Invoice updated successfully')
            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    useNuxtApp().$toast.showError(reason.message)
                }

            }).finally(() => {
                this.isLoadingSubmit = false
            })
        },

        async onSubmitCreate() {

            if (!this.isFormValid) {
                return
            }

            this.isLoadingSubmit = true

            const merchant = useFetchMerchant().activeMerchant

            const config = useRuntimeConfig();

            await api.createDocument(config.public.databaseID, '6418753f5e769294335b', {
                number: this.number,
                client_id: this.client_id,
                client_name: this.client?.name,
                merchant_id: merchant?.$id,
            }).then((_) => {
                useNuxtApp().$toast.showSuccess('Invoice created successfully')

                if (merchant) {
                    merchant.latest_invoice_number += 1
                    api.updateDocument(config.public.databaseID, '63f38fe4d3a2cef4af25', merchant?.$id, {
                        latest_invoice_number: merchant.latest_invoice_number
                    })

                    useFetchMerchant().setActiveMerchant(merchant)
                    this.setNumber(merchant.latest_invoice_number)
                }

            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    useNuxtApp().$toast.showError(reason.message)
                }

            }).finally(() => {
                this.isLoadingSubmit = false
            })
        },

    }
})
