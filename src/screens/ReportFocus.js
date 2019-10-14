/* global google */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Modal,
  Alert
} from "react-native";

import openSocket from "socket.io-client";
import { getDistance } from "geolib";
import {
  addNewComplaint,
  removeComplaint,
  updateNumberCasesLocation,
  uiStartLoading,
  uiStopLoading
} from "../../src/store/actions/index";
import _ from "lodash";
import ReportCaseResume from "../components/ReportCaseResume";
import { connect } from "react-redux";
import ShowComplaintInfo from "../components/ShowComplaintInfo";
import AwesomeAlert from "react-native-awesome-alerts";
import serverURL from "../services/serverUrl";
import api from "../services/api";
import PickLocation from "../components/Map/PickLocation";
console.ignoredYellowBox = ["Remote debugger"];
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

import DangerArea from "../components/DangerArea";

class ReportFocus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaintModalInformations: {
        userId: "",
        userName: "",
        location: "",
        informations: "",
        imageURL: "",
        complaintId: "",
        showInformations: false,
        modalInformationsVisible: false
      },

      makeReport: false,
      modalReportVisible: false,
      showAlert: false,
      alertMessage: ""
    };
  }
  showAlert = () => {
    this.setState({
      showAlert: true,
      alertMessage: ""
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
      alertMessage: ""
    });
  };

  componentDidMount = () => {
    const socket = openSocket(serverURL());
    socket.on("complaints", async data => {
      let userLocation = {
        latitude: this.props.pickedLocalization.latitude,
        longitude: this.props.pickedLocalization.longitude
      };
      if (data.action === "create") {
        this.props.onAddNewComplaint(data.complaint);

        let newComplaintLocation = {
          latitude: data.complaint.location.coordinates[1],
          longitude: data.complaint.location.coordinates[0]
        };

        let radius = this.props.pickedLocalization.radius;
        let distance = getDistance(userLocation, newComplaintLocation);

        if (distance <= radius * 1000) {
          this.props.onUpdateNumberCasesLocation("add");
        }
      } else if (data.action === "delete") {
        let removedComplaint = this.props.pickedLocalization.complaints.filter(
          comp => comp._id === data.complaintID
        );

        let deletedComplaintLocation = {
          latitude: removedComplaint[0].location.coordinates[1],
          longitude: removedComplaint[0].location.coordinates[0]
        };
        let radius = this.props.pickedLocalization.radius;
        let distance = getDistance(userLocation, deletedComplaintLocation);

        if (distance <= radius * 1000) {
          this.props.onUpdateNumberCasesLocation("remove");
        }
        this.props.onRemoveComplaint(data.complaintID);
      }
    });
  };

  makeReportHandler = () => {
    this.setState({ makeReport: true, modalReportVisible: true });
  };
  cancelReportHandler = () => {
    this.setState({ makeReport: false, modalReportVisible: false });
  };

  confirmReportHandler = async (image, informations) => {
    const url = "/addComplaint";
    var config = {
      headers: {
        Authorization: `bearer ${this.props.token}`,
        "Content-Type": "multipart/form-data"
      }
    };

    const latitude = this.props.pickedLocalization.latitude;
    const longitude = this.props.pickedLocalization.longitude;
    const body = new FormData();
    let loc = {
      type: "Point",
      coordinates: [longitude, latitude]
    };
    loc = JSON.stringify(loc);

    body.append("locationName", this.props.pickedLocalization.locationName);
    body.append("location", loc);
    if (image) {
      body.append("image", image);
    }
    body.append("informations", informations);
    this.props.onStartLoading();
    await api
      .post(url, body, config)
      .then(json => {
        this.setState({ showAlert: true, alertMessage: json.data.message });
      })
      .then(() => {
        this.props.onStopLoading();
        this.cancelReportHandler();
      })

      .catch(err => {
        this.props.onStopLoading();
        Alert.alert("Ocorreu um erro, por favor tente de novo");
      });
  };

  showComplaintlInfoHandler = (
    user,
    userName,
    location,
    imageURL,
    informations,
    _id
  ) => {
    this.setState(prevState => {
      return {
        complaintModalInformations: {
          ...prevState.complaintModalInformations,
          userId: user,
          userName: userName,
          location: location,
          imageURL: imageURL ? `${serverURL()}/${imageURL}` : null,
          informations: informations,
          complaintId: _id,
          showInformations: true,
          modalInformationsVisible: true
        }
      };
    });
  };

  exitReportHandler = () => {
    this.setState(prevState => {
      return {
        complaintModalInformations: {
          ...prevState.complaintModalInformations,

          showInformations: false,
          modalInformationsVisible: false
        }
      };
    });
  };

  removeReportHandler = (userId, complaintId) => {
    const url = `/deleteComplaint/${userId}/${complaintId}`;
    var config = {
      headers: {
        Authorization: `bearer ${this.props.token}`
      }
    };
    this.props.onStartLoading();
    api
      .delete(url, config)
      .then(json => {
        this.setState({ showAlert: true, alertMessage: json.data.message });
      })
      .then(() => {
        this.props.onStopLoading();
        this.exitReportHandler();
      })
      .catch(err => {
        this.props.onStopLoading();
        Alert.alert("Ocorreu um erro, por favor tente de novo!");
      });
  };

  render() {
    let content;
    let modal = null;
    let alert = null;

    if (this.state.showAlert)
      alert = (
        <AwesomeAlert
          show={true}
          showProgress={false}
          title="Obrigado por colaborar!"
          message={this.state.alertMessage}
          messageStyle={{ color: "red", fontWeight: "700" }}
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

    if (this.state.makeReport === true) {
      modal = (
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalReportVisible}
            onRequestClose={() => {
              this.cancelReportHandler();
            }}
          >
            <ReportCaseResume
              onConfirmReport={(image, informations) =>
                this.confirmReportHandler(image, informations)
              }
              isLoading={this.props.isLoading}
              onCancel={() => this.cancelReportHandler()}
              locName={this.props.pickedLocalization.locationName}
            />
          </Modal>
        </View>
      );
    } else if (
      this.state.complaintModalInformations.showInformations === true
    ) {
      modal = (
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalInformationsVisible}
            onRequestClose={() => {
              this.exitReportHandler();
            }}
          >
            <ShowComplaintInfo
              onRemoveComplaint={() =>
                this.removeReportHandler(
                  this.state.complaintModalInformations.userId,
                  this.state.complaintModalInformations.complaintId
                )
              }
              onExit={() => this.exitReportHandler()}
              userName={this.state.complaintModalInformations.userName}
              location={this.state.complaintModalInformations.location}
              imageURL={this.state.complaintModalInformations.imageURL}
              informations={this.state.complaintModalInformations.informations}
              isLoading={this.props.isLoading}
            />
          </Modal>
        </View>
      );
    }

    content = (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.container}>
            <DangerArea
              radius={this.props.pickedLocalization.radius}
              numberCases={
                this.props.pickedLocalization.numberCasesNearLocation
              }
              isLoading={this.props.isLoading}
            />
            <PickLocation
              onShowComplaintInfo={(
                user,
                userName,
                location,
                imageURL,
                informations,
                _id
              ) =>
                this.showComplaintlInfoHandler(
                  user,
                  userName,
                  location,
                  imageURL,
                  informations,
                  _id
                )
              }
              onMakeComplaint={() => this.makeReportHandler()}
              withBarSearch={true}
              withButtonLocalization={true}
            />
            {modal}
            {alert}
          </KeyboardAvoidingView>
        </ScrollView>
      </TouchableWithoutFeedback>
    );

    return content;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    user: state.user.name,
    token: state.user.token,
    pickedLocalization: state.pickedLocalization
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddNewComplaint: complaint => dispatch(addNewComplaint(complaint)),
    onRemoveComplaint: complaintID => dispatch(removeComplaint(complaintID)),
    onStartLoading: () => dispatch(uiStartLoading()),
    onStopLoading: () => dispatch(uiStopLoading()),
    onUpdateNumberCasesLocation: addOrRemove =>
      dispatch(updateNumberCasesLocation(addOrRemove))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportFocus);
