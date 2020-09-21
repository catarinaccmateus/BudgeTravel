import { StyleSheet } from "react-native";
import { widthScale, heightScale, colors } from "../../utils/constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopWidth: 5,
    borderTopColor: colors.background,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    zIndex: 99,
    elevation: 99,
  },
  extra: {
    justifyContent: "center",
    alignContent: "center",
  },
  button: {
    position: "relative",
    top: -25 * heightScale,
    borderRadius: 50,
    borderColor: colors.background,
  },
  image: {
    width: 100 * widthScale,
    height: 100 * widthScale,
    borderWidth: 15 * widthScale,
    borderRadius: 400,
    borderColor: colors.background,
    padding: 0,
    margin: 0,
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
  disabledContinueIcon: {
    opacity: 0.5,
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
