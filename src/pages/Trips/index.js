import React from "react";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";

import styles from "./styles";
import { Button } from "react-native-paper";

import AsyncStorage from "@react-native-community/async-storage";

export default class Trips extends React.Component {
  state = {
    plannedTrips: {},
    loading: true,
    error: false,
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    this.setState({ loading: true, error: false });
    console.log("1");
    try {
      console.log("2");
      const jsonValue = await AsyncStorage.getItem("@BudgeTrip");
      console.log("getData", jsonValue);
      if (jsonValue != null) {
        console.log("3");
        this.setState({
          loading: false,
          error: false,
          plannedTrips: JSON.parse(jsonValue),
        });
      } else {
        console.log("4");
        this.setState({
          loading: false,
          error: false,
          plannedTrips: JSON.parse(jsonValue),
        });
      }
    } catch (e) {
      this.state({ loading: false, error: true });
      return null;
    }
  };

  deleteStorage = async () => {
    try {
      await AsyncStorage.removeItem("@BudgeTravel");
      //    await AsyncStorage.clear()
      console.log("Async deleted");
      return true;
    } catch (rr) {
      console.log("Async dont deleted", err);
      return false;
    }
  };
  renderContent = () => {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          style={styles.loadingSpinner}
          size={"large"}
          color={"white"}
        />
      );
    } else if (this.state.error) {
      return (
        <View>
          <Text>There was an error searching your trips. </Text>
          <TouchableOpacity onPress={() => this.getData()}>
            <Text>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      const objectToArray = Object.keys(this.state.plannedTrips);
      objectToArray.map((val) => {
        console.log("this", val, this.state.plannedTrips[val]);
      });
      return (
        <React.Fragment>
          {Object.keys(this.state.plannedTrips).length > 0 ? (
            Object.keys(this.state.plannedTrips).map((val) => {
              return (
                <View class={style.tripCard}>
                  <Text>Trip Name</Text>
                  <Text>{val}</Text>
                  <Text>Beginning date</Text>
                  <Text>
                    {this.state.plannedTrips[val].beginningDate || ""}
                  </Text>
                  <Text>Total Cost</Text>
                  <Text>{this.state.plannedTrips[val].totalCost || ""}</Text>
                </View>
              );
            })
          ) : (
            <Text>You don't have any trips. Add one.</Text>
          )}
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ ...styles.scrollView, ...styles.container }}
      >
        {this.renderContent()}
        <Button title="delete all" onPress={() => this.deleteStorage} />
      </ScrollView>
    );
  }
}
