// import { Platform, ToastAndroid } from 'react-native'
import ImageCropPicker from 'react-native-image-crop-picker'
import storage from '@react-native-firebase/storage'

const upLoadImg = async (image, uid) => {
  const { path } = image
  const filename = `${uid}--${path.substring(path.lastIndexOf('/') + 1)}`
  const uploadUri = path.replace('file://', '')

  const task = storage().ref(filename).putFile(uploadUri)

  // set progress state
  // task.on('state_changed', snapshot => {
  //   setTransferred(
  //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
  //   )
  // })

  try {
    await task
    // .then(() => {
    //   console.log('Image uploaded to the bucket!')
    // })
    // .catch(error => {
    //   console.error('Something happend:', error)
    // })
  } catch (e) {
    console.error(e)
  }
  // setUploading(false)
  // Alert.alert(
  //   'Photo uploaded!',
  //   'Your photo has been uploaded to Firebase Cloud Storage!'
  // )
  // setImage(null)
}

export const selectFromLibrary = (showPicker, uid) => {
  ImageCropPicker.openPicker({
    width: 400,
    height: 400,
    cropping: true
  })
    .then(image => {
      upLoadImg(image, uid)
      console.log(image)
      showPicker(false)
    })
    .catch(error => {
      console.log('Something happened : ', error)
      showPicker(false)
    })
}

export const takePhoto = (showPicker, uid) => {
  ImageCropPicker.openCamera({
    width: 400,
    height: 400,
    cropping: true
  })
    .then(image => {
      upLoadImg(image, uid)
      showPicker(false)
    })
    .catch(error => {
      console.log('Something happened : ', error)
      showPicker(false)
    })
}
