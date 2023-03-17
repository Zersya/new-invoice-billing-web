<template>
  <div class="flex-col w-full m-4">
    <h1>Hello Dashboard</h1>
    <general-button :is-loading="isLoading" @click="signOut">Signout</general-button>
    <a class="mt-4" href="/login">Login</a>
  </div>
</template>

<script setup lang="ts">

import api from "~/services/api";

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
