import {defineStore} from 'pinia'
import api from "~/services/api";
import {AppwriteException} from "appwrite";
import {Merchant} from "~/types/merchant";
import {showToast} from "~/utils/toast";

interface FormState {
    id?: string
    name?: string
    description?: string
    address?: string
    phoneCountry?: string
    phone?: string
    vat?: number
    merchantCode?: string
    invoiceNumber: number
    isLoadingSubmit: boolean
    isLoadingDelete: boolean

}

export const useFormMerchant = defineStore('formMerchant', {
    state: (): FormState => ({
        id: '',
        name: '',
        description: '',
        address: '',
        phoneCountry: '62',
        phone: '',
        vat: 0,
        merchantCode: '',
        invoiceNumber: 1,
        isLoadingSubmit: false,
        isLoadingDelete: false
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
            this.vat = merchant.vat * 100
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

        setTax(vat: string) {
            try {
                this.vat = Number(vat)
            } catch (e) {
                showToast.error('Invalid vat value')
            }
        },

        setMerchantCode() {
            this.merchantCode = this.name?.replace(/\s/g, '-').toLowerCase() + '-' + Math.floor(Math.random() * 1000000)
        },

        setInvoiceNumber(invoiceNumber: number) {
            this.invoiceNumber = invoiceNumber
        },

        reset() {
            this.id = ''
            this.name = ''
            this.description = ''
            this.address = ''
            this.phoneCountry = '62'
            this.phone = ''
            this.vat = 0
            this.merchantCode = ''
            this.invoiceNumber = 1
            this.isLoadingSubmit = false
        },

        async onSubmitDelete() {
            if (!this.id) {
                return
            }

            this.isLoadingDelete = true

            const config = useRuntimeConfig();

            await api.deleteDocument(config.public.databaseID, '63f38fe4d3a2cef4af25', this.id).then((_) => {
                showToast.success('Merchant deleted successfully')
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

            let cvtTax: number = 0
            try {
                cvtTax = Number(this.vat) / 100
            } catch (e) {
                showToast.error('Invalid vat value')
            }

            const config = useRuntimeConfig();

            await api.updateDocument(config.public.databaseID, '63f38fe4d3a2cef4af25', this.id, {
                name: this.name,
                description: this.description,
                address: this.address,
                phone_country_code: this.phoneCountry,
                phone_number: this.phone,
                vat: cvtTax,
                merchant_code: this.merchantCode,
            }).then((_) => {
                showToast.success('Merchant updated successfully')
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
                return ''
            }

            this.isLoadingSubmit = true

            let cvtTax: number = 0
            try {
                cvtTax = Number(this.vat) / 100
            } catch (e) {
                showToast.error('Invalid vat value')
            }

            const responseAccount = await api.getAccount()

            const config = useRuntimeConfig();

            return await api.createDocument(config.public.databaseID, '63f38fe4d3a2cef4af25', {
                name: this.name,
                description: this.description,
                address: this.address,
                phone_country_code: this.phoneCountry,
                phone_number: this.phone,
                vat: cvtTax,
                merchant_code: this.merchantCode,
                owner_id: responseAccount.$id,
                latest_invoice_number: this.invoiceNumber
            }).then((doc) => {
                showToast.success('Merchant created successfully')

                return doc.$id
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
