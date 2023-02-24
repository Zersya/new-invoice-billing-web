import {defineStore} from 'pinia'
import {navigateTo} from "#app";
import api from "~/api";

export const useRegister = defineStore('register', {
    state: () => ({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isAcceptingTerms: false,
        isLoading: false,
    }),
    getters: {
        isFormValid(): boolean {
            return this.name !== '' && this.email !== '' && this.password !== '' && this.confirmPassword === this.password
        }
    },
    actions: {
        setName(name: string) {
            this.name = name
        },
        setEmail(email: string) {
            this.email = email
        },
        setPassword(password: string) {
            this.password = password
        },
        setConfirmPassword(confirmPassword: string) {
            this.confirmPassword = confirmPassword
        },
        setIsAcceptingTerms(isAcceptingTerms: boolean) {
            this.isAcceptingTerms = isAcceptingTerms
        },
        setIsLoading(isLoading: boolean) {
            this.isLoading = isLoading
        },
        onSubmitRegister() {

            if (!this.email || !this.password || !this.name) {
                return
            }

            this.setIsLoading(true)

            api.createAccount(this.email, this.password, this.name).then((value) => {
                navigateTo('/login')
            }).catch((reason) => {
                console.log(reason)
            }).finally(() => {
                this.setIsLoading(false)
            })

        },

    }
})
