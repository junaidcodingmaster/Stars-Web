import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { MaterialIcons } from "@expo/vector-icons";

export default function FullScreenImage(props) {
  const { visible, imageUrl, onClose, star_name } = props;

  const loadingRender = () => (
    <View style={styles.loadingContainer}>
      <Image source={require("./img/loading.gif")} />
    </View>
  );

  const Header = ({ onCancel }) => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
        <MaterialIcons name="close" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>{star_name}</Text>
      <View style={{ width: 50 }} />
    </View>
  );

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <ImageViewer
        imageUrls={[{ url: imageUrl }]}
        loadingRender={loadingRender}
        enablePreload={true}
        enableImageZoom={true}
        saveToLocalByLongPress={false}
        renderHeader={() => <Header onCancel={onClose} />}
        renderIndicator={() => null}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  closeButton: {
    backgroundColor: "grey",
    borderRadius: 5,
    borderWidth: 2,
    alignItems: "center",
    padding: 5,
    borderColor: "white",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "black",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
