import ImageCropPicker from 'react-native-image-crop-picker'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

const upLoadImg = async (image, uid) => {
  const { path } = image
  const filename = `${uid}`
  const uploadUri = path.replace('file://', '')

  const reference = storage().ref(filename)
  const task = reference.putFile(uploadUri)
  const downloadUrl = reference.getDownloadURL()

  try {
    task
      .then(() => {
        downloadUrl
          .then(url =>
            firestore()
              .collection('users')
              .doc(uid)
              .update({
                avatar: `${url}`
              })
          )
          .catch(error => console.error('Something happend:', error))
        console.log('Image uploaded to the bucket!')
      })
      .catch(error => {
        console.error('Something happend:', error)
      })
  } catch (e) {
    console.error('Something happend:', e)
  }
}

export const selectFromLibrary = (showPicker, uid) => {
  ImageCropPicker.openPicker({
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
