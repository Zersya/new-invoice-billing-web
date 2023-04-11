<template>
  <form-client :is-modal-open="isModalFormClientOpen" @form-closed="isModalFormClientOpen = false"/>
  <form-client-tags :is-modal-open="isModalFormClientTagsOpen" :selected-tag-client="selectedTagClient" @form-closed="isModalFormClientTagsOpen = false"/>
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
                 @change="searchClient">
        </div>
      </div>

      <div class="flex pb-4">
        <general-button class="ml-4" label="Add Client" @click="isModalFormClientOpen = true">
          <div class="flex">
            <svg class="w-5 h-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                 stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span class="ml-2">Add Client</span>
          </div>
        </general-button>
      </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          Name
        </th>
        <th scope="col" class="px-6 py-3">
          Email
        </th>
        <th scope="col" class="px-6 py-3">
          Tags <span class="w-16 w-16 text-gray-400 dark:text-gray-300">
          <button
              data-tooltip-target="tooltip-tags">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.713T12 11q-.425 0-.713.288T11 12v4q0 .425.288.713T12 17Zm0-8q.425 0 .713-.288T13 8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8q0 .425.288.713T12 9Zm0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
              />
            </svg>
          </button>
          <div id="tooltip-tags" role="tooltip"
               class="lowercase absolute z-10 invisible inline-block px-3 py-2 text-sm text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Tags are used to group clients together
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </span>
        </th>
        <th scope="col" class="px-6 py-3">
          Verified
        </th>
        <th scope="col" class="px-6 py-3">
          Action
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="client in storeFetch.listClient"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ client.name }}
        </th>
        <td class="px-6 py-4">
          {{ client.email }}
        </td>
        <td class="px-6 py-4">
          <span v-for="tag in client.tags"
                class="ml-2 hover:cursor-pointer font-medium hover:text-blue-600 hover:dark:text-blue-500 hover:hover:underline"
                @click="isModalFormClientTagsOpen = true; storeForm.setClient(client); selectedTagClient = tag">{{
              tag
            }},</span> <span
            class="ml-2 hover:cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
            @click="isModalFormClientTagsOpen = true; storeForm.setClient(client)">Add Tags..</span>
        </td>
        <td class="px-6 py-4">
          <span
              class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm dark:bg-green-700 dark:text-green-100">
            {{ client.verified_at ? 'Yes' : 'No' }}
          </span>
        </td>
        <td class="px-6 py-4">
          <span @click="selectClient(client)"
                class="hover:cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">

import {useFetchClient} from "~/stores/client";
import {Client} from "~/types/client";
import {useFormClient} from "~/stores/client/form";
import {initTooltips} from "flowbite";

const storeFetch = useFetchClient()
const storeForm = useFormClient()

const isModalFormClientOpen = ref(false)
const isModalFormClientTagsOpen = ref(false)
const searchKey = ref('')
const selectedTagClient = ref('')

definePageMeta({
  title: "ClientsPage",
  layout: "authenticated",
  middleware: ["is-user"],
});

onMounted(() => {
  initTooltips()
  storeFetch.fetchClients()
})

function selectClient(client: Client) {
  storeForm.setClient(client)
  isModalFormClientOpen.value = true
}

function searchClient() {
  storeFetch.fetchClients(searchKey.value)
}
</script>
