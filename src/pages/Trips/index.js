import React from "react";
import {
	Text,
	View,
	ScrollView,
	ActivityIndicator,
	Alert,
	Image,
} from "react-native";

import styles from "./styles";

import AsyncStorage from "@react-native-community/async-storage";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";

import Footer from "./../../components/Footer";

function isValueToRender(val) {
	return val !== "_40" && val !== "_55" && val !== "_65" && val !== "_72";
}

function areThereTrips(array) {
	let result = false;
	for (let i = 0; i < array.length; i++) {
		if (
			array[i] !== "_40" &&
			array[i] !== "_55" &&
			array[i] !== "_65" &&
			array[i] !== "_72"
		) {
			result = true;
		}
	}
	return result;
}

export default class Trips extends React.Component {
	state = {
		plannedTrips: {},
		loading: true,
		error: false,
		firstPage: true,
		secondPage: false,
		tripToEdit: "Trip Test",
		updateRequest: false,
	};

	componentDidMount = async () => {
		await this.getData();
	};

	getData = async () => {
		this.setState({ loading: true, error: false });
		try {
			const jsonValue = await AsyncStorage.getItem("@BudgeTrip");
			const trips = JSON.parse(jsonValue);
			console.log("was able to get data");
			if (jsonValue !== null && areThereTrips(Object.keys(trips))) {
				this.setState({
					loading: false,
					error: false,
					plannedTrips: trips,
				});
			} else {
				this.setState({
					loading: false,
					error: false,
					plannedTrips: trips,
				});
			}
		} catch (err) {
			console.log("ERRO", err);
			this.setState({ loading: false, error: true });
			return null;
		}
	};

	deleteTrip = async (tripName) => {
		console.log("WILL DELETE", tripName);
		let trips = this.state.plannedTrips;
		console.log("TRIPS", trips);
		delete trips[tripName];
		this.setState({ plannedTrips: trips });
		console.log("planned trips", trips.length);
		const jsonValue = JSON.stringify(trips);
		console.log("sjonvalu", jsonValue);
		try {
			await AsyncStorage.setItem("@BudgeTrip", jsonValue);
			this.setState(
				{
					firstPage: true,
					secondPage: false,
					updateRequest: false,
					tripToEdit: "",
				},
				async () => await this.getData()
			);
			Alert.alert("Your trip was deleted");
		} catch (err) {
			console.log("Not possible to delete!", err);
			this.setState({ updateRequest: false });
			Alert.alert("There was an error deleting your trip. Try again later.");
		}
	};

	onInputChange = (val, index) => {
		const state = this.state.plannedTrips;
		state[this.state.tripToEdit].placesToTravel[index].budget = val;
		this.setState({ plannedTrips: state });
	};

	updateCost = async () => {
		this.setState({ updateRequest: true });
		const placesInThisTrip = this.state.plannedTrips[this.state.tripToEdit]
			.placesToTravel;

		const newTotal =
			placesInThisTrip !== null &&
				placesInThisTrip.length &&
				areThereTrips(Object.keys(placesInThisTrip))
				? placesInThisTrip.reduce((acc, val) => val.budget * 1 + acc, 0)
				: this.state.plannedTrips[this.state.tripToEdit].totalCost;

		const newState = this.state.plannedTrips[this.state.tripToEdit];
		newState.totalCost = newTotal;
		this.setState(
			{
				plannedTrips: {
					...this.state.plannedTrips,
					[this.state.tripToEdit]: newState,
				},
			},
			async () => await this.updateInLocalStorage()
		);
	};

	updateInLocalStorage = async () => {
		const jsonValue = JSON.stringify(this.state.plannedTrips);
		try {
			await AsyncStorage.setItem("@BudgeTrip", jsonValue);
			await this.getData();
			this.setState({
				firstPage: true,
				secondPage: false,
				updateRequest: false,
				tripToEdit: "",
				locationToEdit: "",
			});
			return Alert.alert("Your trip was updated");
		} catch (err) {
			console.log("Not possible to update!", err);
			this.setState({ updateRequest: false });
			Alert.alert("There was an error updating your trip. Try again later.");
		}
	};

	showTripDetails = (tripName) => {
		this.setState({
			secondPage: true,
			firstPage: false,
			tripToEdit: tripName,
		});
	};

	deleteStorage = async () => {
		try {
			await AsyncStorage.clear();
			console.log("Async deleted");
			Alert.alert("Your trips were succesfully deleted.");
			return true;
		} catch (rr) {
			console.log("Async dont deleted", err);
			Alert.alert("There was an error deleting your trips.");
			return false;
		}
	};

	renderContent = () => {
		if (this.state.loading) {
			console.log("loading");
			return (
				<ActivityIndicator
					style={styles.loadingSpinner}
					size={"large"}
					color={"white"}
				/>
			);
		} else if (this.state.error) {
			console.log("error");
			return (
				<View>
					<Text style={styles.whiteText}>
						There was an error searching your trips.{" "}
					</Text>
					<TouchableOpacity onPress={() => this.getData()}>
						<Text style={styles.whiteText}>Try Again</Text>
					</TouchableOpacity>
				</View>
			);
		} else if (this.state.firstPage) {
			return (
				<ScrollView style={styles.tripsOverview}>
					{this.state.plannedTrips !== null &&
						areThereTrips(Object.keys(this.state.plannedTrips)) &&
						Object.keys(this.state.plannedTrips).length > 0 &&
						Object.keys(this.state.plannedTrips).map((val, index) => {
							if (isValueToRender(val)) {
								return (
									<TouchableOpacity
										class={styles.tripCard}
										onPress={() => this.showTripDetails(val)}
										style={styles.tripCard}
										key={index}
									>
										<View style={styles.tripCardItem}>
											<Image
												source={require("../../../assets/roaming.png")}
												style={styles.buttonIcon}
											/>
											<View style={{ flexDirection: "column" }}>
												<Text style={styles.cardTitle}>Trip Name</Text>
												<Text style={styles.cardText}>{val}</Text>
											</View>
										</View>
										<View style={styles.tripCardItem}>
											<Image
												source={require("../../../assets/calendarRED.png")}
												style={styles.buttonIcon}
											/>
											<View style={{ flexDirection: "column" }}>
												<Text style={styles.cardTitle}>Date</Text>
												<Text style={styles.cardText}>
													{this.state.plannedTrips[val].beginningDate ||
														date}
												</Text>
											</View>
										</View>
										<View style={styles.tripCardItem}>
											<Image
												source={require("../../../assets/payment.png")}
												style={styles.buttonIcon}
											/>
											<View style={{ flexDirection: "column" }}>
												<Text style={styles.cardTitle}>Total Cost</Text>
												<Text style={styles.cardText}>
													{this.state.plannedTrips[val].totalCost || "1020"}
												</Text>
											</View>
										</View>
									</TouchableOpacity>
								);
							}
						})}

					{!areThereTrips(Object.keys(this.state.plannedTrips || {})) && (
						<Text style={styles.whiteText}>
							You don't have any trips. Add one.
						</Text>
					)}

					{this.state.plannedTrips !== null &&
						areThereTrips(Object.keys(this.state.plannedTrips)) &&
						Object.keys(this.state.plannedTrips).length && (
							<TouchableOpacity
								onPress={async () => await this.deleteStorage()}
								style={styles.button}
							>
								<Text>Delete all</Text>
							</TouchableOpacity>
						)}
				</ScrollView>
			);
		} else if (this.state.secondPage) {
			return (
				<ScrollView>
					<Text style={styles.whiteText}>Update your trip cost.</Text>
					{this.state.plannedTrips !== null &&
						this.state.plannedTrips[this.state.tripToEdit].placesToTravel
							.length > 0 &&
						this.state.plannedTrips[this.state.tripToEdit].placesToTravel.map(
							(item, index) => {
								return (
									<View key={index}>
										<Text style={styles.whiteText}>
											Location {index + 1}: {item.country}
										</Text>
										<TextInput
											value={item.budget}
											style={styles.input}
											onChangeText={(val) => this.onInputChange(val, index)}
										/>
									</View>
								);
							}
						)}
					{this.state.updateRequest && <ActivityIndicator />}
					<View style={styles.buttonsView}>
						<TouchableOpacity
							onPress={async () => await this.deleteTrip(this.state.tripToEdit)}
							style={styles.button}
						>
							<Text style={styles.whiteText}>Cancel Trip</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={async () => await this.updateCost()}
							style={styles.button}
						>
							<Text style={styles.whiteText}>Update</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			);
		}
	};

	render() {
		return (
			<View style={styles.container}>
				{this.renderContent()}
				<Footer
					onClickContinue={() => console.log("hello")}
					onClickBack={() => console.log("hello")}
					firstPage={false}
					secondPage={false}
					thirdPage={false}
					saveTrip={() => console.log("hello")}
					canSave={false}
					saving={false}
					tripsPage={true}
				/>
			</View>
		);
	}
}
