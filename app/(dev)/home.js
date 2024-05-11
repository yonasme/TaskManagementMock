import { View, Text, Button, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../redux/reducer/counterReducer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getProjects } from '../../redux/actions/projectAction'
const Home = () => {

    const projects = useSelector((state) => state.project.projects)
    const user = useSelector((state) => state.user.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProjects())
        console.log(projects)
    }, [])


    return (
        <SafeAreaView className="bg-white h-full w-full">
            <ScrollView>
                <View className='flex-1 pl-5 pt-5'>
                    <Text className="font-pbold text-xl">Welcome,  {user.name} </Text>
                    {/* <FlatList
                    data={projects.data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ListItem text={item.text} />}
                /> */}
                </View>
            </ScrollView>

        </SafeAreaView>

    )
}

export default Home