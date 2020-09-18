import { StyleSheet } from "react-native";

import { widthScale, heightScale } from "./../../utils/constants";
import { colors } from "../../utils/constants"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  margin: {
    margin: 5 * widthScale,
    borderColor: "white",
    borderWidth: 3 * widthScale,
    color: "white",
    padding: 5 * widthScale,
  },
  button: {
    width: 110 * widthScale,
    height: 40 * heightScale,
    padding: 5 * widthScale,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonIcon: {
    width: 30 * widthScale,
    height: 30 * widthScale,
    marginRight: 10 * widthScale
  },
  scrollView: {
    height: 20 * heightScale,
    alignItems: "center"
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    width: 300 * widthScale,
    marginBottom: 5 * heightScale,
    padding: 10 * widthScale,
    borderRadius: 6,
    marginBottom: 52 * heightScale,
    height: 70 * heightScale,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 10,

    elevation: 10,
  },
});

export default styles;
