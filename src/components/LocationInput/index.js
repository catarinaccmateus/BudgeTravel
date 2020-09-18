import React from "react";
import { TextInput, View, Text, TouchableOpacity, Picker } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import styles from "./styles";
import countries from "../../utils/constants";
import { widthScale, heightScale } from "./../../utils/constants";

export default class LocationInput extends React.Component {
  state = {
    country: "",
    budget: "",
    duration: "",
  };
  render() {
    const countrySelected = this.state.country;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.titleDestination}>Choose your destination </Text>
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
              console.log("STATE", countrySelected);
              this.setState({ country: val });
            }}
            placeholder="Choose a country"
          />
          <TextInput
            style={styles.input}
            placeholder="Budget per day (€)"
            onChangeText={(budget) => this.setState({ budget: budget })}
            keyboardType={"number-pad"}
            onFocus={this.props.hideFooter}
            onBlur={this.props.showFooter}
          />
          <View style={styles.durationPicker}>
            <Picker
              selectedValue={this.state.duration}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ duration: itemValue })
              }
            >
              <Picker.Item label="Select trip duration" value={3} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="4" value={4} />
            </Picker>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.addDestinationToState(
              this.state.country,
              this.state.budget,
              this.state.duration
            )
          }
          style={styles.button}
        >
          <Text>Add location</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
