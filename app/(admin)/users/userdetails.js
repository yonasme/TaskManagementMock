import { View, Text, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { icons } from '../../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'

const userdetails = () => {
    const router = useRouter()
    const { id, name, gender, email, jobTitle, archived } = useLocalSearchParams()
    console.log("user id", id)
    return (
        <SafeAreaView className="bg-primary h-full">
            <View className="bg-primary flex-row justify-center border-orange-100 border-2 px-4">
                <View className="flex-1 justify-center">
                    <Text className="text-orange-100 font-pbold">{name}</Text>
                    <Text className="text-orange-100 font-pthin">{gender}</Text>
                    <Text className="text-orange-100 font-pthin">{email}</Text>
                    <Text className="text-orange-100 font-pthin">{jobTitle}</Text>
                </View>
                <View className="justify-start">
                    <Image
                        source={icons.users}
                        className="h-32 w-20"
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}

export default userdetails