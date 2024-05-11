import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, RefreshControl, Alert } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { icons } from '../../../constants'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { getTasks } from './../../../redux/actions/taskAction';

const projectdetails = () => {
    const router = useRouter()
    const { id, title, description, isActive, archived } = useLocalSearchParams()
    const task = useSelector((state) => state.task.task)
    const token = useSelector((state) => state.user.token)
    const users = useSelector((state) => state.user.users)
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch()

    let filteredData = task.data ? task.data.filter(item => item.projectId === id) : null;
    const filteredUserData = users.data.filter(
        (user) => filteredData.some((task) => task.assigneeId === user.id)
    );


    console.log("project id", id)
    console.log("filtered task data", filteredData)
    console.log("filtered user data", filteredUserData)


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            dispatch(getTasks())
            getTaskss()
            setRefreshing(false);
        }, 2000);
    }, [])

    const getTaskss = async () => {
        try {

            const response = await axiosPrivate.get("/tasks/get-tasks?orderBy[field]=createdAt&orderBy[direction]=desc", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch(setTask(response.data))
            filteredData = response.data.data.filter(item => item.projectId === id);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        setConfirmVisible(false);
        setIsLoading(false)
    };

    const handleDeleteProject = () => {

        Alert.alert(
            'Confirm Delete Project',
            `Are you sure you want to Delete ${title}?`,
            [
                { text: 'No', onPress: handleCancel, style: 'cancel' },
                { text: 'Yes', onPress: deleteProject },
            ],
            { cancelable: false }
        );

    }

    const deleteProject = async () => {
        try {

            console.log("deleting project", title)
            const response = await axiosPrivate.delete(`/projects/delete-project/${id}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`
                    }
                }
            )
            console.log(response.data)
            if (response.status === 200) {
                Alert.alert('Success!!', `${title} Deleted!`)
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

    const handleRestoreProject = async () => {
        try {

            console.log("restoring project", title)
            const response = await axiosPrivate.post(`/projects/restore-project/${id}`,
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
            if (response.status === 201) {
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

            <View className="bg-black-200 border-orange-100 border-1 rounded-lg h-22 p-3 mt-3 justify-center">
                <View className="flex 1 justify-center">
                    <View className="items-center justify-center">
                        <Image
                            source={icons.users}
                            className="h-16 w-12 "
                        />
                    </View>

                    <View className="justify-center items-center ml-3 ">
                        <Text className="text-green-100 flex-wrap font-pbold"> {item.name} </Text>
                        <Text className="text-green-100 font-pthin"> {item.jobTitle} </Text>
                    </View>

                </View>

            </View>
        </TouchableOpacity>

    );

    const renderTaskItem = ({ item }) => (

        <View className="bg-black-200 border-orange-100 border-1 rounded-lg h-22 p-3 mt-3 justify-center">
            <View className="flex-row">
                <View className="justify-center">
                    <Image
                        source={icons.check}
                        className="h-16 w-12 "
                    />
                </View>

                <View className="justify-center ml-3">
                    <Text className="text-green-100 flex-wrap font-pbold"> Title: {item.title} </Text>
                    <Text className="text-gray-100 font-pthin"> Tags: {item.tags || "none"} </Text>
                    <Text className="text-gray-100 font-pthin"> Priority: {item.priority} </Text>
                    <Text className="text-gray-100 font-pthin"> Status: {item.status} </Text>
                </View>

            </View>

        </View>
    );
    const insets = useSafeAreaInsets();
    return (
        <SafeAreaView className="bg-primary h-full">
            <View className="px-2">
                <ScrollView stickyHeaderIndices={[0]}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

                >
                    <View className="bg-black-200 flex-1 justify-center rounded-lg  pt-2 h-32 px-4">
                        <View className="flex-1 justify-center">
                            <Text className="text-gray-100 text-2xl font-pbold">{title}</Text>
                            <Text className="text-orange-100 text-lg font-pthin">{isActive === "true" ? "Active" : "InActive"}</Text>
                        </View>
                        {archived === 'false' ? (
                            <View className="justify-center items-center space-x-2 mt-4 mb-2 mx-2 flex-row">
                                <View className="justify-center items-center flex-row">
                                    <Link href={{
                                        pathname: '/projects/newtask',
                                        params: { project_id: id }
                                    }} asChild>
                                        <TouchableOpacity className="justify-center items-center flex-row" >
                                            <Image
                                                source={icons.plus}
                                                className="h-6 w-6"
                                            />
                                            <Text className=" text-gray-100"> Task </Text>
                                        </TouchableOpacity>
                                    </Link>

                                </View>

                                <Text className="text-xl text-gray-100">|</Text>
                                <View className="justify-center items-center flex-row">
                                    <Link href={{
                                        pathname: '/projects/editproject',
                                        params: { id: id, description: description, title: title, isActive: isActive }
                                    }} asChild>
                                        <TouchableOpacity className="justify-center items-center flex-row">
                                            <Image
                                                source={icons.edit}
                                                className="h-6 w-6"
                                            />
                                            <Text className=" text-gray-100"> Edit </Text>
                                        </TouchableOpacity>
                                    </Link>
                                </View>

                                <Text className="text-xl text-gray-100">|</Text>
                                <View className="justify-center items-center flex-row">
                                    <Link href={{
                                        pathname: '/projects/archiveproject',
                                        params: { id: id, description: description, title: title, isActive: isActive }
                                    }} asChild>
                                        <TouchableOpacity className="justify-center items-center flex-row">
                                            <Image
                                                source={icons.archive}
                                                className="h-6 w-6"
                                            />
                                            <Text className=" text-gray-100"> Archive </Text>
                                        </TouchableOpacity>
                                    </Link>
                                </View>
                                <Text className="text-xl text-gray-100">|</Text>
                                <View className="justify-center items-center flex-row">
                                    <TouchableOpacity onPress={handleDeleteProject} className="justify-center items-center flex-row">
                                        <Image
                                            source={icons.trash}
                                            className="h-6 w-6"
                                        />
                                        <Text className=" text-gray-100"> Delete </Text>
                                    </TouchableOpacity>

                                </View>


                            </View>
                        ) : (<View className="justify-center items-center space-x-2 mt-4 mb-2 mx-2 flex-row">

                            <View className="justify-center items-center flex-row">

                                <TouchableOpacity onPress={handleRestoreProject} className="justify-center items-center flex-row">
                                    <Image
                                        source={icons.archive}
                                        className="h-6 w-6"
                                    />
                                    <Text className=" text-gray-100"> Restore Project</Text>
                                </TouchableOpacity>

                            </View>


                        </View>)}
                    </View>


                    <View className="bg-black-200 mt-2 pt-2 pl-2 rounded-lg">
                        <Text className="text-gray-100 text-lg font-pbold"> Users Assigned</Text>
                        <FlatList
                            className="mt-2 rounded-xl"
                            horizontal
                            showsVerticalScrollIndicator={false}
                            data={filteredUserData}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                        //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        />

                    </View>
                    <View className="bg-black-200 mt-2 mb-2 pt-2 pl-2 h-full flex-1 rounded-lg">

                        {/* {
                        filteredData && filteredData.length > 0 ? ( */}
                        <Text className="text-gray-100 text-lg font-pbold"> Task List</Text>
                        {
                            filteredData && filteredData.length > 0 ? (
                                <FlatList

                                    scrollEnabled={false}
                                    className="mt-2 rounded-xl"
                                    data={filteredData}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderTaskItem}
                                />
                            )
                                :
                                <Text className="text-gray-100 text-base font-pbold"> No Tasks in this Project</Text>
                        }

                    </View>




                </ScrollView>
            </View>
        </SafeAreaView >
    )
}

export default projectdetails