import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import TabsHeader from "../components/TabsHeader/TabsHeader";
import AppAction from "../components/AppAction/AppActionImgItem";
import imageComplaint from "../assets/complaint.jpg";
import imageInformations from "../assets/informationsDeseases.jpg";
import imageSymptom from "../assets/symptomTest.jpg";
import { getUserLocalization } from "../store/actions/index";
import { connect } from "react-redux";
import getCurrentPosition from "../common/common";

class Aedes extends Component {
  click = option => {
    switch (option) {
      case "information":
        this.props.navigation.navigate("InformationDeseases");

        break;
      case "reportFocus":
        this.props.navigation.navigate("ReportFocus");

        break;
      case "test":
        this.props.navigation.navigate("SymptomTest");

        break;
    }
  };
  componentDidMount = async () => {
    const coordsEvent = await getCurrentPosition();
    let userLocation = {
      latitude: coordsEvent.nativeEvent.coordinate.latitude,
      longitude: coordsEvent.nativeEvent.coordinate.longitude
    };
    this.props.onGetUserLocalization(userLocation);
  };

  render() {
    return (
      <>
        <TabsHeader>
          <Text>
            Aedes Aegypti é o mosquito causador de algumas doenças bastante
            comuns no Brasil como a Dengue, Zika e Chikungunya.
          </Text>
        </TabsHeader>
        <ScrollView horizontal={true}>
          <View style={styles.container}>
            <AppAction
              image={imageComplaint}
              text={"Denunciar foco"}
              action={() => this.click("reportFocus")}
            >
              Denunciar foco
            </AppAction>
            <AppAction
              image={imageInformations}
              text={"Informações das doenças"}
              action={() => this.click("information")}
            >
              Informações sobre doenças
            </AppAction>

            <AppAction
              image={imageSymptom}
              text={"Teste de sintomas"}
              action={() => this.click("test")}
            >
              Teste de sintomas
            </AppAction>
          </View>
        </ScrollView>
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
    user: state.user,
    ui: state.ui
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetUserLocalization: localization =>
      dispatch(getUserLocalization(localization))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Aedes);
