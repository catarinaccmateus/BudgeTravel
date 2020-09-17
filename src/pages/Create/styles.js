import React from "react";
import { StyleSheet } from "react-native";

import { widthScale, heightScale } from "./../../utils/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  calendar: {
    backgroundColor: "white",
  },
  title: {
    marginTop: 30 * heightScale,
    marginBottom: 30 * heightScale,
    fontWeight: "bold",
    fontSize: 20 * widthScale,
    color: "white",
  },
  margin: {
    margin: 5,
    borderColor: "white",
    borderWidth: 3,
    color: "white",
    padding: 5,
  },
  button: {
    padding: 15 * widthScale,
    borderRadius: 3 * widthScale,
    marginTop: 15 * heightScale,
    marginBottom: 30 * heightScale,
  },
  input: {
    backgroundColor: "white",
    width: 220 * widthScale,
    borderRadius: 4,
    paddingLeft: 13 * widthScale,
    marginBottom: 10 * heightScale,
    color: "black",
    height: 40 * heightScale,
  },
});

export default styles;
