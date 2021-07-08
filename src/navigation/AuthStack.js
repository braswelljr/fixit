import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HorizontalAnimation } from '../animations'
import Index from '../screens/Index'
import Register from '../screens/Register'
import Login from '../screens/Login'

const Stack = createStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Index">
      <Stack.Screen
        name="Index"
        component={Index}
        options={{
          title: 'Welcome',
          headerShown: false,
          ...HorizontalAnimation
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Welcome',
          headerShown: false,
          ...HorizontalAnimation
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Welcome',
          headerShown: false,
          ...HorizontalAnimation
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthStack
