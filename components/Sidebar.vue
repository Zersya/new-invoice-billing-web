<template>
  <FormMerchant/>

  <div
      class="shadow-xl top-0 left-0 z-40 w-16 h-screen hover:w-96 transition-all ease-in-out -translate-x-full sm:translate-x-0">
    <div class="px-3 py-4 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <div class="flex justify-between items-center mb-5">
        <a href="https://app.inving.co/" class="flex">
          <img class="w-10" src="/logo-inving.png" alt="Inving Logo"/>
          <span class="ml-4 text-lg font-semibold text-gray-800 dark:text-gray-200 md:block">Inving</span>
        </a>
        <!-- button signout -->
        <button @click="signOut" type="button"
                class="hover:cursor-pointer h-10 my-3 flex justify-center items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg v-if="!isLoadingSignout" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M16 17v-3H9v-4h7V7l5 5l-5 5M14 2a2 2 0 0 1 2 2v2h-2V4H5v16h9v-2h2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9Z"/>
          </svg>

          <SpinnerLoading v-else class="inline" loading-color="fill-primary-200"/>
        </button>
      </div>
      <div class="border-t border-gray-200 dark:border-gray-700"/>
      <ul class="space-y-2">
        <li v-for="merchant in store.listMerchant" :key="merchant.$id">
          <button type="button" @click="selectMerchant(merchant)"
                  class="w-full hover:cursor-pointer h-10 my-3 flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <span
                class="flex items-center justify-center w-4 h-4 p-3 text-sm  font-semibold text-white bg-gray-500 rounded-full">
              {{ merchant.name.charAt(0) }}
            </span>
            <span
                class="ml-5 w-32 text-sm text-left font-semibold text-gray-800 dark:text-gray-200 md:block">{{
                merchant.name
              }}</span>
          </button>
        </li>
        <li>
          <button @click="modal?.toggle()" type="button"
                  class="group w-full hover:cursor-pointer h-10 my-3 flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <div class="flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                   class="group-hover:animate-spin-once">
                <path fill="currentColor"
                      d="M12 17q.425 0 .713-.288T13 16v-3h3.025q.425 0 .7-.288T17 12q0-.425-.288-.713T16 11h-3V7.975q0-.425-.288-.7T12 7q-.425 0-.713.288T11 8v3H7.975q-.425 0-.7.288T7 12q0 .425.288.713T8 13h3v3.025q0 .425.288.7T12 17Zm0 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-10Zm0 8q3.325 0 5.663-2.337T20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.337T4 12q0 3.325 2.337 5.663T12 20Z"/>
              </svg>
              <span class="ml-5 w-32 text-sm text-left font-semibold text-gray-800 dark:text-gray-200 md:block">Create Merchant</span>
            </div>
          </button>
        </li>
      </ul>
      <ul class="space-y-2 border-t border-gray-200 dark:border-gray-700">
        <li>
          <button type="button"
                  class="w-full hover:cursor-pointer h-10 my-3 flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M13 3v6h8V3m-8 18h8V11h-8M3 21h8v-6H3m0-2h8V3H3v10Z"/>
              </svg>
              <span
                  class="ml-5 w-32 text-sm text-left font-semibold text-gray-800 dark:text-gray-200 md:block">Dashboard</span>
            </div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import SpinnerLoading from "~/components/general/SpinnerLoading.vue";
import {useFetchMerchant} from '~/stores/merchant';
import {Modal} from "flowbite";
import type {ModalInterface} from "flowbite";
import {provide} from "#imports";
import {useFormMerchant} from "~/stores/merchant/form";
import {Merchant} from "~/types/merchant";
import api from "~/api";
import {navigateTo} from "#app";
import FormMerchant from "~/components/FormMerchant.vue";

const store = useFetchMerchant()
const isLoadingSignout = ref(false)

let modal = ref<ModalInterface | null>(null)
provide('modal-form-merchant', modal)

onMounted(() => {
  store.fetchMerchants()

  const $modal = document.getElementById('form-modal-merchant')
  modal.value = new Modal($modal, {
    backdrop: 'dynamic',
    backdropClasses: 'animate-fade-in bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: false,
    onHide: () => {
      useFormMerchant().reset()
    }
  })

})

function selectMerchant(merchant: Merchant) {
  useFormMerchant().setMerchant(merchant)

  modal.value?.toggle()
}

function signOut() {
  isLoadingSignout.value = true
  api.deleteCurrentSession().then(() => {
    isLoadingSignout.value = false
    navigateTo('/login')
  })
}

</script>
