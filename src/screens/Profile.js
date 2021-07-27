import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  Platform
} from 'react-native'
import MaterialCommIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Colors from '../assets/color'
import { AuthContext } from '../context/AuthProvider'
import ImagePicker from '../components/ImagePicker'

const Profile = ({ navigation }) => {
  const [picker, showPicker] = useState(false)
  const { USER } = useContext(AuthContext)

  return (
    <>
      <ImagePicker picker={picker} showPicker={showPicker} />
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Profile</Text>
        <View>
          {/* Avatar */}
          <View style={styles.avatar}>
            <Image
              source={
                USER.avatar === null
                  ? require('../assets/images/avatar.jpg')
                  : { uri: USER.avatar }
              }
              style={styles.avatarImg}
            />
            <TouchableOpacity
              style={styles.camera}
              onPress={() => showPicker(!picker)}
            >
              <MaterialCommIcons
                name="camera-iris"
                size={35}
                color={Colors.trueGray[700]}
              />
            </TouchableOpacity>
          </View>

          {/* User Details */}
          <View style={[{ marginTop: 25 }]}>
            {(USER.firstname !== null ||
              USER.lastname !== null ||
              USER.phone !== null) && (
              <TouchableOpacity
                style={[styles.cta]}
                onPress={() => navigation.navigate('ProfileEditor')}
              >
                <Text style={styles.ctaText}>Update Profile</Text>
              </TouchableOpacity>
            )}
            {/* username */}
            {(USER.firstname !== null || USER.lastname !== null) && (
              <View style={[styles.username]}>
                {USER.firstname !== null && (
                  <Text style={styles.name}>{USER.firstname}</Text>
                )}
                {USER.lastname !== null && (
                  <Text
                    style={[
                      styles.name,
                      { marginLeft: USER.firstname !== null ? 5 : 0 }
                    ]}
                  >
                    {USER.lastname}
                  </Text>
                )}
              </View>
            )}
            {/* email */}
            <View
              style={{
                backgroundColor: Colors.yellow[50],
                marginTop: 20
              }}
            >
              <View style={[styles.fieldContainer]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommIcons
                    name="email"
                    size={20}
                    color={Colors.trueGray[600]}
                  />
                  <Text
                    style={{ fontFamily: 'Montserrat-Thin', marginLeft: 10 }}
                  >
                    Email
                  </Text>
                </View>
                <Text style={{ fontFamily: 'Montserrat-Medium' }}>
                  {USER.email}
                </Text>
              </View>
              {USER.phone !== null && (
                <View
                  style={[
                    styles.fieldContainer,
                    {
                      marginTop: 5
                    }
                  ]}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommIcons
                      name="phone-outline"
                      size={20}
                      color={Colors.trueGray[600]}
                    />
                    <Text
                      style={{ fontFamily: 'Montserrat-Thin', marginLeft: 10 }}
                    >
                      Phone
                    </Text>
                  </View>
                  <Text style={{ fontFamily: 'Montserrat-Medium' }}>
                    {USER.phone}
                  </Text>
                </View>
              )}
            </View>
            {/* render card */}
            {(USER.firstname === null ||
              USER.lastname === null ||
              USER.phone === null) && (
              <View style={styles.card}>
                <Text style={styles.cardHeader}>Hi 😊</Text>
                <Text style={styles.cardText}>
                  Update your profile to help serve you better.
                </Text>
                <TouchableOpacity
                  style={[
                    styles.cta,
                    {
                      marginTop: 10,
                      marginHorizontal: 10
                    }
                  ]}
                  onPress={() => navigation.navigate('ProfileEditor')}
                >
                  <Text style={styles.ctaText}>Update Profile</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Add Places */}
            <Text style={styles.placeHeader}>Add Places</Text>
            <View>
              <Pressable style={styles.place} disabled={true}>
                <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
                  <MaterialCommIcons
                    name="home-roof"
                    size={25}
                    color={Colors.trueGray[700]}
                  />
                  <Text style={[styles.placeText]}>Home</Text>
                </View>
                <Text style={styles.unavailable}>{'unavailable'}</Text>
              </Pressable>
              <Pressable style={styles.place} disabled={true}>
                <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
                  <MaterialIcons
                    name="work"
                    size={20}
                    color={Colors.trueGray[700]}
                  />
                  <Text style={[styles.placeText]}>Work</Text>
                </View>
                <Text style={styles.unavailable}>{'unavailable'}</Text>
              </Pressable>

              {/* Add Places Button */}
              <TouchableOpacity
                style={[
                  styles.cta,
                  {
                    marginTop: 10,
                    marginHorizontal: 20
                  }
                ]}
              >
                <MaterialCommIcons
                  name="map-marker-radius"
                  size={20}
                  color={Colors.trueGray[700]}
                />
                <Text
                  style={[
                    styles.ctaText,
                    { textTransform: 'capitalize', marginLeft: 10 }
                  ]}
                >
                  Add Places
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  header: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'MontserratAlternates-Bold',
    fontSize: 22,
    marginTop: Platform.OS == 'ios' ? 60 : 30
  },
  avatar: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginTop: 20
  },
  avatarImg: {
    height: 150,
    width: 150,
    borderRadius: 100
  },
  camera: {
    position: 'absolute',
    padding: 5,
    bottom: 0,
    right: 0,
    borderRadius: 50,
    backgroundColor: Colors.yellow[200],
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {},
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
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15
  },
  card: {
    backgroundColor: Colors.yellow[100],
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10
  },
  cardHeader: {
    fontFamily: 'MontserratAlternates-SemiBold',
    fontSize: 20
  },
  cardText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16
  },
  username: { flexDirection: 'row', marginTop: 20, marginHorizontal: 30 },
  name: { fontFamily: 'Montserrat-SemiBold' },
  placeHeader: {
    fontFamily: 'MontserratAlternates-SemiBold',
    fontSize: 18,
    marginTop: 20,
    marginHorizontal: 30
  },
  unavailable: {
    fontFamily: 'Montserrat-Thin',
    color: Colors.trueGray[500],
    textTransform: 'uppercase',
    fontSize: 10
  },
  place: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 25
  },
  placeText: { fontFamily: 'Montserrat-Regular', marginLeft: 20 }
})

export default Profile
