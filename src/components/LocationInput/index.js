import React, { useState } from "react";
import { TextInput, View, Button, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import styles from "./styles";
import countries from "../../utils/constants";

export default class LocationInput extends React.Component {
  state = {
    country: "",
    budget: "",
    duration: "",
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text>Location </Text>
          <DropDownPicker
            items={countries}
            containerStyle={styles.dropdown}
            style={styles.dropdown}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(val) => {
              console.log("SELECTED", val);
              console.log("STATE", this.state.country);
              this.setState({ country: val });
            }}
            placeholder="Choose a country"
          />
          <TextInput
            style={styles.input}
            placeholder="Budget per day (€)"
            onChangeText={(budget) => this.setState({ budget: budget })}
            keyboardType={"number-pad"}
          />
          <TextInput
            style={styles.input}
            placeholder="Number of days"
            onChangeText={(val) => this.setState({ duration: val })}
            keyboardType={"number-pad"}
          />
        </View>
        <Button
          onPress={() =>
            this.props.addDestinationToState(
              this.state.country,
              this.state.budget,
              this.state.duration
            )
          }
          title="Add"
          color="#ffd699"
          style={styles.button}
        />
      </View>
    );
  }
}
