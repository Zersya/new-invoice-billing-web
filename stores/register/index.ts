import {defineStore} from 'pinia'
import {navigateTo} from "#app";
import api from "~/services/api";
import {AppwriteException} from "appwrite";
import {useLogin} from "~/stores/login";
import {useUser} from "~/stores/user";
import {showToast} from "~/utils/toast";

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

            api.createAccount(this.email, this.password, this.name).then((_) => {
                const login = useLogin()
                login.setEmail(this.email)
                login.setPassword(this.password)
                login.onSubmitLogin()?.then((_) => {
                    useUser().sendVerificationEmail().then((_) => {
                    })
                })

            }).catch((reason) => {


                if (reason instanceof AppwriteException) {
                    showToast.error(reason.message)
                }

            }).finally(() => {
                this.setIsLoading(false)
            })

        },

    }
})
