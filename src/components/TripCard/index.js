import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";

import styles from "./styles";

export default function TripCard({
  location,
  duration,
  budget,
  travelers,
  deleteItem,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text>Location</Text>
        <Text>Nr of days</Text>
        <Text>Total €</Text>
        <Text>Delete?</Text>
      </View>

      <Divider />
      <View style={styles.content}>
        <Text style={styles.text}>{location}</Text>
        <Text style={styles.text}>{duration}</Text>
        <Text style={styles.text}>{budget * travelers * duration} €</Text>
        <TouchableOpacity onPress={deleteItem}>
          <Text style={styles.text}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
