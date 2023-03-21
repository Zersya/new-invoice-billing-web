<template>
  <general-modal :is-modal-open="isModalOpen"
                 :extra-large="true"
                 name="form-invoice"
                 :title="storeForm.id ? 'Edit invoice' : 'Add invoice'"
                 @modal-opened="$emit('form-opened'); onModalOpened()"
                 @modal-closed="$emit('form-closed'); storeForm.reset()">
    <template #additional-action>
      <button v-if="storeForm.id"
              type="button"
              class="text-red-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
              @click="onDelete">
        <general-spinner-loading v-if="storeForm.isLoadingDelete" class="inline" loading-color="fill-primary-200"/>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor"
                d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9M7 6h10v13H7V6m2 2v9h2V8H9m4 0v9h2V8h-2Z"/>
        </svg>
        <span class="sr-only">Delete invoice</span>
      </button>
    </template>

    <template #body>
      <form @submit.prevent="onSubmit">
        <div class="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label for="number"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number</label>
            <input type="text" name="number" id="number"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                   placeholder="Type invoice number" required readonly
                   :value="storeForm.number"
                   @input="storeForm.setNumber($event.target.value)">
          </div>

          <div>
            <label for="client"
                   class="required-field block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client</label>
            <div class="flex">
              <button id="client-btn" data-dropdown-toggle="dropdown-client"
                      class="flex-shrink-0 z-10 inline-flex w-full py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                      type="button">
                <div class="flex w-full">
                  {{ storeForm?.client?.name }}
                </div>
                <svg aria-hidden="true" class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
              </button>
              <div id="dropdown-client"
                   class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="phone-country-btn">
                  <li v-for="client in storeClients.listClient" :key="client.$id">
                    <button type="button"
                            class="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                            data-dropdown-value="dropdown-client" :value="client"
                            @click="setClient(client)">
                      <span>{{ client.name }}</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <general-button :is-loading="storeForm.isLoadingSubmit" :disabled="!storeForm.isFormValid" type="submit"
                        class="mt-4">
          {{ storeForm.id ? 'Update' : 'Create' }}
        </general-button>
      </form>
    </template>
  </general-modal>
</template>

<script setup lang="ts">
import {Dropdown, initDropdowns} from "flowbite";
import {useFormInvoice} from '~/stores/invoice/form';
import {useFetchInvoice} from "~/stores/invoice";
import {useFetchMerchant} from "~/stores/merchant";
import {useFetchClient} from "~/stores/client";
import {Ref} from "vue";
import {Client} from "~/types/client";

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


const setClient = (client: Client) => {
  storeForm.setClient(client)

  const $dropdown = document.getElementById('dropdown-client')
  const $triggerDropdown = document.getElementById('client-btn')

  if ($dropdown) {
    const dropdown = new Dropdown($dropdown, $triggerDropdown)
    dropdown.hide()
  }
}

const onModalOpened = () => {
  const latestInvoiceNumber = useFetchMerchant().activeMerchant?.latest_invoice_number
  storeForm.setNumber(latestInvoiceNumber)
  storeForm.setClient(null)
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

async function onDelete() {
  await storeForm.onSubmitDelete()

  emit('form-closed')

  await storeFetch.fetchInvoices()
}


</script>
