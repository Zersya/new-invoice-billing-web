<template>
  <Sidebar/>

  <div class="flex flex-col justify-center">
    <div class="sm:ml-64">
      <h2 class="m-4 text-2xl font-bold text-gray-900 dark:text-gray-50">
        {{ pageTitle }}
      </h2>
    </div>
    <slot/>
  </div>
</template>

<script setup lang="ts">
import {usePageTitle} from "~/composables/states";
import Toast from "~/components/general/Toast.vue";

defineNuxtComponent({
  name: "AuthenticationLayout",
})

const pageTitle = usePageTitle()

</script>
