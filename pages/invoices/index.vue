<template>
Hello
</template>

<script setup lang="ts">


definePageMeta({
  title: "InvoicesPage",
  layout: "authenticated",
  middleware: ["is-user"],
});


</script>

<style scoped>

</style>
