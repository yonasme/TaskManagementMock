import { View, Text, ScrollView, Image, Alert, Pressable, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../../components/FormField'
import CustomButton from '../../../components/CustomButton'
import { icons, images } from '../../../constants'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { router, useLocalSearchParams } from 'expo-router'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

const editproject = () => {

    const token = useSelector((state) => state.user.token)
    const [isSubmitting, setisSubmitted] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const { id, title, description, isActive } = useLocalSearchParams()
    const [isActivee, setIsActivee] = useState(isActive)

    const [form, setform] = useState({
        id: id,
        title: title,
        description: description,
        isActive: isActive,
    })



    const submit = async () => {
        try {
            setisSubmitted(true)
            console.log("updating project", form)
            //  console.log(token)

            const response = await axiosPrivate.put("/projects/update-project",
                form,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`
                    }
                }
            )
            console.log(response)
            if (response.status === 200) {
                Alert.alert('Success!!', `${form.title} Updated!`)
                setform({
                    title: '',
                    description: '',
                    isActive: '',
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
            <ScrollView >
                <View className="w-full justify-center mt-[2] mb-2 px-4 ">
                    <FormField
                        title="Title"
                        value={form.title}
                        handleChangeText={((e) => setform({ ...form, title: e }))}
                        otherStyles="mt-2"
                    />
                    <FormField
                        title="Description"
                        value={form.description}
                        handleChangeText={((e) => setform({ ...form, description: e }))}
                        otherStyles="mt-2"
                    />
                    <Text className='mt-2 text-base text-gray-100 font-pmedium '>{"Status"}</Text>

                    <View className="flex-row mt-2 space-x-4 items-center">
                        <TouchableOpacity className="flex-row space-x-2 items-center" onPress={() => { setIsActivee(!isActivee), setform({ ...form, isActive: !isActivee }) }}>

                            <Image
                                source={isActivee ? icons.toggle_on : icons.toggle_off}
                                className="h-12 w-12"
                                style={{ tintColor: isActivee ? "#FEBD00" : undefined }}

                            />
                            <Text className={`text-base ${isActivee ? 'text-orange-100' : 'text-gray-100'}  font-pthin `}>Active</Text>
                        </TouchableOpacity>

                    </View>

                    <CustomButton
                        title={"Update"}
                        handlePress={submit}
                        containerStyles={"mt-7 "}
                        isLoading={isSubmitting}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default editproject