import {defineStore} from 'pinia'
import api from "~/services/api";
import {AppwriteException, Query} from "appwrite";
import {Client} from '~/types/client';
import {useFetchMerchant} from "~/stores/merchant";

interface ClientState {
    listClient: Client[]
    isLoadingFetch: boolean
}

export const useFetchClient = defineStore('fetchClient', {
    state: (): ClientState => ({
        listClient: [],
        isLoadingFetch: false,
    }),
    actions: {
        async fetchClients() {
            this.isLoadingFetch = true

            const merchant = await useFetchMerchant().activeMerchant
            const merchantId = merchant?.$id

            if (!merchantId) {
                useNuxtApp().$toast.showError('Merchant not found')
                return
            }

            const config = useRuntimeConfig();

            await api.listDocuments(config.public.databaseID, '63fb7883dfeb4195d567', [
                Query.equal('merchant_id', merchantId),
            ])
                .then((response) => {
                    this.listClient = response.documents as Client[]
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
