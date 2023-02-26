import api from "~/api";
import {navigateTo} from "#app";
import {AppwriteException} from "appwrite";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const account = api.provider().account

    try {
        const _ = await account.getSession('current')
        return navigateTo('/dashboard')
    } catch (e) {

        if (e instanceof AppwriteException) {
            // DO SOMETHING
        }
    }
})
