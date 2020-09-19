import React from "react";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";

import styles from "./styles";

import AsyncStorage from "@react-native-community/async-storage";

export default class PreviousTrips extends React.Component {
  state = {
    plannedTrips: [],
    loading: true,
    error: false,
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    this.setState({ loading: true, error: false });
    try {
      const jsonValue = await AsyncStorage.getItem("@BudgeTrip");
      console.log("getData", jsonValue);
      if (jsonValue != null) {
        this.setState({
          loading: false,
          error: false,
          plannedTrips: JSON.parse(jsonValue),
        });
      } else {
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
  render() {
    return (
      <ScrollView
        contentContainerStyle={{ ...styles.scrollView, ...styles.container }}
      >
        {this.state.loading ? (
          <ActivityIndicator />
        ) : (
          <Text>Previous trips</Text>
        )}
      </ScrollView>
    );
  }
}
