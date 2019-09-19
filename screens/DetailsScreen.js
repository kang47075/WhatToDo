import React from "react";
import { SearchBar } from "react-native-elements";
import { View, ScrollView, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { withNavigation } from "react-navigation";

export default class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer} />
          <SearchBar
            inputStyle={{ backgroundColor: "white", fontSize: 15 }}
            containerStyle={{
              backgroundColor: "transparent",
              borderBottomColor: "transparent",
              borderTopColor: "transparent"
            }}
            placeholder="  Search here..."
            onChangeText={text => {
              console.log(text);
            }}
            style={styles.search}
            onPressCancel={() => {
              this.filterList("");
            }}
            onPress={() => alert("onPress")}
          />
        </ScrollView>
      </View>
    );
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
