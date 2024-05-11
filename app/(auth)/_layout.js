import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name='sign-in'
                    options={{
                        headerShown: false
                    }}
                    initial

                />
                <Stack.Screen
                    name='sign-up'
                    options={{
                        headerShown: false
                    }}

                />
                <Stack.Screen
                    name='onboarding'
                    options={{
                        headerShown: false
                    }}

                />
            </Stack>
            {/* <StatusBar backgroundColor='#13193d' style='light' /> */}
        </>

    )
}

export default AuthLayout