import {defineStore} from 'pinia'
import {Merchant} from '~/types/merchant';
import {showToast} from "~/utils/toast";

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
                showToast.success('Merchant has been selected')
            }
        }
    },
    persist: true
})
