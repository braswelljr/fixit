import React from 'react'
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  Image,
  StyleSheet,
  Platform
} from 'react-native'
import Colors from '../../assets/color'
import { AuthContext } from '../../context/AuthProvider'

const Home = ({ navigation, route }) => {
  const { user, logout } = React.useContext(AuthContext)
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.header}
        source={require('../../assets/images/mechanic-ii.jpg')}
      ></ImageBackground>
      <View style={styles.avatar}>
        <Image
          source={require('../../assets/images/avatar.jpg')}
          style={styles.avatarImg}
        />
      </View>
      <View style={styles.content}></View>
    </View>
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
    height: Dimensions.get('screen').height * 0.4
  },
  avatar: {
    height: 150,
    width: 150,
    position: 'absolute',
    alignSelf: 'center',
    top: '17.5%',
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: Colors.sky[900]
  },
  avatarImg: {
    height: 150,
    width: 150,
    borderRadius: 100
  },
  content: {
    position: 'absolute',
    width: '100%',
    height: '75%',
    backgroundColor: Colors.yellow[100],
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
    backgroundColor: Colors.yellow[300],
    borderRadius: 10
  },
  ctaText: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.black,
    textTransform: 'uppercase'
  }
})

export default Home
