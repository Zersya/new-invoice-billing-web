import {defineStore} from 'pinia'
import api from "~/services/api";
import {AppwriteException} from "appwrite";
import {useLogin} from "~/stores/login";

export const useUserVerifyEmail = defineStore('user-verify-email', {
    state: () => ({
        isLoading: false,
        isExpired: false,
        isVerified: false,
        isError: true,
    }),
    actions: {
        onAcceptVerify() {
            this.isLoading = true

            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get('userId');
            const secret = urlParams.get('secret');
            const expire = urlParams.get('expire');

            if (!userId || !secret) {
                this.isError = true
                this.isLoading = false
                return
            }

            // check if expired
            if (expire) {
                const expireDate = new Date(expire.replace('+', ' '))
                const now = new Date()
                if (now > expireDate) {
                    this.isExpired = true
                    this.isLoading = false
                    return
                }
            }

            api.verifyConfirmationEmail(userId!, secret!).then((_) => {
                this.isVerified = true
            }).catch((_) => {

                api.getAccount().then(async (account) => {
                    if (account.emailVerification) {
                        this.isVerified = true
                    } else {
                        this.isError = true
                    }
                })

            }).finally(() => {
                this.isLoading = true
            })

        },

    }
})
