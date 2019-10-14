import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import logo from "../../assets/logo.jpg";
import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

const Header = ({ navigation }) => {
  return (
    <LinearGradient colors={["#8C9C9C", "#CFD7D7"]} style={styles.container}>
      <View style={styles.containerMenu}>
        <View style={styles.subcontainerMenu}>
          <Icon
            style={styles.icon}
            name="md-menu"
            size={40}
            color={"blue"}
            onPress={() => navigation.openDrawer()}
          />
        </View>
        <Text>{title}</Text>
      </View>
      <Image
        source={logo}
        style={{ width: 100, height: 40, borderRadius: 20, marginLeft: 20 }}
      />
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  containerMenu: {
    width: 40,
    backgroundColor: "red",
    padding: 7
  },
  subcontainerMenu: {
    width: 27
  },
  icon: {
    width: "100%"
  }
});
export default Header;
