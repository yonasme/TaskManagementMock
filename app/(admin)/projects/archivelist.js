import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, FlatList, ActivityIndicator, Pressable, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../../constants'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../../components/CustomButton'
import { Link, Navigator, useFocusEffect, useRouter } from 'expo-router'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import axios from '../../../api/axios'
import { setArchivedProjects, setProjects } from '../../../redux/reducer/projectReduser'


const archivelist = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const archivedprojects = useSelector((state) => state.project.archivedprojects)
    const token = useSelector((state) => state.user.token)
    const axiosPrivate = useAxiosPrivate();

    const dispatch = useDispatch();
    const router = useRouter()



    const onRefresh = useCallback(() => {
        // setRefreshing(true);
        setIsLoading(true)
        setTimeout(() => {
            getProjects(searchQuery)
            //setIsLoading(false)
            // setRefreshing(false);
        }, 2000);
    }, [])

    // useEffect(() => {
    //     setIsLoading(true)
    //     getProjects()
    // }, [])

    useEffect(() => {
        let timeoutId = null;
        console.log("timeout useeffect executing")
        const fetchData = () => {
            // setIsLoading(true);
            if (searchQuery?.trim() !== "") {
                getProjects(searchQuery);
            } else {
                getProjects(searchQuery);
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

    const handlePress = (item) => {

        const { id, title, description, isActive } = item
        router.navigate(`/users/userdetails?name=${name}`)
    };

    const getProjects = async (searchQuery) => {
        try {
            console.log("refreshing", refreshing)

            let url = "/projects/get-archived-projects?orderBy[field]=createdAt&orderBy[direction]=desc"

            if (searchQuery?.trim() !== "") {
                url = `/projects/get-archived-projects?search=${searchQuery}&searchFrom=title&orderBy[field]=createdAt&orderBy[direction]=desc`;
            }
            const response = await axiosPrivate.get(url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`
                    }
                }
            )
            console.log("response ", response.data)
            dispatch(setArchivedProjects(response.data))
        } catch (error) {
            console.log(error)

        } finally {
            setIsLoading(false)
        }

    }

    const renderItem = ({ item }) => (

        <Link href={{
            pathname: "/projects/projectdetails", params: {
                id: item.id,
                title: item.title,
                description: item.description,
                isActive: item.isActive,
                archived: "true"
            }
        }} asChild>

            <TouchableOpacity activeOpacity={0.7}>

                <View className="bg-black-200 border-orange-100 border-1 rounded-lg h-22 p-3 mt-3 justify-center">
                    <View className="flex-row ">
                        <View className="justify-center">
                            <Image
                                source={icons.project}
                                className="h-16 w-12 "
                            />
                        </View>

                        <View className="justify-center ml-3 flex-1">
                            <Text className="text-green-100 font-pbold"> Title: {item.title} </Text>
                            <Text className="text-green-100 font-pthin"> Status : {item.isActive ? "Active " : "InActive"} </Text>
                            {/* <View className="flex-1"> */}
                            <Text className="text-green-100 font-pthin"> Description: {item.description} </Text>
                            {/* </View> */}
                            <Text className="text-green-100 font-pthin"> {item.archiveReason === null ? "" : "Archived"} </Text>
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
                <View className='flex-1 px-2 mt-[-35] '>
                    <View>
                        <View className="mt-4 items-center justify-center">
                            <Text className="text-green-100 text-xl font-pbold"> Archived Projects</Text>
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
                        className="mt-2 rounded-xl"
                        data={archivedprojects.data}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
                    />
                </View>
            )}

        </SafeAreaView>
    )
}

export default archivelist