<template>
  <h1>Hello Dashboard</h1>
  <Button :is-loading="isLoading" @click="signOut">Signout</Button>
  <a class="mt-4" href="/login">Login</a>
</template>

<script setup lang="ts">

import Button from "~/components/general/Button.vue";
import api from "~/api";

definePageMeta({
  title: "DashboardPage",
  layout: "authenticated",
  middleware: ["is-user"],
});

const isLoading = ref(false)

const signOut = async () => {
  isLoading.value = true
  await api.provider().account.deleteSession('current')
  isLoading.value = false
  navigateTo('/login')
};

</script>
