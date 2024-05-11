import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Onboarding from '../../components/onboarding'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useDispatch } from 'react-redux'
import { setViewOnboarding } from '../../redux/reducer/userReduser'
import { router } from 'expo-router'
const onboarding = () => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handlePress = async () => {
        setIsLoading(true);
        try {
            dispatch(setViewOnboarding(false))
            router.replace('/sign-in')
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    return (

        <SafeAreaView className="bg-white h-full w-full">
            {/* <StatusBar backgroundColor='#13193d' style='light' /> */}
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="h-3/5">
                    <Onboarding />
                </View>
                <View className="bg-primary rounded-tr-3xl rounded-tl-3xl flex-1 h-" >
                    <ScrollView>
                        <View className="justify-center items-center pt-10">
                            <Text className="w-3/5 items-center justify-center text-white font-pextrabold text-3xl text-center">
                                Manage Your Projects and Tasks
                            </Text>
                            <TouchableOpacity
                                className={`h-14  items-center justify-center rounded-xl font-pbold
                                             bg-orange-100 mt-7 w-60 ${isLoading ? 'animate-pulse' : ''}`}
                                disabled={isLoading}
                                onPress={async () => { handlePress(); }}
                                activeOpacity={0.7}
                            >
                                <Text className={`text-primary font-pbold text-xl`}>{isLoading ? <ActivityIndicator size={"large"} color={"#13193d"} /> : "GET STARTED"}</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default onboarding