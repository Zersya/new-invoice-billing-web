import {defineStore} from 'pinia'
import api from "~/services/api";
import {AppwriteException} from "appwrite";
import {Invoice, InvoiceItem} from "~/types/invoice";
import {useFetchMerchant} from "~/stores/merchant";
import {Client} from "~/types/client";
import {useFormMerchant} from "~/stores/merchant/form";
import {useFetchInvoice} from "~/stores/invoice";

interface InvoiceItemField {
    id?: string
    name: string,
    quantity: number,
    price: number,
    tax: number,
    subtotal: number,
    rates_type: string
}

interface FormInvoiceState {
    id?: string
    number: string
    due_date: Date | null
    client_id: string
    merchant_id: string
    client: Client | null
    items: InvoiceItemField[]
    isLoadingSubmit: boolean
    isLoadingDelete: boolean

}

export const useFormInvoice = defineStore('formInvoice', {
    state: (): FormInvoiceState => ({
        id: '',
        number: '',
        due_date: null,
        client_id: '',
        merchant_id: '',
        client: null,
        items: [],
        isLoadingSubmit: false,
        isLoadingDelete: false
    }),
    getters: {
        isFormValid(): boolean {
            return this.number !== '' && this.client_id !== '' && this.merchant_id !== '' && this.due_date !== null && this.items.length !== 0
        }
    },
    actions: {
        addItem(item: InvoiceItemField) {
            this.items.push(item)
        },
        removeItem(index: number) {
            this.items.splice(index, 1)
        },
        setItemName(index: number, name: string) {
            this.items[index].name = name
        },
        setRatesType(index: number, rates_type: string) {
            this.items[index].rates_type = rates_type
        },
        setItemPrice(index: number, price: number) {
            this.items[index].price = price

            const taxAmount = (this.items[index].tax / 100) * (this.items[index].price * this.items[index].quantity);
            this.items[index].subtotal -= taxAmount
        },
        setItemTax(index: number, tax: number) {
            if (tax > 100) {
                tax = 100
            } else if (tax < 0) {
                tax = 0
            }

            this.items[index].tax = tax

            this.setSubTotal(index)
        },
        increaseItemQuantity(index: number) {
            this.items[index].quantity++

            this.setSubTotal(index)
        },
        decreaseItemQuantity(index: number) {
            if (this.items[index].quantity > 1) {
                this.items[index].quantity--

                this.setSubTotal(index)
            }
        },

        setSubTotal(index: number) {
            const taxAmount = (this.items[index].tax / 100) * (this.items[index].price * this.items[index].quantity);
            const subTotal = this.items[index].price * this.items[index].quantity
            this.items[index].subtotal = subTotal - taxAmount
        },

        setInvoice(invoice: Invoice) {
            this.id = invoice.$id
            this.number = invoice.number
            this.due_date = invoice.due_date
            this.client_id = invoice.client_id
            this.merchant_id = invoice.merchant_id
        },
        setNumber(number?: number) {
            const date = new Date()
            const year = date.getFullYear().toString().substr(-2)
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const num = number?.toString().padStart(4, '0')

            this.number = `INV-${year}-${month}-${num}`
        },

        setDueDate(due_date: Date) {
            this.due_date = due_date
        },

        setClient(client: Client | null) {
            this.client_id = client?.$id ?? ''
            this.client = client
        },

        setMerchantId(merchant_id: string) {
            this.merchant_id = merchant_id
        },

        reset() {
            this.id = ''
            this.number = ''
            this.client_id = ''
            this.merchant_id = ''
            this.due_date = null
            this.isLoadingSubmit = false
            this.items = []
        },

        async onSubmitDelete() {
            if (!this.id) {
                return
            }

            this.isLoadingDelete = true

            const config = useRuntimeConfig();

            await api.deleteDocument(config.public.databaseID, '6418753f5e769294335b', this.id).then(async (_) => {
                useNuxtApp().$toast.showSuccess('Invoice deleted successfully')

                for (const item of this.items) {
                    await this.deleteInvoiceItem(item?.id)
                }

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

            await api.updateDocument(config.public.databaseID, '6418753f5e769294335b', this.id, {
                number: this.number,
                due_date: this.due_date,
                client_id: this.client_id,
                client_name: this.client?.name,
            }).then(async (doc) => {
                useNuxtApp().$toast.showSuccess('Invoice updated successfully')

                for (const item of this.items) {
                    await this.updateInvoiceItem(item, doc.$id)
                }

                // compare this.items with useFetchInvoice().invoiceItems
                // find the difference and delete the difference
                const invoiceItems = useFetchInvoice().listInvoiceItem
                const invoiceItemsID = invoiceItems.map((item) => item.$id)
                const itemsID = this.items.map((item) => item.id)

                const differenceInvoiceItems = invoiceItemsID.filter(x => !itemsID.includes(x));
                for (const invoiceItemId of differenceInvoiceItems) {
                    await this.deleteInvoiceItem(invoiceItemId)
                }


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
            const dateNow = new Date()

            const config = useRuntimeConfig();

            await api.createDocument(config.public.databaseID, '6418753f5e769294335b', {
                number: this.number,
                client_id: this.client_id,
                client_name: this.client?.name,
                merchant_id: this.merchant_id,
                issued_date: dateNow,
                due_date: this.due_date,
            }).then(async (doc) => {
                useNuxtApp().$toast.showSuccess('Invoice created successfully')

                const merchant = useFetchMerchant().activeMerchant
                if (merchant) {
                    merchant.latest_invoice_number += 1
                    await api.updateDocument(config.public.databaseID, '63f38fe4d3a2cef4af25', merchant?.$id, {
                        latest_invoice_number: merchant.latest_invoice_number
                    })

                    useFetchMerchant().setActiveMerchant(merchant, true)
                    this.setNumber(merchant.latest_invoice_number)
                }

                for (const item of this.items) {
                    await this.submitInvoiceItem(item, doc.$id)
                }

            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    useNuxtApp().$toast.showError(reason.message)
                }

            }).finally(() => {
                this.isLoadingSubmit = false
            })
        },

        async submitInvoiceItem(item: InvoiceItemField, invoice_id: string) {
            let cvtTax: number = 0
            try {
                cvtTax = Number(item.tax) / 100
            } catch (e) {
                useNuxtApp().$toast.showError('Invalid tax value')
            }

            const config = useRuntimeConfig();

            await api.createDocument(config.public.databaseID, '641af3a7562c2d9f717c', {
                invoice_id: invoice_id,
                name: item.name,
                rates_type: item.rates_type,
                quantity: item.quantity,
                price: item.price,
                tax: cvtTax,
                subtotal: item.subtotal,
            }).then((_) => {
                useNuxtApp().$toast.showSuccess('Invoice item created successfully')
            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    useNuxtApp().$toast.showError(reason.message)
                }
            })
        },

        async updateInvoiceItem(item: InvoiceItemField, invoice_id: string) {
            if (!item.id) return

            let cvtTax: number = 0
            try {
                cvtTax = Number(item.tax) / 100
            } catch (e) {
                useNuxtApp().$toast.showError('Invalid tax value')
            }

            const config = useRuntimeConfig();

            await api.updateDocument(config.public.databaseID, '641af3a7562c2d9f717c', item.id, {
                invoice_id: invoice_id,
                name: item.name,
                rates_type: item.rates_type,
                quantity: item.quantity,
                price: item.price,
                tax: cvtTax,
                subtotal: item.subtotal,
            }).then((_) => {
                useNuxtApp().$toast.showSuccess('Invoice item updated successfully')
            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    useNuxtApp().$toast.showError(reason.message)
                }
            })
        },

        async deleteInvoiceItem(itemId: string | undefined) {
            if (!itemId) return

            const config = useRuntimeConfig();

            await api.deleteDocument(config.public.databaseID, '641af3a7562c2d9f717c', itemId).then((_) => {
                useNuxtApp().$toast.showSuccess('Invoice item deleted successfully')
            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    useNuxtApp().$toast.showError(reason.message)
                }
            })
        }
    }
})
