import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions
} from "react-native";

export default props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.action}>
      <ImageBackground
        source={props.image}
        borderRadius={20}
        style={styles.backgroundImage}
      >
        <View style={styles.textBackground}>
          <Text style={styles.text}>{props.text}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").height / 2.5,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 22
  },

  backgroundImage: {
    width: "100%",
    height: "100%"
  },
  textBackground: {
    width: "100%",
    height: "20%",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    textAlign: "center"
  },
  text: {
    fontFamily: "Pangolin",
    fontSize: 20,
    marginTop: 5,
    color: "#0B0D18",
    textAlign: "center"
  }
});
