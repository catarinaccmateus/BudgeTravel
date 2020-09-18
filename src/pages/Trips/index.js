import React from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native";

import styles from "./styles";

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity activeOpacity={.7} onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

export default class Trips extends React.Component {
  state = {
    trips: [
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
      },
    ],
    selectedId: null
  };



  renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => this.setState({ selectedId: item.id })}
        style={styles.listItem}
      />
    );
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ ...styles.scrollView, ...styles.container }}>
        <Text>Ongoing</Text>
        <FlatList
          data={this.state.trips}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          extraData={this.state.selectedId}
        />
      </ScrollView>
    );
  }
}