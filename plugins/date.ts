export default defineNuxtPlugin((nuxtContext) => {

    nuxtContext.provide('formatDate', {
        format(date: string) {
            const d = new Date(date)
            return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`
        }
    })

})
