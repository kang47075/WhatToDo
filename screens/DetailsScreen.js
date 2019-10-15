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
    details: {},
    bookmarked: false
  };
  componentDidMount() {
    const currentUser = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(
        `Users/${currentUser}/Bookmarks/${this.props.navigation.getParam(
          "category"
        )}/${this.state.details.id}`
      )
      .on("value", snapshot => {
        console.log("Finished getting bookmarkedness");

        if (snapshot != null && snapshot.val() != null) {
          this.setState({
            bookmarked: snapshot.val().saved
          });
        } else {
          this.setState({
            bookmarked: false
          });
        }
        console.log(`state during firebase : ${JSON.stringify(this.state)}`);
      });
    this.setState({
      details: this.props.navigation.getParam("item")
    });
  }
  onPressBookmark() {
    const currentUser = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(
        `Users/${currentUser}/Bookmarks/${this.props.navigation.getParam(
          "category"
        )}/${this.state.details.id}`
      )
      .update({
        saved: true
      })
      .then(data => {
        console.log("data ", data);
      })
      .catch(error => {
        console.log("error", error);
      });
  }
  render() {
    let item = this.state.details;
    console.log(`state during render : ${JSON.stringify(this.state)}`);
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text>{item.cost}</Text>
          <Text>{item.location}</Text>
          <Text>{item.rating}</Text>
          <TouchableOpacity onPress={() => this.onPressBookmark()}>
            <Text>{this.state.bookmarked ? "Unbookmark" : "Bookmark"}</Text>
          </TouchableOpacity>
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
