import {defineStore} from 'pinia'
import api from "~/api";
import {AppwriteException} from "appwrite";
import {Merchant} from "~/types/merchant";

interface FormState {
    id?: string
    name?: string
    description?: string
    address?: string
    phoneCountry?: string
    phone?: string
    tax?: number
    merchantCode?: string
    isLoadingSubmit: boolean

}

export const useFormMerchant = defineStore('formMerchant', {
    state: (): FormState => ({
        id: '',
        name: '',
        description: '',
        address: '',
        phoneCountry: '62',
        phone: '',
        tax: 0,
        merchantCode: '',
        isLoadingSubmit: false,
    }),
    getters: {
        isFormValid(): boolean {
            return this.name !== '' && this.description !== '' && this.merchantCode !== '' && this.phone !== ''
        }
    },
    actions: {
        setMerchant(merchant: Merchant) {
            this.id = merchant.$id
            this.name = merchant.name
            this.description = merchant.description
            this.address = merchant.address
            this.phoneCountry = merchant.phone_country_code
            this.phone = merchant.phone_number
            this.tax = merchant.tax * 100
            this.merchantCode = merchant.merchant_code
        },
        setName(name: string) {
            this.name = name
            this.setMerchantCode()
        },

        setDescription(description: string) {
            this.description = description
        },

        setAddress(address: string) {
            this.address = address
        },

        setPhoneCountry(phoneCountry: string) {
            this.phoneCountry = phoneCountry
        },

        setPhone(phone: string) {
            this.phone = phone
        },

        setTax(tax: string) {
            try {
                this.tax = Number(tax)
            } catch (e) {
                useNuxtApp().$toast.showError('Invalid tax value')
            }
        },

        setMerchantCode() {
            const code = this.name?.replace(/\s/g, '-').toLowerCase() + '-' + Math.floor(Math.random() * 1000000)

            this.merchantCode = code
        },

        reset() {
            this.id = ''
            this.name = ''
            this.description = ''
            this.address = ''
            this.phoneCountry = '62'
            this.phone = ''
            this.tax = 0
            this.merchantCode = ''
            this.isLoadingSubmit = false
        },

        async onSubmitDelete() {
            if (!this.id) {
                return
            }

            this.isLoadingSubmit = true

            const config = useRuntimeConfig();

            await api.deleteDocument(config.public.databaseID, '63f38fe4d3a2cef4af25', this.id).then((_) => {
                useNuxtApp().$toast.showSuccess('Merchant deleted successfully')
            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    useNuxtApp().$toast.showError(reason.message)
                }

            }).finally(() => {
                this.isLoadingSubmit = false
            })
        },

        async onSubmitUpdate() {
            if (!this.isFormValid || !this.id) {
                return
            }

            this.isLoadingSubmit = true

            let cvtTax: number = 0
            try {
                cvtTax = Number(this.tax) / 100
            } catch (e) {
                useNuxtApp().$toast.showError('Invalid tax value')
            }

            const config = useRuntimeConfig();

            await api.updateDocument(config.public.databaseID, '63f38fe4d3a2cef4af25', this.id, {
                name: this.name,
                description: this.description,
                address: this.address,
                phone_country_code: this.phoneCountry,
                phone_number: this.phone,
                tax: cvtTax,
                merchant_code: this.merchantCode,
            }).then((_) => {
                useNuxtApp().$toast.showSuccess('Merchant updated successfully')
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

            await api.createDocument(config.public.databaseID, '63f38fe4d3a2cef4af25', {
                name: this.name,
                description: this.description,
                address: this.address,
                phone_country_code: this.phoneCountry,
                phone_number: this.phone,
                tax: cvtTax,
                merchant_code: this.merchantCode,
                owner_id: responseAccount.$id,
            }).then((_) => {
                useNuxtApp().$toast.showSuccess('Merchant created successfully')
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
