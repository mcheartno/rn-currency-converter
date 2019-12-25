import React from 'react'
import {View, ActivityIndicator} from 'react-native'

export const FullPageSpinner: React.FC = () => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator />
        </View>
    )
}
