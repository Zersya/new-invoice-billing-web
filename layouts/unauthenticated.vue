<template>
  <Toast/>

  <div class="flex flex-col h-screen justify-center">
    <InvingLoading v-show="rootLoading"/>
    <slot/>
  </div>
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
