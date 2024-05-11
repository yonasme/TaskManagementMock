import { View, Text, ScrollView, Image, Alert, Pressable, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../../components/FormField'
import CustomButton from '../../../components/CustomButton'
import { icons, images } from '../../../constants'
import { useSelector } from 'react-redux'
import axios from '../../../api/axios'
import { router, useLocalSearchParams } from 'expo-router'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

const archiveuser = () => {

    const token = useSelector((state) => state.user.token)
    const [isSubmitting, setisSubmitted] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const { id } = useLocalSearchParams()

    const [form, setform] = useState({
        id: id,
        reason: "",
    })

    const submit = async () => {
        try {
            setisSubmitted(true)
            console.log("Archiving user", form)
            console.log(token)

            const response = await axiosPrivate.delete("/users/archive-user",
                {
                    data: form,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`
                    }
                }
            )
            // console.log(response)
            if (response.status === 200) {
                Alert.alert('Success!!', `${title} Archived!`)
                setform({
                    id: id,
                    reason: "",
                })
                router.back();
            }
        } catch (err) {
            console.log(err.response.data)
            if (err.response.status === 500) {
                Alert.alert('Success!!', `${title} Archived!`)
                setform({
                    id: id,
                    reason: "",
                })
                router.back();
            } else if (err.response && err.response.data && err.response.data.message) {
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
                        title="Reason"
                        value={form.reason}
                        handleChangeText={((e) => setform({ ...form, reason: e }))}
                        otherStyles="mt-2"
                    />
                    <CustomButton
                        title={"Archive"}
                        handlePress={submit}
                        containerStyles={"mt-7 "}
                        isLoading={isSubmitting}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default archiveuser