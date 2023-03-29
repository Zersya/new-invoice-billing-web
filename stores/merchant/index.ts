import {defineStore} from 'pinia'
import api from "~/services/api";
import {AppwriteException, Query} from "appwrite";
import {Merchant} from '~/types/merchant';
import {useActiveMerchant} from "~/stores/merchant/active-merchant";

interface MerchantState {
    listMerchant: Merchant[]
    isLoadingFetch: boolean

}

export const useFetchMerchant = defineStore('fetchMerchant', {
    state: (): MerchantState => ({
        listMerchant: [],
        isLoadingFetch: true,
    }),
    actions: {
        async fetchMerchants(isInitial = false) {
            this.isLoadingFetch = true

            const responseAccount = await api.getAccount()
            const ownerId = responseAccount.$id

            const config = useRuntimeConfig();

            await api.listDocuments(config.public.databaseID, '63f38fe4d3a2cef4af25', [
                Query.equal('owner_id', ownerId),
            ])
                .then((response) => {
                    const storeActiveMerchant = useActiveMerchant()
                    this.listMerchant = response.documents as Merchant[]
                    if (this.listMerchant.length > 0 && isInitial) {
                        storeActiveMerchant.setActiveMerchant(this.listMerchant[0], true)
                    }

                    if (storeActiveMerchant.merchant) {
                        const foundMerchant = this.listMerchant.find(merchant => merchant.$id === storeActiveMerchant.merchant?.$id)
                        if (foundMerchant) {
                            storeActiveMerchant.setActiveMerchant(foundMerchant)
                        } else {
                            storeActiveMerchant.setActiveMerchant(null)
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
