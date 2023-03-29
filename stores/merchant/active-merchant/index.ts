import {defineStore} from 'pinia'
import {Merchant} from '~/types/merchant';

interface ActiveMerchantState {
    merchant: Merchant | null
}

export const useActiveMerchant = defineStore('active-merchant', {
    state: (): ActiveMerchantState => ({
        merchant: null
    }),
    actions: {
        setActiveMerchant(merchant: Merchant | null, initialLoad = false) {
            this.merchant = merchant

            if (!initialLoad) {
                useNuxtApp().$toast.showSuccess('Merchant has been selected')
            }
        }
    },
    persist: true
})
