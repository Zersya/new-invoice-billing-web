import {defineStore} from 'pinia'
import api from "~/api";
import {AppwriteException} from "appwrite";

interface FormState {

    name?: string
    description?: string
    address?: string
    phoneCountry?: string
    phone?: string
    tax?: number
    merchantCode?: string
    isLoadingSubmit: boolean

}

export const useCreateMerchant = defineStore('createMerchant', {
    state: (): FormState => ({
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
            this.name = ''
            this.description = ''
            this.address = ''
            this.phoneCountry = '62'
            this.phone = ''
            this.tax = 0
            this.merchantCode = ''
            this.isLoadingSubmit = false
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

            api.createDocument(config.public.databaseID, '63f38fe4d3a2cef4af25', {
                name: this.name,
                description: this.description,
                address: this.address,
                phone_country_code: this.phoneCountry,
                phone_number: this.phone,
                tax: this.tax,
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
