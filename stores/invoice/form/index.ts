import {defineStore} from 'pinia'
import api from "~/services/api";
import {AppwriteException} from "appwrite";
import {Invoice} from "~/types/invoice";
import {Client} from "~/types/client";
import {useFetchInvoice} from "~/stores/invoice";
import {useActiveMerchant} from "~/stores/merchant/active-merchant";
import {showToast} from "~/utils/toast";

interface InvoiceItemField {
    id?: string
    name: string,
    quantity: number,
    price: number,
    vat: number,
    subtotal: number,
    rates_type: string
}

interface FormInvoiceState {
    id?: string
    number: string
    description: string
    due_date: Date | null
    client_id: string
    merchant_id: string
    published_at: Date | null
    issued_date: Date | null
    client: Client | null
    items: InvoiceItemField[]
    isLoadingSubmit: boolean
    isLoadingDelete: boolean
    isLoadingArchive: boolean
    isLoadingPublish: boolean
}

export const useFormInvoice = defineStore('formInvoice', {
    state: (): FormInvoiceState => ({
        id: '',
        number: '',
        description: '',
        due_date: null,
        client_id: '',
        merchant_id: '',
        published_at: null,
        issued_date: null,
        client: null,
        items: [],
        isLoadingSubmit: false,
        isLoadingDelete: false,
        isLoadingArchive: false,
        isLoadingPublish: false
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

            this.setSubTotal(index)
        },
        setItemTax(index: number, vat: number) {
            if (vat > 100) {
                vat = 100
            } else if (vat < 0) {
                vat = 0
            }

            this.items[index].vat = vat

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
            let taxAmount = (this.items[index].vat / 100) * (this.items[index].price * this.items[index].quantity);

            // prevent taxAmount to be negative subtotal
            if (taxAmount > this.items[index].price * this.items[index].quantity) {
                taxAmount = this.items[index].price * this.items[index].quantity
            }

            const subTotal = this.items[index].price * this.items[index].quantity

            // 2 decimal points precision
            this.items[index].subtotal = Math.round((subTotal - taxAmount) * 100) / 100
        },

        setInvoice(invoice: Invoice) {
            this.id = invoice.$id
            this.number = invoice.number
            this.description = invoice.description
            this.due_date = invoice.due_date
            this.client_id = invoice.client_id
            this.merchant_id = invoice.merchant_id
            this.published_at = invoice.published_at
            this.issued_date = invoice.issued_date
        },

        setNumber(number?: number) {
            const date = new Date()
            const year = date.getFullYear().toString().substr(-2)
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const num = number?.toString().padStart(4, '0')

            this.number = `INV-${year}-${month}-${num}`
        },

        setDescription(description: string) {
            this.description = description
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

        setPublishedAt(published_at: Date) {
            this.published_at = published_at
        },

        setIssuedDate(issued_date: Date) {
            this.issued_date = issued_date
        },

        reset() {
            this.id = ''
            this.number = ''
            this.description = ''
            this.client_id = ''
            this.merchant_id = ''
            this.published_at = null
            this.issued_date = null
            this.due_date = null
            this.isLoadingSubmit = false
            this.items = []
        },


        async onArchiveInvoice() {
            if (!this.id) {
                return
            }

            this.isLoadingArchive = true

            const config = useRuntimeConfig();

            await api.updateDocument(config.public.databaseID, '6418753f5e769294335b', this.id, {
                archived_at: new Date()
            }).then(async (_) => {
                showToast.success('Invoice archived successfully')

                for (const item of this.items) {
                    await this.archiveInvoiceItem(item?.id)
                }

            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    showToast.error(reason.message)
                }

            }).finally(() => {
                this.isLoadingArchive = false
            })
        },

        async onSubmitDelete() {
            if (!this.id) {
                return
            }

            this.isLoadingDelete = true

            const config = useRuntimeConfig();

            await api.deleteDocument(config.public.databaseID, '6418753f5e769294335b', this.id).then(async (_) => {
                showToast.success('Invoice deleted successfully')

                for (const item of this.items) {
                    await this.deleteInvoiceItem(item?.id)
                }

            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    showToast.error(reason.message)
                }

            }).finally(() => {
                this.isLoadingDelete = false
            })
        },

        async onSubmitPublish() {
            if (!this.isFormValid || !this.id) {
                return
            }

            this.isLoadingPublish = true

            const config = useRuntimeConfig();

            const date = new Date()

            await api.updateDocument(config.public.databaseID, '6418753f5e769294335b', this.id, {
                published_at: date,
                issued_date: date,
            }).then(async (_) => {
                showToast.success('Invoice updated successfully')
            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    showToast.error(reason.message)
                }

            }).finally(() => {
                this.isLoadingPublish = false
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
                description: this.description,
                due_date: this.due_date,
                client_id: this.client_id,
                client_name: this.client?.name,
                published_at: this.published_at,
                issued_date: this.issued_date,
            }).then(async (doc) => {
                showToast.success('Invoice updated successfully')

                for (const item of this.items) {
                    await this.updateInvoiceItem(item, doc.$id)
                }

                // compare this.items with useFetchInvoice().invoiceItems
                // find the difference and delete the difference
                const invoiceItems = useFetchInvoice().listInvoiceItem.map((item) => item)
                const items = this.items.map((item) => item)

                // find the difference, by converting to array of id
                const differenceInvoiceItemsId = invoiceItems.map((e) => e.$id)
                    .filter(x => !items.map((e) => e.id).includes(x));

                // delete the difference
                for (const invoiceItemId of differenceInvoiceItemsId) {
                    await this.deleteInvoiceItem(invoiceItemId)
                }

                // find the difference, filter the item that doesn't have id
                // then submit the difference
                for (const item of items.filter((item) => !item.id)) {
                    const foundedItem = this.items.find((x) => x.id === item.id)
                    if (foundedItem) {
                        await this.submitInvoiceItem(foundedItem, doc.$id)
                    }
                }


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

            const config = useRuntimeConfig();

            await api.createDocument(config.public.databaseID, '6418753f5e769294335b', {
                number: this.number,
                description: this.description,
                client_id: this.client_id,
                client_name: this.client?.name,
                merchant_id: this.merchant_id,
                published_at: this.published_at,
                issued_date: this.issued_date,
                due_date: this.due_date,
            }).then(async (doc) => {
                showToast.success('Invoice created successfully')

                const merchant = useActiveMerchant().merchant
                if (merchant) {
                    merchant.latest_invoice_number += 1
                    await api.updateDocument(config.public.databaseID, '63f38fe4d3a2cef4af25', merchant?.$id, {
                        latest_invoice_number: merchant.latest_invoice_number
                    })

                    useActiveMerchant().setActiveMerchant(merchant, true)
                    this.setNumber(merchant.latest_invoice_number)
                }

                for (const item of this.items) {
                    await this.submitInvoiceItem(item, doc.$id)
                }

            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    showToast.error(reason.message)
                }

            }).finally(() => {
                this.isLoadingSubmit = false
            })
        },

        async submitInvoiceItem(item: InvoiceItemField, invoice_id: string) {
            let cvtTax: number = 0
            try {
                cvtTax = Number(item.vat) / 100
            } catch (e) {
                showToast.error('Invalid vat value')
            }

            const config = useRuntimeConfig();

            await api.createDocument(config.public.databaseID, '641af3a7562c2d9f717c', {
                invoice_id: invoice_id,
                name: item.name,
                rates_type: item.rates_type,
                quantity: item.quantity,
                price: item.price,
                vat: cvtTax,
                subtotal: item.subtotal,
            }).then((_) => {
                showToast.success('Invoice item created successfully')
            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    showToast.error(reason.message)
                }
            })
        },

        async updateInvoiceItem(item: InvoiceItemField, invoice_id: string) {
            if (!item.id) return

            let cvtTax: number = 0
            try {
                cvtTax = Number(item.vat) / 100
            } catch (e) {
                showToast.error('Invalid vat value')
            }

            const config = useRuntimeConfig();

            await api.updateDocument(config.public.databaseID, '641af3a7562c2d9f717c', item.id, {
                invoice_id: invoice_id,
                name: item.name,
                rates_type: item.rates_type,
                quantity: item.quantity,
                price: item.price,
                vat: cvtTax,
                subtotal: item.subtotal,
            }).then((_) => {
                showToast.success('Invoice item updated successfully')
            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    showToast.error(reason.message)
                }
            })
        },

        async deleteInvoiceItem(itemId: string | undefined) {
            if (!itemId) return

            const config = useRuntimeConfig();

            await api.deleteDocument(config.public.databaseID, '641af3a7562c2d9f717c', itemId).then((_) => {
                showToast.success('Invoice item deleted successfully')
            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    showToast.error(reason.message)
                }
            })
        },

        async archiveInvoiceItem(itemId: string | undefined) {
            if (!itemId) return

            const config = useRuntimeConfig();

            await api.updateDocument(config.public.databaseID, '641af3a7562c2d9f717c', itemId, {
                archived_at: new Date()
            }).then((_) => {
                showToast.success('Invoice item archive successfully')
            }).catch((reason) => {

                if (reason instanceof AppwriteException) {
                    showToast.error(reason.message)
                }
            })
        }
    }
})
