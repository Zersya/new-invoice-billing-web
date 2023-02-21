<script setup>
import { Client } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://appwrite.inving.co/v1')
    .setProject('63e42f5dae8447d7350b');
</script>

<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
