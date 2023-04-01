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
              <input v-model="type" id="virtual-account" type="radio" value="VA" name="payment-type"
                     class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="virtual-account" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Virtual
                Account</label>
            </div>
            <div class="flex items-center">
              <input v-model="type" checked id="default-radio-2" type="radio" value="QRIS" name="payment-type"
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
                        @click="storePaymentMethod.setType(type)">
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
import {Ref} from "vue";

const storePaymentMethod = usePaymentMethod()
const storeFetchInvoice = useFetchInvoice()

const type: Ref<string | null | undefined> = ref(null)

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

function onModalOpened() {
  type.value = storePaymentMethod.type
}

function onSubmit() {
  storePaymentMethod.onSetPaymentMethod(props.invoiceId)

  emit('form-closed')

  storeFetchInvoice.fetchInvoice(props.invoiceId)
}
</script>
