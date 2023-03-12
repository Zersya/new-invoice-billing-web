<template>
  <div id="form-modal-merchant" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true"
       class="animate-fade-in absolute hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <!-- Modal header -->
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <div class="flex items-center gap-x-2">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ storeForm.id ? 'Edit Merchant' : 'Add Merchant' }}
            </h3>
            <button v-if="storeForm.id"
                    type="button"
                    class="text-red-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
                    @click="onDelete">
              <SpinnerLoading v-if="storeForm.isLoadingDelete" class="inline" loading-color="fill-primary-200"/>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9M7 6h10v13H7V6m2 2v9h2V8H9m4 0v9h2V8h-2Z"/>
              </svg>
              <span class="sr-only">Delete merchant</span>
            </button>
          </div>
          <button type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  @click="onCloseModal">
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
          <Button  :is-loading="storeForm.isLoadingSubmit" :disabled="!storeForm.isFormValid" type="submit">
            {{ storeForm.id ? 'Update' : 'Create' }}
          </Button>
          <Button v-if="storeForm.id" :outlined="true" type="button" class="mt-4" @click="setActiveMerchant" >
            Set as Active Merchant
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/general/Button.vue"
import SpinnerLoading from "~/components/general/SpinnerLoading.vue"
import {Dropdown, initDropdowns} from "flowbite";
import type {ModalInterface} from "flowbite";
import {useFormMerchant} from '~/stores/merchant/form';
import {useFetchMerchant} from "~/stores/merchant";
import {Ref} from "vue";

const storeForm = useFormMerchant()
const storeFetch = useFetchMerchant()
let modal: Ref<ModalInterface | null> = ref(null)

onMounted(() => {
  initDropdowns()

  modal = inject('modal-form-merchant', {} as Ref<ModalInterface | null>)
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

function onCloseModal() {
  modal.value?.hide()
}

async function onSubmit() {
  if (storeForm.id) {
    await storeForm.onSubmitUpdate()
  } else {
    await storeForm.onSubmitCreate()
  }

  modal.value?.hide()

  await storeFetch.fetchMerchants()
}

async function onDelete() {
  await storeForm.onSubmitDelete()

  modal.value?.hide()

  await storeFetch.fetchMerchants()
}

function setActiveMerchant() {
  const merchant = storeFetch.listMerchant.find((merchant) => merchant.$id === storeForm.id)

  if (merchant) {
    storeFetch.setActiveMerchant(merchant)

    modal.value?.hide()


  }
}
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
