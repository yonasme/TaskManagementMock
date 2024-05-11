import { View, Text, FlatList, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import slides from './slides'

const Onboardingitem = ({ item }) => {
    const { width } = useWindowDimensions()
    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width }}>
            <Image source={item.image} style={{ flex: 0.7, justifyContent: 'center', width, resizeMode: 'contain' }} />
            <View style={{ flex: 0.3 }}>
                <Text style={{ fontWeight: '800', fontSize: 28, marginBottom: 10, color: '#493d8a', textAlign: 'center' }}>{item.title}</Text>
                {/* <Text style={{ fontWeight: '300', color: '#62656b', textAlign: 'center', 'paddingHorizontal': 64, }}>{item.description}</Text> */}
            </View>
        </View>

    )
}

export default Onboardingitem