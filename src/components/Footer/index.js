import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import styles from "./styles";

import { useNavigation } from "@react-navigation/native";

export default function Footer({
  onClickContinue,
  onClickBack,
  firstPage,
  secondPage,
  thirdPage,
  saveTrip,
  canSave,
  saving,
  tripsPage,
}) {
  const navigation = useNavigation();
  return (
    <View
      style={!tripsPage ? styles.container : [styles.container, styles.extra]}
    >
      {!firstPage && !tripsPage && (
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
      )}
      {firstPage && !tripsPage && <View style={styles.backButton}></View>}
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
      {!tripsPage && (
        <TouchableOpacity
          onPress={
            firstPage || secondPage ? () => onClickContinue() : () => saveTrip()
          }
          style={styles.continueButton}
        >
          {!thirdPage && (
            <Image
              source={require("../../../assets/chevron_right.png")}
              style={styles.continueIcon}
            />
          )}
          {thirdPage && !saving && (
            <Image
              source={require("../../../assets/palm.png")}
              style={
                canSave && thirdPage
                  ? styles.continueIcon
                  : styles.disabledContinueIcon
              }
            />
          )}
          {thirdPage && saving && <ActivityIndicator />}

          {!thirdPage ? (
            <Text>Continue</Text>
          ) : (
            <Text
              style={canSave && thirdPage ? {} : styles.disabledContinueIcon}
            >
              Save Trip
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
