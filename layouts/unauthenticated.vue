<template>
  <Toast message="Hello World!"/>

  <div class="flex flex-col h-screen justify-center">
    <slot/>
  </div>
</template>


<script setup lang="ts">
import {usePageTitle} from "~/composables/states";
import Toast from "~/components/general/Toast.vue";

defineNuxtComponent({
  name: "UnAuthenticationLayout",
})

const pageTitle = usePageTitle()

</script>
