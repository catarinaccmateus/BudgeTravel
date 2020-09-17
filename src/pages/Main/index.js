import React from "react";
import { Text, View, Button, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

export default function Main({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/brand.png")}
        style={styles.logo}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Trips")}>
          <View style={styles.button}>
            <Image
              source={require("../../../assets/palm.png")}
              style={styles.buttonIcon}
            />
            <Text>Check your trips</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Create")}>
          <View style={styles.button}>
            <Image
              source={require("../../../assets/view.png")}
              style={styles.buttonIcon}
            />
            <Text>Create a new trip</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
