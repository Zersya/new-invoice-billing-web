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
        isLoadingFetch: true,
        activeMerchant: null
    }),
    actions: {
        setActiveMerchant(merchant: Merchant | null, initialLoad = false) {
            this.activeMerchant = merchant

            if (!initialLoad) {
                useNuxtApp().$toast.showSuccess('Merchant has been selected')
            }
        },
        async fetchMerchants(isInitial = false) {
            this.isLoadingFetch = true

            const responseAccount = await api.getAccount()
            const ownerId = responseAccount.$id

            const config = useRuntimeConfig();

            await api.listDocuments(config.public.databaseID, '63f38fe4d3a2cef4af25', [
                Query.equal('owner_id', ownerId),
            ])
                .then((response) => {
                    this.listMerchant = response.documents as Merchant[]
                    if (this.listMerchant.length > 0 && isInitial) {
                        this.setActiveMerchant(this.listMerchant[0], true)
                    }

                    if (this.activeMerchant) {
                        const foundMerchant = this.listMerchant.find(merchant => merchant.$id === this.activeMerchant?.$id)
                        if (foundMerchant) {
                            this.setActiveMerchant(foundMerchant)
                        } else {
                            this.setActiveMerchant(null)
                        }
                    }



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
