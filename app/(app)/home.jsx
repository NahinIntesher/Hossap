import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function Home() {
  return (
    <View>
      <View style={styles.topContainer}>
        <View style={{ flex: 2, backgroundColor: "red" }}>
          <Text>Nahin</Text>
          <Ionicons name="search" size={32} color="green" />
        </View>
        <View style={{ flex: 1 }}>
          <Text>Hello</Text>
          <Text>Nahin</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
})