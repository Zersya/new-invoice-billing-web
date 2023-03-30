import {defineStore} from 'pinia'
import api from "~/services/api";
import {AppwriteException} from "appwrite";
import {Client} from "~/types/client";
import {useActiveMerchant} from "~/stores/merchant/active-merchant";
import {showToast} from "~/utils/toast";

interface FormClientState {
    id?: string
    name: string
    email: string
    tags: string[]
    isLoadingSubmit: boolean
    isLoadingDelete: boolean

}

export const useFormClient = defineStore('formClient', {
    state: (): FormClientState => ({
        id: '',
        name: '',
        email: '',
        tags: [],
        isLoadingSubmit: false,
        isLoadingDelete: false
    }),
    getters: {
        isFormValid(): boolean {
            return this.name !== '' && this.email !== ''
        }
    },
    actions: {
        setClient(client: Client) {
            this.id = client.$id
            this.name = client.name
            this.email = client.email
            this.tags = client.tags
        },
        setName(name: string) {
            this.name = name
        },

        setEmail(email: string) {
            this.email = email
        },

        setTags(tags: string[]) {
            this.tags = tags
        },

        reset() {
            this.id = ''
            this.name = ''
            this.email = ''
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
                showToast.success('Client deleted successfully')
            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    showToast.error(reason.message)
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
                email: this.email,
                tags: this.tags,
            }).then((_) => {
                showToast.success('Client updated successfully')
            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    showToast.error(reason.message)
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

            const merchant = useActiveMerchant().merchant

            const config = useRuntimeConfig();

            await api.createDocument(config.public.databaseID, '63fb7883dfeb4195d567', {
                name: this.name,
                email: this.email,
                tags: this.tags,
                merchant_id: merchant?.$id,
            }).then((_) => {
                showToast.success('Client created successfully')
            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    showToast.error(reason.message)
                }

            }).finally(() => {
                this.isLoadingSubmit = false
            })
        },

    }
})
