import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '../../constants/'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAdmin, setIsSignedIn, setRefreshToken, setToken, setUser } from '../../redux/reducer/userReduser'

const SignIn = () => {
    const [form, setform] = useState({
        email: '',
        password: '',
    })

    const { users, isSignedIn } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all the fields')

        } else {
            setisSubmitted(true)
            try {
                console.log(form)
                const response = await axios.post('https://task-management-opll.onrender.com/api/auth/login', form)
                //  console.log(response.data)

                //console.log(users)
                if (response.status === 201) {
                    dispatch(setUser(response.data.profile))
                    dispatch(setToken(response.data.accessToken))
                    dispatch(setRefreshToken(response.data.refreshToken))
                    dispatch(setIsAdmin(response.data.profile.isAdmin))
                    dispatch(setIsSignedIn(true))

                }

            } catch (err) {
                console.log(err.response.data)
                if (err.response && err.response.data && err.response.data.message) {
                    Alert.alert('Error', err.response.data.message);
                } else {
                    Alert.alert('Error', err.message);
                }
            } finally {
                setisSubmitted(false)
            }
        }


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
                        <Text className="text-2xl text-white text-semibold mt-5 font-psemibold "> Log in to Tria</Text>
                    </View>
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={((e) => setform({ ...form, email: e }))}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={((e) => setform({ ...form, password: e }))}
                        otherStyles="mt-7"
                    />
                    <CustomButton
                        title={"Login"}
                        handlePress={submit}
                        containerStyles={"mt-7 "}
                        isLoading={isSubmitting}

                    />
                    <View className="justify-center pt-5 flex-row space-x-2">
                        <Text className="text-lg text-gray-100 font-pregular"> Don't have account?</Text>
                        <Link href="/sign-up" className='text-lg font-psemibold text-orange-100'>Sign Up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default SignIn