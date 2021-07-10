import React, { useContext } from 'react'
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform
} from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import Colors from '../../assets/color'
import { AuthContext } from '../../context/AuthProvider'
import firestore from '@react-native-firebase/firestore'

const Home = ({ picker, showPicker }) => {
  const { user } = useContext(AuthContext)

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          style={styles.header}
          source={require('../../assets/images/mechanic-ii.jpg')}
        >
          <View style={styles.headerCover}>
            <Text style={styles.topic}>Profile</Text>
          </View>
        </ImageBackground>
        <View style={styles.avatar}>
          <>
            <Image
              source={require('../../assets/images/avatar.jpg')}
              style={styles.avatarImg}
            />
            <TouchableOpacity
              style={styles.camera}
              onPress={() => showPicker(!picker)}
            >
              <IonIcons name="ios-camera" size={35} style={styles.cameraIcon} />
            </TouchableOpacity>
          </>
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            style={[
              styles.cta,
              {
                width: '45%',
                alignSelf: 'flex-end',

                marginTop: 40,
                marginRight: 15
              }
            ]}
          >
            <FeatherIcons name="bookmark" size={15} style={styles.cameraIcon} />
            <Text style={[styles.ctaText, { fontSize: 12, marginLeft: 10 }]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: Dimensions.get('screen').width,
    minHeight: Dimensions.get('screen').height,
    overflow: 'hidden'
  },
  header: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.5
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
    fontFamily: 'Montserrat-Bold',
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
    top: '-12.5%',
    zIndex: 1,
    marginLeft: 10,
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
    height: '55%',
    backgroundColor: Colors.trueGray[50],
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
  }
})

export default Home
