/* global google */
import React, { Component } from "react";
import { View, Image, Button, StyleSheet, Text, Alert } from "react-native";
import MapView from "react-native-maps";
import { uiStartLoading, uiStopLoading } from "../../store/actions/index";
import DefaultInput from "../DefaultInput/DefaultInput";
import axios from "axios";
import getCurrentPosition from "../../common/common";
import { TouchableOpacity } from "react-native-gesture-handler";
import _ from "lodash";
import Icon from "react-native-vector-icons/Ionicons";
import api from "../../services/api";
import { connect } from "react-redux";
import iconMosquito from "../../assets/aedes.png";
import CalloutAedes from "../CalloutAedes/CalloutAedes";
import { GOOGLE_MAPS_KEY } from "react-native-dotenv";

import {
  pickNewLocalization,
  getAllComplaints
} from "../../store/actions/pickedLocalization";

class PickLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: "",

      predictions: []
    };
    this.debounceHandler = _.debounce(this.updateInputState, 200);
  }

  componentDidMount = () => {
    this.getAllComplaintsHandler();
    this.getLocationHandler();
  };

  getAllComplaintsHandler = async () => {
    const url = "/getComplaints";
    var config = {
      headers: {
        Authorization: `bearer ${this.props.token}`
      }
    };

    await api
      .get(url, config)
      .then(json => this.props.onGetAllComplaints(json.data.allComplaints))
      .catch(err => Alert.alert("Ocorreu um erro", err));
  };

  //para cada local escolhido no mapa pega o nome completo e o numero de casos ao redor
  pickLocationFromMapHandler = async event => {
    let locName;
    let coords = event.nativeEvent.coordinate;

    this.map.animateToRegion({
      //anima o componente atraves da referencia criada
      ...this.props.pickedLocalization,
      latitude: coords.latitude,
      longitude: coords.longitude
    });

    var googleApi = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${GOOGLE_MAPS_KEY}`
    );

    locName = googleApi.data.results[0].formatted_address;

    const url = `/isInSphere/${coords.latitude}/${coords.longitude}`;
    var config = {
      headers: {
        Authorization: `bearer ${this.props.token}`,
        "Content-Type": "application/json"
      }
    };
    this.props.onStartLoading();
    var myApi = await api.get(url, config);
    this.props.onStopLoading();
    var numberCases = myApi.data.numberCases;

    this.setState({ locationName: locName });
    this.props.onPickLocalization(coords, locName, numberCases);
  };

  pickLocationFromTextHandler = (coords, locName) => {
    this.map.animateToRegion({
      //anima o componente atraves da referencia criada
      ...this.props.pickedLocalization,
      latitude: coords.lat,
      longitude: coords.lng
    });
    //passa no formato padrao
    const coordinates = {
      latitude: coords.lat,
      longitude: coords.lng
    };
    this.props.onPickLocalization(coordinates, locName);
  };

  getLocationHandler = async () => {
    try {
      const coordsEvent = await getCurrentPosition();
      this.pickLocationFromMapHandler(coordsEvent); //passa o obj no formato certo
    } catch (err) {
      Alert.alert("Falha na localização, tente de novo!");
    }
  };

  callPlaceDetails = id => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&fields=name,geometry,formatted_address&key=${GOOGLE_MAPS_KEY}
        `
      )
      .then(json => {
        this.setState({ locationName: json.data.result.name, predictions: [] });

        this.pickLocationFromTextHandler(
          json.data.result.geometry.location,
          json.data.result.name
        );
      });
  };

  updateInputState = val => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${val}&key=${GOOGLE_MAPS_KEY}&components=country:br&language=pt_BR
        }`
      )
      .then(result => {
        this.setState({ predictions: result.data.predictions });
      });
  };

  onChangeAddress = val => {
    this.debounceHandler(val);
    this.updateAddressHandler(val);
  };

  updateAddressHandler = val => {
    this.setState({ locationName: val });
  };

  render() {
    //marcador de posição do usuário
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
        >
          <MapView.Callout
            tooltip
            onPress={() => {
              this.markerKey.hideCallout(), this.props.onMakeComplaint();
            }}
          >
            <CalloutAedes type={"complaint"} />
          </MapView.Callout>
        </MapView.Marker>
      );
    }

    //marcadores de casos no mapa
    let cases = null;
    this.ckey = [];
    if (this.props.pickedLocalization.complaints.length > 0) {
      cases = this.props.pickedLocalization.complaints.map(
        (complaint, index) => {
          return (
            <MapView.Marker
              coordinate={{
                latitude: complaint.location.coordinates[1],
                longitude: complaint.location.coordinates[0]
              }}
              pinColor={"red"}
              key={index}
              calloutAnchor={{ x: 0.5, y: 0.2 }}
              ref={ref => {
                this.ckey[index] = ref;
                return true;
              }}
              onCalloutPress={() => {
                this.ckey[index].hideCallout(),
                  this.props.onShowComplaintInfo(
                    complaint.user,
                    complaint.userName,
                    complaint.locationName,
                    complaint.imageURL,
                    complaint.informations,
                    complaint._id
                  );
              }}
            >
              <Image source={iconMosquito} style={{ height: 50, width: 50 }} />
              <MapView.Callout tooltip>
                <CalloutAedes
                  type={"information"}
                  locationName={complaint.locationName}
                  additionalInfo={complaint.informations}
                  image={complaint.imageURL}
                />
              </MapView.Callout>
            </MapView.Marker>
          );
        }
      );
    }

    //barra de pesquisa com predictions
    let barSearch = null;
    if (this.props.withBarSearch) {
      const predictions = this.state.predictions.map(prediction => (
        <TouchableOpacity
          style={styles.predictions}
          key={prediction.place_id}
          onPress={() => this.callPlaceDetails(prediction.place_id)}
        >
          <Icon name="md-locate" size={15} color={"gray"} />
          <Text style={styles.predictionsText}>{prediction.description}</Text>
        </TouchableOpacity>
      ));

      barSearch = (
        <View style={{ paddingBottom: 20, justifyContent: "center" }}>
          <DefaultInput
            icon="md-locate"
            value={this.state.locationName}
            placeholder={"Escolha o endereço"}
            onChangeText={val => {
              this.onChangeAddress(val);
            }}
            style={{ borderWidth: 0.8, borderColor: "gray" }}
          />
          {predictions}
        </View>
      );
    }

    //botao de localização
    let button = null;
    if (this.props.withButtonLocalization) {
      button = (
        <View style={{ paddingTop: 5 }}>
          <Button title="Me Localize" onPress={this.getLocationHandler} />
        </View>
      );
    }

    return (
      <>
        {barSearch}
        {button}
        <MapView
          loadingEnabled={true}
          initialRegion={this.props.pickedLocalization}
          region={
            !this.props.pickedLocalization.locationChosen
              ? this.props.pickedLocalization
              : null
          }
          style={styles.map}
          onPress={this.pickLocationFromMapHandler}
          ref={ref => (this.map = ref)} //cria uma referencia desse obj para poder ser usado em outros lugares
        >
          {marker}
          {cases}
        </MapView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    marginTop: 10,
    height: 500
  },
  predictions: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#EAE4E4",
    marginBottom: 1,
    padding: 5
  },
  predictionsText: {
    color: "#4E9696",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 5
  }
});
const mapStateToProps = state => {
  return {
    user: state.user.name,
    token: state.user.token,
    pickedLocalization: state.pickedLocalization
  };
};

mapDispatchToProps = dispatch => {
  return {
    onPickLocalization: (coords, locName, numberCases) =>
      dispatch(pickNewLocalization(coords, locName, numberCases)),
    onGetAllComplaints: allComplaints =>
      dispatch(getAllComplaints(allComplaints)),
    onStartLoading: () => dispatch(uiStartLoading()),
    onStopLoading: () => dispatch(uiStopLoading())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickLocation);
