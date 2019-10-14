import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import greenFlag from "../../assets/greenFlag.png";
import yellowFlag from "../../assets/yellowFlag.png";
import redFlag from "../../assets/redFlag.png";

class IndicationItemResult extends Component {
  state = {
    hospital: this.props.hospitals.find(hospital => {
      return hospital._id === this.props.indication.hospitalId;
    }),
    prevHospitalsRedux: []
  };

  //props é props após o update,state contém a props antes do update
  static getDerivedStateFromProps = (props, state) => {
    if (props.hospitals !== state.prevHospitalsRedux) {
      return {
        prevHospitalsRedux: props.hospitals,
        hospital: props.hospitals.find(hospProps => {
          return state.hospital._id === hospProps._id;
        })
      };
    }

    return null;
  };

  render() {
    let flagColor = null;

    this.props.indication.flag === "green"
      ? (flagColor = greenFlag)
      : this.props.indication.flag === "red"
      ? (flagColor = redFlag)
      : (flagColor = yellowFlag);

    return (content = (
      <TouchableOpacity
        onPress={() => this.props.onShowModal(this.state.hospital)}
        style={styles.container}
      >
        <View style={styles.imageContainer}>
          <Image source={flagColor} style={{ width: 50, height: 50 }} />
        </View>
        <View style={{ width: "60%", alignItems: "center", marginBottom: 15 }}>
          <Text style={styles.hospitalName}>{this.state.hospital.name}</Text>
        </View>

        <Text style={styles.address}>{this.state.hospital.address}</Text>
        <View style={styles.infoViewsContainer}>
          <View style={[styles.infoView, { backgroundColor: "#84BDCE" }]}>
            <Icon name={"md-locate"} size={14} color={"#eee"} />
            <Text style={styles.iconLabel}>
              {this.props.indication.distance}
            </Text>
          </View>

          <View style={styles.infoView}>
            <Icon name={"ios-car"} size={14} color={"#eee"} />
            <Text style={styles.iconLabel}>
              {this.props.indication.duration}
            </Text>
          </View>
          <View style={styles.infoView}>
            <Icon name={"md-time"} size={14} color={"#eee"} />
            <Text style={styles.iconLabel}>
              {this.state.hospital.waitingTime === 0
                ? "Nenhum dado"
                : this.state.hospital.waitingTime == 1
                ? `${this.state.hospital.waitingTime} minuto`
                : `${this.state.hospital.waitingTime} minutos`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  }
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "#E5EBF2",
    position: "relative",
    height: 200,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10
  },

  imageContainer: {
    width: "20%",
    position: "absolute",
    top: 12,
    left: 15,
    marginBottom: 10
  },
  flagText: { fontFamily: "Pangolin", fontSize: 11 },
  infoViewsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  infoView: {
    width: 90,
    height: 30,
    color: "#eee",
    backgroundColor: "#393C3E",
    borderRadius: 4,
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5
  },
  hospitalName: {
    fontFamily: "Pangolin",
    fontSize: 17,
    textAlign: "center",
    color: "#292E30"
  },
  address: {
    fontSize: 14,
    textAlign: "center",
    color: "#5F666B",
    padding: 15
  },
  iconLabel: {
    fontSize: 12,
    color: "#eee",
    paddingLeft: 4
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    hospitals: state.hospitals.hospitals,
    isLoading: state.ui.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndicationItemResult);
