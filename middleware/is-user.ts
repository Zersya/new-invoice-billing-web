import api from "~/services/api";
import {navigateTo} from "#app";
import {AppwriteException} from "appwrite";
import process from "process";

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        const account = api.provider().account
        await account.getSession('current')
    } catch (e) {
        if (e instanceof AppwriteException) {
            return navigateTo('/login?redirect=' + to.fullPath)
        }
    }
})
