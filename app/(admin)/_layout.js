import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { Tabs, Redirect, Link } from 'expo-router'
import { icons } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSignedIn } from '../../redux/reducer/userReduser'
import { IconLogout } from '@tabler/icons-react-native'
import { StatusBar } from 'expo-status-bar'

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

export const HeaderTitle = ({ title }) => {
    return (
        <Text className="font-pbold text-2xl text-orange-100">{title}</Text>
    )
}

export const InsertButton = ({ title, archive }) => {
    return (
        <View className="flex-row">
            <View>
                <Link href={{
                    pathname: `${archive}`,
                    params: { id: 'bacon' }
                }} asChild>
                    <Pressable className="mr-5">
                        <Image
                            source={icons.archive}
                            className="h-8 w-8 bg-blend-color-burn"
                            tintColor={"#FFA001"}
                        />
                    </Pressable>
                </Link>
            </View>
            <View>
                <Link href={{
                    pathname: `${title}`,
                    params: { id: 'bacon' }
                }} asChild>
                    <Pressable className="mr-5">
                        <Image
                            source={icons.plus}
                            className="h-8 w-8 bg-blend-color-burn"
                            tintColor={"#FFA001"}
                        />
                    </Pressable>
                </Link>
            </View>
        </View>

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
        <>
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

                }}
                backBehavior='history'
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerTitle: () => <HeaderTitle title={"Home"} />,
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
                    name="projects"
                    options={{
                        title: "Projects",
                        headerTitle: () => <HeaderTitle title={"Projects"} />,
                        headerShown: true,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.project}
                                color={color}
                                name={"Projects"}
                                focused={focused}
                            />
                        ),
                        headerRight: () => <InsertButton title={"/projects/newproject"} archive={"/projects/archivelist"} />
                    }}
                    redirect={!isSignedIn}
                />
                <Tabs.Screen
                    name="tasks"
                    options={{
                        title: "Tasks",
                        headerTitle: () => <HeaderTitle title={"Tasks"} />,
                        headerShown: true,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.task}
                                color={color}
                                name={"Tasks"}
                                focused={focused}
                            />
                        ),
                        headerRight: () => <InsertButton title={"/tasks/newtask"} archive={"/tasks/archivelist"} />

                    }}
                    redirect={!isSignedIn}
                />
                <Tabs.Screen
                    name="users"
                    options={{
                        title: "Users",
                        headerTitle: () => <HeaderTitle title={"Users"} />,
                        headerShown: true,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.users}
                                color={color}
                                name={"Users"}
                                focused={focused}
                            />
                        ),
                        headerRight: () => <InsertButton title={"/users/newuser"} archive={"/users/archivelist"} />

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

            <StatusBar backgroundColor='#13193d' style='light' />
        </>
    )
}

export default TabsLayout