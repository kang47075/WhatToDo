//https://medium.com/react-native-training/react-native-firebase-authentication-7652e1d2c8a2

import React from "react";
import { StyleSheet, Platform, Image, Text, View, Button } from "react-native";
import * as firebase from "firebase";
export default class Main extends React.Component {
  state = { currentUser: null };
  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }
  handlelogout = () => {
    firebase.auth().signOut();
  };

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text>Hi {currentUser && currentUser.email}!</Text>
        <Button onPress={this.handlelogout} title="logout" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
