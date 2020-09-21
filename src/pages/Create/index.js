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
  ActivityIndicator,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import LocationInput from "../../components/LocationInput";

import TripCard from "./../../components/TripCard";

import styles from "./styles";

import Footer from "./../../components/Footer";

import AsyncStorage from "@react-native-community/async-storage";

import { useNavigation } from "@react-navigation/native";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default class Create extends React.Component {
  state = {
    tripDuration: "",
    travelers: "",
    tripName: "",
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
    secondPage: false,
    thirdPage: false,
    totalDuration: 0,
    minDuration: 30,
    maxDuration: 35,
    showCalendarInitialDate: false,
    showCalendarEndDate: false,
    showFooter: true,
    saving: false,
  };

  updateTripDuration = () => {
    console.log("updating duration");
    const totalDays = this.state.placesToTravel.length
      ? this.state.placesToTravel.reduce(
          (acc, val) => val.duration * 1 + acc,
          0
        )
      : 0;
    this.setState({ totalDuration: totalDays });
  };

  saveTripDetails = async () => {
    if (this.state.totalDuration < this.state.minDuration) {
      return Alert.alert(
        "You need to add more locations to achieve the minimum duration."
      );
    }
    this.setState({ saving: true });
    const totalCost = this.state.placesToTravel.reduce((acc, value) => {
      return acc + this.state.travelers * value.budget;
    }, 0);
    const endDate = addDays(this.state.initialDate, this.state.tripDuration);
    const previousSavedObject = await this.getData();
    if (previousSavedObject !== null) {
      previousSavedObject[this.state.tripName] = {
        tripDuration: this.state.tripDuration,
        travelers: this.state.travelers,
        beginningDate: this.state.initialDate.getTime(),
        endDate: endDate.getTime(),
        totalCost: totalCost,
        placesToTravel: this.state.placesToTravel,
      };
    } else {
      previousSavedObject = {};
    }
    try {
      const jsonValue = JSON.stringify(previousSavedObject);
      await AsyncStorage.setItem("@BudgeTrip", jsonValue);
      await this.getData();
      this.setState({ saving: false });
      this.props.navigation.navigate("Trips");
    } catch (e) {
      console.log("error", e);
      this.setState({ saving: false });
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
    if (this.state.firstPage) {
      if (this.state.tripName.length && this.state.travelers) {
        this.setState({ firstPage: false, secondPage: true });
      } else {
        Alert.alert("You need to define a trip name and number of travelers.");
      }
    } else if (this.state.secondPage) {
      this.setState({ firstPage: false, secondPage: false, thirdPage: true });
    }
  };

  goToFirstPage = () => {
    if (this.state.secondPage) {
      this.setState({ firstPage: true, secondPage: false, thirdPage: false });
    } else if (this.state.thirdPage) {
      this.setState({ firstPage: false, secondPage: true, thirdPage: false });
    }
  };

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@BudgeTrip");
      console.log("I was able to get data");
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
      <View style={styles.createView}>
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
          onChangeText={(val) => this.setState({ travelers: val })}
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
      </View>
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
      <View style={styles.createView}>
        {this.state.placesToTravel.length > 0 && (
          <Text style={styles.whiteText}>
            You have set {this.state.placesToTravel.length} places and a total
            duration of {this.state.totalDuration}.
            {this.state.tripDuration < 30 && (
              <Text>
                The minimum duration is {this.state.minDuration} days.
              </Text>
            )}
          </Text>
        )}
        <LocationInput
          addDestinationToState={this.addDestinationToState}
          hideFooter={() => this.hideFooter()}
          showFooter={() => this.showFooter()}
          updateTripDuration={() => this.updateTripDuration()}
        />
      </View>
    );
  };

  deleteItem = (index) => {
    const totalItems = this.state.placesToTravel;
    totalItems.splice(index, 1);
    this.setState({ placesToTravel: totalItems });
  };

  renderLocationCards = () => {
    return (
      <View style={styles.scrollView}>
        <ScrollView contentContainerStyle={styles.resume}>
          {this.state.placesToTravel.length ? (
            this.state.placesToTravel.map((place, index) => {
              return (
                <TripCard
                  key={index}
                  location={place.country}
                  duration={place.duration * 1}
                  budget={place.budget * 1}
                  travelers={this.state.travelers * 1}
                  deleteItem={() => this.deleteItem(index)}
                />
              );
            })
          ) : (
            <View style={styles.createView}>
              <Text style={styles.title}>
                You have no locations for your trip.
              </Text>
              <Text style={styles.title}>Go back and start planning!</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  render() {
    return (
      <React.Fragment>
        <ScrollView contentContainerStyle={styles.container}>
          {this.state.firstPage && this.renderFirstPart()}
          {this.state.secondPage && this.renderAddLocation()}
          {this.state.thirdPage && this.renderLocationCards()}
          <Footer
            onClickContinue={this.onClickContinue}
            onClickBack={this.goToFirstPage}
            firstPage={this.state.firstPage}
            secondPage={this.state.secondPage}
            thirdPage={this.state.thirdPage}
            saveTrip={this.saveTripDetails}
            saving={this.state.saving}
            canSave={
              this.state.totalDuration >= this.state.minDuration ? true : false
            }
          />
        </ScrollView>
      </React.Fragment>
    );
  }
}
