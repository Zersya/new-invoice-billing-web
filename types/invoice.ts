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
