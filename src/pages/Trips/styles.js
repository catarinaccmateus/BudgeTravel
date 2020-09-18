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
    backgroundColor: "yellow",
    padding: 3 * widthScale,
    borderRadius: 3,
  },
  scrollView: {
    height: 20 * heightScale,
  },
  listItem: {
    backgroundColor: "white",
    width: 200 * widthScale,
    marginBottom: 5 * heightScale,
    padding: 10 * widthScale,
    borderRadius: 5
  }
});

export default styles;
