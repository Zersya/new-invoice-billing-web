<template>
  <ClientOnly>
    <Toast/>

    <div class="flex flex-col h-screen justify-center">
      <slot/>
    </div>
  </ClientOnly>
</template>


<script setup lang="ts">
import Toast from "~/components/general/Toast.vue";
import {useRootLoading} from "../composables/states";
import InvingLoading from "~/components/general/InvingLoading.vue";

defineNuxtComponent({
  name: "UnAuthenticationLayout",
})

useHead({
  titleTemplate: '%s - Invoice and Billing System',
  title: 'Welcome to Inving',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'Automate Your Invoice Billing with Our Recurring Payment and Notification System Integration' },
    { name: 'format-detection', content: 'telephone=no' }
  ],
})
</script>
