import {Country} from './useCurrencies'
import React, {useContext} from 'react'
import {NavigationContext} from 'react-navigation'
import styled from 'styled-components/native'

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    height: 60px;
`

const ChooseButton = styled.TouchableOpacity`
    background-color: #3c8eff;
    width: 70px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
`

const CurrencyText = styled.Text`
    font-size: 20px;
    font-weight: 500;
    color: white;
`

const Input = styled.TextInput`
    flex: 1;
    height: 100%;
    padding: 0 15px;
    font-size: 20px;
    text-align: right;
`

const Flag = styled.Image`
    margin-left: 20px;
`

export const CurrencyInput: React.FC<{
    amount: number | string
    editable?: boolean
    onChangeAmount?: (amount: number) => void
    country: Country
    onChangeCurrency: (country: Country) => void
    autoFocus?: boolean
}> = ({amount, editable = false, onChangeAmount, country, onChangeCurrency, autoFocus = false}) => {
    const navigation = useContext(NavigationContext)

    return (
        <Container>
            <Flag
                style={{width: 32, height: 32}}
                source={{uri: `https://www.countryflags.io/${country.id.toLowerCase()}/flat/64.png`}}
            />
            <Input
                keyboardType="number-pad"
                value={amount.toString()}
                editable={editable}
                autoFocus={autoFocus}
                onChangeText={value => {
                    const numberValue = Number(value)
                    !isNaN(numberValue) && onChangeAmount && onChangeAmount(numberValue)
                }}
            />
            <ChooseButton
                onPress={() => {
                    navigation.navigate('ChooseCurrency', {onChooseCurrency: onChangeCurrency})
                }}
            >
                <CurrencyText>{country.currencyId}</CurrencyText>
            </ChooseButton>
        </Container>
    )
}
