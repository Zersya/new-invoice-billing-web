<template>
  <general-modal :is-modal-open="isModalOpen"
                 :extra-large="true"
                 name="form-merchant"
                 :title="storeForm.id ? 'Edit merchant' : 'Add merchant'"
                 @modal-opened="$emit('form-opened')" @modal-closed="$emit('form-closed'); storeForm.reset()">
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
        <span class="sr-only">Delete merchant</span>
      </button>
    </template>

    <template #body>
      <form @submit.prevent="onSubmit">
        <div class="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label for="name"
                   class="required-field block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" name="name" id="name"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                   placeholder="Type merchant name" required
                   :value="storeForm.name"
                   @input="storeForm.setName($event.target.value)">
          </div>
          <div>
            <label for="description"
                   class="required-field block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <input type="text" name="description" id="description"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                   placeholder="Type merchant description" required
                   :value="storeForm.description"
                   @input="storeForm.setDescription($event.target.value)">
          </div>
          <div>
            <label for="address"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
            <textarea type="text" name="address" id="address"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Merchant address"
                      :value="storeForm.address"
                      @input="storeForm.setAddress($event.target.value)"/>
          </div>
          <div>

            <label for="phone"
                   class="required-field block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
            <div class="flex">
              <button id="phone-country-btn" data-dropdown-toggle="dropdown-phone-country"
                      class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                      type="button">
                +{{ storeForm.phoneCountry }}
                <svg aria-hidden="true" class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
              </button>
              <div id="dropdown-phone-country"
                   class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="phone-country-btn">

                  <li v-for="code in countryCodes" :key="code.code">
                    <button type="button"
                            class="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                            data-dropdown-value="dropdown-phone-country" :value="storeForm.phoneCountry"
                            @click="setCountryCode(code.code)">
                      <span>{{ code.name }}</span>
                      <span class="text-gray-500 dark:text-gray-400">+{{ code.code }}</span>
                    </button>
                  </li>
                </ul>
              </div>
              <input type="text" name="phone" id="phone"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     placeholder="Type merchant phone" required
                     :value="storeForm.phone"
                     @input="storeForm.setPhone($event.target.value)">
            </div>
          </div>
          <div class="w-32">
            <label for="tax" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tax</label>
            <div class="flex">
              <input type="number" name="tax" id="tax"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     placeholder="0"
                     :min="0"
                     :max="100"
                     :value="storeForm.tax"
                     @input="storeForm.setTax($event.target.value)">
              <span
                  class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  %
                </span>
            </div>
          </div>
        </div>
        <general-button :is-loading="storeForm.isLoadingSubmit" :disabled="!storeForm.isFormValid" type="submit"
                        class="mt-4">
          {{ storeForm.id ? 'Update' : 'Create' }}
        </general-button>
        <general-button v-if="storeForm.id" :outlined="true" type="button" class="mt-4" @click="setActiveMerchant">
          Set as Active Merchant
        </general-button>
      </form>
    </template>
  </general-modal>
</template>

<script setup lang="ts">
import {Dropdown, initDropdowns} from "flowbite";
import {useFormMerchant} from '~/stores/merchant/form';
import {useFetchMerchant} from "~/stores/merchant";

const storeForm = useFormMerchant()
const storeFetch = useFetchMerchant()

onMounted(() => {
  initDropdowns()
})

const emit = defineEmits(['form-opened', 'form-closed'])

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true
  },
})

const countryCodes = [
  {name: 'Indonesia', code: '62'},
  {name: 'Malaysia', code: '60'},
  {name: 'Singapore', code: '65'},
  {name: 'Thailand', code: '66'},
  {name: 'Vietnam', code: '84'},
  {name: 'Philippines', code: '63'},
]

const setCountryCode = (code: string) => {
  storeForm.setPhoneCountry(code)

  const $dropdown = document.getElementById('dropdown-phone-country')
  const $triggerDropdown = document.getElementById('phone-country-btn')

  if ($dropdown) {
    const dropdown = new Dropdown($dropdown, $triggerDropdown)
    dropdown.hide()
  }
}

async function onSubmit() {
  if (storeForm.id) {
    await storeForm.onSubmitUpdate()

    await storeFetch.fetchMerchants()
  } else {
    const merchantId = await storeForm.onSubmitCreate()

    await storeFetch.fetchMerchants()

    const merchant = storeFetch.listMerchant.find((merchant) => merchant.$id === merchantId)

    if (merchant)
      storeFetch.setActiveMerchant(merchant, true)
  }

  emit('form-closed')

}

async function onDelete() {
  await storeForm.onSubmitDelete()
  await storeFetch.fetchMerchants()


  if (storeForm.id === storeFetch.activeMerchant?.$id) {
    if (storeFetch.listMerchant.length > 0) {
      storeFetch.setActiveMerchant(storeFetch.listMerchant[0])
    } else if (storeFetch.listMerchant.length === 0) {
      storeFetch.setActiveMerchant(null)
      navigateTo('/dashboard')
    }
  }

  emit('form-closed')

}

function setActiveMerchant() {
  const merchant = storeFetch.listMerchant.find((merchant) => merchant.$id === storeForm.id)

  if (merchant) {
    storeFetch.setActiveMerchant(merchant)

    emit('form-closed')
  }
}
</script>
