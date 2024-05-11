import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, FlatList, ActivityIndicator, Pressable, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../../constants'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../../components/CustomButton'
import { Link, Navigator, useRouter } from 'expo-router'
import { setUsers } from '../../../redux/reducer/userReduser'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
const Users = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const token = useSelector((state) => state.user.token)
    const users = useSelector((state) => state.user.users)
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const router = useRouter()
    console.log("users", users)
    const onRefresh = useCallback(() => {
        setIsLoading(true)
        setTimeout(() => {
            getUsers(searchQuery)
            setIsLoading(false)
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

            let url = "/users/get-users?orderBy[field]=createdAt&orderBy[direction]=desc";
            if (searchQuery?.trim() !== "") {
                url = `/users/get-users?search=${searchQuery}&searchFrom=name&orderBy[field]=createdAt&orderBy[direction]=desc`;
            }

            const { data } = await axiosPrivate.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch(setUsers(data))

        } catch (error) {
            console.log(error.response.data);
        } finally {
            setIsLoading(false)
        }
    }

    // const user = [{ "archiveReason": null, "createdAt": "2024-02-24T21:38:45.128Z", "createdBy": null, "deletedAt": null, "deletedBy": null, "email": "admin@gmail.com", "gender": null, "id": "df9a7b2d-53b0-4b9f-ad18-3e2ed1be264a", "isActive": true, "isAdmin": true, "jobTitle": null, "name": "Admin", "phoneNumber": "+251911111111", "updatedAt": "2024-02-24T21:38:45.128Z", "updatedBy": null }, { "archiveReason": null, "createdAt": "2024-02-29T07:47:45.207Z", "createdBy": "df9a7b2d-53b0-4b9f-ad18-3e2ed1be264a", "deletedAt": null, "deletedBy": null, "email": "solomonshiferawww@gmail.com", "gender": "male", "id": "232bca2e-df6c-4396-8fa2-737d3d076fae", "isActive": true, "isAdmin": false, "jobTitle": "Frontend Developer", "name": "Solomon Shiferaw", "phoneNumber": "+251923817004", "updatedAt": "2024-02-29T07:47:45.207Z", "updatedBy": "df9a7b2d-53b0-4b9f-ad18-3e2ed1be264a" }]

    const handlePress = (item) => {
        console.log("pressed")
        const { name, gender, email, jobTitle } = item
        router.navigate(`/users/userdetails?name=${name}`)
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
                    <View className="space-y-4 flex-1 items-end">
                        <View className="">
                            <Link href={{
                                pathname: '/users/edituser',
                                params: {
                                    id: item.id,
                                    name: item.name,
                                    gender: item.gender,
                                    email: item.email,
                                    password: item.password,
                                    phoneNumber: item.phoneNumber,
                                    jobTitle: item.jobTitle,
                                    archived: "false"
                                }
                            }} asChild>
                                <TouchableOpacity className="">
                                    <Image
                                        source={icons.edit}
                                        className="h-6 w-6"
                                    />

                                </TouchableOpacity>
                            </Link>
                        </View>
                        <View className="">
                            <Link href={{
                                pathname: '/users/archiveuser',
                                params: { id: item.id }
                            }} asChild>
                                <TouchableOpacity className="">
                                    <Image
                                        source={icons.archive}
                                        className="h-6 w-6"
                                    />

                                </TouchableOpacity>
                            </Link>
                        </View>
                        <View className="">
                            <TouchableOpacity className="">
                                <Image
                                    source={icons.trash}
                                    className="h-6 w-6"
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
                <View className='flex-1 px-2 mt-[-35] '>
                    <View>
                        {/* <View className="flex-row">
                        <View className="flex-1 justify-center">
                            <Text className="font-pbold text-2xl">User</Text>
                        </View>

                        <TouchableOpacity className="bg-[#13193d] h-12 w-16 rounded-lg items-center justify-center ">
                            <Image
                                source={icons.plus}
                                className="h-8 w-8 bg-blend-color-burn"
                                tintColor={"#FFA001"}
                            />
                        </TouchableOpacity>
                    </View> */}

                        <View className="h-20 mt-4">
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
                        data={users.data}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
                    />


                </View>

            )}
        </SafeAreaView>
    )
}

export default Users