<template>
  <general-modal :is-modal-open="isModalOpen"
                 :extra-large="true"
                 class-name="max-w-7xl"
                 name="form-invoice"
                 :title="storeForm.id ? 'Edit invoice' : 'Add invoice'"
                 @modal-opened="emit('form-opened'); onModalOpened()"
                 @modal-closed="emit('form-closed'); storeForm.reset()">
    <template #caption>
      <h4 class="text-sm text-gray-500 mb-1">{{ activeMerchantName }}</h4>
    </template>
    <template #subtitle>
      <span v-if="storeForm.id"
            :class="`text-sm font-semibold ${isPublished ? 'text-green-600' : 'text-red-600'}`">
        {{ isPublished ? 'Invoice has been published' : 'Invoice has not been published yet' }}
      </span>
    </template>
    <template #additional-action>
      <div class="flex grow justify-between">
        <button v-if="storeForm.id"
                type="button"
                class="text-red-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm p-1.5 items-center dark:hover:bg-red-600 dark:hover:text-white"
                @click="onDelete">
          <general-spinner-loading v-if="storeForm.isLoadingDelete" class="inline" loading-color="fill-primary-200"/>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9M7 6h10v13H7V6m2 2v9h2V8H9m4 0v9h2V8h-2Z"/>
          </svg>
          <span class="sr-only">Delete invoice</span>
        </button>

        <button v-if="storeForm.id && isPublished"
                type="button"
                class="text-orange-400 bg-transparent hover:bg-orange-200 hover:text-orange-900 rounded-lg text-sm p-1.5 items-center dark:hover:bg-orange-600 dark:hover:text-white"
                @click="onArchive">
          <general-spinner-loading v-if="storeForm.isLoadingArchive" class="inline" loading-color="fill-primary-200"/>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M5 21q-.825 0-1.413-.588T3 19V6.5q0-.375.125-.675t.325-.575l1.4-1.7q.2-.275.5-.413T6 3h12q.35 0 .65.137t.5.413l1.4 1.7q.2.275.325.575T21 6.5V19q0 .825-.588 1.413T19 21H5Zm.4-15h13.2l-.85-1H6.25L5.4 6ZM12 18l4-4l-1.4-1.4l-1.6 1.6V10h-2v4.2l-1.6-1.6L8 14l4 4Z"/>
          </svg>
          <span class="sr-only">Archive invoice</span>
        </button>
      </div>
    </template>

    <template #body>
      <form @submit.prevent="onSubmit">
        <div class="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label for="number"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number</label>
            <input
                :readonly="isPublished"
                type="text" name="number" id="number"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type invoice number" required readonly
                :value="storeForm.number"
                @input="storeForm.setNumber($event.target.value)">
          </div>

          <div>
            <label for="client"
                   class="required-field block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client</label>
            <select
                :disabled="isPublished"
                v-model="client"
                class="flex-shrink-0 z-10 inline-flex w-full py-2.5 px-4 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
              <option :value="null">Please select the client</option>
              <option v-for="client in storeClients.listClient" :key="client.$id" :value="client">
                {{ client.name }}
              </option>
            </select>
          </div>
          <div>
            <label for="due_date"
                   class="required-field block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
            <vue-date-picker
                v-model="storeForm.due_date" format="dd/MM/yyyy" :model-value="dueDate" :min-date="minDate"
                :max-date="maxDate"
                prevent-min-max-navigation @change="storeForm.setDueDate($event)"/>
          </div>
          <div>
            <label for="description"
                   class="required-field block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea
                :readonly="isPublished"
                name="description" id="description" rows="3"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type invoice description" required
                :value="storeForm.description"
                @input="storeForm.setDescription($event.target.value)"></textarea>
          </div>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Type
              </th>
              <th scope="col" class="px-6 py-3">
                Qty
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Tax
              </th>
              <th scope="col" class="px-6 py-3">
                Sub Total
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) of storeForm.items"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <div class="flex">
                  <input
                      :readonly="isPublished"
                      type="text" id="name" aria-describedby="helper-text-explanation"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="name of item" :value="item.name"
                      @input="storeForm.setItemName(index, $event.target.value)"/>
                </div>
              </td>
              <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <select
                    :disabled="isPublished"
                    id="rates_type" :value="item.rates_type"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    @change="storeForm.setRatesType(index, $event.target.value)">
                  <option value="fixed">Fixed</option>
                  <option value="hourly">Hourly</option>
                </select>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <button
                      v-if="!isPublished"
                      class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                      @click="storeForm.decreaseItemQuantity(index)">
                    <span class="sr-only">Quantity button</span>
                    <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                  </button>
                  <div>
                    <input type="number"
                           readonly
                           class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                           :value="item.quantity" required>
                  </div>
                  <button
                      v-if="!isPublished"
                      class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                      @click="storeForm.increaseItemQuantity(index)">
                    <span class="sr-only">Quantity button</span>
                    <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </td>
              <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <input
                    :readonly="isPublished"
                    type="number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="price of item" :value="item.price"
                    @input="storeForm.setItemPrice(index, $event.target.value)"/>
              </td>
              <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <div class="flex">
                  <input
                      :readonly="isPublished"
                      type="number"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="vat of item" :value="item.vat"
                      :min="0"
                      :max="100"
                      @input="storeForm.setItemTax(index, $event.target.value)"/>
                  <span
                      class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  %
                </span>
                </div>
              </td>
              <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <!-- use filter toCurrency on nuxt 3 -->
                {{ formatIDR(item.subtotal) }}
              </td>
              <td v-if="!isPublished" class="px-6 py-4">
                <button type="button" class="font-medium text-red-600 dark:text-red-500 hover:underline"
                        @click="storeForm.removeItem(index)">Remove
                </button>
              </td>
            </tr>
            <tr>
              <td colspan="7" class="p-2">
                <button
                    v-if="!isPublished"
                    type="button"
                    class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-primary border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
                    @click="storeForm.addItem({
                      name: '',
                      rates_type: 'fixed',
                      price: 0,
                      vat: activeMerchantTax * 100,
                      quantity: 0,
                      subtotal: 0
                    })"
                >
                  <svg class="w-4 h-4 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 4v16m8-8H4"></path>
                  </svg>
                  <span>Add Product</span>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div v-if="storeForm.isLoadingSubmit || storeForm.isLoadingPublish" class="flex justify-center h-24">
          <general-spinner-loading class="mt-auto"/>
        </div>

        <div v-else class="h-24">
          <general-button v-if="isVisibleAction" :is-loading="storeForm.isLoadingSubmit"
                          :disabled="!storeForm.isFormValid" type="submit"
                          class="mt-4">
            {{ storeForm.id ? 'Save' : 'Draft' }}
          </general-button>
          <general-button v-if="isVisibleAction" outlined :is-loading="storeForm.isLoadingPublish"
                          :disabled="!storeForm.isFormValid" type="button"
                          class="mt-4"
                          @click="onSubmitPublish">
            {{ storeForm.id ? 'Publish' : 'Create & Publish' }}
          </general-button>
        </div>
      </form>
    </template>
  </general-modal>
</template>

<script setup lang="ts">
import {initDropdowns} from "flowbite";
import {useFormInvoice} from '~/stores/invoice/form';
import {useFetchInvoice} from "~/stores/invoice";
import {useFetchClient} from "~/stores/client";
import {Client} from "~/types/client";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {formatIDR} from "~/utils/functions";
import {useActiveMerchant} from "~/stores/merchant/active-merchant";


const storeForm = useFormInvoice()
const storeFetch = useFetchInvoice()
const storeClients = useFetchClient()

onMounted(() => {
  initDropdowns()

  storeClients.fetchClients()
})

const emit = defineEmits(['form-opened', 'form-closed'])

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true
  },
})

const activeMerchantName = computed(() => {
  return useActiveMerchant().merchant?.name
})

const activeMerchantTax = computed(() => {
  return useActiveMerchant().merchant?.vat
})

const minDate = computed(() => {
  return new Date()
})

const maxDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 30)
  return date
})

const dueDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 3)
  return date
})


// computed with setter and getter
const client = computed({
  get(): any {
    return storeForm.client
  },
  set(value: Client) {
    storeForm.setClient(value)
  }
})

const isVisibleAction = computed(() => {
  return storeForm.isLoadingSubmit || !storeForm.published_at
})

const isPublished = computed(() => {
  return storeForm.published_at
})

const onModalOpened = () => {
  const merchant = useActiveMerchant().merchant
  const latestInvoiceNumber = merchant?.latest_invoice_number
  storeForm.setMerchantId(merchant?.$id ?? '')

  if (!storeForm.id) {
    storeForm.setClient(null)
    storeForm.setNumber(latestInvoiceNumber)
    storeForm.setDueDate(dueDate.value)
  } else {
    storeFetch.fetchInvoiceItems(storeForm.id).then(() => {
      for (const item of storeFetch.listInvoiceItem) {

        storeForm.addItem({
          id: item.$id,
          name: item.name,
          rates_type: item.rates_type,
          price: item.price,
          vat: item.vat * 100,
          quantity: item.quantity,
          subtotal: item.subtotal
        })
      }
    })
  }
}

async function onSubmit() {
  if (storeForm.id) {
    await storeForm.onSubmitUpdate()
  } else {
    await storeForm.onSubmitCreate()
  }

  emit('form-closed')

  await storeFetch.fetchInvoices()
}

async function onSubmitPublish() {
  if (storeForm.id) {
    await storeForm.onSubmitPublish()
  } else {
    await storeForm.onSubmitCreate()
    await storeForm.onSubmitPublish()
  }

  emit('form-closed')

  await storeFetch.fetchInvoices()
}

async function onDelete() {
  await storeForm.onSubmitDelete()

  emit('form-closed')

  await storeFetch.fetchInvoices()
}

async function onArchive() {
  await storeForm.onArchiveInvoice()

  emit('form-closed')

  await storeFetch.fetchInvoices()
}


</script>
