import {defineStore} from 'pinia'
import api from "~/services/api";
import {AppwriteException, Query} from "appwrite";
import {Invoice, InvoiceItem} from '~/types/invoice';
import {useFetchMerchant} from "~/stores/merchant";

interface InvoiceState {
    listInvoice: Invoice[]
    listInvoiceItem: InvoiceItem[]
    isLoadingFetch: boolean
}

export const useFetchInvoice = defineStore('fetchInvoice', {
    state: (): InvoiceState => ({
        listInvoice: [],
        listInvoiceItem: [],
        isLoadingFetch: false,
    }),
    actions: {
        async fetchInvoices(searchKey?: string) {
            this.isLoadingFetch = true

            const merchant = await useFetchMerchant().activeMerchant
            const merchantId = merchant?.$id

            if (!merchantId) {
                useNuxtApp().$toast.showError('Merchant not found')
                return
            }

            const config = useRuntimeConfig();

            const queries = [
                Query.equal('merchant_id', merchantId),
            ]

            if (searchKey) {
                queries.push(Query.search('name', searchKey))
            }

            await api.listDocuments(config.public.databaseID, '6418753f5e769294335b', queries)
                .then((response) => {
                    this.listInvoice = response.documents as Invoice[]
                }).catch((reason) => {
                        if (reason instanceof AppwriteException) {
                            useNuxtApp().$toast.showError(reason.message)
                        }
                    }
                ).finally(() => {
                    this.isLoadingFetch = false
                })
        },

        async fetchInvoiceItems(invoiceId: string) {
            this.isLoadingFetch = true

            const config = useRuntimeConfig();

            const queries = [
                Query.equal('invoice_id', invoiceId),
            ]

            await api.listDocuments(config.public.databaseID, '641af3a7562c2d9f717c', queries)
                .then((response) => {
                    this.listInvoiceItem = response.documents as InvoiceItem[]
                }).catch((reason) => {
                        if (reason instanceof AppwriteException) {
                            useNuxtApp().$toast.showError(reason.message)
                        }
                    }
                ).finally(() => {
                    this.isLoadingFetch = false
                })
        }
    }
})
