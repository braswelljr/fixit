import React from 'react'
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Colors from '../../assets/color'
import { AuthContext } from '../../context/AuthProvider'

const Home = ({ navigation, route }) => {
  const { user, logout } = React.useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Text>Settings Page</Text>
      <TouchableOpacity style={styles.cta} onPress={() => logout()}>
        <Text style={styles.ctaText}>Logout</Text>
      </TouchableOpacity>
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
