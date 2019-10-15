import React from "react";
import * as firebase from "firebase";
import { SearchBar } from "react-native-elements";
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
export default class CategoriesScreen extends React.Component {
  state = {
    items: [],
    loaded: false
  };
  componentDidMount() {
    const currentUser = firebase.auth().currentUser.uid;
    console.log();
    firebase
      .database()
      .ref(`Category/${this.props.navigation.getParam("id")}/Items`)
      // .orderByChild("Index")
      .on("value", snapshot => {
        var items = [];
        snapshot.forEach(child => {
          items.push({
            id: child.key,
            icon: child.val().Icon,
            cost: child.val().Cost,
            location: child.val().Location,
            rating: child.val().Rating
          });
        });
        this.setState({ items, loaded: true });
      });
  }
  renderItem = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.onPressItem(item)}
      >
        <Text>{item.id}</Text>
        <Text>{item.cost}</Text>
        <Text>{item.location}</Text>
        <Text>{item.rating}</Text>
        {/* <Image
          source={{ uri: item.icon }}
          style={styles.gridIcon}
          resizeMode={"cover"}
        /> */}
      </TouchableOpacity>
    );
  };
  onPressItem = item => {
    this.props.navigation.push("Details", {
      item,
      id: item.id,
      navigation: this.props.navigation
    });
  };

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
          <View style={styles.container2}>
            {!this.state.loaded ? (
              <ActivityIndicator size="large" color="blue" />
            ) : (
              <FlatList
                style={styles.grid}
                renderItem={this.renderItem}
                data={this.state.items}
              />
            )}
          </View>
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
  },
  item: {
    margin: 10,
    borderWidth: 2,
    borderColor: "black",
    padding: 10
  }
});
