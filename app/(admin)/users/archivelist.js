import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, FlatList, Pressable, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../../constants'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../../components/CustomButton'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { setTask } from '../../../redux/reducer/taskReduser'
import { Link } from 'expo-router'
import { setArchiveUser } from '../../../redux/reducer/userReduser'
const index = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const axiosPrivate = useAxiosPrivate();
    const archivedusers = useSelector((state) => state.user.archivedusers)
    const token = useSelector((state) => state.user.token)
    console.log("archived users", archivedusers)

    const dispatch = useDispatch();

    const onRefresh = useCallback(() => {
        // setRefreshing(true);
        setIsLoading(true)
        setTimeout(() => {
            getUsers(searchQuery)
            //setIsLoading(false)
            // setRefreshing(false);
        }, 2000);
    }, [])

    useEffect(() => {
        let timeoutId = null;
        console.log("timeout useeffect executing")
        const fetchData = () => {
            setIsLoading(true);
            if (searchQuery?.trim() !== "") {
                getUsers(searchQuery);
            } else {
                getUsers(searchQuery);
            }
        }
        const delayedFetchData = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(fetchData, 1000); // Delay of 3 seconds
        };

        delayedFetchData();

        return () => {
            clearTimeout(timeoutId); // Clear the timeout if the component unmounts before the delay
        };
    }, [searchQuery]);

    const getUsers = async (searchQuery) => {
        try {
            let url = "/users/get-archived-users?orderBy[field]=createdAt&orderBy[direction]=desc"
            if (searchQuery?.trim() !== "") {
                url = `/users/get-archived-users?search=${searchQuery}&searchFrom=title&orderBy[field]=createdAt&orderBy[direction]=desc`;
            }
            const response = await axiosPrivate.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                }
            });

            dispatch(setArchiveUser(response.data))
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleRestoreTask = async (id) => {
        try {

            console.log("restoring user", title)
            const response = await axiosPrivate.post(`/users/restore-user/${id}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`
                    }
                }
            )
            console.log(response.data)
            console.log(response.status)
            if (response.status === 201 || response.status === 200) {
                Alert.alert('Success!!', `${title} Restored!`)
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

        }

    };


    const renderItem = ({ item }) => (


        <TouchableOpacity activeOpacity={0.7}>

            <View className="bg-black-200  border-orange-100 border-1 rounded-lg h-22 p-3 mt-3 justify-center">
                <View className="flex-row flex-grow flex-wrap ">
                    <View className="justify-center flex-wrap ml-3">
                        <Text className="text-green-100 font-pbold"> Name: {item.name} </Text>
                        <Text className="text-green-100 font-pthin"> Gender: {item.gender || "male"} </Text>
                        <Text className="text-green-100 font-pthin"> email: {item.email} </Text>
                        <Text className="text-green-100 font-pthin"> Job Title: {item.jobTitle} </Text>
                    </View>
                    <View className="space-y-4 flex-1 items-end justify-center">

                        <View className="">

                            <TouchableOpacity onPress={handleRestoreTask(item.id)} className="">
                                <Image
                                    source={icons.archive}
                                    className="h-8 w-8"
                                />

                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

            </View>
        </TouchableOpacity>

    );

    return (
        <SafeAreaView className="bg-primary h-full">
            {isLoading ? (
                <View className=" h-full items-center justify-center">
                    <View className="bg-gray-100 w-40 rounded-lg h-20 items-center justify-center">
                        <ActivityIndicator size="large" color={"#13193d"} />
                        <Text>Loading</Text>
                    </View>

                </View>
            ) : (
                <View className='flex-1 px-2 mt-[-35]'>
                    <View>
                        <View className="mt-4 items-center justify-center">
                            <Text className="text-green-100 text-xl font-pbold"> Archived Users</Text>
                        </View>
                        <View className="h-20 mt-1">

                            <View className="w-full h-16 mt-2 px-4 bg-black-100 border-2
                            border-black-200 rounded-2xl focus:border-secondary-100
                            items-center flex-row
                            ">
                                <TextInput className="flex-1 text-white font-psemibold text-base"
                                    value={searchQuery}
                                    placeholder={"Search"}
                                    placeholderTextColor="#7b7b8b"
                                    onChangeText={(e) => setSearchQuery(e)}
                                    secureTextEntry={false}
                                />
                                <TouchableOpacity onPress={() => { }}>
                                    <Image
                                        className="w-6 h-6"
                                        resizeMode='contain'
                                        source={icons.search}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    <FlatList

                        data={archivedusers.data}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
                    />
                </View>
            )}

        </SafeAreaView>
    )
}

export default index 