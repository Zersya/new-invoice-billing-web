export const formatIDR = (value: number | null) => {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        currencyDisplay: 'symbol',
        maximumFractionDigits: 2,
        useGrouping: true
    })

    if (value === null || value === undefined) {
        return formatter.format(0)
    }

    const formatted = formatter.format(value)
    return formatted.replace(/\s/g, '')
}

export const formatDate = (date: string) => {
    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`
}
