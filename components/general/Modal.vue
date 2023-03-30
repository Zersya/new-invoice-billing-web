<template>
  <slot name="trigger"/>
  <div :id="props.name" tabindex="-1" aria-hidden="true"
       class="fixed flex justify-center items-center top-0 left-0 right-0 z-50 hidden bg-black bg-opacity-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
    <div
        :class="['relative justify-center items-center w-full h-full md:h-auto', `${props.extraLarge ? 'max-w-2xl' : 'max-w-lg'}`, className]">
      <div class=" relative bg-white rounded-lg shadow dark:bg-gray-700 p-10">
        <slot name="caption"/>
        <div class="flex items-start justify-between mb-4">
          <div class="">
            <div class="flex grow items-center gap-x-2">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ props.title }}
              </h3>
              <slot name="additional-action"/>
            </div>
            <slot name="subtitle"/>
          </div>
          <button type="button"
                  class="absolute top-9 right-8 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  @click="openModal(false)">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <slot name="body"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/general/Button.vue";
import {onMounted, watch} from "vue";


watch(() => props.isModalOpen, (value) => {
  openModal(value)
})

const emit = defineEmits(['modal-opened', 'modal-closed'])

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  extraLarge: {
    type: Boolean,
    default: false
  },
  isModalOpen: {
    type: Boolean,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})

let $modal: HTMLElement | null = null

onMounted(() => {
  $modal = document.getElementById(props.name)
})

const openModal = (value: boolean) => {
  if (value) {
    $modal?.classList.add('animate-fade-in')
    $modal?.classList.remove('hidden')
    $modal?.classList.remove('animate-fade-out')

    setTimeout(() => {
      $modal?.focus()
    }, 300)

    emit('modal-opened')
  } else {
    $modal?.classList.remove('animate-fade-in')
    $modal?.classList.add('animate-fade-out')
    setTimeout(() => {
      $modal?.classList.add('hidden');
      emit('modal-closed')
    }, 300)
  }
}
</script>
