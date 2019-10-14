import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";

export default props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ width: Dimensions.get("window").width / 3 }}
    >
      <View style={styles.container} backgroundColor={props.color}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#0A131A",
    borderWidth: 0.7,
    borderTopWidth: 0.5
  },
  icon: {
    color: "#fff"
  },
  text: {
    fontFamily: "MarckScript",
    fontSize: 22,
    color: "#fff"
  }
});
