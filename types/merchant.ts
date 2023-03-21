export interface Merchant {
    name: string
    description: string
    address: string
    phone_country_code: string
    phone_number: string
    tax: number
    merchant_code: string
    latest_invoice_number: number
    owner_id: string
    $id: string
    $createdAt: string
    $updatedAt: string
    $permissions: string[]
    $collectionId: string
    $databaseId: string
}
