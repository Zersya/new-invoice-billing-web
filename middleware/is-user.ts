import api from "~/api";
import {navigateTo} from "#app";
import {AppwriteException} from "appwrite";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const account = api.provider().account
    try {
        const _ = await account.getSession('current')
    } catch (e) {
        if (e instanceof AppwriteException) {
            if (e.code === 401) {

                useNuxtApp().$toast.showError(e.message)

                navigateTo('/login')
                return
            }
        }
    }
})
