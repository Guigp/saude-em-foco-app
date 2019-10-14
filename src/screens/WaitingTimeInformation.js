import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Alert,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native";
import DefaultInput from "../components/DefaultInput/DefaultInput";
import DefaultButton from "../components/DefaultButton/DefaultButton";
import { connect } from "react-redux";
import imageClock from "../assets/time3.jpg";
import imageClock2 from "../assets/clock2.png";
import heart from "../assets/heart.png";
import AwesomeAlert from "react-native-awesome-alerts";
import Icon from "react-native-vector-icons/Ionicons";
import api from "../services/api";
import { uiStartLoading, uiStopLoading } from "../store/actions/index";

class WaitingTimeInformation extends Component {
  state = {
    prevHospitalsRedux: this.props.hospitals,
    hospital: this.props.hospital,
    success: false,
    showModal: true,
    userWaitingTime: ""
  };

  //props é props após o update,state contém a props antes do update
  //apenas re-renderiza se o que mudar for no tempo de espera e não mudança nos comentários
  //e apenas do hospital em questão
  static getDerivedStateFromProps = (props, state) => {
    const hospitalAfterUpdate = props.hospitals.find(hosp => {
      return hosp._id === state.hospital._id;
    });
    const hospitalBeforeUpdate = state.prevHospitalsRedux.find(hosp => {
      return hosp._id === state.hospital._id;
    });

    if (
      hospitalAfterUpdate.waitingTime !== hospitalBeforeUpdate.waitingTime ||
      hospitalAfterUpdate.contributions != hospitalBeforeUpdate.contributions
    ) {
      return {
        prevHospitalsRedux: props.hospitals,
        hospital: hospitalAfterUpdate
      };
    }

    return null;
  };

  sendUpdateTimeHandler = async time => {
    const url = "/setWaitingTime";
    const config = {
      headers: {
        Authorization: `bearer ${this.props.user.token}`,
        "Content-Type": "application/json"
      }
    };
    const body = {
      hospitalId: this.state.hospital._id,
      waitingTime: time
    };
    this.props.onStartLoading();
    try {
      await api.put(url, body, config);
      this.props.onStopLoading();
      this.setState({ success: true, userWaitingTime: "" });
    } catch (err) {
      this.props.onStopLoading();
      Alert.alert("Erro ao enviar seu tempo de atendimento, tente de novo!");
    }
  };

  hideAlert = () => {
    this.setState({ success: false });
  };

  hideModal = () => {
    this.setState({ showModal: false });
    this.props.onHideModal();
  };

  render() {
    let alert = null;
    if (this.state.success) {
      alert = (
        <AwesomeAlert
          show={true}
          showProgress={false}
          title="Obrigado por colaborar!"
          message={"Sua informação foi enviada com sucesso!"}
          messageStyle={{
            color: "red",
            fontWeight: "700",
            textAlign: "center"
          }}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#547CBD"
          confirmButtonStyle={{
            width: 120,
            justifyContent: "center",
            alignItems: "center"
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      );
    }

    return (
      <Modal
        animationType="slide"
        visible={this.state.showModal}
        transparent={true}
        onRequestClose={() => {
          this.hideModal();
        }}
      >
        <KeyboardAvoidingView
          behavior={"position"}
          style={styles.setTimeContainer}
        >
          <View style={styles.imageContainer}>
            <ImageBackground
              source={imageClock}
              style={styles.image}
              resizeMode={"cover"}
            >
              <View
                style={{
                  flex: 1,
                  position: "relative",
                  backgroundColor: "rgba(0,0,0,.6)"
                }}
              >
                <TouchableOpacity
                  style={styles.iconCloseModal}
                  onPress={() => this.hideModal()}
                >
                  <Icon
                    name={"md-close-circle-outline"}
                    size={40}
                    color={"#eee"}
                  />
                </TouchableOpacity>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      color: "#eee",
                      fontSize: 24,
                      textAlign: "center",
                      fontFamily: "Pangolin"
                    }}
                  >
                    {this.state.hospital.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    paddingLeft: 20,
                    position: "absolute",
                    bottom: 0
                  }}
                >
                  <Image source={heart} style={{ width: 30, height: 30 }} />
                  <Text
                    style={{
                      color: "#eee",
                      fontSize: 15,
                      textAlign: "center",
                      fontFamily: "Pangolin"
                    }}
                  >
                    {!this.state.hospital.contributions
                      ? "  Nenhuma contribuição hoje"
                      : this.state.hospital.contributions === 1
                      ? this.state.hospital.contributions + "  contribuição"
                      : this.state.hospital.contributions + "  contribuições"}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.textContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Image source={imageClock2} style={{ width: 50, height: 50 }} />
              <Text style={styles.question}>Espera média atual</Text>
            </View>
            <Text style={styles.waitingTime}>{`${
              this.state.hospital.waitingTime === 0
                ? " Indisponível"
                : this.state.hospital.waitingTime === 1
                ? this.state.hospital.waitingTime + " minuto"
                : this.state.hospital.waitingTime + " minutos"
            } `}</Text>

            <View style={styles.inputTime}>
              <DefaultInput
                placeholder="tempo de espera..."
                icon={"md-time"}
                styleTextInput={{ width: "80%", color: "#BE4351" }}
                styleIconInput={{ width: "20%" }}
                value={this.state.userWaitingTime}
                onChangeText={val => this.setState({ userWaitingTime: val })}
              />
            </View>
          </View>
          <View style={{ height: "15%" }}>
            {this.props.isLoading ? (
              <ActivityIndicator size={"large"} />
            ) : (
              <DefaultButton
                backgroundColor="#EC4C4C"
                color="#eee"
                width={"100%"}
                fontSize={22}
                borderRadius={20}
                onPress={() =>
                  this.sendUpdateTimeHandler(this.state.userWaitingTime)
                }
              >
                Compartilhar
              </DefaultButton>
            )}
          </View>
          {alert}
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  setTimeContainer: {
    backgroundColor: "#E2E2E2",
    height: "100%",
    width: "100%",
    paddingBottom: 15
  },
  inputTime: {
    width: "60%",
    backgroundColor: "#eee",
    marginTop: 20,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: "#BE4351",
    alignItems: "center"
  },

  textContainer: {
    height: Dimensions.get("window").height / 2.2,
    justifyContent: "center",
    alignItems: "center"
  },
  question: {
    fontSize: 22,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "#81A0D4"
  },
  imageContainer: {
    width: "100%",

    borderBottomWidth: 7,
    borderColor: "#B0B9BA",
    height: Dimensions.get("window").height / 3.2
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)"
  },
  waitingTime: {
    color: "#F7394F",
    fontSize: 30,
    fontWeight: "bold"
  },
  iconCloseModal: {
    width: 40,
    marginLeft: 10,
    marginTop: 12
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
  return {
    onStartLoading: () => dispatch(uiStartLoading()),
    onStopLoading: () => dispatch(uiStopLoading())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingTimeInformation);
