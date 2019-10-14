/* global google */
import React, { Component } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import MapView from "react-native-maps";
import _ from "lodash";
import MapViewDirections from "react-native-maps-directions";
import { connect } from "react-redux";
import greenFlag from "../../assets/greenFlag.png";
import redFlag from "../../assets/redFlag.png";
import yellowFlag from "../../assets/yellowFlag.png";
import { getUserLocalization } from "../../store/actions/pickedLocalization";
import { GOOGLE_MAPS_KEY } from "react-native-dotenv";

class MapHospitals extends Component {
  state = {
    origin: {
      latitude: this.props.pickedLocalization.latitude,
      longitude: this.props.pickedLocalization.longitude
    },
    destination: { latitude: "", longitude: "" }
  };

  render() {
    let content = null;

    if (this.props.hospitals.indications) {
      let hospitals = null;
      this.ckey = [];

      hospitals = this.props.hospitals.hospitals.map((hospital, index) => {
        return (
          <MapView.Marker
            coordinate={{
              latitude: hospital.location.coordinates[1],
              longitude: hospital.location.coordinates[0]
            }}
            pinColor={"red"}
            key={index}
            ref={ref => {
              this.ckey[index] = ref;
              return true;
            }}
          >
            <Image
              source={
                hospital.infoIndication.flag === "green"
                  ? greenFlag
                  : hospital.infoIndication.flag === "red"
                  ? redFlag
                  : yellowFlag
              }
              style={{ height: 50, width: 50 }}
            />
            <MapView.Callout
              onPress={() =>
                this.setState({
                  destination: {
                    latitude: hospital.location.coordinates[1],
                    longitude: hospital.location.coordinates[0]
                  }
                })
              }
              tooltip
            >
              <View style={styles.callout}>
                <Text
                  style={{
                    color: "#eee",
                    fontFamily: "Pangolin",
                    textAlign: "center"
                  }}
                >
                  {hospital.name}
                </Text>
                <Text style={{ color: "red" }}>
                  Clique para visualizar a rota!
                </Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
        );
      });

      // marcador de posição do usuário
      let marker = null;
      if (this.props.pickedLocalization.locationChosen) {
        marker = (
          <MapView.Marker
            coordinate={this.props.pickedLocalization}
            pinColor={"blue"}
            draggable
            calloutAnchor={{ x: 0.5, y: 0.2 }}
            ref={ref => {
              this.markerKey = ref;
            }}
          ></MapView.Marker>
        );
      }
      content = (
        <>
          <MapView
            loadingEnabled={true}
            initialRegion={this.props.pickedLocalization}
            region={
              !this.props.pickedLocalization.locationChosen
                ? this.props.pickedLocalization
                : null
            }
            style={styles.map}
            ref={ref => (this.map = ref)} //cria uma referencia desse obj para poder ser usado em outros lugares
          >
            {this.state.destination.latitude != "" ? (
              <MapViewDirections
                origin={this.state.origin}
                destination={this.state.destination}
                apikey={GOOGLE_MAPS_KEY}
              />
            ) : null}
            {marker}
            {hospitals}
          </MapView>
        </>
      );
    }

    return content;
  }
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 350
  },
  callout: {
    backgroundColor: "#1A4659",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 200,
    borderRadius: 15
  }
});
const mapStateToProps = state => {
  return {
    user: state.user.name,
    token: state.user.token,
    hospitals: state.hospitals,
    pickedLocalization: state.pickedLocalization
  };
};

mapDispatchToProps = dispatch => {
  return {
    onGetUserLocalization: coords => dispatch(getUserLocalization(coords))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapHospitals);
