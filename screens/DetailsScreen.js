import React from "react";
import * as firebase from "firebase";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { withNavigation } from "react-navigation";

export const CustomButton = props => {
  const { title = "Enter", style = {}, textStyle = {}, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};
export default class DetailsScreen extends React.Component {
  state = {
    details: {}
  };
  componentDidMount() {
    this.setState({
      details: this.props.navigation.getParam("item")
    });
    console.log(this.props.navigation.getParam("item"));
  }

  render() {
    let item = this.state.details;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text>{item.cost}</Text>
          <Text>{item.location}</Text>
          <Text>{item.rating}</Text>
        </ScrollView>
      </View>
    );
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("id", "this.state.item.id")
    };
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  item: {
    margin: 10,
    borderWidth: 2,
    borderColor: "black",
    padding: 10
  }
});
