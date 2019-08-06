import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { withNavigation } from "react-navigation";

export default class DetailsScreen extends React.Component {
  render() {
    return <ScrollView style={styles.container} />;
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("id", "Details")
    };
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
