import React from "react";
import { StyleSheet } from "react-native";

import { widthScale, heightScale } from "./../../utils/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6ea9400",
    alignItems: "center",
    justifyContent: "center",
  },
  margin: {
    margin: 5 * widthScale,
    borderColor: "white",
    borderWidth: 3 * widthScale,
    color: "white",
    padding: 5 * widthScale,
  },
  button: {
    backgroundColor: "yellow",
    padding: 3 * widthScale,
    borderRadius: 3,
  },
  scrollView: {
    height: 20 * heightScale,
  },
});

export default styles;
