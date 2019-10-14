import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import RadioButtons from "./RadioButtons";
import Icon from "react-native-vector-icons/Ionicons";

class DiseaseSegmentedQuestion extends Component {
  state = {
    iconHeart: "md-heart"
  };

  changeRadioHandler = option => {
    this.props.onChangeAnswer(option);
  };

  render() {
    let iconHeart;

    switch (this.props.indexSelected.toString()) {
      case "0":
        iconHeart = "md-heart";
        break;
      case "1":
        iconHeart = "md-heart-half";

        break;
      case "2":
        iconHeart = "md-heart-empty";
        break;
      default:
        iconHeart = "md-heart";
        break;
    }

    return (
      <View style={styles.containerQuestionSegmented}>
        <Icon style={styles.iconHeart} name={iconHeart} size={35} />
        <RadioButtons
          onChangeRadio={option => this.changeRadioHandler(option)}
          options={this.props.options}
          onSelectedDefault={this.props.selected}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerQuestionSegmented: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginTop: 15,
    flex: 1
  },
  iconHeart: {
    color: "red"
  }
});

export default DiseaseSegmentedQuestion;
