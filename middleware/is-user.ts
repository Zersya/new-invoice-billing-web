import api from "~/services/api";
import {navigateTo} from "#app";
import {AppwriteException} from "appwrite";
import {process} from "unenv/runtime/node/process/_process";
import {useRootLoading} from "~/composables/states";

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        const account = api.provider().account
        await account.getSession('current')
    } catch (e) {
        console.error(e)

        if (e instanceof AppwriteException) {
            if (e.code === 401) {
                useNuxtApp().$toast.showError('Your session has expired. Please login again.')


                return navigateTo('/login')
            }
        }
    }
})
