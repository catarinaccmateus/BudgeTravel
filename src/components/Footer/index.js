import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

export default function Footer({
  onClickContinue,
  onClickBack,
  firstPage,
  secondPage,
  thirdPage,
  saveTrip,
  canSave,
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
        activeOpacity={1}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          source={require("../../../assets/icon_circular.png")}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={
          firstPage || secondPage ? () => onClickContinue() : () => saveTrip()
        }
        style={styles.continueButton}
      >
        {!thirdPage ? (
          <Image
            source={require("../../../assets/chevron_right.png")}
            style={styles.continueIcon}
          />
        ) : (
          <Image
            source={require("../../../assets/palm.png")}
            style={
              canSave && thirdPage
                ? styles.continueIcon
                : styles.disabledContinueIcon
            }
          />
        )}
        {!thirdPage ? (
          <Text>Continue</Text>
        ) : (
          <Text style={canSave && thirdPage ? {} : styles.disabledContinueIcon}>
            Save Trip
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
