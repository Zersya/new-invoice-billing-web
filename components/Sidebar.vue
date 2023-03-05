<template>
  <FormMerchant/>

  <div
      class="shadow-xl top-0 left-0 z-40 w-16 h-screen hover:w-64 transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar">
    <div class="px-3 py-4 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <a href="https://app.inving.co/" class="flex mb-5">
        <img class="w-10" src="/logo-inving.png" alt="Inving Logo"/>
        <span class="ml-4 text-lg font-semibold text-gray-800 dark:text-gray-200 md:block">Inving</span>
      </a>
      <div class="border-t border-gray-200 dark:border-gray-700"/>
      <ul class="space-y-2">
        <li v-for="merchant in store.listMerchant" :key="merchant.$id">
          <button type="button" data-modal-toggle="modal-merchant"
                  class="hover:cursor-pointer h-10 my-3 flex justify-center items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <span class="flex items-center justify-center w-4 h-4 p-3 text-lg font-semibold text-white bg-gray-500 rounded-full">
              {{ merchant.name.charAt(0) }}
            </span>
            <span class="ml-5 w-32 text-md text-left font-semibold text-gray-800 dark:text-gray-200 md:block">{{merchant.name}}</span>
          </button>
        </li>
        <li>
          <button type="button" data-modal-toggle="modal-merchant"
                  class="hover:cursor-pointer h-10 my-3 flex justify-center items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M12 17q.425 0 .713-.288T13 16v-3h3.025q.425 0 .7-.288T17 12q0-.425-.288-.713T16 11h-3V7.975q0-.425-.288-.7T12 7q-.425 0-.713.288T11 8v3H7.975q-.425 0-.7.288T7 12q0 .425.288.713T8 13h3v3.025q0 .425.288.7T12 17Zm0 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-10Zm0 8q3.325 0 5.663-2.337T20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.337T4 12q0 3.325 2.337 5.663T12 20Z"/>
              </svg>
            </div>
            <span class="ml-5 w-32 text-md text-left font-semibold text-gray-800 dark:text-gray-200 md:block">Create Merchant</span>
          </button>
        </li>
      </ul>
      <ul class="space-y-2 border-t border-gray-200 dark:border-gray-700">
        <li>
          <button class="flex my-3 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg aria-hidden="true"
                class="fl ex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <span class="ml-5 w-32 text-md text-left font-semibold text-gray-800 dark:text-gray-200 md:block">Dashboard</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchMerchant } from '../stores/merchant/index';

const store = useFetchMerchant()

onMounted(() => {
  store.fetchMerchants()
})

</script>
