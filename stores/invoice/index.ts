import {defineStore} from 'pinia'
import api from "~/services/api";
import {AppwriteException, Query} from "appwrite";
import {Invoice, InvoiceItem} from '~/types/invoice';
import {useFetchMerchant} from "~/stores/merchant";
import {useActiveMerchant} from "~/stores/merchant/active-merchant";
import {showToast} from "~/utils/toast";

interface InvoiceState {
    listInvoice: Invoice[]
    listInvoiceItem: InvoiceItem[]
    isLoadingFetch: boolean
    isLoadingFetchDetail: boolean
    invoiceDetail: Invoice | null
}

export const useFetchInvoice = defineStore('fetchInvoice', {
    state: (): InvoiceState => ({
        listInvoice: [],
        listInvoiceItem: [],
        isLoadingFetch: false,
        isLoadingFetchDetail: false,
        invoiceDetail: null
    }),
    actions: {
        async fetchInvoices(searchKey?: string) {
            this.isLoadingFetch = true

            const merchant = useActiveMerchant().merchant
            const merchantId = merchant?.$id

            if (!merchantId) {
                showToast.error('Merchant not found')
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
                            showToast.error(reason.message)
                        }
                    }
                ).finally(() => {
                    this.isLoadingFetch = false
                })
        },

        async fetchInvoice(invoiceId: string) {
            this.isLoadingFetchDetail = true

            const config = useRuntimeConfig();

            await api.getDocument(config.public.databaseID, '6418753f5e769294335b', invoiceId)
                .then((response) => {
                    this.invoiceDetail = response as Invoice
                }).catch((reason) => {
                        if (reason instanceof AppwriteException) {
                            showToast.error(reason.message)
                        }
                    }
                ).finally(() => {
                    this.isLoadingFetchDetail = false
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
                            showToast.error(reason.message)
                        }
                    }
                ).finally(() => {
                    this.isLoadingFetch = false
                })
        }
    }
})
