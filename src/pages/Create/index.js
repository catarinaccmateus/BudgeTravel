import React from "react";
import {
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from "react-native";

import LocationInput from "../../components/LocationInput";

import styles from "./styles";

import Footer from "./../../components/Footer";

import AsyncStorage from "@react-native-community/async-storage";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class Create extends React.Component {
  state = {
    tripDuration: "",
    travelers: "",
    tripName: "Trip1",
    date: {
      start: "",
      end: "",
    },
    placesToTravel: [],
    openLocationInput: false,
    maxNumberDestination: 12,
    firstPage: true,
    totalDuration: 0,
    minDuration: 30,
    maxDuration: 35,
    test: {
      country: "Hello",
      budget: "29",
    },
  };

  saveTripDetails = async () => {
    console.log("Saving");
    try {
      const jsonValue = JSON.stringify(this.state);
      await AsyncStorage.setItem(`@${this.state.tripName}`, jsonValue);
    } catch (e) {
      console.log("COULDNT ADD");
    }
  };

  addDestinationToState = (country, budget, duration) => {
    let actualPlaces = this.state.placesToTravel;
    actualPlaces.push({ country: country, budget: budget, duration: duration });
    this.setState({
      placesToTravel: actualPlaces,
    });
  };

  onClickContinue = () => {
    this.setState({ firstPage: false });
  };

  goToFirstPage = () => {
    this.setState({ firstPage: true });
  };

  renderFirstPart = () => {
    return (
      <React.Fragment>
        <Text style={styles.title}>Let's start your trip planning!</Text>
        <TextInput
          style={styles.input}
          placeholder="Trip duration"
          keyboardType={"number-pad"}
          onChangeText={(tripDuration) => this.setState({ tripDuration })}
        />
        <TextInput
          style={styles.input}
          placeholder="Number of travelers"
          onChangeText={(travelers) => this.setState({ travelers })}
          keyboardType={"number-pad"}
          onSubmitEditing={Keyboard.dismiss}
        />
      </React.Fragment>
    );
  };

  renderAddLocation = () => {
    return (
      <View>
        <LocationInput addDestinationToState={this.addDestinationToState} />
        {this.state.placesToTravel.length > 0 &&
          this.state.placesToTravel.map((place) => {
            return (
              <View>
                <Text>
                  Location : {place.country} - Budget per person: {place.budget}
                </Text>
              </View>
            );
          })}
      </View>
    );
  };

  render() {
    const totalDays = this.state.placesToTravel.reduce(
      (prev, curr) => prev.duration + curr,
      0
    );
    console.log("total days", totalDays);
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          {this.state.firstPage
            ? this.renderFirstPart()
            : this.renderAddLocation()}
          <Button onPress={this.saveTripDetails} />
          <Footer
            onClickContinue={() => this.onClickContinue()}
            onClickBack={() => this.goToFirstPage()}
            firstPage={this.state.firstPage}
          />
        </View>
      </DismissKeyboard>
    );
  }
}
