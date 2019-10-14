import React from "react";
import { StyleSheet, Text } from "react-native";

const defaultTitle = props => (
  <Text style={[{ marginBottom: props.marginBottom }, styles.title]}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  title: {
    fontFamily: "Pangolin",
    color: "#12151C",
    fontSize: 30
  }
});
export default defaultTitle;
