import {defineStore} from 'pinia'
import api from "~/services/api";
import {AppwriteException, Query} from "appwrite";
import {Merchant} from '~/types/merchant';

interface MerchantState {
    listMerchant: Merchant[]
    isLoadingFetch: boolean
    activeMerchant: Merchant | null

}

export const useFetchMerchant = defineStore('fetchMerchant', {
    state: (): MerchantState => ({
        listMerchant: [],
        isLoadingFetch: false,
        activeMerchant: null
    }),
    actions: {
        setActiveMerchant(merchant: Merchant, initialLoad = false) {
            this.activeMerchant = merchant

            if (!initialLoad) {
                useNuxtApp().$toast.showSuccess('Merchant has been selected')
            }
        },
        async fetchMerchants() {
            this.isLoadingFetch = true

            const responseAccount = await api.getAccount()
            const ownerId = responseAccount.$id

            const config = useRuntimeConfig();

            await api.listDocuments(config.public.databaseID, '63f38fe4d3a2cef4af25', [
                Query.equal('owner_id', ownerId),
            ])
                .then((response) => {
                    this.listMerchant = response.documents as Merchant[]
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
