import {defineStore} from 'pinia'
import {navigateTo} from "#app";
import api from "~/services/api";
import {AppwriteException} from "appwrite";
import {useUser} from "~/stores/user";
import {showToast} from "~/utils/toast";

export const useLogin = defineStore('login', {
    state: () => ({
        email: '',
        password: '',
        isLoading: false,
    }),
    getters: {
        isFormValid(): boolean {
            return this.email !== '' && this.password !== ''
        }
    },
    actions: {
        setEmail(email: string) {
            this.email = email
        },
        setPassword(password: string) {
            this.password = password
        },
        setIsLoading(isLoading: boolean) {
            this.isLoading = isLoading
        },
        onSubmitLogin() {
            if (!this.email || !this.password) {
                return
            }

            this.setIsLoading(true)

            return api.createSession(this.email, this.password).then((_) => {

                return api.getAccount().then(async (account) => {
                    useUser().setAccount(account)

                    const urlParams = new URLSearchParams(window.location.search);
                    const redirect = urlParams.get('redirect');
                    if (redirect) {
                        navigateTo(redirect)
                    } else {
                        navigateTo('/dashboard')
                    }
                })


            }).catch((e) => {

                if (e instanceof AppwriteException) {
                    showToast.error(e.message)
                }

                console.log(e)

            }).finally(() => {
                this.setIsLoading(false)
            })

        },

    }
})
