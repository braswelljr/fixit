import React from 'react'
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Platform
} from 'react-native'
import Colors from '../assets/color'
import { AuthContext } from '../context/AuthProvider'
import MaterialCommIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Settings = ({ navigation }) => {
  const { logout } = React.useContext(AuthContext)
  const accountData = [
    {
      name: 'Edit Profile',
      link: 'ProfileEditor',
      disabled: false
    },
    {
      name: 'Change Password',
      link: 'ChangePassword',
      disabled: true
    }
  ]

  const favouritePlaces = [
    {
      name: 'Home',
      icon: <MaterialCommIcons name="home-roof" size={25} />,
      disabled: true
    },
    {
      name: 'Work',
      icon: <MaterialIcons name="work" size={20} />,
      disabled: true
    }
  ]

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={[{ paddingHorizontal: 30, marginTop: 30 }]}>
        {/* Account Header */}
        <View style={[styles.sectionHeader]}>
          <MaterialCommIcons
            name="account-cog"
            color={Colors.trueGray[500]}
            size={20}
          />
          <Text style={[styles.sectionHeaderText]}>Account</Text>
        </View>
        {/* Account content */}
        <View style={[styles.sectionContent, { paddingTop: 0 }]}>
          {accountData.map((data, i) => (
            <Pressable
              key={i}
              onPress={() => navigation.navigate(data.link)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: i == 0 ? 0 : 15,
                paddingVertical: 10,
                paddingHorizontal: 5
              }}
              disabled={data.disabled}
            >
              <Text style={[{ fontFamily: 'Montserrat-Regular' }]}>
                {data.name}
              </Text>

              {data.disabled === true ? (
                <Text style={styles.unavailable}>unavailable'</Text>
              ) : (
                <MaterialCommIcons
                  name="chevron-right"
                  size={20}
                  color={Colors.trueGray[900]}
                />
              )}
            </Pressable>
          ))}
        </View>
      </View>
      <View style={[{ paddingHorizontal: 30, marginTop: 30 }]}>
        {/* Favorite Header */}
        <View style={[styles.sectionHeader]}>
          <MaterialIcons
            name="favorite"
            color={Colors.trueGray[500]}
            size={20}
          />
          <Text style={[styles.sectionHeaderText]}>Favourite Places</Text>
        </View>
        {/* Favorite content */}
        <View style={[styles.sectionContent, { paddingTop: 0 }]}>
          {favouritePlaces.map((data, i) => (
            <Pressable
              key={i}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: i == 0 ? 0 : 15,
                paddingVertical: 10,
                paddingHorizontal: 5
              }}
              disabled={data.disabled}
            >
              <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
                {data.icon}
                <Text
                  style={[{ fontFamily: 'Montserrat-Regular', marginLeft: 20 }]}
                >
                  {data.name}
                </Text>
              </View>
              <Text style={styles.unavailable}>
                {data.disabled === true ? 'unavailable' : ''}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={[styles.cta, { marginTop: 80 }]}
        onPress={() => logout()}
      >
        <Text style={styles.ctaText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    minHeight: Dimensions.get('screen').height
  },
  header: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'MontserratAlternates-Bold',
    fontSize: 22,
    marginTop: Platform.OS == 'ios' ? 50 : 25
  },
  cta: {
    paddingHorizontal: 40,
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.yellow[200],
    borderRadius: 10
  },
  ctaText: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.black,
    textTransform: 'uppercase'
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.yellow[50],
    padding: 10
  },
  sectionHeaderText: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.trueGray[500],
    textTransform: 'uppercase',
    fontSize: 16,
    marginLeft: 10
  },
  sectionContent: {
    paddingVertical: 10
  },
  unavailable: {
    fontFamily: 'Montserrat-Thin',
    color: Colors.trueGray[500],
    textTransform: 'uppercase',
    fontSize: 10
  }
})

export default Settings
