import {defineStore} from 'pinia'
import api from "~/services/api";
import {AppwriteException} from "appwrite";
import {Client} from "~/types/client";
import {useFetchMerchant} from "~/stores/merchant";

interface FormState {
    id?: string
    name: string
    tags: string[]
    isLoadingSubmit: boolean
    isLoadingDelete: boolean

}

export const useFormClient = defineStore('formClient', {
    state: (): FormState => ({
        id: '',
        name: '',
        tags: [],
        isLoadingSubmit: false,
        isLoadingDelete: false
    }),
    getters: {
        isFormValid(): boolean {
            return this.name !== ''
        }
    },
    actions: {
        setClient(client: Client) {
            this.id = client.$id
            this.name = client.name
            this.tags = client.tags
        },
        setName(name: string) {
            this.name = name
        },

        setTags(tags: string[]) {
            this.tags = tags
        },

        reset() {
            this.id = ''
            this.name = ''
            this.tags = []
            this.isLoadingSubmit = false
        },

        async onSubmitDelete() {
            if (!this.id) {
                return
            }

            this.isLoadingDelete = true

            const config = useRuntimeConfig();

            await api.deleteDocument(config.public.databaseID, '63fb7883dfeb4195d567', this.id).then((_) => {
                useNuxtApp().$toast.showSuccess('Client deleted successfully')
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

            await api.updateDocument(config.public.databaseID, '63fb7883dfeb4195d567', this.id, {
                name: this.name,
                tags: this.tags,
            }).then((_) => {
                useNuxtApp().$toast.showSuccess('Client updated successfully')
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

            await api.createDocument(config.public.databaseID, '63fb7883dfeb4195d567', {
                name: this.name,
                tags: this.tags,
                merchant_id: merchant?.$id,
            }).then((_) => {
                useNuxtApp().$toast.showSuccess('Client created successfully')
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
