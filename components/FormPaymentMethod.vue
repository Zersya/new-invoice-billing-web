<template>
  <general-modal :is-modal-open="isModalOpen"
                 :extra-large="true"
                 name="form-payment-method"
                 :title="'Set payment method'"
                 @modal-opened="emit('form-opened');
                                onModalOpened()"
                 @modal-closed="emit('form-closed')">
    <template #body>
      <form @submit.prevent="onSubmit">
        <div class="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <div class="flex items-center mb-4">
              <input v-model="method.type" id="virtual-account" type="radio" value="VA" name="payment-method"
                     class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="virtual-account" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Virtual
                Account</label>
            </div>
            <div class="flex items-center ml-6 mb-4">
              <input v-model="method.subtype" :disabled="method.type !== 'VA'" id="virtual-account-mandiri" type="radio" value="MANDIRI" name="payment-method-type"
                     class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="virtual-account-mandiri" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mandiri</label>
            </div>
            <div class="flex items-center ml-6 mb-4">
              <input v-model="method.subtype" :disabled="method.type !== 'VA'" id="virtual-account-bca" type="radio" value="BCA" name="payment-method-type"
                     class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="virtual-account-bca" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">BCA</label>
            </div>
            <div class="flex items-center ml-6 mb-4">
              <input v-model="method.subtype" :disabled="method.type !== 'VA'" id="virtual-account-bri" type="radio" value="BRI" name="payment-method-type"
                     class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="virtual-account-bri" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">BRI</label>
            </div>
            <div class="flex items-center ml-6 mb-4">
              <input v-model="method.subtype" :disabled="method.type !== 'VA'" id="virtual-account-bsi" type="radio" value="BSI" name="payment-method-type"
                     class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              >
              <label for="virtual-account-bsi" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">BSI</label>
            </div>
            <div class="flex items-center">
              <input v-model="method.type" checked id="default-radio-2" type="radio" value="QRIS" name="payment-method"
                     class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="default-radio-2"
                     class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">QRIS</label>
            </div>

          </div>
        </div>
        <general-button type="submit"
                        :is-loading="storePaymentMethod.isLoading"
                        :is-disabled="storePaymentMethod.isLoading"
                        class="mt-4"
                        @click="onSubmit">
          {{ 'Save' }}
        </general-button>
      </form>
    </template>
  </general-modal>
</template>

<script setup lang="ts">
import {initDropdowns} from "flowbite";
import {usePaymentMethod} from "~/stores/invoice/payment-method";
import {useFetchInvoice} from "~/stores/invoice";
import {ReactiveFlags, Ref} from "vue";

const storePaymentMethod = usePaymentMethod()
const storeFetchInvoice = useFetchInvoice()

let method: Ref<{ type: string | null | undefined, subtype?: string | null | undefined }> = ref({
  type: null,
  subtype: null
})

onMounted(() => {
  initDropdowns()
})

const emit = defineEmits(['form-opened', 'form-closed'])

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true
  },
  invoiceId: {
    type: String,
    required: true
  },
})

watch(method, (value) => {
 if(value.type === 'QRIS') {
   method.value.subtype = null
 } else if(value.type === 'VA') {
   method.value.subtype = 'MANDIRI'
 }

 if(value.subtype) {
   method.value.type = 'VA'
 }
}, {deep: true, immediate: true})

function onModalOpened() {
  method.value = {
    type: storePaymentMethod.type,
    subtype: storePaymentMethod.subtype
  }
}

async function onSubmit() {
  storePaymentMethod.setType(method.value.type, method.value.subtype)

  await storePaymentMethod.onSetPaymentMethod(props.invoiceId)

  emit('form-closed')

  await storeFetchInvoice.fetchInvoice(props.invoiceId)
}
</script>
