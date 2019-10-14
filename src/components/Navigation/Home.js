import React, { Component } from "react";
import { View } from "react-native";
import TabNavigator from "./TabNavigator";

export default class Home extends Component {
  static router = TabNavigator.router;
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabNavigator navigation={this.props.navigation} />
      </View>
    );
  }
}
