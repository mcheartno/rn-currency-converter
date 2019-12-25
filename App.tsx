import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {Home} from './screens/Home'
import {ChooseCurrency} from './screens/ChooseCurrency'
import {useCountries} from './components/useCurrencies'
import {FullPageSpinner} from './components/FullPageSpinner'

const Main: React.FC = () => {
    const {countries, loading} = useCountries()
    return loading ? <FullPageSpinner /> : <Home countries={countries} />
}

const AppNavigator = createStackNavigator(
    {
        Main: {
            screen: Main,
            navigationOptions: {
                title: '💸 Currency Converter 💸',
                headerTitleStyle: {
                    fontWeight: '600',
                },
            },
        },
        ChooseCurrency: {
            screen: ChooseCurrency,
        },
    },
    {
        mode: 'modal',
    },
)

export default createAppContainer(AppNavigator)
