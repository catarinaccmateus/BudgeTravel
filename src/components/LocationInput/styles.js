import React from "react";
import { StyleSheet } from "react-native";

import { widthScale, heightScale } from "./../../utils/constants";

const styles = StyleSheet.create({
  dropdown: {
    width: 220 * widthScale,
    borderRadius: 4,
    marginBottom: 5 * heightScale,
    height: 50 * heightScale,
  },
  input: {
    backgroundColor: "white",
    width: 220 * widthScale,
    borderRadius: 4,
    padding: 5 * widthScale,
    marginBottom: 10 * heightScale,
    color: "black",
    height: 40 * heightScale,
  },
});

export default styles;
