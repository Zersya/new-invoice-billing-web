<template>
  <form-invoice :is-modal-open="isModalFormInvoiceOpen" @form-closed="isModalFormInvoiceOpen = false"/>
  <div class="w-full">
    <div class="flex justify-between">
      <div class="pb-4 bg-white dark:bg-gray-900">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"></path>
            </svg>
          </div>
          <input v-model="searchKey" type="text" id="table-search"
                 class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="Search for items"
                 @change="searchInvoice">
        </div>
      </div>

      <div class="flex pb-4">
        <general-button class="ml-4" label="Add Invoice"
                        @click="isModalFormInvoiceOpen = true">
          <div class="flex">
            <svg class="w-5 h-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                 stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span class="ml-2">Add Invoice</span>
          </div>
        </general-button>
      </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="p-4">
          <div class="flex items-center">
            <input id="checkbox-all-search" type="checkbox"
                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="checkbox-all-search" class="sr-only">checkbox</label>
          </div>
        </th>
        <th scope="col" class="px-6 py-3">
          Invoice Number
        </th>
        <th scope="col" class="px-6 py-3">
          Client
        </th>
        <th scope="col" class="px-6 py-3">
          Action
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="invoice in storeFetch.listInvoice"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td class="w-4 p-4">
          <div class="flex items-center">
            <input id="checkbox-table-search-1" type="checkbox"
                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
          </div>
        </td>
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ invoice.number }}
        </th>
        <td class="px-6 py-4">
          {{ invoice.client_name }}
        </td>
        <td class="px-6 py-4">
          <span @click="selectInvoice(invoice)"
                class="hover:cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {useFetchInvoice} from "~/stores/invoice";
import {useFormInvoice} from "~/stores/invoice/form";
import {Invoice} from "~/types/invoice";
import {useFetchClient} from "~/stores/client";

const storeFetch = useFetchInvoice()
const storeForm = useFormInvoice()

const isModalFormInvoiceOpen = ref(false)
const searchKey = ref('')

definePageMeta({
  title: "InvoicesPage",
  layout: "authenticated",
  middleware: ["is-user"],
});


onMounted(() => {
  storeFetch.fetchInvoices()
})


async function selectInvoice(invoice: Invoice) {
  storeForm.setInvoice(invoice)

  const client = await useFetchClient().fetchClientById(invoice.client_id)
  storeForm.setClient(client)
  isModalFormInvoiceOpen.value = true
}

function searchInvoice() {
  storeFetch.fetchInvoices(searchKey.value)
}

</script>

<style scoped>

</style>