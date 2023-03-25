import api from "~/services/api";
import {navigateTo} from "#app";
import {AppwriteException} from "appwrite";

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        const account = api.provider().account
        await account.getSession('current')
    } catch (e) {
        if (e instanceof AppwriteException) {

            // parse query to string url encoded
            const query = Object.keys(to.query).map((key) => {
                const value = to.query[key]
                return encodeURIComponent(key) + '=' + encodeURIComponent(value as string)
            })

            return navigateTo('/login?redirect=' + to.path + '&query=' + query)
        }
    }
})
