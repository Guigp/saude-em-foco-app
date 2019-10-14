import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Toggle from "./Toggle";
import Icon from "react-native-vector-icons/Ionicons";

class DiseaseToggleQuestion extends Component {
  render() {
    let color = this.props.answer === true ? "red" : "#001E20";

    return (
      <View style={styles.containerQuestionToggle}>
        <Icon name="ios-body" size={20} color={color} />
        <View
          style={{
            width: "80%",
            marginLeft: 5,
            justifyContent: "center",
            borderRadius: 5,
            alignItems: "center",
            backgroundColor: "#eee"
          }}
        >
          <Text style={styles.text}>{this.props.question}</Text>
        </View>
        <View style={{ marginLeft: 5 }}>
          <Toggle
            question={this.props.question}
            onChangeToggle={isOn => this.props.onChangeAnswer(isOn)}
            isOn={this.props.answer}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerQuestionToggle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 12
  },
  text: {
    color: "#001E20",
    fontFamily: "Pangolin"
  }
});

export default DiseaseToggleQuestion;
