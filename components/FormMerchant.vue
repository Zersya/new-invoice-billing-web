<template>
  <div id="form-modal-merchant" tabindex="-1" aria-hidden="true"
       class="absolute hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <!-- Modal header -->
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Add Merchant
          </h3>
          <button type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  @click="modal?.hide()">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form>
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label for="name"
                     class="required-field block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text" name="name" id="name"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     placeholder="Type merchant name" required
                     :value="store.name"
                     @input="store.setName($event.target.value)">
            </div>
            <div>
              <label for="description"
                     class="required-field block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
              <input type="text" name="description" id="description"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     placeholder="Type merchant description" required
                     :value="store.description"
                     @input="store.setDescription($event.target.value)">
            </div>
            <div>
              <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
              <textarea type="text" name="address" id="address"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Merchant address"
                        :value="store.address"
                        @input="store.setAddress($event.target.value)"/>
            </div>
            <div>

              <label for="phone"
                     class="required-field block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
              <div class="flex">
                <button id="phone-country-btn" data-dropdown-toggle="dropdown-phone-country"
                        class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                        type="button">
                  +{{ store.phoneCountry }}
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
                              data-dropdown-value="dropdown-phone-country" :value="store.phoneCountry"
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
                       :value="store.phone"
                       @input="store.setPhone($event.target.value)">
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
                       :value="store.tax"
                       @input="store.setTax($event.target.value)">
                <span
                    class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  %
                </span>
              </div>
            </div>
          </div>
          <Button :is-loading="store.isLoadingSubmit" :disabled="!store.isFormValid" @click="store.onSubmitCreate()">
            Add new Merchant
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/general/Button.vue"
import {Dropdown, initDropdowns} from "flowbite";
import type {ModalInterface} from "flowbite";
import {useCreateMerchant} from '~/stores/merchant/form';

const store = useCreateMerchant()
let modal: ModalInterface | null = null


onMounted(() => {
  initDropdowns()

  inject('modal-form-merchant', modal as ModalInterface)
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
  store.setPhoneCountry(code)

  const $dropdown = document.getElementById('dropdown-phone-country')
  const $triggerDropdown = document.getElementById('phone-country-btn')

  if ($dropdown) {
    const dropdown = new Dropdown($dropdown, $triggerDropdown)
    dropdown.hide()
  }
}
</script>
