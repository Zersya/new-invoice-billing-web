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

const rootLoading = useRootLoading();
</script>
