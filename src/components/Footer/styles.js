import { StyleSheet } from "react-native";
import { widthScale } from "../../utils/constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopWidth: 5,
    borderTopColor: "orange",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  button: {
    position: "relative",
    top: -28,
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    position: "relative",
    top: -35,
    color: "#FFF",
  },
  continueButton: {
    justifyContent: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 0,
    width: 80 * widthScale,
  },
  backButton: {
    justifyContent: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 0,
    width: 80 * widthScale,
  },
  continueIcon: {
    height: 20,
  },
});

export default styles;
