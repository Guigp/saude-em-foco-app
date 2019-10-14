import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  Platform,
  Text,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const defaultButton = props => {
  const icon = props.icon ? (
    <Icon
      name={props.icon}
      size={props.size}
      color={props.color}
      style={{ paddingRight: 15 }}
    />
  ) : null;

  const content = (
    <View
      style={[
        styles.button,
        { backgroundColor: props.backgroundColor },
        { width: props.width },
        { fontSize: props.fontSize },
        { borderRadius: props.borderRadius },
        { marginTop: props.marginTop },
        props.disabled ? styles.disabled : null
      ]}
    >
      {icon}
      <Text
        style={{
          color: props.color,
          textAlign: "center",
          fontSize: props.fontSize ? props.fontSize : 21
        }}
      >
        {props.children}
      </Text>
    </View>
  );

  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback onPress={props.disabled ? null : props.onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableOpacity onPress={props.disabled ? null : props.onPress}>
      {content}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    width: "30%"
  },
  disabled: {
    backgroundColor: "gray",
    opacity: 0.5,
    borderColor: "#aaa"
  }
});
export default defaultButton;
