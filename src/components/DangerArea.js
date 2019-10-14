import React from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import information from "../assets/information.png";
import Icon from "react-native-vector-icons/Ionicons";
export default props => {
  let content = null;
  if (props.isLoading) {
    content = (
      <View style={styles.result}>
        <ActivityIndicator />
      </View>
    );
  } else {
    {
      content = (
        <View style={styles.result}>
          <Text style={styles.numberCases}>{props.numberCases}</Text>
        </View>
      );
    }
  }
  return (
    <View style={styles.container}>
      <Image source={information} style={{ height: 30, width: 30 }} />
      <View style={styles.subContainer}>
        <View style={styles.subContainer}>
          <Text style={styles.text}>{`Número de focos próximos`}</Text>
          <Icon name="ios-redo" size={23} color={"#61F6DD"} />
        </View>
        {content}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#F89BA4",
    padding: 8
  },
  numberCases: {
    fontSize: 25,
    padding: 0,
    color: "#FA4250"
  },
  result: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  }
});
