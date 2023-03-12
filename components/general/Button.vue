<template>
  <button :type="props.type"
          :disabled="props.disabled || props.isLoading"
          :class="buttonClass()" @click="$emit('click')">
    <SpinnerLoading v-if="props.isLoading" class="inline" loading-color="fill-primary-200" />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import SpinnerLoading from "~/components/general/SpinnerLoading.vue";

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  outlined: {
    type: Boolean,
    default: false
  },
  class: {
    type: String,
    default: ''
  },
  isPrimaryButton: {
    type: Boolean,
    default: true
  }
})

const buttonClass = () => {
  let outlined = props.outlined ? 'border border-gray-400 hover:bg-gray-200' : ''
  let primary = props.isPrimaryButton && !props.outlined ? 'text-white bg-primary-400 hover:bg-primary-900 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' : ''

  return `${outlined} ${primary} ${props.class} w-full font-semibold rounded-lg text-sm px-5 py-2.5 text-center`
}
</script>
