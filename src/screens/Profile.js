import React, { Component } from "react";
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  BackHandler
} from "react-native";

import { connect } from "react-redux";
import ImagePicker from "../components/PickImage/PickImage";
import {
  updateUser,
  uiStartLoading,
  uiStopLoading,
  setRouteName
} from "../store/actions/index";
import avatarMale from "../assets/avatar1.png";
import avatarFemale from "../assets/avatar2.png";
import DefaultInput from "../components/DefaultInput/DefaultInput";
import DefaultButton from "../components/DefaultButton/DefaultButton";
import AsyncStorage from "@react-native-community/async-storage";
import serverURL from "../services/serverUrl";
import api from "../services/api";
import AwesomeAlert from "react-native-awesome-alerts";

class Profile extends Component {
  state = {
    pickedImage: null,
    user: {
      name: this.props.user.name,
      email: this.props.user.email,
      genre: this.props.user.genre ? this.props.user.genre : "male",
      avatar: null
    },
    onFocus: {
      borderColor: "blue",
      borderBottomWidth: 3,
      padding: 0
    },
    onFocusType: null,
    buttonDisabled: true,
    changeUser: false,
    showAlert: false
  };

  componentDidMount = async () => {
    const data = await AsyncStorage.getItem("userData");
    const json = JSON.parse(data);

    if (this.props.user.avatar) {
      this.setState({
        user: {
          ...this.state.user,
          avatar: this.props.user.avatar
        }
      });
    } else if (json.avatar) {
      this.setState({
        avatar: json.avatar
      });
    }
  };
  handleBackButton = () => {
    let user = this.state.user;
    user = this.state.changeUser
      ? {
          name: this.props.user.name,
          email: this.props.user.email,
          genre: this.props.user.genre,
          avatar: this.props.user.avatar
        }
      : user;

    this.setState({
      user: user,
      changeUser: false,
      buttonDisabled: true,
      onFocusType: null
    });

    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.user != this.state.user) {
      if (this.props.user.avatar != this.state.user.avatar) {
        await this.setState({
          pickedImage: null,
          user: {
            ...this.state.user,
            avatar: this.props.user.avatar
          }
        });
      }
    }
  };

  changeUserInfoHandler = (type, val) => {
    if (!this.state.changeUser)
      this.setState({ changeUser: true, buttonDisabled: false });
    switch (type) {
      case "name":
        this.setState({ user: { ...this.state.user, name: val } });
        break;
      case "email":
        this.setState({ user: { ...this.state.user, email: val } });
        break;
      case "genre":
        this.setState({ user: { ...this.state.user, genre: val } });
        break;

      default:
        break;
    }
  };

  pickedImageHandler = image => {
    if (!this.state.changeUser)
      this.setState({ changeUser: true, buttonDisabled: false });
    console.log(image);
    this.setState({
      pickedImage: image
    });
  };

  updateProfileHandler = async () => {
    const url = `/updateUser/${this.props.user._id}`;
    var config = {
      headers: {
        Authorization: `bearer ${this.props.user.token}`,
        "Content-Type": "multipart/form-data"
      }
    };
    const body = new FormData();

    if (this.state.pickedImage) {
      body.append("image", this.state.pickedImage);
    }
    if (this.state.user.name != this.props.user.name) {
      body.append("name", this.state.user.name);
    }
    if (this.state.user.email != this.props.user.email) {
      body.append("email", this.state.user.email);
    }
    if (this.state.user.genre != this.props.user.genre) {
      body.append("genre", this.state.user.genre);
    }
    this.props.onStartLoading();
    await api
      .post(url, body, config)
      .then(async res => {
        const user = {
          name: res.data.user.name ? res.data.user.name : this.props.user.name,
          email: res.data.user.email
            ? res.data.user.email
            : this.props.user.email,
          genre: res.data.user.genre
            ? res.data.user.genre
            : this.props.user.genre,
          avatar: res.data.user.avatar
            ? res.data.user.avatar
            : this.props.user.avatar
        };

        const data = await AsyncStorage.getItem("userData");
        const json = JSON.parse(data);
        json.name = user.name;
        json.email = user.email;
        json.genre = user.genre;
        json.avatar = user.avatar;

        await AsyncStorage.setItem("userData", JSON.stringify(json));
        this.props.onUpdateUser(user);
        this.props.onStopLoading();
        this.setState({ showAlert: true });
      })
      .catch(err => {
        this.props.onStopLoading();
        Alert.alert("Ocorreu um erro, por favor tente de novo");
      });
  };
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    let alert = null;
    if (this.state.showAlert)
      alert = (
        <AwesomeAlert
          show={true}
          showProgress={false}
          title="Perfil atualizado!"
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
    let avatar = null;
    if (!this.state.user.avatar) {
      if (!this.state.pickedImage) {
        if (this.state.user.genre === "male")
          avatar = <Image source={avatarMale} style={styles.noAvatar} />;
        else avatar = <Image source={avatarFemale} style={styles.noAvatar} />;
      } else
        avatar = (
          <Image source={this.state.pickedImage} style={styles.avatar} />
        );
    } else
      avatar = (
        <Image
          source={{ uri: `${serverURL()}/${this.state.user.avatar}` }}
          style={styles.avatar}
        />
      );
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>{avatar}</View>
          <ImagePicker
            onImagePicked={image => this.pickedImageHandler(image)}
            type={"avatar"}
          />
          <View style={styles.informations}>
            <View style={styles.genreContainer}>
              <TouchableOpacity
                style={styles.genreItem}
                onPress={() => this.changeUserInfoHandler("genre", "male")}
              >
                <View style={styles.genre}>
                  <Image source={avatarMale} style={styles.noAvatar} />
                </View>
                <Text
                  style={
                    this.state.user.genre === "male" ? styles.selected : null
                  }
                >
                  Masculino
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.genreItem}
                onPress={() => this.changeUserInfoHandler("genre", "female")}
              >
                <View style={styles.genre}>
                  <Image source={avatarFemale} style={styles.noAvatar} />
                </View>
                <Text
                  style={
                    this.state.user.genre === "female" ? styles.selected : null
                  }
                >
                  Feminino
                </Text>
              </TouchableOpacity>
            </View>
            <KeyboardAvoidingView behavior={"position"}>
              <View style={styles.changeInput}>
                <Text>Nome</Text>
                <DefaultInput
                  value={this.state.user.name}
                  onChangeText={val => this.changeUserInfoHandler("name", val)}
                  styleIconInput={{ width: 0 }}
                  styleTextInput={{ width: "100%" }}
                  onFocusHandler={() =>
                    this.setState({
                      onFocusType: "name"
                    })
                  }
                  onFocus={
                    this.state.onFocusType === "name"
                      ? this.state.onFocus
                      : null
                  }
                />
              </View>
              <View style={styles.changeInput}>
                <Text>Email</Text>
                <DefaultInput
                  value={this.state.user.email}
                  onChangeText={val => this.changeUserInfoHandler("email", val)}
                  styleIconInput={{ width: 0 }}
                  styleTextInput={{ width: "100%" }}
                  onFocusHandler={() =>
                    this.setState({
                      onFocusType: "email"
                    })
                  }
                  onFocus={
                    this.state.onFocusType === "email"
                      ? this.state.onFocus
                      : null
                  }
                />
              </View>
              <View style={{ width: "100%", alignItems: "center" }}>
                {this.props.ui.isLoading ? (
                  <ActivityIndicator size={"large"} />
                ) : (
                  <DefaultButton
                    onPress={() => this.updateProfileHandler()}
                    backgroundColor={"#C94242"}
                    width={"100%"}
                    fontSize={20}
                    color={"#eee"}
                    disabled={this.state.buttonDisabled}
                  >
                    Atualizar cadastro
                  </DefaultButton>
                )}
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
        {alert}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 7,
    borderWidth: 3,
    borderColor: "black",
    backgroundColor: "#eee",
    width: 200,
    height: 200,
    borderRadius: 100
  },

  noAvatar: {
    width: "80%",
    height: "80%"
  },
  avatar: {
    width: "100%",
    height: "100%",

    borderRadius: 100
  },
  informations: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center"
  },
  genreContainer: {
    flexDirection: "row"
  },
  genreItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  genre: {
    width: 50,
    height: 50
  },
  selected: {
    fontFamily: "Pangolin",
    color: "#4C9749",
    fontSize: 19
  },
  changeInput: {
    padding: 10
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
    onStartLoading: () => dispatch(uiStartLoading()),
    onStopLoading: () => dispatch(uiStopLoading()),
    onUpdateUser: user => dispatch(updateUser(user)),
    onSetRouteName: route => dispatch(setRouteName(route))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
