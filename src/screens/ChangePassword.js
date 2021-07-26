import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Dimensions
} from 'react-native'
import Colors from '../assets/color'
import FeatherIcon from 'react-native-vector-icons/Feather'

const ChangePassword = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <FeatherIcon
          name="chevron-left"
          style={{ marginLeft: 10 }}
          color={Colors.trueGray[800]}
          size={25}
        />
      </TouchableOpacity>
      <Text style={styles.header}>Reset Password</Text>
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
  back: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 50 : 25,
    left: 15,
    zIndex: 2
  },
  header: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'MontserratAlternates-Bold',
    fontSize: 22,
    marginTop: Platform.OS == 'ios' ? 50 : 25
  }
})

export default ChangePassword
