<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div v-if="userVerifyEmail.isVerified"
         class="flex flex-col items-center justify-center w-full max-w-md p-4 space-y-4 text-center">
      <div class="flex items-center justify-center w-16 h-16 rounded-full bg-primary-100">
        <svg class="w-8 h-8 text-white" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
             viewBox="0 0 24 24" stroke="currentColor">
          <path
              d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Your account has been verified</h1>
      <p class="text-gray-600 dark:text-gray-400">To continue please go to dashboard.</p>
      <nuxt-link to="/dashboard"
                 class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 transform bg-primary-600 rounded-md hover:bg-primary-500 focus:outline-none focus:bg-primary-500">
        Dashboard
      </nuxt-link>
    </div>
    <div v-else-if="userVerifyEmail.isLoading"
         class="flex items-center justify-center w-16 h-16 rounded-full bg-primary-100">
      <!-- loading circular indicator -->
      <div class="flex flex-col items-center justify-center space-y-2">
        <svg class="w-8 h-8 text-white animate-spin" fill="none" stroke-linecap="round" stroke-linejoin="round"
             stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </div>
    </div>

    <div v-else-if="userVerifyEmail.isExpired"
         class="flex flex-col items-center justify-center w-full max-w-md p-4 space-y-4 text-center">
      <div class="flex items-center justify-center w-16 h-16 rounded-full bg-primary-100">
        <svg class="w-8 h-8 text-white" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
             viewBox="0 0 24 24" stroke="currentColor">
          <path d="M20 20L4 4m16 0L4 20"></path>
        </svg>
      </div>
      <h1 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Your verification email is expired</h1>
      <p class="text-gray-600 dark:text-gray-400">To continue please go to dashboard.</p>
      <nuxt-link to="/dashboard"
                 class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 transform bg-primary-600 rounded-md hover:bg-primary-500 focus:outline-none focus:bg-primary-500">
        Dashboard
      </nuxt-link>
    </div>

    <div v-else-if="userVerifyEmail.isError"
         class="flex flex-col items-center justify-center w-full max-w-md p-4 space-y-4 text-center">
      <div class="flex items-center justify-center w-16 h-16 rounded-full bg-primary-100">
        <svg class="w-8 h-8 text-white" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
             viewBox="0 0 24 24" stroke="currentColor">
          <path d="M20 20L4 4m16 0L4 20"></path>
        </svg>
      </div>
      <h1 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Unable to Verify Email</h1>
      <p class="text-gray-600 dark:text-gray-400">To continue please go to dashboard.</p>
      <nuxt-link to="/dashboard"
                 class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 transform bg-primary-600 rounded-md hover:bg-primary-500 focus:outline-none focus:bg-primary-500">
        Dashboard
      </nuxt-link>

    </div>


  </div>
</template>

<script setup lang="ts">
import {useUserVerifyEmail} from "~/stores/user/verify-email";

definePageMeta({
  title: "VerifyEmailPage",
  middleware: ['is-user']
});

const userVerifyEmail = useUserVerifyEmail();

onMounted(() => {

  // userVerifyEmail.onAcceptVerify();

})

</script>
