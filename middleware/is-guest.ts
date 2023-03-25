import api from "~/services/api";
import {navigateTo} from "#app";
import {AppwriteException} from "appwrite";

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        const account = api.provider().account
        const session = await account.getSession('current')

        if (session.current) {
            const redirect = to.query.redirect as string | undefined
            const query = to.query.query as string | undefined

            // replace comma with ampersand
            const decodedQuery = query?.replace(/,/g, '&')
            // remove new line
            decodedQuery?.replace(/(\r\n|\n|\r)/gm, '')

            return navigateTo((redirect || '/dashboard') + (decodedQuery ? '?' + decodedQuery : ''))
        }
    } catch (e) {
        if (e instanceof AppwriteException) {
            // DO SOMETHING
        }
    }
})
