import {Country} from '../components/useCurrencies'
import React, {useState, useEffect} from 'react'
import {SafeAreaView, ActivityIndicator} from 'react-native'
import {CurrencyInput} from '../components/CurrencyInput'

const useConversionFactor = (fromCountry: Country, toCountry: Country) => {
    const [conversionFactor, setConversionFactor] = useState(0)

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const state = {stale: false}
        const run = async () => {
            setLoading(true)

            const response = await fetch(
                `https://free.currconv.com/api/v7/convert?q=${fromCountry.currencyId}_${toCountry.currencyId}&compact=ultra&apiKey=00095eed9c29a05902cc`,
            )
            if (state.stale) return

            const json = await response.json()
            if (state.stale) return

            setConversionFactor(Object.values<number>(json)[0])
            setLoading(false)
        }

        run()

        return () => {
            state.stale = true
        }
    }, [fromCountry, toCountry])

    return {conversionFactor, loading}
}

export const Home: React.FC<{countries: Country[]}> = ({countries}) => {
    const [fromCountry, setFromCountry] = useState<Country>(countries[0])
    const [toCountry, setToCountry] = useState<Country>(countries[1])
    const [fromAmount, setFromAmount] = useState(1)

    const {conversionFactor, loading} = useConversionFactor(fromCountry, toCountry)

    return (
        <SafeAreaView>
            <CurrencyInput
                amount={fromAmount}
                editable
                onChangeAmount={amount => setFromAmount(amount)}
                country={fromCountry}
                onChangeCurrency={country => setFromCountry(country)}
                autoFocus
            />
            {loading ? (
                <ActivityIndicator />
            ) : (
                <CurrencyInput
                    amount={(conversionFactor * fromAmount).toFixed(2)}
                    country={toCountry}
                    onChangeCurrency={country => setToCountry(country)}
                />
            )}
        </SafeAreaView>
    )
}
