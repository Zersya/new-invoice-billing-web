import api from "~/api";
import {navigateTo} from "#app";
import {AppwriteException} from "appwrite";
import {process} from "unenv/runtime/node/process/_process";
import {useRootLoading} from "~/composables/states";

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
