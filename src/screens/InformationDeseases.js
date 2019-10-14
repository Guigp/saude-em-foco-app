import React, { Component } from "react";
import { View, StyleSheet, Animated } from "react-native";
import ViewDisease from "../components/ViewDisease";
import Zika from "./Zika";
import Chikungunya from "./Chikungunya";
import Dengue from "./Dengue";

class InformationDeseases extends Component {
  state = {
    desease: "chikungunya",
    opacity: new Animated.Value(0),
    opacity2: new Animated.Value(0.7)
  };
  componentDidMount = () => {
    this.runAnimation();
    this.runAnimation2();
  };
  componentDidUpdate = () => {
    this.runAnimation2();
  };

  runAnimation = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1000
    }).start();
  };

  runAnimation2 = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.opacity2, {
          toValue: 1,
          useNativeDriver: true,
          duration: 1000
        }),
        Animated.timing(this.state.opacity2, {
          toValue: 0.7,
          useNativeDriver: true,
          duration: 1000
        })
      ])
    ).start();
  };

  deseaseHandler = desease => {
    this.setState({ desease: desease });
  };
  render() {
    let content;
    switch (this.state.desease) {
      case "dengue":
        content = <Dengue />;
        break;
      case "zika":
        content = <Zika />;
        break;
      default:
        content = <Chikungunya />;
    }

    return (
      <>
        <Animated.View
          style={{
            opacity: this.state.opacity
          }}
        >
          <View style={styles.container}>
            <Animated.View
              style={{
                opacity:
                  this.state.desease === "chikungunya"
                    ? this.state.opacity2
                    : null
              }}
            >
              <ViewDisease
                onPress={() => this.deseaseHandler("chikungunya")}
                icon={"ios-information"}
                color={"#09263E"}
              >
                Chicungunya
              </ViewDisease>
            </Animated.View>
            <Animated.View
              style={{
                opacity:
                  this.state.desease === "dengue" ? this.state.opacity2 : null
              }}
            >
              <ViewDisease
                onPress={() => this.deseaseHandler("dengue")}
                icon={"ios-information"}
                color={"#09263E"}
              >
                Dengue
              </ViewDisease>
            </Animated.View>
            <Animated.View
              style={{
                opacity:
                  this.state.desease === "zika" ? this.state.opacity2 : null
              }}
            >
              <ViewDisease
                onPress={() => this.deseaseHandler("zika")}
                icon={"ios-information"}
                color={"#09263E"}
              >
                Zika
              </ViewDisease>
            </Animated.View>
          </View>
        </Animated.View>
        <View>{content}</View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default InformationDeseases;
