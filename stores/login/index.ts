import {defineStore} from 'pinia'
import {navigateTo} from "#app";
import api from "~/api";
import {AppwriteException} from "appwrite";

export const useLogin = defineStore('login', {
    state: () => ({
        email: 'zeinersyad@gmail.com',
        password: 'password',
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

            api.createSession(this.email, this.password).then((_) => {
                navigateTo('/dashboard')
            }).catch((e) => {

                if (e instanceof AppwriteException) {
                    useNuxtApp().$toast.showError(e.message)
                }

            }).finally(() => {
                this.setIsLoading(false)
            })

        },

    }
})
