export const formatIDR = (value: number | null) => {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        currencyDisplay: 'symbol',
        maximumFractionDigits: 0,
        useGrouping: true
    })

    if (value === null || value === undefined) {
        return formatter.format(0)
    }

    const formatted = formatter.format(value)
    return formatted.replace(/\s/g, '')
}

export const parseDate = (date: string) => {
    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`
}

export const formatDate = (date: Date | undefined | null) => {
    if (!date) {
        return ''
    }

    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`
}
