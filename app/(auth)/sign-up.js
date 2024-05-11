import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '../../constants/'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'

const SignUp = () => {
    const [from, setfrom] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        gender: '',
        jobTitle: '',
        password: '',
    })

    const submit = () => {

    }

    const [isSubmitting, setisSubmitted] = useState(false)
    return (
        <SafeAreaView className="bg-primary h-full">

            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6 ">
                    <View className="justify-center items-center">
                        <Image
                            source={images.tria}
                            resizeMode='contain'
                            className="w-[200px] h-[100px]"

                        />
                        <Text className="text-2xl text-white text-semibold mt-10 font-psemibold "> Sign Up to Tria</Text>
                    </View>

                    <FormField
                        title="Full Name"
                        value={from.name}
                        handleChangeText={((e) => setfrom({ ...from, name: e }))}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Email"
                        value={from.email}
                        handleChangeText={((e) => setfrom({ ...from, email: e }))}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Phone Number"
                        value={from.phoneNumber}
                        handleChangeText={((e) => setfrom({ ...from, phoneNumber: e }))}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Job Title"
                        value={from.jobTitle}
                        handleChangeText={((e) => setfrom({ ...from, jobTitle: e }))}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Password"
                        value={from.password}
                        handleChangeText={((e) => setfrom({ ...from, password: e }))}
                        otherStyles="mt-7"
                    />
                    <CustomButton
                        title={"Sign Up"}
                        handlePress={submit}
                        containerStyles={"mt-7 "}
                        isLoading={isSubmitting}

                    />
                    <View className="justify-center pt-5 flex-row space-x-2">
                        <Text className="text-lg text-gray-100 font-pregular"> Have an account already?</Text>
                        <Link href="/sign-in" className='text-lg font-psemibold text-orange-100'>Sign in</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default SignUp