import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../constants';
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector((state) => state.user.user)
    return (
        <SafeAreaView className="bg-primary h-full w-full">
            <ScrollView>
                <View className='items-center'>
                    <Image
                        source={icons.users}
                        className="h-24 w-24"
                    />
                </View>
                <View className='flex-1 mt-4 mx-2 rounded-xl pl-5 pt-5 bg-black-100 '>

                    <View className="flex-1 mb-4">

                        <View className="flex-row mt-5 space-x-10">
                            <Text className="text-gray-100 font-pbold text-xl"> Name </Text>
                            <Text className="text-gray-100 font-pbold text-xl"> {user.name}</Text>
                        </View>
                        <View className="flex-row mt-5 space-x-10">
                            <Text className="text-gray-100 font-pbold text-xl"> Email </Text>
                            <Text className="text-gray-100 font-pbold text-xl"> {user.email}</Text>
                        </View>
                        <View className="flex-row mt-5 space-x-10">
                            <Text className="text-gray-100 font-pbold text-xl"> Gender </Text>
                            <Text className="text-gray-100 font-pbold text-xl"> {user.gender}</Text>
                        </View>
                        <View className="flex-row mt-5 space-x-10">
                            <Text className="text-gray-100 font-pbold text-xl"> Phone  </Text>
                            <Text className="text-gray-100 font-pbold text-xl"> {user.phoneNumber}</Text>
                        </View>
                    </View>

                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default Profile