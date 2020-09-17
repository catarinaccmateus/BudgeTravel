import React from "react";
import {
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

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
    initialDate: new Date(),
    endDate: new Date(),
    openLocationInput: false,
    maxNumberDestination: 12,
    firstPage: true,
    totalDuration: 0,
    minDuration: 30,
    maxDuration: 35,
    showCalendarInitialDate: false,
    showCalendarEndDate: false,
  };

  saveTripDetails = async () => {
    const previousSavedObject = this.getData();
    if (previousSavedObject !== null) {
      previousSavedObject[this.state.tripName] = {
        tripDuration: this.state.tripDuration,
        travelers: this.state.travelers,
        placesToTravel: this.state.placesToTravel,
      };
    } else {
      previousSavedObject = {};
    }
    try {
      const jsonValue = JSON.stringify(previousSavedObject);
      await AsyncStorage.setItem("@BudgeTrip", jsonValue);
      console.log("SAVED");
      this.getData();
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

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@BudgeTrip");
      console.log("getData", jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return null;
    }
  };

  renderFirstPart = () => {
    return (
      <React.Fragment>
        <Text style={styles.title}>Let's start your trip planning!</Text>
        <TextInput
          style={styles.input}
          placeholder="Trip Name"
          onChangeText={(val) => this.setState({ tripName: val })}
          keyboardType={"default"}
          onSubmitEditing={Keyboard.dismiss}
        />
        <TextInput
          style={styles.input}
          placeholder="Number of travelers"
          onChangeText={(travelers) => this.setState({ travelers })}
          keyboardType={"number-pad"}
          onSubmitEditing={Keyboard.dismiss}
        />
        {this.state.showCalendarInitialDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.initialDate}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={(val) => this.setState({ initialDate: val })}
          />
        )}
        {this.state.showCalendarEndDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.endDate}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={(val) => this.setState({ endDate: val })}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Trip duration"
          keyboardType={"number-pad"}
          onChangeText={(tripDuration) => this.setState({ tripDuration })}
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
    const totalDays = this.state.placesToTravel.length
      ? this.state.placesToTravel.reduce(
          (acc, val) => val.duration * 1 + acc,
          0
        )
      : "";
    console.log("total days", totalDays);
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          {this.state.firstPage
            ? this.renderFirstPart()
            : this.renderAddLocation()}
          <Footer
            onClickContinue={this.onClickContinue}
            onClickBack={this.goToFirstPage}
            firstPage={this.state.firstPage}
            saveTrip={this.saveTripDetails}
          />
        </View>
      </DismissKeyboard>
    );
  }
}
