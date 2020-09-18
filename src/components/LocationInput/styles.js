import React from "react";
import { StyleSheet } from "react-native";

import { widthScale, heightScale } from "./../../utils/constants";

const styles = StyleSheet.create({
  titleDestination: {
    marginBottom: 10 * heightScale,
    fontWeight: "bold",
    fontSize: 15 * widthScale,
  },
  button: {
    width: 280 * widthScale,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderRadius: 5 * widthScale,
    borderWidth: 2 * widthScale,
    padding: 10 * widthScale,
  },
  container: {
    justifyContent: "space-between",
    height: 320 * heightScale,
  },
  inputContainer: {
    height: 200 * heightScale,
    justifyContent: "center",
  },
  dropdown: {
    width: 280 * widthScale,
    borderRadius: 4,
    marginBottom: 5 * heightScale,
    height: 50 * heightScale,
  },
  input: {
    backgroundColor: "white",
    width: 280 * widthScale,
    borderRadius: 4,
    padding: 5 * widthScale,
    marginBottom: 10 * heightScale,
    color: "black",
    height: 40 * heightScale,
  },
});

export default styles;
