/**
 * App entry
 *
 */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HorizontalAnimation } from '../animations'
import Home from '../screens/Home'

const Stack = createStackNavigator()

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Welcome',
          headerShown: false,
          ...HorizontalAnimation
        }}
      />
    </Stack.Navigator>
  )
}

export default AppStack
