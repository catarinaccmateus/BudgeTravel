import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import styles from "./styles";

export default function Trips({ navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.button}>THIS IS THE SECOND PAGE</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
