import {Client as Appwrite, Databases, Account} from "appwrite";
import {Models} from "appwrite/src/models";

// Exporting some most commonly used functions
let api = {
    sdk: null as { database: Databases; account: Account } | null,

    provider: () => {
        if (api.sdk) {
            return api.sdk;
        }

        let appwrite = new Appwrite();

        const config = useRuntimeConfig();
        appwrite.setEndpoint(config.public.endpoint).setProject(config.public.projectID);

        const account = new Account(appwrite);
        const database = new Databases(appwrite);
        api.sdk = {database, account};

        return api.sdk;
    },

    // Register a user in the backend
    createAccount: (email: string, password: string, name: string) => {
        return api.provider().account.create("unique()", email, password, name);
    },

    // Allow the user to log in by creating a session
    createSession: (email: string, password: string) => {
        return api.provider().account.createEmailSession(email, password);
    },

    // Get account information of the currently logged in user
    getAccount: () => {
        return api.provider().account.get();
    },

    // Log out the user by ending the current session
    deleteCurrentSession: () => {
        return api.provider().account.deleteSession("current");
    },

    /*
    Creates a document and stores it in the backend
    - Requires a collectionID to identify where to save the document
    - Auto generates an uniqie document id for the same
    - Requires:
      - data : The fields of the document
      - read : Users with read permissions
      - write : Users with write (updating and deleting permissions)
    */
    createDocument: (databaseID: string, collectionID: string, data: Omit<Document, keyof Models.Document>, permissions?: string[]) => {
        return api
            .provider()
            .database.createDocument(
                databaseID,
                collectionID,
                "unique()",
                data,
                permissions
            );
    },

    // Get all documents stored in a collection
    listDocuments: (databaseID: string, collectionID: string, queries?: string[]) => {
        return api.provider().database.listDocuments(databaseID, collectionID, queries);
    },

    getDocument: (databaseID: string, collectionID: string, documentID: string) => {
        return api
            .provider()
            .database.getDocument(databaseID, collectionID, documentID);
    },
    // Update a given document with the relevant data
    // Has all the same arguments as createDocument, except for an additional identifier documentID to point to which document to update
    updateDocument: (databaseID: string, collectionID: string, documentID: string, data: Omit<Document, keyof Models.Document>, permissions?: string[]) => {
        return api
            .provider()
            .database.updateDocument(
                databaseID,
                collectionID,
                documentID,
                data,
                permissions
            );
    },

    // Deletes the document with the given collection and document ids
    deleteDocument: (databaseID: string, collectionID: string, documentID: string) => {
        return api
            .provider()
            .database.deleteDocument(databaseID, collectionID, documentID);
    },
};

export default api;
