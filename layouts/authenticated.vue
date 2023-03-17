<template>
  <ClientOnly>
    <Toast/>

    <div class="flex">
      <Sidebar/>
      <div class="p-4 w-full">
        <slot />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import Toast from "~/components/general/Toast.vue";
import InvingLoading from "~/components/general/InvingLoading.vue";
import {usePageTitle, useRootLoading} from "~/composables/states";
import Sidebar from "~/components/Sidebar.vue";

defineNuxtComponent({
  name: "AuthenticationLayout",

})

const pageTitle = usePageTitle()
const rootLoading = useRootLoading();

</script>
