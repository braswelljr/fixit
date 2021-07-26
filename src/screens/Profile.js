import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform
} from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import Colors from '../assets/color'
import { AuthContext } from '../context/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import ImagePicker from '../components/ImagePicker'

const Profile = () => {
  const [picker, showPicker] = useState(false)
  const navigation = useNavigation()
  const { USER } = useContext(AuthContext)

  return (
    <>
      <ImagePicker picker={picker} showPicker={showPicker} />
      <View style={styles.container}>
        <ImageBackground
          style={styles.header}
          source={require('../assets/images/mechanic-ii.jpg')}
        >
          <View style={styles.headerCover}>
            <Text style={styles.topic}>Profile</Text>
          </View>
        </ImageBackground>
        <View style={styles.avatar}>
          {USER.avatar === null ? (
            <>
              <Image
                source={require('../assets/images/avatar.jpg')}
                style={styles.avatarImg}
              />
              <TouchableOpacity
                style={styles.camera}
                onPress={() => showPicker(!picker)}
              >
                <IonIcons
                  name="ios-camera"
                  size={35}
                  style={styles.cameraIcon}
                />
              </TouchableOpacity>
            </>
          ) : (
            <Image source={{ uri: USER.avatar }} style={styles.avatarImg} />
          )}
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            style={[
              styles.cta,
              {
                width: '45%',
                alignSelf: 'flex-end',

                marginTop: 80,
                marginRight: 20
              }
            ]}
            onPress={() => navigation.navigate('ProfileEditor')}
          >
            <FeatherIcons name="bookmark" size={15} style={styles.cameraIcon} />
            <Text style={[styles.ctaText, { fontSize: 12, marginLeft: 10 }]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          {/* Profile */}
          <View style={styles.profile}>
            {/* email */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FeatherIcons
                name="mail"
                size={18}
                color={Colors.trueGray[700]}
              />
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  marginLeft: 10,
                  fontSize: 16
                }}
              >
                {USER.email}
              </Text>
            </View>

            <View></View>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    minHeight: Dimensions.get('screen').height
  },
  header: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.6
  },
  headerCover: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  topic: {
    fontFamily: 'MontserratAlternates-Bold',
    textTransform: 'uppercase',
    fontSize: 40,
    color: Colors.white,
    textAlign: 'center',
    marginTop: Platform.OS == 'ios' ? 130 : 100
  },
  avatar: {
    height: 150,
    width: 150,
    position: 'relative',
    alignSelf: 'flex-start',
    top: '-27.5%',
    zIndex: 1,
    overflow: 'hidden'
  },
  avatarImg: {
    height: 150,
    width: 150,
    borderRadius: 100,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 5,
      height: 5
    }
  },
  camera: {
    position: 'absolute',
    zIndex: 2,
    bottom: 7.5,
    right: 7.5,
    padding: 2.5,
    borderRadius: 10,
    backgroundColor: Colors.trueGray[200]
  },
  cameraIcon: {
    color: Colors.trueGray[700]
  },
  content: {
    position: 'absolute',
    width: '100%',
    height: '65%',
    backgroundColor: Colors.trueGray[50],
    borderTopLeftRadius: 65,
    borderTopRightRadius: 50,
    bottom: 0
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
  profile: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 20,
    backgroundColor: Colors.yellow[50]
  },
  updateCard: {
    marginVertical: 15,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: Colors.sky[50],
    borderRadius: 20
  },
  updateCardtext: {
    fontFamily: 'MontserratAlternates-Medium',
    fontSize: 16
  },
  name: {
    fontFamily: 'MontserratAlternates-SemiBold',
    fontSize: 16
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  }
})

export default Profile
