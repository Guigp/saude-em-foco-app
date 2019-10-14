import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated
} from "react-native";
import imageHospital from "../../assets/hospital.png";
import imageClock from "../../assets/clock.png";
import imageLocate from "../../assets/icon-locate.png";
import imageComents from "../../assets/coments.png";
import LinearGradient from "react-native-linear-gradient";
import Swipeable from "react-native-gesture-handler/Swipeable";

class PlaceItem extends Component {
  state = {
    hospital: this.props.hospital,
    scale: new Animated.Value(0)
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (
      nextProps.hospital.comments === this.props.hospital.comments &&
      nextProps.hospital.waitingTime === this.props.hospital.waitingTime
    )
      return false;
    else return true;
  };
  componentDidMount = () => {
    Animated.timing(this.state.scale, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500
    }).start();
  };
  LeftActions = (progress, dragX) => {
    return <View style={{ flex: 1 }}></View>;
  };

  render() {
    let content = null;

    content = (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.onShowModal(this.props.hospital)}
      >
        <Swipeable
          renderLeftActions={this.LeftActions}
          onSwipeableOpen={() =>
            this.props.onSwipeFromLeft(this.state.hospital._id)
          }
        >
          <Animated.View
            style={{
              transform: [
                {
                  scale: this.state.scale.interpolate({
                    inputRange: [0, 3],
                    outputRange: [0, 3]
                  })
                }
              ]
            }}
          >
            <LinearGradient
              style={{ borderRadius: 10 }}
              colors={["#eee", "#C5CAD7", "#9BA6C1"]}
            >
              <View style={styles.row}>
                <Image
                  source={imageHospital}
                  style={{ width: 30, height: 30 }}
                />
                <Text style={styles.text}>{this.props.hospital.name}</Text>
              </View>
              <View style={styles.row}>
                <Image source={imageLocate} style={{ width: 30, height: 30 }} />
                <Text style={styles.text}>{this.props.hospital.address}</Text>
              </View>
              <View style={styles.row}>
                <Image source={imageClock} style={{ width: 30, height: 30 }} />
                <Text style={styles.text}>{`${
                  this.props.hospital.waitingTime === 0
                    ? "Nenhuma informação disponível"
                    : this.props.hospital.waitingTime === 1
                    ? this.props.hospital.waitingTime +
                      " minuto em média para o atendimento"
                    : this.props.hospital.waitingTime +
                      " minutos em média para o atendimento"
                }`}</Text>
              </View>

              <View style={styles.row}>
                <Image
                  source={imageComents}
                  style={{ width: 30, height: 30 }}
                />
                <Text style={styles.text}>
                  {this.props.hospital.comments === 0
                    ? "Sem comentários"
                    : this.props.hospital.comments === 1
                    ? this.props.hospital.comments + " comentário"
                    : this.props.hospital.comments + " comentários"}
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>
        </Swipeable>
      </TouchableOpacity>
    );

    return content;
  }
}
const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginTop: 12,
    borderRadius: 10,
    borderColor: "#eee"
  },
  row: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 3
  },
  text: {
    fontFamily: "Pangolin",
    fontSize: 15,
    color: "#243152",
    paddingLeft: 10
  }
});

export default PlaceItem;
