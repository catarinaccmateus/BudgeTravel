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

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class Create extends React.Component {
  state = {
    tripDuration: "",
    travelers: "",
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

  saveTripDetails = () => {
    console.log("Saving");
  };

  addDestinationToState = (country, budget) => {
    let actualPlaces = this.state.placesToTravel.push(this.state.test);
    console.log("STATE PLACES", actualPlaces);
    const updatedPlaces = actualPlaces.push(this.state.test);
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
        <Text>Location </Text>
        <LocationInput addDestinationToState={this.addDestinationToState} />
        {this.state.placesToTravel.length > 0 &&
          this.state.placesToTravel.map((place) => {
            return (
              <View>
                <Text>
                  Location : {place.country} - Budget per person: {place.budger}
                </Text>
              </View>
            );
          })}
      </View>
    );
  };

  render() {
    console.log("STATE", this.state);
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          {this.state.firstPage
            ? this.renderFirstPart()
            : this.renderAddLocation()}
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
