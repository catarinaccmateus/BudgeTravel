import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";

import styles from "./styles";

import { useNavigation } from "@react-navigation/native";
export default class Trips extends React.Component {
  
  render() {

    return (
      <ScrollView contentContainerStyle={{ ...styles.scrollView, ...styles.container }}>
        <View style={[styles.card, { marginTop: 32 }]}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../assets/tracker.png")}
              style={styles.buttonIcon}
            />
            <View>
              <Text>Ongoing</Text>
              <Text style={{ fontWeight: "bold" }}>Trip name</Text>
            </View>
          </View>

          <TouchableOpacity activeOpacity={.4} style={styles.button}>
            <Text>Update</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../assets/bag.png")}
              style={styles.buttonIcon}
            />
            <View>
              <Text>Previous</Text>
              <Text style={{ fontWeight: "bold" }}>Trip</Text>
            </View>
          </View>

          <TouchableOpacity activeOpacity={.4} style={styles.button} >
            <Text>View</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../assets/clock_or_timed.png")}
              style={styles.buttonIcon}
            />
            <View>
              <Text>Next</Text>
              <Text style={{ fontWeight: "bold" }}>Trip</Text>
            </View>
          </View>

          <TouchableOpacity activeOpacity={.4} style={styles.button}>
            <Text>View</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }
}