import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity
} from 'react-native'
import Colors from '../assets/color'
import FeatherIcons from 'react-native-vector-icons/Feather'

const Search = ({ search, showSearch }) => {
  const [query, setQuery] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <TouchableOpacity onPress={() => showSearch(!search)}>
          <FeatherIcons
            name="chevron-left"
            size={30}
            color={Colors.trueGray[700]}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.searchbarText}
          placeholder="Search here"
          placeholderTextColor={Colors.trueGray[600]}
          value={query}
          onChangeText={e => setQuery(e)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: Colors.white
  },
  searchbar: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: Platform.OS == 'ios' ? 45 : 20,
    left: 20,
    right: 20,
    borderRadius: 30
  },
  searchbarText: {
    fontFamily: 'MontserratAlternates-SemiBold',
    fontWeight: 'normal',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: Colors.trueGray[800],
    width: '90%',
    backgroundColor: Colors.yellow[200],
    borderRadius: 30
  }
})

export default Search
