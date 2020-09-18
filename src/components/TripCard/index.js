import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";

import styles from "./styles";

export default class TripCard extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => console.log("PRESSED")}
        style={styles.card}
      >
        <View style={styles.content}>
          <Text>Location</Text>
          <Text>Nr of days</Text>
          <Text>Total</Text>
        </View>

        <Divider />
        <View style={styles.content}>
          <Text>Location</Text>
          <Text>Nr of days</Text>
          <Text>Total</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
