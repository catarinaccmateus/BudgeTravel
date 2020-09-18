import { StyleSheet } from "react-native";

import { widthScale, heightScale, colors } from "./../../utils/constants";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    height: 80 * heightScale,
    width: 280 * widthScale,
    borderRadius: 4 * widthScale,
    padding: 5 * widthScale,
    alignItems: "stretch",
    justifyContent: "space-around",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
