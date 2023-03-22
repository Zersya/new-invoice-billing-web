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
        async fetchClientById(id: string): Promise<Client | null> {

            const merchant = await useFetchMerchant().activeMerchant
            const merchantId = merchant?.$id

            if (!merchantId) {
                useNuxtApp().$toast.showError('Merchant not found')
                return
            }

            const config = useRuntimeConfig();

            try {
                const doc = await api.getDocument(config.public.databaseID, '63fb7883dfeb4195d567', id);
                return doc as Client
            } catch (reason) {
                if (reason instanceof AppwriteException) {
                    useNuxtApp().$toast.showError(reason.message)
                }

                return null
            }
        },
        async fetchClients(searchKey?: string) {
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

            await api.listDocuments(config.public.databaseID, '63fb7883dfeb4195d567', queries)
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
