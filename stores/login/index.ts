import {defineStore} from 'pinia'
import {navigateTo} from "#app";
import api from "~/api";

export const useLogin = defineStore('login', {
    state: () => ({
        email: '',
        password: '',
        isLoading: false,
    }),
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
        async onSubmitLogin() {
            this.setIsLoading(true)

            const result = await api.createSession(this.email, this.password)



        },

    }
})
