<template>
    <FormLogin/>
</template>

<script setup lang="ts">

definePageMeta({
  title: "LoginPage",
  layout: 'unauthenticated',
  middleware: ['is-guest']
});
</script>
