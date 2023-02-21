// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
    ],
    runtimeConfig: {
        public: {
            // @ts-ignore
            endpoint: process.env.NUXT_APP_ENDPOINT,
            // @ts-ignore
            projectID: process.env.NUXT_APP_PROJECT_ID,
            // @ts-ignore
            databaseID: process.env.NUXT_APP_DATABASE_ID,
        },
    },
    pinia: {
        autoImports: [
            // automatically imports `defineStore`
            'defineStore', // import { defineStore } from 'pinia'
            ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
    },
})
