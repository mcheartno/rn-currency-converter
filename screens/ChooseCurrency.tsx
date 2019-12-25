import React from 'react'
import {useCountries, Country} from '../components/useCurrencies'
import {FullPageSpinner} from '../components/FullPageSpinner'
import {SafeAreaView} from 'react-navigation'
import {FlatList} from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import {Text} from 'react-native'

const CountryContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
    padding: 0 20px;
`

const CountryItem: React.FC<{country: Country; onPress: () => void}> = ({country, onPress}) => {
    return (
        <CountryContainer onPress={onPress}>
            <Text>{country.name}</Text>
            <Text>{country.currencyId}</Text>
        </CountryContainer>
    )
}

export const ChooseCurrency: React.FC<{
    navigation: any
}> = ({navigation}) => {
    const {countries, loading} = useCountries()

    if (loading) return <FullPageSpinner />

    return (
        <FlatList
            data={countries}
            renderItem={({item}) => (
                <CountryItem
                    country={item}
                    onPress={() => {
                        navigation.state.params.onChooseCurrency(item)
                        navigation.pop()
                    }}
                />
            )}
        />
    )
}
