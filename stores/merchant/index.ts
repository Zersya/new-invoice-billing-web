import {defineStore} from 'pinia'
import {navigateTo} from "#app";
import api from "~/api";
import {$ref} from "vue/macros";
import {useRoot} from "~/stores";
import {AppwriteException} from "appwrite";

interface FormState {

    name?: string
    description?: string
    address?: string
    phoneCountry?: string
    phone?: string
    tax?: number
    merchantCode?: string
    ownerId?: string
    isLoading: boolean

}

export const useCreateMerchant = defineStore('createMerchant', {
    state: () : FormState => ({
        name: '',
        description: '',
        address: '',
        phoneCountry: '62',
        phone: '',
        tax: 0,
        merchantCode: '',
        ownerId: '',
        isLoading: false,
    }),
    getters: {
        isFormValid(): boolean {
            return this.name !== '' && this.description !== '' && this.merchantCode !== '' && this.ownerId !== ''
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
            const taxNumber = Number(tax)
            this.tax = taxNumber / 100
            } catch (e) {
                useNuxtApp().$toast.showError('Invalid tax value')
                this.tax = 0
            }
        },

        setMerchantCode() {
            const code = this.name?.replace(/\s/g, '-').toLowerCase() + '-' + Math.floor(Math.random() * 1000000)

            this.merchantCode = code
        },

        setOwnerId(ownerId: string) {
            this.ownerId = ownerId
        },

        setIsLoading(isLoading: boolean) {
            this.isLoading = isLoading
        },
        onSubmitCreate() {

            if (!this.isFormValid) {
                return
            }

            this.setIsLoading(true)

            const config = useRuntimeConfig();

            api.createDocument(config.public.databaseID, '63f38fe4d3a2cef4af25', {
                name: this.name,
                description: this.description,
                address: this.address,
                phone_country_code: this.phoneCountry,
                phone_number: this.phone,
                tax: this.tax,
                merchant_code: this.merchantCode,
                owner_id: this.ownerId,
            }).then((_) => {
                useNuxtApp().$toast.showSuccess('Merchant created successfully')
            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    useNuxtApp().$toast.showError(reason.message)
                }

            }).finally(() => {
                this.setIsLoading(false)
            })
        },

    }
})
