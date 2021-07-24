/**
 * App entry
 *
 */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HorizontalAnimation } from '../animations'
import Home from '../screens/Home'
import Settings from '../screens/Settings'
import Profile from '../screens/Profile'
import ProfileEditor from '../screens/ProfileEditor'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack = () => {
  return (
    <Tab.Navigator initialRouteName="Profile">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerShown: false,
          ...HorizontalAnimation
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          headerShown: false,
          ...HorizontalAnimation
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          headerShown: false,
          ...HorizontalAnimation
        }}
      />
    </Tab.Navigator>
  )
}

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'Welcome',
          headerShown: false,
          ...HorizontalAnimation
        }}
      />
      <Stack.Screen
        name="ProfileEditor"
        component={ProfileEditor}
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
