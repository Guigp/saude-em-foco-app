import React, { Component } from "react";
import { View, Dimensions, Modal } from "react-native";

import { teste_sintomas } from "./Logic";
import ModalResult from "./ModalResult";
import { withNavigation } from "react-navigation";

class Result extends Component {
  state = {
    modalVisible: true
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
    this.props.onExitModal();
  }

  findHospitalHandler = () => {
    this.props.navigation.navigate("Hospitals");
  };

  render() {
    console.log(Dimensions.get("window").height);
    const fewSymptomsText =
      "Você possui poucos sintomas característicos das doenças transmitidas pelo Aedes, sendo pouco provável a existência de alguma infecção.";
    const fewSymptomsColor = "#539F5E";
    const someSymptomsText =
      " Você possui alguns sintomas característicos das doenças transmitidas pelo Aedes. Logo, recomendamos que você procure algum hospital para realizar um teste mais preciso.";
    const someSymptomsColor = "#B2B24F";
    const manySymptomsText =
      " Você possui muitos sintomas característicos das doenças transmitidas pelo Aedes, indicando uma real possibilidade de infecção. Sugerimos que você procure imediatamente algum hospital para realizar um teste mais preciso.";
    const manuSymptomsColor = "#FF5252";
    const res = teste_sintomas(this.props.userAnswers);
    let informationText = "";
    let informationColor = "";

    if (res[0].Valor < 3) {
      (informationText = fewSymptomsText),
        (informationColor = fewSymptomsColor);
    } else if (res[0].Valor <= 5) {
      (informationText = someSymptomsText),
        (informationColor = someSymptomsColor);
    } else {
      (informationText = manySymptomsText),
        (informationColor = manuSymptomsColor);
    }

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <ModalResult
            informationText={informationText}
            informationColor={informationColor}
            onPress={() => this.setModalVisible(!this.state.modalVisible)}
            onFindHospital={this.findHospitalHandler}
            user={this.props.user}
          />
        </Modal>
      </View>
    );
  }
}

export default withNavigation(Result);
