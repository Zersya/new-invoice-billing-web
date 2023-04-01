<template>
  <label :for="props.name" :class="labelClass()">{{
      props.label
    }}</label>
  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <img v-if="props.iconPath" :src="props.iconPath" alt="icon field"/>
  </div>
  <input :type="props.type" :name="props.name" :id="props.name"
         :class="inputClass()"
         :placeholder="props.placeholder" :required="props.required" @input="emit('input', $event.target.value)"
         :value="props.value"
         style="margin-top:0"/>
</template>

<script setup lang="ts">

const emit = defineEmits(['input'])

const defaultLabelClass = 'block mb-2 text-sm font-semibold text-gray-900 dark:text-white'
const defaultInputClass = 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  iconPath: {
    type: String || null,
    default: null
  }
})


const labelClass = () => {
  return props.required ? `${defaultLabelClass} required-field` : defaultLabelClass
}

const inputClass = () => {
  return props.iconPath ? `${defaultInputClass} pl-10` : defaultInputClass
}

</script>
