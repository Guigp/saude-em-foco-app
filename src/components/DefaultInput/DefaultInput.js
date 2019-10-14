import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const defaultInput = props => {
  return (
    <View style={[styles.container, props.style]}>
      <View
        style={[{ width: "10%", alignItems: "center" }, props.styleIconInput]}
      >
        <Icon
          name={props.icon ? props.icon : null}
          color={props.iconColor ? props.iconColor : null}
          size={20}
          style={styles.icon}
        />
      </View>
      <TextInput
        underlineColorAndroid="transparent"
        {...props}
        on
        onFocus={() => (props.onFocusHandler ? props.onFocusHandler() : null)}
        style={[styles.input, props.styleTextInput, props.onFocus]}
        maxLength={props.maxLength}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 40,
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    marginLeft: 10
  },
  input: {
    width: "90%",
    fontSize: 15,
    height: 35,
    padding: 0,
    marginLeft: 5
  }
});
export default defaultInput;
