import React from "react";

/* Navigation */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

// Desabilita os alertas.
console.disableYellowBox = true;

/* Pages */
import Main from "./src/pages/Main";
import Trips from "./src/pages/Trips";
import Create from "./src/pages/Create";

import { colors } from "./src/utils/constants";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/* Splash Screen - If we want to load async storage during splash screen */
import * as SplashScreen from "expo-splash-screen";
import { AppLoading } from "expo";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  state = {
    appIsReady: false,
  };
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Main}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Trips"
            component={Trips}
            options={{
              title: "Your trips",
              headerTitleStyle: {
                alignSelf: "center",
                color: colors.background,
              },
              headerTintColor: colors.background,
            }}
          />
          <Stack.Screen
            name="Create"
            component={Create}
            options={{
              title: "Create a trip",
              headerLeft: null,
              headerTitleStyle: {
                alignSelf: "center",
                color: colors.background,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
