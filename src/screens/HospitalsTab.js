import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Alert,
  ActivityIndicator
} from "react-native";
import TabsHeader from "../components/TabsHeader/TabsHeader";
import AppAction from "../components/AppAction/AppActionImgItem";
import imagePlaces from "../assets/places2.jpg";
import imageTime from "../assets/time2.jpg";
import imageIndication from "../assets/indication.jpg";
import serverURL from "../services/serverUrl";
import api from "../services/api";
import {
  getHospitals,
  updateHospitalNumberComments,
  updateWaitingTime,
  uiStartLoading,
  uiStopLoading,
  setRouteName
} from "../store/actions/index";
import { addNewComment, deleteComment } from "../store/actions/comments";
import { connect } from "react-redux";
import openSocket from "socket.io-client";

class HospitalsTab extends Component {
  componentDidMount = async () => {
    this.props.onStartLoading();
    const url = "/getHospitals";
    const config = {
      headers: {
        Authorization: `bearer ${this.props.token}`
      }
    };
    try {
      let hospitals = await api.get(url, config);

      this.props.onGetHospitals(hospitals.data.allHospitals);
      this.props.onStopLoading();
    } catch (err) {
      Alert.alert("Erro ao carregar os hospitais, tente de novo!");
    }

    const socket = openSocket(serverURL());
    socket.on("comments", async data => {
      if (data.action === "create") {
        this.props.onAddNewComment(data.newComment);
        this.props.onUpdateHospitalNumberComments(
          data.newComment.hospital,
          "plus"
        );
      }
      if (data.action === "delete") {
        this.props.onDeleteComment(data.oldComment.commentId);
        this.props.onUpdateHospitalNumberComments(
          data.oldComment.hospitalId,
          "minus"
        );
      }
    });

    socket.on("time", async data => {
      if (data.action === "update") {
        this.props.onUpdateWaitingTime(
          data.hospital.hospitalId,
          data.hospital.waitingTime,
          data.hospital.contributions
        );
      }
    });
  };

  click = option => {
    switch (option) {
      case "places":
        this.props.navigation.navigate("Places");

        break;
      case "reportTime":
        this.props.navigation.navigate("WaitingTimeLocation");

        break;
      case "indication":
        this.props.navigation.navigate("Indication");

        break;
    }
  };
  render() {
    let content = null;
    if (this.props.ui.isLoading)
      content = <ActivityIndicator size={"large"} style={{ marginTop: 100 }} />;
    else
      content = (
        <ScrollView horizontal={true}>
          <View style={styles.container}>
            <AppAction
              action={() => this.click("places")}
              image={imagePlaces}
              text={"Locais de atendimento"}
            />
            <AppAction
              action={() => this.click("reportTime")}
              image={imageTime}
              text={"Tempo de espera"}
            />

            <AppAction
              action={() => this.click("indication")}
              image={imageIndication}
              text={"Indicação hospitalar"}
            />
          </View>
        </ScrollView>
      );
    return (
      <>
        <TabsHeader>
          <Text>
            As filas nos hospitais são um grande problema para a saúde pública
            no Brasil, resultando em muitos atrasos no atendimento da população.
          </Text>
        </TabsHeader>
        {content}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    token: state.user.token,
    hospitals: state.hospitals.hospitals,
    ui: state.ui
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetHospitals: allHospitals => dispatch(getHospitals(allHospitals)),
    onDeleteComment: comment => dispatch(deleteComment(comment)),
    onUpdateHospitalNumberComments: (hospitalId, operation) =>
      dispatch(updateHospitalNumberComments(hospitalId, operation)),
    onAddNewComment: comment => dispatch(addNewComment(comment)),
    onUpdateWaitingTime: (hospitalId, time, contributions) =>
      dispatch(updateWaitingTime(hospitalId, time, contributions)),
    onStartLoading: () => dispatch(uiStartLoading()),
    onStopLoading: () => dispatch(uiStopLoading()),
    onSetRouteName: route => dispatch(setRouteName(route))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HospitalsTab);
