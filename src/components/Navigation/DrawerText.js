import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import { DrawerItems } from "react-navigation";
import axios from "axios";
import imageBackground from "../../../src/assets/drawer1.jpg";
import avatarMale from "../../../src/assets/avatar1.png";
import avatarFemale from "../../../src/assets/avatar2.png";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { authLogout, teste } from "../../store/actions/index";
import serverURL from "../../services/serverUrl";

class DrawerText extends Component {
  state = {
    avatar: this.props.user.avatar
      ? this.props.user.avatar
      : this.props.user.genre === "female"
      ? avatarFemale
      : avatarMale,
    hasImage: this.props.user.avatar ? true : false
  };

  logoutHandler = () => {
    delete axios.defaults.headers.common["Authorization"];
    this.props.onLogout();
    this.props.navigation.navigate("Auth");
  };

  render() {
    let image = this.state.hasImage ? (
      <Image
        source={{ uri: `${serverURL()}/${this.state.avatar}` }}
        style={styles.avatar}
      />
    ) : (
      <Image source={this.state.avatar} style={styles.avatar} />
    );
    let user = "";
    if (this.props.name) {
      user = this.props.name;
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={imageBackground}
          resizeMode={"cover"}
        />

        <View style={styles.itemsContainer}>
          <View style={styles.header}>
            {image}
            <Text style={styles.welcome}>{`Olá ${user}`}</Text>
          </View>

          <DrawerItems iconContainerStyle={{ opacity: 1 }} {...this.props} />
          <TouchableOpacity
            onPress={() => this.logoutHandler()}
            style={{ flexDirection: "row", marginLeft: 18, marginTop: 10 }}
          >
            <Icon name="ios-log-out" size={25} color={"#246068"} />
            <Text
              style={{
                color: "#246068",
                fontWeight: "bold",
                fontSize: 20,
                marginLeft: 33
              }}
            >
              Sair
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%"
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
    opacity: 0.6,
    flex: 1
  },
  itemsContainer: {
    width: "70%",
    position: "absolute",
    marginLeft: 20
  },
  avatar: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 30,
    margin: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  welcome: {
    fontFamily: "Lacquer-Regular",
    fontSize: 18
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    name: state.user.name,
    email: state.user.email,
    token: state.user.token,
    expiresAt: state.user.expiresAt,
    logged: state.user.logged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authLogout()),
    onTeste: () => dispatch(teste())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerText);
