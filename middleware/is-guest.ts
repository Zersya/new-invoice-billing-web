import api from "~/services/api";
import {navigateTo} from "#app";
import {AppwriteException} from "appwrite";
import * as process from "process";

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        const account = api.provider().account
        const session = await account.getSession('current')

        if (session.current) {
            const redirect = to.query.redirect as string | undefined
            return navigateTo(redirect ? redirect : '/dashboard')
        }
    } catch (e) {
        if (e instanceof AppwriteException) {
            // DO SOMETHING
        }
    }
})
