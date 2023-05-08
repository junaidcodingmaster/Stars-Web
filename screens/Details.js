import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import axios from "axios";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import FullScreenImage from "../fullscreen";

const { width, height } = Dimensions.get("window");
const aspectRatio = height / width;

export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: "",
      isError: false,
      isLoading: false,
      isErrorText: "",
      isSearchNotFound: false,
      isReload: false,
      isFullscreen: false,
    };
  }

  componentDidMount() {
    const { data } = this.props.route.params;
    this.getStarImg(data.star_name);
  }

  getStarImg = (star_name) => {
    this.setState({ isLoading: true });

    const searchURL = `https://stars-api.onrender.com/stars-img?name=${star_name}`;

    axios
      .get(searchURL)
      .then((res) => {
        this.setState({
          img: res.data.img_url,
          isLoading: false,
        });
      })
      .catch((e) => {
        if (e.response && e.response.status) {
          this.setState({ isSearchNotFound: true, isLoading: false });
        } else {
          this.setState({
            isSearchNotFound: false,
            isError: true,
            isErrorText: e.toString(),
            isLoading: false,
          });
        }
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

  reloadImage = (data) => {
    this.setState({ isReload: true, isLoading: true });
    this.getStarImg(data);
    setTimeout(
      () => this.setState({ isReload: false, isLoading: false }),
      2000
    );
  };

  render() {
    const { data } = this.props.route.params;
    const {
      img,
      isLoading,
      isSearchNotFound,
      isError,
      isErrorText,
      isFullscreen,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.title}>{this.captallizer(data.star_name)}</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <FontAwesome name="arrow-left" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.reloadButton}
            onPress={() => this.reloadImage(data.star_name)}
          >
            <Ionicons name="refresh-circle" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.fullscreenButton}
            onPress={() => this.setState({ isFullscreen: true })}
          >
            <MaterialIcons name="fullscreen" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Image
                style={styles.loadingLogo}
                source={require("../img/loading.gif")}
              />
              <Text style={styles.loadingText}> Loading ...</Text>
            </View>
          ) : isSearchNotFound ? (
            <Image
              style={[
                styles.image,
                { height: 500 * aspectRatio, width: "50%" },
              ]}
              source={require("../img/404.png")}
            />
          ) : isError ? (
            <View style={styles.errorScreen}>
              <FontAwesome name="exclamation-triangle" size={50} color="red" />
              <Text style={styles.errorText}>
                Opps!, Something went wrong ?
              </Text>
              <Text style={styles.showErrorText}>{isErrorText}</Text>
            </View>
          ) : (
            <Image
              style={styles.image}
              source={{ uri: img }}
              resizeMode="contain"
            />
          )}
          <Text>Image by NASA Research API</Text>
          <FullScreenImage
            visible={isFullscreen}
            imageUrl={img}
            onClose={() => this.setState({ isFullscreen: false })}
            star_name={this.captallizer(data.star_name)}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.description}>
            <b>Star Name</b> : {this.captallizer(data.star_name)}
          </Text>
          <Text style={styles.description}>
            <b>Distance</b> : {data.distance} Lightyears away
          </Text>
          <Text style={styles.description}>
            <b>Mass</b> : {data.mass} solar mass or {data.mass}M☉
          </Text>
          <Text style={styles.description}>
            <b>Radius</b> : {data.radius} solar radius or {data.radius}R☉
          </Text>
          <Text style={styles.description}>
            <b>Gravity</b> : {data.gravity}
            <math xmlns="http://www.w3.org/1998/Math/MathML">
              <mo>
                <mo space=""></mo>
              </mo>
              <mi>m</mi>
              <mo>/</mo>
              <msup>
                <mi>s</mi>
                <mn>2</mn>
              </msup>
            </math>
          </Text>
        </View>
        <View style={{ paddingBottom: 10 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  backButton: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
  },
  reloadButton: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
  },
  fullscreenButton: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    height: height,
    width: "100%",
    resizeMode: "contain",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingLogo: {
    height: 50,
    width: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  errorScreen: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  showErrorText: {
    marginTop: 10,
    fontSize: 16,
    color: "red",
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  description: {
    marginVertical: 5,
    fontSize: 18,
  },
});
