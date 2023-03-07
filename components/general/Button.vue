<template>
  <button :type="props.type"
          :disabled="props.disabled || props.isLoading"
          :class="buttonClass()" @click.prevent="$emit('click')">
    <SpinnerLoading v-if="props.isLoading" class="inline" loading-color="fill-primary-200" />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import SpinnerLoading from "~/components/general/SpinnerLoading.vue";

const props = defineProps({
  type: {
    type: String,
    default: 'submit'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const buttonClass = () => {
  return props.disabled ? 'w-full text-white bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-400' : 'w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
}
</script>
