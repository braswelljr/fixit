import React, { useRef, useContext } from 'react'
import { StyleSheet, TouchableOpacity, Text, Animated } from 'react-native'
import Colors from '../assets/color'
import { toAnime } from '../animations'
import { selectFromLibrary, takePhoto } from '../utils/uploadImage'
import { AuthContext } from '../context/AuthProvider'

const ImagePicker = ({ picker, showPicker }) => {
  const translateY = useRef(new Animated.Value(0)).current
  const { USER } = useContext(AuthContext)
  const uid = USER.uid

  if (picker === true)
    toAnime({
      ref: translateY,
      toValue: 0,
      duration: 300
    })
  else
    toAnime({
      ref: translateY,
      toValue: 150,
      duration: 300
    })

  return (
    <>
      {picker === true && (
        <TouchableOpacity
          style={styles.cancel}
          onPress={() => showPicker(!picker)}
        />
      )}
      <Animated.View
        ref={translateY}
        style={[
          styles.imageBtns,
          {
            transform: [
              {
                translateY: translateY
              }
            ]
          }
        ]}
      >
        <TouchableOpacity
          style={styles.cta}
          onPress={() => takePhoto(showPicker, uid)}
        >
          <Text style={styles.ctaText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.cta, { marginTop: 20 }]}
          onPress={() => selectFromLibrary(showPicker, uid)}
        >
          <Text style={styles.ctaText}>Choose from Gallery</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  cancel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: 'rgba(200, 200, 200, 0.7)'
  },
  imageBtns: {
    position: 'absolute',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    bottom: 0,
    zIndex: 2,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: Colors.yellow[50],
    justifyContent: 'space-around',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 1,
      height: 10
    },
    shadowOpacity: 0.7,
    shadowRadius: 5
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

export default ImagePicker
