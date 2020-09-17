import React from "react";
import { Text, View, Button, Image, TouchableOpacity } from "react-native";

import styles from "./styles";
import { buttonOpacity } from "../../utils/constants"


export default function Main({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/brand.png")}
        style={styles.logo}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity activeOpacity={buttonOpacity} onPress={() => navigation.navigate("Create")}>
          <View style={styles.button}>
            <Image
              source={require("../../../assets/palm.png")}
              style={styles.buttonIcon}
            />
            <Text>Create trip</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={buttonOpacity} onPress={() => navigation.navigate("Trips")}>
          <View style={styles.button}>
            <Image
              source={require("../../../assets/view.png")}
              style={styles.buttonIcon}
            />
            <Text>View trip</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
