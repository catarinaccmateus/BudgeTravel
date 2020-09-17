import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

export default function Footer({
  onClickContinue,
  onClickBack,
  firstPage,
  saveTrip,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {!firstPage ? (
        <TouchableOpacity
          onPress={() => onClickBack()}
          style={styles.backButton}
        >
          <Image
            source={require("../../../assets/chevron_left.png")}
            style={styles.continueIcon}
          />
          <Text>Back</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton}></View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          source={require("../../../assets/icon_circular.png")}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={firstPage ? () => onClickContinue() : () => saveTrip()}
        style={styles.continueButton}
      >
        {firstPage ? (
          <Image
            source={require("../../../assets/chevron_right.png")}
            style={styles.continueIcon}
          />
        ) : (
          <Image
            source={require("../../../assets/palm.png")}
            style={styles.continueIcon}
          />
        )}
        {firstPage ? <Text>Continue</Text> : <Text>Add Trip</Text>}
      </TouchableOpacity>
    </View>
  );
}
