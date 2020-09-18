import React from "react";
import {
  Text,
  View,
  ScrollView,
} from "react-native";

import styles from "./styles";

export default class PreviousTrips extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{ ...styles.scrollView, ...styles.container }}>
        <Text>Hello</Text>

      </ScrollView>
    );
  }
}