import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, FlatList, Pressable, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../../constants'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../../components/CustomButton'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { setArcivedTask, setTask } from '../../../redux/reducer/taskReduser'
import { Link } from 'expo-router'
const index = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const axiosPrivate = useAxiosPrivate();
    const archivedtask = useSelector((state) => state.task.archivedtask)
    const token = useSelector((state) => state.user.token)


    const dispatch = useDispatch();

    const onRefresh = useCallback(() => {
        // setRefreshing(true);
        setIsLoading(true)
        setTimeout(() => {
            getTasks(searchQuery)
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
                getTasks(searchQuery);
            } else {
                getTasks(searchQuery);
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

    const getTasks = async (searchQuery) => {
        try {
            let url = "/tasks/get-archived-tasks?orderBy[field]=createdAt&orderBy[direction]=desc"
            if (searchQuery?.trim() !== "") {
                url = `/tasks/get-archived-tasks?search=${searchQuery}&searchFrom=title&orderBy[field]=createdAt&orderBy[direction]=desc`;
            }
            const response = await axiosPrivate.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch(setArcivedTask(response.data))
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }


    const renderItem = ({ item }) => (
        <Link href={{
            pathname: "/tasks/taskdetails", params: {
                id: item.id,
                title: item.title,
                description: item.description,
                tags: item.tags,
                priority: item.priority,
                dueDate: item.dueDate,
                projectId: item.projectId,
                status: item.status,
                createdBy: item.createdBy,
                archived: "true"
            }
        }} asChild>

            <TouchableOpacity activeOpacity={0.7}>
                <View className="bg-black-200 border-orange-100 border-1 rounded-lg h-22 p-3 mt-3 justify-center">
                    <View className="flex-row">
                        <View className="justify-center">
                            <Image
                                source={icons.list}
                                className="h-16 w-12 "
                            />
                        </View>

                        <View className="justify-center ml-3">
                            <Text className="text-green-100 font-pbold"> Title: {item.title} </Text>
                            <Text className="text-green-100 font-pthin"> Tags: {item.tags || "none"} </Text>
                            <Text className="text-green-100 font-pthin"> Priority: {item.priority} </Text>
                            <Text className="text-green-100 font-pthin"> Status: {item.status} </Text>
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        </Link>
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
                            <Text className="text-green-100 text-xl font-pbold"> Archived Tasks</Text>
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

                        data={archivedtask.data}
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