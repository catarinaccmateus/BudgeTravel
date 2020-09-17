import React from "react";
import { StyleSheet } from "react-native";

import { widthScale, heightScale } from "./../../utils/constants";
import { colors } from "../../utils/constants"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    padding: 6,
  },
  subtitle: { marginTop: 30, marginBottom: 30 },
  margin: {
    margin: 5,
    borderColor: "white",
    borderWidth: 3,
    color: "white",
    padding: 5,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    alignItems: "center",
    padding: 30 * widthScale,
    width: 240 * widthScale,
    borderRadius: 5 * widthScale,
    marginTop: 15 * heightScale,
    marginBottom: 10 * heightScale,
    height: 70 * heightScale,
  },
  buttonIcon: {
    width: 30 * widthScale,
    height: 30 * widthScale,
  },
  logo: {
    height: 130 * heightScale,
    resizeMode: "contain",
    marginBottom: 30,
    marginTop: 30,
  },
  buttonsContainer: {
    marginTop: 30 * heightScale,
  },
});

export default styles;
