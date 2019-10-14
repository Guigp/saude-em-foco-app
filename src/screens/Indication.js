import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import IndicationList from "../components/IndicationResult/IndicationListResult";
import greenFlag from "../assets/greenFlag.png";
import yellowFlag from "../assets/yellowFlag.png";
import redFlag from "../assets/redFlag.png";
import MapHospitals from "../components/Map/MapHospitals";

class Indication extends Component {
  state = {};
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapHospitals />

          <View style={styles.flagsContainer}>
            <View style={styles.flagItem}>
              <Image source={greenFlag} style={{ width: 40, height: 40 }} />
              <Text style={[styles.flagText, { color: "green" }]}>
                Bem recomendado
              </Text>
            </View>
            <View style={styles.flagItem}>
              <Image source={redFlag} style={{ width: 40, height: 40 }} />
              <Text style={[styles.flagText, { color: "red" }]}>
                Pouco recomendado
              </Text>
            </View>
            <View style={styles.flagItem}>
              <Image source={yellowFlag} style={{ width: 40, height: 40 }} />
              <Text style={[styles.flagText, { color: "#6E5E00" }]}>
                Sem informações
              </Text>
            </View>
          </View>
          <View style={styles.hospitalsContainer}>
            <IndicationList />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center"
  },

  flagsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#4E596B"
  },
  flagItem: {
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginTop: 10,
    marginLeft: 5,
    padding: 15
  },
  flagText: {
    fontFamily: "Pangolin",
    fontSize: 16
  },
  hospitalsContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4E596B"
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    pickedLocalization: state.pickedLocalization,
    isLoading: state.ui.isLoading
  };
};

export default connect(
  mapStateToProps,
  null
)(Indication);
