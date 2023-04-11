<template>
  <general-modal :is-modal-open="isModalOpen"
                 :extra-large="true"
                 name="form-client-tags"
                 title="Add client tags"
                 @modal-opened="emit('form-opened'); tag = props.selectedTagClient" @modal-closed="emit('form-closed'); storeForm.reset()">
    <template #additional-action>
      <button v-if="selectedTagClient"
              type="button"
              class="text-red-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
              @click="onDelete">
        <general-spinner-loading v-if="storeForm.isLoadingSubmit" class="inline" loading-color="fill-primary-200"/>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor"
                d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9M7 6h10v13H7V6m2 2v9h2V8H9m4 0v9h2V8h-2Z"/>
        </svg>
        <span class="sr-only">Delete tag</span>
      </button>
    </template>
    <template #body>
      <form @submit.prevent="onSubmit">
        <div class="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label for="tags"
                   class="required-field block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag name</label>
            <input type="text" name="tag" id="tag"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                   placeholder="Type client tag" required
                   :value="tag"
                   @input="tag = $event.target.value">
          </div>
        </div>
        <general-button :is-loading="storeForm.isLoadingSubmit" :disabled="tag.length === 0" type="submit"
                        class="mt-4">
          {{ selectedTagClient ? 'Save' : 'Update' }}
        </general-button>
      </form>
    </template>
  </general-modal>
</template>

<script setup lang="ts">
import {useFormClient} from '~/stores/client/form';
import {useFetchClient} from "~/stores/client";

const tag = ref('')

const storeForm = useFormClient()
const storeFetch = useFetchClient()

const emit = defineEmits(['form-opened', 'form-closed'])

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true
  },
  selectedTagClient: {
    type: String,
    required: true
  },
})

async function onSubmit() {

  if (!props.selectedTagClient) {
    await storeForm.onSubmitAddTag(tag.value)
  }else {
    const index = storeForm.tags.indexOf(props.selectedTagClient)
    await storeForm.onSubmitReplaceTag(tag.value, index)
  }

  emit('form-closed')

  tag.value = ''

  await storeFetch.fetchClients()
}

async function onDelete() {
  const index = storeForm.tags.indexOf(props.selectedTagClient)
  await storeForm.onSubmitDeleteTag(index)

  emit('form-closed')

  tag.value = ''

  await storeFetch.fetchClients()
}

</script>
