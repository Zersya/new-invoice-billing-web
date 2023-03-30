import {defineStore} from 'pinia'
import api from "~/services/api";
import {AppwriteException, Models} from "appwrite";
import {navigateTo} from "#app";
import {showToast} from "~/utils/toast";

export const useUser = defineStore('user', {
    state: () => ({
        account: null as Models.Account<Models.Preferences> | null,
    }),
    actions: {
        setAccount(account: Models.Account<Models.Preferences>) {
            this.account = account
        },
        fetchAccount() {
            api.getAccount().then(async (account) => {
                this.account = account
            })

        },
        async sendVerificationEmail() {
            if (!this.account?.emailVerification) {
                await api.verifyEmail().catch((reason) => {
                    if (reason instanceof AppwriteException) {
                        showToast.error(reason.message)
                    }
                })
            }
        }

    }
})
