<template>
  <form-merchant :is-modal-open="isModalFormMerchantOpen" @form-closed="isModalFormMerchantOpen = false"/>
  <div
      :class="[`shadow-xl top-0 z-40 left-0 w-16 h-screen transition-all ease-in-out -translate-x-full sm:translate-x-0 hover:w-96`, `${isSidebarOpen ? 'w-96': ''}`]">
    <div class="px-3 py-4 h-full overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-800">
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

          <general-spinner-loading v-else class="inline" loading-color="fill-primary-200"/>
        </button>
      </div>
      <div class="border-t border-gray-200 dark:border-gray-700"/>
      <ul class="space-y-2">
        <li>
          <nuxt-link type="button"
                     to="/dashboard"
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
          </nuxt-link>
        </li>
        <div class="border-t border-gray-200 dark:border-gray-700"/>

        <li v-for="merchant in storeFetch.listMerchant" :key="merchant.$id">
          <button type="button" @click="selectMerchant(merchant)"
                  :class="`w-full hover:cursor-pointer h-10 my-3 flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${merchant.$id === storeFetch.activeMerchant?.$id ? 'bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700': 'hover:bg-gray-100 dark:hover:bg-gray-700'}`">
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
          <button type="button"
                  @click="isModalFormMerchantOpen = true"
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
          <nuxt-link type="button"
                     to="/clients"
                     active-class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
                     :class="[`${!storeFetch.activeMerchant ? 'pointer-events-none text-gray-300': ''}`, 'w-full hover:cursor-pointer h-10 my-3 flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700']">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.536 5.536 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13v-1.75M0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20H0m24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9V20Z"/>
              </svg>
              <span
                  class="ml-5 w-32 text-sm text-left font-semibold dark:text-gray-200 md:block">Clients</span>
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link type="button"
                     to="/invoices"
                     active-class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
                     :class="[`${!storeFetch.activeMerchant ? 'pointer-events-none text-gray-300': ''}` , 'w-full hover:cursor-pointer h-10 my-3 flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700']">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
                  <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2zM9 7h1m-1 6h6m-2 4h2"/>
                </g>
              </svg>
              <span
                  class="ml-5 w-32 text-sm text-left font-semibold dark:text-gray-200 md:block">Invoices</span>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <div :class="[`flex justify-end transition-all ease-in-out`]">
        <div class="flex fixed bottom-1 items-center mb-2">
          <span
              :class="`text-sm font-semibold text-gray-800 self-center ${isSidebarOpen ? 'hidden': 'mr-3'}`">Keep Open</span>
          <button type="button" :class="['p-2 bg-white shadow-inner']"
                  @click="toggleSidebar">

            <svg v-if="!isSidebarOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm5-2v16"/>
                <path d="m14 10l2 2l-2 2"/>
              </g>
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm5-2v16"/>
                <path d="m15 10l-2 2l2 2"/>
              </g>
            </svg>

          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useFetchMerchant} from '~/stores/merchant';
import {useFormMerchant} from "~/stores/merchant/form";
import {Merchant} from "~/types/merchant";
import api from "~/services/api";
import {navigateTo} from "#app";

const storeFetch = useFetchMerchant()
const storeForm = useFormMerchant()

const isModalFormMerchantOpen = ref(false)
const isLoadingSignout = ref(false)
const isSidebarOpen = ref(false)

onMounted(() => {
  storeFetch.fetchMerchants(true).then(() => {
    if (storeFetch.listMerchant.length === 0) {
      navigateTo('/dashboard')
    }
  })
})

const routeActiveClass = (route: string): string => {
  return useRoute().path === route ? 'bg-gray-100 dark:bg-gray-700' : ''
}

function selectMerchant(merchant: Merchant) {
  storeForm.setMerchant(merchant)
  isModalFormMerchantOpen.value = true
}

function signOut() {
  isLoadingSignout.value = true
  api.deleteCurrentSession().then(() => {
    isLoadingSignout.value = false
    navigateTo('/login')
  })
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

</script>
