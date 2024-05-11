import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSignedIn } from '../../redux/reducer/userReduser'
import { IconLogout } from '@tabler/icons-react-native'

export const SignOutButton = () => {
    const dispatch = useDispatch();

    const doSignOut = () => {
        dispatch(setIsSignedIn(false));
    }

    return (
        <Pressable onPress={doSignOut} className="mr-5">
            <IconLogout size={35} color="#FEBD00" />
        </Pressable>
    )
}

const TabIcon = ({ icon, color, name, focused }) => {

    return (
        <View className="items-center justify-center gap-2 ">

            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className="w-6 h-6"
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs `} style={{ color: color }} >
                {name}
            </Text>
        </View >
    )
}
const TabsLayout = () => {
    const isSignedIn = useSelector((state) => state.user.isSignedIn)

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FFA001',
                tabBarInactiveTintColor: '#CDCDE0',
                tabBarStyle: {
                    backgroundColor: '#161622',
                    borderTopWidth: 1,
                    borderTopColor: '#232533',
                    height: 65,
                },
                headerStyle: {
                    backgroundColor: '#13193d'
                },
                headerTintColor: '#FEBD00'
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.home}
                            color={color}
                            name={"Home"}
                            focused={focused}
                        />
                    )

                }}
                redirect={!isSignedIn}
            />
            <Tabs.Screen
                name="tasks"
                options={{
                    title: "Tasks",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.bookmark}
                            color={color}
                            name={"Tasks"}
                            focused={focused}
                        />
                    )

                }}
                redirect={!isSignedIn}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: "Create",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.plus}
                            color={color}
                            name={"Create"}
                            focused={focused}
                        />
                    )

                }}
                redirect={!isSignedIn}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerTitle: 'My Profile',
                    headerShown: true,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.profile}
                            color={color}
                            name={"Profile"}
                            focused={focused}
                        />
                    ),
                    headerRight: () => <SignOutButton />
                }}
                redirect={!isSignedIn}
            />
        </Tabs>
    )
}

export default TabsLayout