import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Animated,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import DefaultInput from "../components/DefaultInput/DefaultInput";
import DefaultButton from "../components/DefaultButton/DefaultButton";
import { connect } from "react-redux";
import WaitingTimeInformation from "./WaitingTimeInformation";
import image from "../assets/places2.jpg";
import getCurrentPosition from "../common/common";
import { getDistance } from "geolib";

class WaitingTime extends Component {
  state = {
    searchedName: "",
    listHospitalsName: this.props.hospitals.map(hospital => {
      return hospital.name;
    }),
    hospitalName: "",
    hospital: "",
    mode: "location",
    scale: new Animated.Value(0.95)
  };

  runAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.scale, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500
        }),
        Animated.timing(this.state.scale, {
          toValue: 0.95,
          useNativeDriver: true,
          duration: 500
        })
      ])
    ).start();
  };

  changeLocationNameHandler = async val => {
    if (val === "") {
      await this.setState({ searchedName: "", hospitalName: "" });
    } else {
      await this.setState({ searchedName: val });

      let resultSearch = "";
      this.state.listHospitalsName.forEach(hospName => {
        if (
          hospName.toLowerCase().includes(this.state.searchedName.toLowerCase())
        ) {
          resultSearch = hospName;

          this.runAnimation();
        }
      });

      if (resultSearch != "") this.setState({ hospitalName: resultSearch });
      else {
        this.setState({ hospitalName: "" });
      }
    }
  };

  setTimeHandler = () => {
    let hospital = this.props.hospitals.find(hospital => {
      return hospital.name === this.state.hospitalName;
    });
    this.setState({
      hospital: hospital,
      mode: "information"
    });
  };

  hideModalHandler = () => {
    this.setState({ mode: "location", hospitalName: "" });
  };

  getLocationHandler = async () => {
    try {
      const coordsEvent = await getCurrentPosition();
      let userLocation = {
        latitude: coordsEvent.nativeEvent.coordinate.latitude,
        longitude: coordsEvent.nativeEvent.coordinate.longitude
      };
      let found = null;
      this.props.hospitals.forEach(hospital => {
        const distance = getDistance(userLocation, {
          latitude: hospital.location.coordinates[1],
          longitude: hospital.location.coordinates[0]
        });
        if (distance <= 150) {
          found = hospital.name;
          this.setState({ hospitalName: found });
          this.setTimeHandler();
        }
      });
      if (!found) Alert.alert("Você não se está em nenhum hospital!");
    } catch (err) {
      Alert.alert("Falha na localização, tente de novo!");
    }
  };

  render() {
    let modal = null;
    if (this.state.mode === "information") {
      modal = (
        <WaitingTimeInformation
          hospital={this.state.hospital}
          onHideModal={this.hideModalHandler}
        />
      );
    }

    return (
      <>
        <KeyboardAvoidingView behavior={"position"} style={styles.container}>
          <ImageBackground
            source={image}
            style={styles.image}
            resizeMode={"cover"}
          />
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Vamos começar!</Text>
            <Text style={styles.text}>
              Primeiro, informe o hospital que você quer informar o tempo de
              espera até o atendimento.
            </Text>

            <DefaultInput
              style={{ borderWidth: 1, borderColor: "#gray", marginTop: 5 }}
              placeholder="hospital..."
              icon={"md-locate"}
              value={this.state.searchedName}
              onChangeText={val => this.changeLocationNameHandler(val)}
            />

            <TouchableOpacity onPress={this.setTimeHandler}>
              <Animated.View
                style={{
                  transform: [
                    {
                      scale: this.state.scale.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                      })
                    }
                  ]
                }}
              >
                <Text style={styles.hospitalName}>
                  {this.state.hospitalName}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <DefaultButton
          backgroundColor="#78B66E"
          color="#eee"
          width={"100%"}
          fontSize={21}
          borderRadius={10}
          onPress={this.getLocationHandler}
        >
          Ou me localize
        </DefaultButton>
        {modal}
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee"
  },
  image: {
    width: "100%",
    height: 200
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",

    paddingBottom: 20,
    width: "90%"
  },
  title: {
    fontFamily: "Pangolin",
    color: "#55949D",
    fontSize: 28,
    paddingBottom: 30
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  hospitalName: {
    marginTop: 5,
    color: "red",
    fontSize: 16
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    hospitals: state.hospitals.hospitals,
    isLoading: state.ui.isLoading
  };
};

export default connect(
  mapStateToProps,
  null
)(WaitingTime);
