import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions
} from "react-native";
import image from "../../assets/drawer4.jpg";

export default props => {
  return (
    <View style={styles.imageContainer}>
      <ImageBackground source={image} style={styles.image}>
        <View
          style={{
            flex: 1,
            position: "relative",
            backgroundColor: "rgba(0,0,0,.6)",
            justifyContent: "center"
          }}
        >
          <Text style={[styles.headerText, { fontFamily: "MarckScript" }]}>
            {props.children}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "Cambria",
    fontSize: 20,
    fontWeight: "400",
    color: "white",
    textAlign: "center",

    padding: 20
  },
  imageContainer: {
    width: "100%",

    borderBottomWidth: 10,
    borderColor: "#B0B9BA",
    height: Dimensions.get("window").height / 3.5
  },
  image: {
    width: "100%",
    height: "100%"
  }
});
