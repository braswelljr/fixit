import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  StyleSheet
} from 'react-native'
import Colors from '../assets/color'
import Search from '../components/Search'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../context/AuthProvider'

const Home = () => {
  const [search, showSearch] = useState(false)
  const { USER } = useContext(AuthContext)

  return (
    <>
      {search == true && <Search search={search} showSearch={showSearch} />}
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.searchbar}
          onPress={() => showSearch(true)}
        >
          <IonIcons
            name="location-sharp"
            size={20}
            color={Colors.trueGray[700]}
          />
          <Text style={styles.searchbarText}>Search here</Text>
        </TouchableOpacity>
        {/* Maps */}
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        ></MapView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: Dimensions.get('screen').width,
    minHeight: Dimensions.get('screen').height
  },
  searchbar: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    top: Platform.OS == 'ios' ? 45 : 20,
    left: 10,
    right: 10,
    backgroundColor: Colors.yellow[200],
    borderRadius: 30,
    zIndex: 1
  },
  searchbarText: {
    fontFamily: 'MontserratAlternates-SemiBold',
    fontSize: 16,
    marginLeft: 15
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  cta: {
    paddingHorizontal: 40,
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.yellow[100],
    borderRadius: 10
  },
  ctaText: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.black,
    textTransform: 'uppercase'
  }
})

export default Home
