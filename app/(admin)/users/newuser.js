import { View, Text, ScrollView, Image, Alert, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../../components/FormField'
import CustomButton from '../../../components/CustomButton'
import { icons, images } from '../../../constants'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { router } from 'expo-router'

const newuser = () => {

    const token = useSelector((state) => state.user.token)
    const [isSubmitting, setisSubmitted] = useState(false)
    const [isMale, setisMale] = useState(false)
    const [isFemale, setisFemale] = useState(false)

    const [form, setform] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        gender: '',
        jobTitle: '',
        password: '',
    })



    const submit = async () => {
        try {
            setisSubmitted(true)
            console.log("creating user", form)
            console.log(token)

            const response = await axios.post("https://task-management-opll.onrender.com/api/users/create-user",
                form,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`
                    }
                }
            )
            console.log(response)
            if (response.status === 201) {
                Alert.alert('Success!!', 'User Created!')
                setform({
                    name: '',
                    email: '',
                    phoneNumber: '',
                    gender: '',
                    jobTitle: '',
                    password: '',
                })
                router.back();
            }
        } catch (err) {
            console.log(err.response.data)
            if (err.response && err.response.data && err.response.data.message) {
                Alert.alert('Error', err.response.data.message[0]);
            } else {
                Alert.alert('Error', err.message);
            }
        } finally {
            setisSubmitted(false)
        }
    }


    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center mt-[2] mb-2 px-4 ">
                    <FormField
                        title="Full Name"
                        value={form.name}
                        handleChangeText={((e) => setform({ ...form, name: e }))}
                        otherStyles="mt-2"
                        keyboardType="email-address"
                    />
                    <Text className='mt-2 text-base text-gray-100 font-pmedium '>{"Gender"}</Text>

                    <View className="flex-row mt-2 space-x-4 items-center">
                        <TouchableOpacity className="flex-row space-x-2 items-center" onPress={() => { setform({ ...form, gender: 'male' }), setisFemale(false), setisMale(!isMale) }}>

                            <Image
                                source={isMale ? icons.check : icons.square}
                                className="h-8 w-8"
                                style={{ tintColor: isMale ? "#FEBD00" : undefined }}

                            />
                            <Text className={`text-base ${isMale ? 'text-orange-100' : 'text-gray-100'}  font-pthin `}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row space-x-2 items-center" onPress={() => { setform({ ...form, gender: 'female' }), setisFemale(!isFemale), setisMale(false) }}>
                            <Image
                                source={isFemale ? icons.check : icons.square}
                                className="h-8 w-8"
                                style={{ tintColor: isFemale ? "#FEBD00" : undefined }}

                            />
                            <Text className={`text-base ${isFemale ? 'text-orange-100' : 'text-gray-100'} font-pthin `}>Female</Text>
                        </TouchableOpacity>
                    </View>
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={((e) => setform({ ...form, email: e }))}
                        otherStyles="mt-2"
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Phone Number"
                        value={form.phoneNumber}
                        handleChangeText={((e) => setform({ ...form, phoneNumber: e }))}
                        otherStyles="mt-2"
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Job Title"
                        value={form.jobTitle}
                        handleChangeText={((e) => setform({ ...form, jobTitle: e }))}
                        otherStyles="mt-2"
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={((e) => setform({ ...form, password: e }))}
                        otherStyles="mt-2"
                    />
                    <CustomButton
                        title={"Register"}
                        handlePress={submit}
                        containerStyles={"mt-7 "}
                        isLoading={isSubmitting}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default newuser