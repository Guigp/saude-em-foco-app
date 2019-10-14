import React from "React";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import image from "../assets/places.jpg";
import PlaceItensList from "../components/PlaceItem/PlaceItensList";

export default props => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#547CBD" }}>
      <View style={styles.headerImage}>
        <Image source={image} style={styles.backgroundImage} />
      </View>
      <Text style={styles.headerText}>Locais de atendimento</Text>
      <PlaceItensList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    flexDirection: "column",
    borderBottomColor: "white",
    borderBottomWidth: 3,
    height: 150
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1
  },
  headerText: {
    fontFamily: "Pangolin",
    color: "#eee",
    fontSize: 23,
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 10
  }
});
