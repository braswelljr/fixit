import React from 'react'
import { View, Animated, Dimensions, StyleSheet } from 'react-native'
import Colors from '../assets/color'
import Tabs from '../components/Tabs'
import Index from './Home/Index'
import Profile from './Home/Profile'
import Settings from './Home/Settings'

const Home = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current
  const ScrollViewref = React.useRef()
  const data = [
    {
      title: 'Home',
      ref: React.createRef()
    },
    {
      title: 'Profile',
      ref: React.createRef()
    },
    {
      title: 'Settings',
      ref: React.createRef()
    }
  ]
  const onItemPress = React.useCallback(itemIndex => {
    ScrollViewref?.current?.scrollTo({
      x: itemIndex * Dimensions.get('screen').width,
      y: 0,
      animated: true
    })
  }, [])

  return (
    <View style={styles.container}>
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
        <Index />
        <Profile />
        <Settings />
      </Animated.ScrollView>
      {/* Tabs */}
      <View style={styles.slab}>
        <Tabs data={data} scrollX={scrollX} onItemPress={onItemPress} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  slab: {
    position: 'absolute',
    zIndex: 2,
    margin: 10,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 20,
    backgroundColor: Colors.yellow[50]
  }
})

export default Home
