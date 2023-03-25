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

</script>
