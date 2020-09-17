import React, { useState } from "react";
import { TextInput, View, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import styles from "./styles";
import countries from "../../utils/constants";

export default function Footer({ addDestinationToState }) {
  const [country, setCountry] = useState("");
  const [budget, setBudget] = useState("");

  return (
    <View style={styles.container}>
      <DropDownPicker
        items={countries}
        containerStyle={styles.dropdown}
        style={styles.dropdown}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
        onChangeItem={(country) => setCountry(country)}
        placeholder="Choose a country"
      />
      <TextInput
        style={styles.input}
        placeholder="Budget per day (€)"
        onChangeText={(budget) => setBudget(budget)}
        keyboardType={"number-pad"}
      />
      <Button
        onPress={() => addDestinationToState(country, budget)}
        title="Add"
        color="#ffd699"
      />
    </View>
  );
}
