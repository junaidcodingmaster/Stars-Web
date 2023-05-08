import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

export default class HomeScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      searchText: "",

      data: [],

      isError: false,

      isLoading: false,

      isErrorText: "",

      isSearchNotFound: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios

      .get("https://stars-api.onrender.com")

      .then((res) => this.setState({ data: res.data }))

      .catch((e) => this.setState({ isError: true, isErrorText: e.toString() }))

      .finally(() => this.setState({ isLoading: false }));
  }

  searchHandler = (text) => {
    let searchText = text.toLowerCase().toString();

    this.setState({ isLoading: true });

    if (text === "") {
      this.componentDidMount();

      this.setState({ searchText: "" });
    } else if (text === " ") {
      this.componentDidMount();

      this.setState({ searchText: "" });
    } else {
      this.setState({
        searchText: "",

        isError: false,

        isErrorText: "",

        isSearchNotFound: false,
      });

      let searchURL =
        `https://stars-api.onrender.com/stars?name=${searchText}`.toString();

      axios
        .get(searchURL)
        .then((res) => this.setState({ data: [res.data.data] }))
        .catch((e) => {
          if (e.response.status) {
            this.setState({ isSearchNotFound: true });
          } else {
            this.setState({
              isSearchNotFound: false,
              isError: true,
              isErrorText: e.toString(),
            });
          }
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  };

  handlePress = ({ item }) => {
    let data = {
      star_name: item.star_name,
      distance: item.distance,
      gravity: item.gravity,
      mass: item.mass,
      radius: item.radius,
    };

    this.props.navigation.navigate("Details", {
      data: data,
    });
  };

  captallizer = (text) => {
    const str = text;
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    const str2 = arr.join(" ");
    return str2;
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.handlePress({ item })}
      style={styles.item}
    >
      <Image style={styles.image} source={require("../img/logo2.png")} />

      <View style={styles.textContainer}>
        <Text style={styles.name}>{this.captallizer(item.star_name)}</Text>

        <Text style={styles.description}>{item.distance} Lightyears away</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../img/logo.png")} />

        <TextInput
          style={styles.searchBar}
          placeholder="Search for a star"
          onChangeText={(text) => this.setState({ searchText: text })}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => this.searchHandler(this.state.searchText)}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        {this.state.isLoading ? (
          <View style={styles.loadingContainer}>
            <Image
              style={styles.loadingLogo}
              source={require("../img/loading.gif")}
            />

            <Text style={styles.loadingText}> Loading ...</Text>
          </View>
        ) : this.state.isSearchNotFound ? (
          <View style={styles.notFoundContainer}>
            <FontAwesome name="search-minus" size={100} color="gray" />
            <Text style={styles.notFoundtext}>Sorry, no result found.</Text>
          </View>
        ) : this.state.isError ? (
          <View style={styles.errorScreen}>
            <FontAwesome name="exclamation-triangle" size={50} color="red" />
            <Text style={styles.errorText}>Something went wrong ?</Text>
            <Text style={styles.showErrorText}>{this.state.isErrorText}</Text>
          </View>
        ) : (
          <FlatList
            style={styles.flatList}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.star_name}
          />
        )}

        <TouchableOpacity
          style={styles.forkButton}
          onPress={() =>
            Linking.openURL("https://github.com/junaidcodingmaster/Stars-Web")
          }
        >
          <FontAwesome name="github" size={24} color="white" />
          <Text style={styles.forkButtonText}>Fork me on GitHub</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://abujuni.dev")}
        >
          <Text style={styles.madeByText}>Made by Junaid</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
    paddingBottom: 30,
  },

  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
  },

  searchBar: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },

  searchButton: {
    width: "80%",
    height: 40,
    backgroundColor: "#007aff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  searchButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  flatList: {
    width: "80%",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  textContainer: {
    flex: 1,
  },

  name: {
    fontSize: 16,

    fontWeight: "bold",

    marginBottom: 5,
  },

  description: {
    fontSize: 14,
  },

  errorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },

  showErrorText: {
    fontSize: 15,
    color: "red",
  },

  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },

  loadingLogo: {
    width: 120,
    height: 120,
  },

  loadingContainer: {
    flex: 0.5,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
  },

  errorScreen: {
    alignItems: "center",
  },

  notFoundtext: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: -10,
  },

  notFoundContainer: {
    alignItems: "center",
  },

  forkButton: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  forkButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
  madeByText: {
    fontSize: 16,
    color: "gray",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});
