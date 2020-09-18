import React from "react";
import {
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import LocationInput from "../../components/LocationInput";

import TripCard from "./../../components/TripCard";

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
    showFooter: true,
  };

  updateTripDuration = () => {
    const totalDays = this.state.placesToTravel.length
      ? this.state.placesToTravel.reduce(
          (acc, val) => val.duration * 1 + acc,
          0
        )
      : 0;
    this.setState({ totalDuration: totalDays });
  };

  saveTripDetails = async () => {
    const previousSavedObject = this.getData();
    if (previousSavedObject !== null) {
      previousSavedObject[this.state.tripName] = {
        tripDuration: this.state.tripDuration,
        travelers: this.state.travelers,
        beginningDate: this.state.beginningDate,
        placesToTravel: this.state.placesToTravel,
      };
    } else {
      previousSavedObject = {};
    }
    try {
      const jsonValue = JSON.stringify(previousSavedObject);
      await AsyncStorage.setItem("@BudgeTrip", jsonValue);
      this.getData();
    } catch (e) {
      Alert.alert("There was an error. Please, try again.");
    }
  };

  addDestinationToState = (country, budget, duration) => {
    let actualPlaces = this.state.placesToTravel;
    actualPlaces.push({ country: country, budget: budget, duration: duration });
    this.setState({
      placesToTravel: actualPlaces,
    });
    this.updateTripDuration();
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

  showBeginningDatepicker = () => {
    this.setState({
      showCalendarInitialDate: !this.state.showCalendarInitialDate,
    });
  };

  showEndingTimepicker = () => {
    this.setState({ showCalendarEndDate: !this.state.showCalendarEndDate });
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
          onFocus={() => this.hideFooter()}
          onBlur={() => this.showFooter()}
        />
        <TextInput
          style={styles.input}
          placeholder="Number of travelers"
          onChangeText={(val) => this.setState({ val })}
          keyboardType={"number-pad"}
          onFocus={() => this.hideFooter()}
          onBlur={() => this.showFooter()}
        />
        <TouchableOpacity onPress={this.showBeginningDatepicker}>
          <View style={[styles.input, styles.dateInput]}>
            <Text>
              {" "}
              {this.state.initialDate.getDate()} /{" "}
              {this.state.initialDate.getMonth() + 1} /
              {" " + this.state.initialDate.getFullYear()}
            </Text>
            <Image
              source={require("../../../assets/calendar.png")}
              style={styles.calendarIcon}
            />
          </View>
        </TouchableOpacity>
        {this.state.showCalendarInitialDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.initialDate}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={(event, val) => {
              const endDate =
                this.state.endDate < val ? val : this.state.endDate;
              this.setState({
                initialDate: val,
                endDate: endDate,
                showCalendarInitialDate: false,
              });
            }}
          />
        )}
      </React.Fragment>
    );
  };

  hideFooter = () => {
    this.setState({ showFooter: false });
  };

  showFooter = () => {
    this.setState({ showFooter: true });
  };

  renderAddLocation = () => {
    return (
      <View>
        <LocationInput
          addDestinationToState={this.addDestinationToState}
          hideFooter={() => this.hideFooter()}
          showFooter={() => this.showFooter()}
          updateTripDuration={() => this.updateTripDuration()}
        />
      </View>
    );
  };

  renderLocationCards = () => {
    {
      this.state.placesToTravel.length > 0 &&
        this.state.placesToTravel.map((item, index) => {
          return (
            <View key={index}>
              <Text>
                Location : {item.country} - Budget per person: {item.budget}
              </Text>
            </View>
          );
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ScrollView contentContainerStyle={styles.container}>
          <TripCard />
          {this.state.placesToTravel.length ? (
            <Text>
              You have added {this.state.placesToTravel.length} countries. Total
              duration: {this.state.totalDuration}
            </Text>
          ) : (
            <Text>You have no trips yet</Text>
          )}
          {this.state.firstPage
            ? this.renderFirstPart()
            : this.renderAddLocation()}
          <Footer
            onClickContinue={this.onClickContinue}
            onClickBack={this.goToFirstPage}
            firstPage={this.state.firstPage}
            saveTrip={this.saveTripDetails}
            canSave={
              this.state.totalDuration >= this.state.minDuration ? true : false
            }
          />
        </ScrollView>
      </React.Fragment>
    );
  }
}
