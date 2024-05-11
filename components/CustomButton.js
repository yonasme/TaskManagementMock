import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {

    return (

        <TouchableOpacity
            className={`h-14  items-center justify-center rounded-xl font-pbold
          bg-orange-100 ${containerStyles} ${isLoading ? 'animate-pulse' : ''}`}
            disabled={isLoading}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text className={`text-primary font-pbold text-xl ${textStyles} `}>{isLoading ? <ActivityIndicator size={"large"} color={"#13193d"} /> : title}</Text>
        </TouchableOpacity>


    )
}

export default CustomButton