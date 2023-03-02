<template>
  <ClientOnly>
    <Toast/>

    <div class="flex flex-col justify-center">
      <div class="sm:ml-64">
        <h2 class="m-4 text-2xl font-bold text-gray-900 dark:text-gray-50">
          {{ pageTitle }}
        </h2>
      </div>
      <slot/>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import Toast from "~/components/general/Toast.vue";
import InvingLoading from "~/components/general/InvingLoading.vue";
import {usePageTitle, useRootLoading} from "~/composables/states";

defineNuxtComponent({
  name: "AuthenticationLayout",

})

const pageTitle = usePageTitle()
const rootLoading = useRootLoading();

</script>
