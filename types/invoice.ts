export interface Invoice {
    number: string
    description: string
    due_date: Date | null
    issued_date: Date | null
    client_id: string
    client_name: string
    merchant_id: string
    published_at: Date | null,
    payment_selected_at: Date | null,
    payment_type: string | null,
    payment_subtype: string | null,
    payload_payment_durianpay: string | null,
    $id: string
    $createdAt: string
    $updatedAt: string
    $permissions: string[]
    $collectionId: string
    $databaseId: string
}

export interface InvoiceItem {
    rates_type: string
    invoice_id: string
    name: string
    quantity: number
    subtotal: number
    price: number
    vat: number
    $id: string
    $createdAt: string
    $updatedAt: string
    $permissions: string[]
    $collectionId: string
    $databaseId: string
}
