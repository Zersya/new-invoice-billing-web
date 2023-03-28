<template>
  <ClientOnly>
    <Toast/>

    <div class="flex">
      <Sidebar/>
      <div v-if="!useFetchMerchant().isLoadingFetch" class="p-4 w-full">
        <slot />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import Toast from "~/components/general/Toast.vue";
import Sidebar from "~/components/Sidebar.vue";
import {useFetchMerchant} from "~/stores/merchant";

defineNuxtComponent({
  name: "AuthenticationLayout",
})

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Inving` : 'Inving';
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'Automate Your Invoice Billing with Our Recurring Payment and Notification System Integration' },
    { name: 'format-detection', content: 'telephone=no' }
  ],
})

</script>
