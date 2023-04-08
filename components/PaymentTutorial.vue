<template>
  <general-modal :is-modal-open="isModalOpen"
                 :extra-large="true"
                 name="payment-tutorial"
                 :title="'How to pay'"
                 @modal-opened="emit('form-opened');
                                onModalOpened()"
                 @modal-closed="emit('form-closed')">
    <template #body>
      <!--      {{ payloadPaymentDurianPay?.data.response.payment_instruction.en }}-->

      <div id="accordion-collapse" data-accordion="collapse">
        <div class="text-md mt-4 mb-1 font-bold text-gray-500 dark:text-gray-400">
          <p>INDONESIA</p>
        </div>
        <div v-for="(value, key, index) in payloadPaymentDurianPay?.data.response.payment_instruction.id"
             :key="key">
          <h2 :id="'accordion-collapse-heading-id-' + index">
            <button type="button"
                    :class="['flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800', index === 0 ? 'rounded-t-lg border-b-0' : '']"
                    :data-accordion-target="'#accordion-collapse-body-id-' + index" aria-expanded="false"
                    :aria-controls="'accordion-collapse-body-' + index">
              <span>{{ key.replace("_", " ").toUpperCase() }}</span>
              <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
              </svg>
            </button>
          </h2>
          <div :id="'accordion-collapse-body-id-' + index" class="hidden"
               :aria-labelledby="'accordion-collapse-heading-id-' + index">
            <div :class="['p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900', index === 0 ? 'border-b-0': '']">
              <p class="mb-2 font-semibold text-gray-500 dark:text-gray-400">{{ value.heading }}</p>
              <p class="mb-2 text-gray-500 dark:text-gray-400" v-html="value.instruction_text"></p>
            </div>
          </div>
        </div>


        <div class="text-md mt-4 mb-1 font-bold text-gray-500 dark:text-gray-400">
          <p>ENGLISH</p>
        </div>
        <div v-for="(value, key, index) in payloadPaymentDurianPay?.data.response.payment_instruction.en"
             :key="key">
          <h2 :id="'accordion-collapse-heading-en-' + index">
            <button type="button"
                    :class="['flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800', index === 0 ? 'rounded-t-lg border-b-0' : '']"
                    :data-accordion-target="'#accordion-collapse-body-en-' + index" aria-expanded="false"
                    :aria-controls="'accordion-collapse-body-' + index">
              <span>{{ key.replace("_", " ").toUpperCase() }}</span>
              <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
              </svg>
            </button>
          </h2>
          <div :id="'accordion-collapse-body-en-' + index" class="hidden"
               :aria-labelledby="'accordion-collapse-heading-en-' + index">
            <div :class="['p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900', index === 0 ? 'border-b-0': '']">
              <p class="mb-2 font-semibold text-gray-500 dark:text-gray-400">{{ value.heading }}</p>
              <p class="mb-2 text-gray-500 dark:text-gray-400" v-html="value.instruction_text"></p>
            </div>
          </div>
        </div>


        <!--        <div>-->
        <!--          <h2 id="accordion-collapse-heading-3">-->
        <!--            <button type="button"-->
        <!--                    class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"-->
        <!--                    data-accordion-target="#accordion-collapse-body-3" aria-expanded="true"-->
        <!--                    aria-controls="accordion-collapse-body-3">-->
        <!--              <span>What is Flowbite?</span>-->
        <!--              <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20"-->
        <!--                   xmlns="http://www.w3.org/2000/svg">-->
        <!--                <path fill-rule="evenodd"-->
        <!--                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"-->
        <!--                      clip-rule="evenodd"></path>-->
        <!--              </svg>-->
        <!--            </button>-->
        <!--          </h2>-->
        <!--          <div id="accordion-collapse-body-3" class="hidden" aria-labelledby="accordion-collapse-heading-3">-->
        <!--            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">-->
        <!--              <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive-->
        <!--                components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>-->
        <!--              <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a-->
        <!--                  href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get-->
        <!--                started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </template>
  </general-modal>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {PayloadPaymentDurianPay} from "~/types/payload_payment_durianpay";
import {initAccordions} from "flowbite";

const emit = defineEmits(['form-opened', 'form-closed'])

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true
  },
  payloadPaymentDurianPay: {
    type: Object as PropType<PayloadPaymentDurianPay | null>,
    required: true
  },
})

function onModalOpened() {
  initAccordions()
}

</script>
