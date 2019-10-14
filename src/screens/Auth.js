import React, { Component } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import imageBackground from "../../src/assets/background.jpg";
import { connect } from "react-redux";
import DefaultInput from "../../src/components/DefaultInput/DefaultInput";
import DefaultButton from "../../src/components/DefaultButton/DefaultButton";
import DefaultTitle from "../components/DefaultText/DefaultTitle";
import {
  tryAuth,
  tryAutoLogin,
  userClearStorage
} from "../../src/store/actions/user";

class Auth extends Component {
  state = {
    typeInputs: {
      name: {
        value: "",
        valid: true,
        touched: false
      },
      email: {
        value: "",
        valid: true,
        touched: false
      },
      password: {
        value: "",
        valid: true,
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: true,
        touched: false
      }
    },
    mode: "login"
  };

  componentDidMount = () => {
    if (this.props.onTryAutoLogin()) {
      this.props.navigation.navigate("Home");
    }
  };

  componentDidUpdate = prevProps => {
    if (!prevProps.isLogged && this.props.isLogged) {
      this.props.navigation.navigate("Home");
    }
  };

  updateInputState = (key, value) => {
    this.setState(prevState => {
      return {
        typeInputs: {
          ...prevState.typeInputs,
          [key]: {
            ...prevState.typeInputs[key],
            value: value,
            touched: true
          }
        }
      };
    });
  };

  changeInputModeHandler = () => {
    this.setState(prevState => {
      return {
        mode: prevState.mode === "login" ? "signup" : "login"
      };
    });
  };

  authHandler = () => {
    const authData = {
      email: this.state.typeInputs.email.value,
      password: this.state.typeInputs.password.value,
      name: this.state.typeInputs.name.value
    };
    this.props.onTryAuth(authData, this.state.mode);
  };

  reset = () => {
    this.props.onReset();
  };

  render() {
    let header = null;
    if (this.state.mode === "login") {
      header = <DefaultTitle marginBottom={10}>Login</DefaultTitle>;
    } else {
      header = <DefaultTitle>Criar Cadastro</DefaultTitle>;
    }
    let submitButton = (
      <DefaultButton
        disabled={
          (!this.state.typeInputs.confirmPassword.valid &&
            this.state.authMode === "signup") ||
          !this.state.typeInputs.name.valid ||
          !this.state.typeInputs.email.valid ||
          !this.state.typeInputs.password.valid
        }
        backgroundColor="#F60E2E"
        color="#eee"
        width={"80%"}
        borderRadius={20}
        onPress={this.authHandler}
        marginTop={7}
      >
        {this.state.mode === "login" ? "Entrar" : "Cadastrar"}
      </DefaultButton>
    );
    let signupName = null;
    let signupConfirmPassword = null;
    if (this.state.mode === "signup") {
      signupConfirmPassword = (
        <DefaultInput
          placeholder="Confirmar senha"
          icon={"ios-unlock"}
          style={styles.input}
          value={this.state.typeInputs.confirmPassword.value}
          touched={this.state.typeInputs.confirmPassword.touched}
          onChangeText={val => this.updateInputState("confirmPassword", val)}
          secureTextEntry={true}
        />
      );
      signupName = (
        <DefaultInput
          placeholder="Nome"
          icon={"md-person"}
          style={styles.input}
          value={this.state.typeInputs.name.value}
          touched={this.state.typeInputs.name.touched}
          onChangeText={val => this.updateInputState("name", val)}
        />
      );
    }

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator style={{ marginTop: 15 }} />;
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          style={styles.backgroundImage}
          source={imageBackground}
        >
          <View style={styles.subContainer}>
            {header}
            {signupName}

            <DefaultInput
              icon={"md-at"}
              placeholder="Email"
              style={styles.input}
              value={this.state.typeInputs.email.value}
              touched={this.state.typeInputs.email.touched}
              onChangeText={val => this.updateInputState("email", val)}
            />
            <DefaultInput
              icon={"ios-unlock"}
              placeholder="Senha"
              style={styles.input}
              value={this.state.typeInputs.password.value}
              touched={this.state.typeInputs.password.touched}
              onChangeText={val => this.updateInputState("password", val)}
              secureTextEntry={true}
            />
            {signupConfirmPassword}
            {submitButton}
          </View>
          <Text />
          <Text>OU</Text>
          <DefaultButton
            onPress={this.changeInputModeHandler}
            backgroundColor="#3C9AB9"
            width={"80%"}
            color="#eee"
            borderRadius={20}
            marginTop={7}
          >
            {this.state.mode === "login" ? "Criar Cadastro" : "Login"}
          </DefaultButton>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#C9C9DF",
    opacity: 0.75,
    padding: 20,
    borderRadius: 30
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  input: {
    backgroundColor: "#0BBD9F",
    opacity: 0.8,
    borderRadius: 5,
    marginTop: 10
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    isLogged: state.user.logged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
    onTryAutoLogin: () => dispatch(tryAutoLogin()),
    onReset: () => dispatch(userClearStorage())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
