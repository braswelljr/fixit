import React, { useContext, useState, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'
import Colors from '../assets/color'
import { AuthContext } from '../context/AuthProvider'
import FeatherIcon from 'react-native-vector-icons/Feather'
import IonIcons from 'react-native-vector-icons/Ionicons'
import ImagePicker from '../components/ImagePicker'
import { usekeyboardHeight } from '../hooks/usekeyboard'
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayout'

const ProfileEditor = ({ navigation }) => {
  const { USER } = useContext(AuthContext)
  const [picker, showPicker] = useState(false)
  const scrollContainerRef = useRef()
  const keyboardShowRef = React.useRef()
  const [keyboardShowView, setKeyboardShowView] = React.useState(0)

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    roles: []
  })

  const changefirstnameInput = e => {
    setData({
      ...data,
      firstname: e
    })
  }
  const changelastnameInput = e => {
    setData({
      ...data,
      lastname: e
    })
  }
  const changephoneInput = e => {
    setData({
      ...data,
      phone: e
    })
  }

  const keyboardHeight = usekeyboardHeight()

  // keyboard listener
  useIsomorphicLayoutEffect(() => {
    const onKeyboardDidShow = () => {
      scrollContainerRef.current.scrollTo({
        x: 0,
        y: keyboardShowView,
        animated: true
      })
    }
    const onKeyboardDidHide = () => {
      scrollContainerRef.current.scrollTo({
        x: 0,
        y: 0,
        animated: true
      })
    }
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow)
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide)
    return () => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow)
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide)
    }
  }, [keyboardShowView])

  return (
    <>
      <ImagePicker picker={picker} showPicker={showPicker} />
      <ScrollView ref={scrollContainerRef} style={styles.container}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <FeatherIcon
            name="chevron-left"
            style={{ marginLeft: 10 }}
            color={Colors.trueGray[800]}
            size={25}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Edit Profile</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          ref={keyboardShowRef}
          onLayout={event => {
            setKeyboardShowView(event.nativeEvent.layout.y)
          }}
          style={styles.content}
        >
          <View style={styles.avatar}>
            {USER.avatar === null ? (
              <Image
                source={require('../assets/images/avatar.jpg')}
                style={styles.avatarImg}
              />
            ) : (
              <Image source={{ uri: USER.avatar }} style={styles.avatarImg} />
            )}
            <TouchableOpacity
              style={styles.camera}
              onPress={() => showPicker(!picker)}
            >
              <IonIcons name="ios-camera" size={35} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>

          {/* form */}
          <View>
            {/*
             * firstname
             */}
            <View style={{ position: 'relative' }}>
              <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
                Firstname
              </Text>
              <TextInput
                value={data.firstname}
                placeholder="John"
                placeholderTextColor={Colors.trueGray[400]}
                autoCapitalize="none"
                onChangeText={e => changefirstnameInput(e)}
                style={styles.textInput}
                keyboardType="email-address"
              />
            </View>
            {/* lastname */}
            <View style={{ position: 'relative', marginTop: 15 }}>
              <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
                Lastname
              </Text>
              <TextInput
                value={data.lastname}
                placeholder="Doe"
                placeholderTextColor={Colors.trueGray[400]}
                autoCapitalize="none"
                onChangeText={e => changelastnameInput(e)}
                style={styles.textInput}
                keyboardType="email-address"
              />
            </View>
            {/* phone */}
            <View style={{ position: 'relative', marginTop: 15 }}>
              <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>
                Phone Number
              </Text>
              <TextInput
                value={data.phone}
                placeholder="John Doe"
                placeholderTextColor={Colors.trueGray[400]}
                autoCapitalize="none"
                onChangeText={e => changephoneInput(e)}
                style={styles.textInput}
                keyboardType="email-address"
              />
            </View>
            <TouchableOpacity
              style={[styles.cta, { marginTop: 15, marginHorizontal: 0 }]}
              onPress={() => {}}
            >
              <Text style={styles.ctaText}>Update Profile</Text>
            </TouchableOpacity>
          </View>
          {/* Keyboard */}
          <View
            style={{
              height: keyboardHeight <= 0 ? keyboardHeight : keyboardHeight + 50
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
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
  },
  avatar: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: 30
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
  content: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10
  },
  textInput: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    borderWidth: 1,
    padding: 7,
    color: Colors.black,
    borderRadius: 7,
    marginVertical: 2.5
  }
})

export default ProfileEditor
