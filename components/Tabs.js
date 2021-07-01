import React, {
  useRef,
  createRef,
  forwardRef,
  useState,
  useEffect,
  useCallback
} from 'react'
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Animated
} from 'react-native'
import Colors from '../assets/color'

const { width, height } = Dimensions.get('screen')

const images = {
  home: require('../assets/images/mechanic-2.jpg'),
  driver: require('../assets/images/driver-1.jpg'),
  mechanic: require('../assets/images/mechanic-1.jpg')
}

const data = Object.keys(images).map(i => ({
  key: i,
  title: i,
  image: images[i],
  ref: createRef()
}))

const Indicator = ({ measures, scrollX }) => {
  const inputRange = data.map((_, i) => i * width)
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.width + 20)
  })
  const indicatorHeight = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.height + 10)
  })
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.x)
  })

  return (
    <Animated.View
      style={{
        backgroundColor: Colors.purple[500],
        height: indicatorHeight,
        position: 'absolute',
        width: indicatorWidth,
        bottom: -5,
        opacity: 0.3,
        borderRadius: 10,
        left: -10,
        transform: [
          {
            translateX: translateX
          }
        ]
      }}
    />
  )
}

const Tab = forwardRef(({ item, onItemPress }, ref) => {
  return (
    <TouchableOpacity onPress={() => onItemPress}>
      <View ref={ref}>
        <Text
          style={{
            color: Colors.white,
            fontSize: 84 / data.length,
            fontWeight: '800',
            textTransform: 'uppercase'
          }}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
})

const Tabs = ({ data, scrollX, onItemPress }) => {
  const containerRef = useRef()
  const [measures, setMeasures] = useState([])

  useEffect(() => {
    let m = []
    data.forEach(item => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({ x, y, width, height })

          if (m.length === data.length) {
            setMeasures(m)
          }
        }
      )
    })
  }, [])

  return (
    <View
      style={{
        position: 'absolute',
        top: Platform.Os === 'ios' ? 100 : 70,
        width
      }}
    >
      <View
        ref={containerRef}
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          flexDirection: 'row'
        }}
      >
        {data.map((item, index) => (
          <Tab
            key={item.key}
            item={item}
            ref={item.ref}
            onItemPress={() => onItemPress(index)}
          />
        ))}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  )
}

const Index = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  const ref = useRef()
  const onItemPress = useCallback(itemIndex => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width
    })
  }, [])

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={ref}
        data={data}
        keyExtractor={item => item.key}
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
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <ImageBackground
                source={item.image}
                style={{ flex: 1, resizeMode: 'cover' }}
              />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  { backgroundColor: 'rgba(0,0,0,0.3)' }
                ]}
              ></View>
            </View>
          )
        }}
      />
      <Tabs scrollX={scrollX} data={data} itemPress={onItemPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white
  }
})

export default Index
