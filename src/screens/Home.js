import React, { useCallback, useRef, useState, createRef } from 'react'
import { View, Animated, Dimensions, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Colors from '../assets/color'
import Search from '../components/Search'
import Tabs from '../components/Tabs'
import Index from './Home/Index'
import Profile from './Home/Profile'
import Settings from './Home/Settings'
import ImagePicker from '../components/ImagePicker'

const Home = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  const ScrollViewref = useRef()
  const [search, showSearch] = useState(false)
  const [picker, showPicker] = useState(false)
  const data = [
    {
      title: 'Home',
      ref: createRef()
    },
    {
      title: 'Profile',
      ref: createRef()
    },
    {
      title: 'Settings',
      ref: createRef()
    }
  ]
  const onItemPress = useCallback(itemIndex => {
    ScrollViewref?.current?.scrollTo({
      x: itemIndex * Dimensions.get('screen').width,
      y: 0,
      animated: true
    })
  }, [])

  return (
    <Animatable.View
      style={styles.container}
      animation="slideInRight"
      contentInsetAdjustmentBehavior="automatic"
      duration={500}
      easing="ease"
      useNativeDriver={true}
    >
      {search == true && <Search search={search} showSearch={showSearch} />}
      {<ImagePicker picker={picker} showPicker={showPicker} />}
      <Animated.ScrollView
        ref={ScrollViewref}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX }
              }
            }
          ],
          { useNativeDriver: false }
        )}
        bounces={false}
      >
        <Index search={search} showSearch={showSearch} />
        <Profile picker={picker} showPicker={showPicker} />
        <Settings />
      </Animated.ScrollView>
      {/* Tabs */}
      <View style={styles.slab}>
        <Tabs data={data} scrollX={scrollX} onItemPress={onItemPress} />
      </View>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  slab: {
    position: 'absolute',
    margin: 10,
    zIndex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 20,
    backgroundColor: Colors.yellow[50]
  }
})

export default Home
