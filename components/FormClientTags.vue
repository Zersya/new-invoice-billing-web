<template>
  <general-modal :is-modal-open="isModalOpen"
                 :extra-large="true"
                 name="form-client-tags"
                 title="Add client tags"
                 @modal-opened="emit('form-opened')" @modal-closed="emit('form-closed'); storeForm.reset()">

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
          {{ 'Create' }}
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

onMounted(() => {
})

const emit = defineEmits(['form-opened', 'form-closed'])

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true
  },
})

async function onSubmit() {
  await storeForm.onSubmitAddTag(tag.value)

  emit('form-closed')

  await storeFetch.fetchClients()
}

</script>
