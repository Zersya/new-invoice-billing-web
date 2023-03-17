import api from "~/services/api";
import {navigateTo} from "#app";
import {AppwriteException} from "appwrite";

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        const account = api.provider().account
        await account.getSession('current')

        return navigateTo('/dashboard')
    } catch (e) {
        if (e instanceof AppwriteException) {
            // DO SOMETHING
        }
    }
})
