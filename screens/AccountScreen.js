import React from "react";
import { ExpoConfigView } from "@expo/samples";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  FlatList,
  ActivityIndicator
} from "react-native";
export const CustomButton = props => {
  const { title = "Enter", style = {}, textStyle = {}, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default function AccountScreen() {
  return (
    <CustomButton onPress={this.handlelogout} title="Login"></CustomButton>
  );
}

AccountScreen.navigationOptions = {
  title: "app.json"
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    height: 30,
    width: 300,
    alignSelf: "center",
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2b3039",
    shadowColor: "#c7c7c7",
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20
  },
  customButton: {
    color: "white",
    fontSize: 12
  }
});
