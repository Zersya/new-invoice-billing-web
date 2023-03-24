export interface Invoice {
    number: string
    due_date: Date | null
    client_id: string
    client_name: string
    merchant_id: string
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
    $id: string
    $createdAt: string
    $updatedAt: string
    $permissions: string[]
    $collectionId: string
    $databaseId: string
}
