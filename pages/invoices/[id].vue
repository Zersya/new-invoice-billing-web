<template>
  <form-payment-method :invoice-id="invoiceId" :is-modal-open="isModalPaymentMethodOpen"
                       @form-closed="isModalPaymentMethodOpen = false"/>
  <div class="container mx-auto px-6 my-14 subpixel-antialiased">
    <div v-if="!storeFetchInvoice.isLoadingFetchDetail" class="max-w-5xl mx-auto bg-white shadow-lg p-6 rounded-md">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12">
          <div class="flex items-center mb-6">
            <h1 class="text-2xl font-semibold uppercase tracking-wide text-gray-900">Invoice</h1>
            <span
                class="ml-4 px-4 py-1 text-xs leading-4 uppercase tracking-wider font-semibold bg-primary-500 text-white rounded-md">#{{
                invoice?.number
              }}</span>
            <div class="ml-auto text-right">
              <p class="text-xs leading-4">{{ formatDate(invoice?.issued_date) }}</p>
              <p class="text-xs leading-4 font-semibold">Due date: {{ formatDate(invoice?.due_date) }}</p>
            </div>
          </div>
        </div>
        <div class="col-span-6">
          <p class="my-1 text-gray-700 font-semibold leading-5">{{ merchant?.name }}</p>
          <p class="my-1 text-gray-600 leading-5">Phone: {{ merchant?.phone_country_code }}{{
              merchant?.phone_number
            }}</p>
        </div>
        <div class="col-span-6">
          <p class="my-1 text-gray-700 font-semibold leading-5">{{ invoice?.client_name }}</p>
          <p class="my-1 text-gray-600 leading-5">{{ invoice?.description }}</p>
        </div>
      </div>
      <div class="mt-6">
        <table class="w-full table-auto">
          <thead class="text-gray-500 font-semibold">
          <tr class="border-b border-gray-200 text-left">
            <th class="py-2">Item</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Tax</th>
            <th>Subtotal</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in invoiceItems" class="border-b border-gray-200 text-gray-600">
            <td class="py-2">{{ item.name }}</td>
            <td>{{ item.rates_type }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ formatIDR(item.price) }}</td>
            <td>{{ formatIDR(item.vat * (item.price * item.quantity)) }} ( {{ item.vat * 100 }}% )</td>
            <td>{{ formatIDR(item.subtotal) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-6 text-right">
        <p>Total: <span class="font-semibold">{{ formatIDR(total) }}</span></p>
        <p class="mt-4 font-semibold">Paying with <span
            :class="['text-primary-500 font-semibold decoration-primary-100', payloadPaymentDurianpay ? '' : 'hover:cursor-pointer underline']"
            @click="payloadPaymentDurianpay ? {} :isModalPaymentMethodOpen = true">{{
            storePaymentMethod.type ? storePaymentMethod.type : 'Select'
          }} {{ invoice?.payment_subtype }}</span></p>
        <p class="font-semibold">{{ payloadPaymentDurianpay?.data.response.account_number }}</p>
      </div>

      <div class="mt-8 text-center">
        <p class="text-gray-700 font-semibold">{{ invoice?.client_name }}</p>
        <p class="text-xs">Signature: ______________________________</p>
      </div>
    </div>
    <div v-else class="flex justify-center h-screen">
      <spinner-loading/>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useFetchInvoice} from "~/stores/invoice";
import SpinnerLoading from "~/components/general/SpinnerLoading.vue";
import {Invoice, InvoiceItem} from "~/types/invoice";
import {ComputedRef, Ref} from "vue";
import {Merchant} from "~/types/merchant";
import {useActiveMerchant} from "~/stores/merchant/active-merchant";
import {usePaymentMethod} from "~/stores/invoice/payment-method";
import api from "~/services/api";

const route = useRoute()

const isModalPaymentMethodOpen: Ref<boolean> = ref(false)

const storePaymentMethod = usePaymentMethod()
const storeActiveMerchant = useActiveMerchant()
const storeFetchInvoice = useFetchInvoice()

let invoiceId: string | null = null

onMounted(() => {
  invoiceId = route.params.id as string

  if (invoiceId) {
    storeFetchInvoice.fetchInvoice(invoiceId).then(() => {

      const paymentType = storeFetchInvoice.invoiceDetail?.payment_type;
      const paymentSubtype = storeFetchInvoice.invoiceDetail?.payment_subtype;

      usePaymentMethod().setType(paymentType, paymentSubtype)
    })
    storeFetchInvoice.fetchInvoiceItems(invoiceId)

    const config = useRuntimeConfig();
    api.subscribeDocument(config.public.databaseID, '6418753f5e769294335b', invoiceId, (data) => {
      storeFetchInvoice.invoiceDetail = data.payload
    })
  }
})

const merchant: ComputedRef<Merchant | null> = computed(() => storeActiveMerchant.merchant)
const invoice: ComputedRef<Invoice | null> = computed(() => storeFetchInvoice.invoiceDetail)
const invoiceItems: ComputedRef<InvoiceItem[]> = computed(() => storeFetchInvoice.listInvoiceItem)

const payloadPaymentDurianpay = computed(() => JSON.parse(JSON.parse(storeFetchInvoice.invoiceDetail?.payload_payment_durianpay!)))

const total: ComputedRef<number> = computed(() => {
  let total = 0
  invoiceItems.value.forEach(item => {
    total += item.subtotal
  })
  return total
})

</script>
