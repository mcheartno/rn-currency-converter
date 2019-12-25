import React, {useState, useEffect} from 'react'

export type Country = {
    alpha3: string
    currencyId: string
    currencyName: string
    currencySymbol: string
    id: string
    name: string
}

export const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const run = async () => {
            const response = await fetch('https://free.currconv.com/api/v7/countries?apiKey=00095eed9c29a05902cc')
            const json = await response.json()

            setCountries(Object.values(json.results))
            setLoading(false)
        }
        run()
    }, [])

    return {countries, loading}
}
