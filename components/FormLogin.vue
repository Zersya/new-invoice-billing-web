<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <NuxtLink to="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-12 mr-2" src="/logo-inving.png" alt="logo">
        Inving
      </NuxtLink>
      <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <InputField label="Email" name="email" type="email" placeholder="example@email.com" :value="store.email" required @input="store.setEmail($event)"  />
            <InputField label="Password" name="password" type="password" placeholder="*********" :value="store.password" required @input="store.setPassword($event)"  />
<!--            <div class="flex items-center justify-between">-->
<!--              <div class="flex items-start">-->
<!--                <div class="flex items-center h-5">-->
<!--                  <input id="remember" aria-describedby="remember" type="checkbox"-->
<!--                         class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"-->
<!--                         required="">-->
<!--                </div>-->
<!--                <div class="ml-3 text-sm">-->
<!--                  <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>-->
<!--                </div>-->
<!--              </div>-->
<!--              <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot-->
<!--                password?</a>-->
<!--            </div>-->
            <Button :is-loading="store.isLoading" :disabled="!store.isFormValid" @click="store.onSubmitLogin();">
              Sign in
            </Button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <NuxtLink to="/register"
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                up
              </NuxtLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {useLogin} from "~/stores/login";
import Button from "~/components/general/Button.vue"
import InputField from "~/components/general/InputField.vue";


const store = useLogin();
</script>
