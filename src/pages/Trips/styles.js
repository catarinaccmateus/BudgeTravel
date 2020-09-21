import { StyleSheet } from "react-native";

import { widthScale, heightScale } from "./../../utils/constants";
import { colors } from "../../utils/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  buttonsView: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  whiteText: { color: "white" },
  margin: {
    margin: 5 * widthScale,
    borderColor: "white",
    borderWidth: 3 * widthScale,
    color: "white",
    padding: 5 * widthScale,
  },
  loadingSpinner: {
    marginTop: 10 * heightScale,
  },
  button: {
    width: 110 * widthScale,
    height: 40 * heightScale,
    padding: 5 * widthScale,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tripCardItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    width: 30 * widthScale,
    height: 30 * widthScale,
    marginRight: 10 * widthScale,
  },
  scrollView: {
    height: 20 * heightScale,
    alignItems: "center",
  },
  container: {
    height: 560 * heightScale,
    backgroundColor: colors.background,
    alignItems: "center",
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
  },
  tripCard: {
    backgroundColor: "white",
    height: 200 * heightScale,
    width: 280 * widthScale,
    borderRadius: 4 * widthScale,
    padding: 10 * widthScale,
    alignItems: "stretch",
    justifyContent: "space-around",
    marginBottom: 5 * heightScale,
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
  tripsOverview: {
    marginTop: 20 * heightScale,
  },
});

export default styles;
