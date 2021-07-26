/**
 * App entry
 *
 */
import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HorizontalAnimation } from '../animations'
import Home from '../screens/Home'
import Settings from '../screens/Settings'
import Profile from '../screens/Profile'
import ProfileEditor from '../screens/ProfileEditor'
import ChangePassword from '../screens/ChangePassword'
import MaterialCommicons from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcons from 'react-native-vector-icons/Entypo'
import Colors from '../assets/color'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Home') {
            return (
              <View
                style={{
                  backgroundColor: focused ? Colors.yellow[200] : '',
                  paddingHorizontal: 50,
                  borderRadius: 40,
                  paddingVertical: 10
                }}
              >
                <MaterialCommicons
                  name="map-marker-radius"
                  size={25}
                  color={Colors.trueGray[800]}
                />
              </View>
            )
          } else if (route.name === 'Profile') {
            return (
              <View
                style={{
                  backgroundColor: focused ? Colors.yellow[200] : '',
                  paddingHorizontal: 50,
                  borderRadius: 40,
                  paddingVertical: 10
                }}
              >
                <EntypoIcons
                  name="user"
                  size={25}
                  color={Colors.trueGray[800]}
                />
              </View>
            )
          } else if (route.name === 'Settings') {
            return (
              <View
                style={{
                  backgroundColor: focused ? Colors.yellow[200] : '',
                  paddingHorizontal: 50,
                  borderRadius: 40,
                  paddingVertical: 10
                }}
              >
                <MaterialCommicons
                  name="cog"
                  size={25}
                  color={Colors.trueGray[800]}
                />
              </View>
            )
          }
        }
      })}
      tabBarOptions={{ showLabel: false }}
    >
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
          title: 'Edit Profile',
          headerShown: false,
          ...HorizontalAnimation
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: 'Change Password',
          headerShown: false,
          ...HorizontalAnimation
        }}
      />
    </Stack.Navigator>
  )
}

export default AppStack
