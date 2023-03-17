import {defineStore} from 'pinia'
import api from "~/services/api";
import {AppwriteException} from "appwrite";
import {Client} from "~/types/client";

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
            return this.name !== '' && this.tags.length > 0
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
                description: this.description,
                address: this.address,
                phone_country_code: this.phoneCountry,
                phone_number: this.phone,
                tax: cvtTax,
                client_code: this.clientCode,
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

            let cvtTax: number = 0
            try {
                cvtTax = Number(this.tax) / 100
            } catch (e) {
                useNuxtApp().$toast.showError('Invalid tax value')
            }

            const responseAccount = await api.getAccount()

            const config = useRuntimeConfig();

            await api.createDocument(config.public.databaseID, '63fb7883dfeb4195d567', {
                name: this.name,
                description: this.description,
                address: this.address,
                phone_country_code: this.phoneCountry,
                phone_number: this.phone,
                tax: cvtTax,
                client_code: this.clientCode,
                owner_id: responseAccount.$id,
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
