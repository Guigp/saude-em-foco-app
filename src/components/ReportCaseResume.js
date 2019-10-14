import React, { Component } from "React";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import DefaultButton from "./DefaultButton/DefaultButton";
import imageAedes from "../assets/aedes1.png";
import Icon from "react-native-vector-icons/Ionicons";
import DefaultInput from "./DefaultInput/DefaultInput";
import ImagePicker from "../components/PickImage/PickImage";

class ReportCaseResume extends Component {
  state = {
    informations: "",
    pickedImage: null
  };

  pickedImageHandler = image => {
    image.uri != null
      ? this.setState({ pickedImage: image })
      : this.setState({ pickedImage: null });
  };

  addInformationsHandler = data => {
    this.setState({ informations: data });
  };

  render() {
    let image = null;
    if (this.state.pickedImage)
      image = (
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
      );
    return (
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",

              alignItems: "center"
            }}
          >
            <KeyboardAvoidingView style={styles.container}>
              <Image source={imageAedes} style={styles.image} />
              <Text style={styles.header}>Confirme sua denúncia</Text>
              <View style={styles.location}>
                <Icon name="md-locate" size={25} color={"gray"} />

                <Text style={styles.address}>{this.props.locName}</Text>
              </View>
              {image}
              <ImagePicker
                onImagePicked={image => this.pickedImageHandler(image)}
              />
              <View style={styles.optional}>
                <DefaultInput
                  icon="ios-create"
                  placeholder={"Informações complementares"}
                  style={{ borderWidth: 1.5, borderColor: "gray" }}
                  value={this.state.informations}
                  maxLength={500}
                  onChangeText={val => this.addInformationsHandler(val)}
                />
              </View>
              <View style={styles.buttons}>
                {this.props.isLoading ? (
                  <ActivityIndicator size={"large"} />
                ) : (
                  <DefaultButton
                    onPress={() =>
                      this.props.onConfirmReport(
                        this.state.pickedImage,
                        this.state.informations
                      )
                    }
                    backgroundColor={"#FA4250"}
                    width={"100%"}
                    color={"#eee"}
                  >
                    Confirmar foco
                  </DefaultButton>
                )}

                <DefaultButton
                  backgroundColor={"#4D9CA4"}
                  width={"100%"}
                  marginTop={3}
                  color={"#eee"}
                  onPress={this.props.onCancel}
                  style={{ marginTop: 20 }}
                >
                  Cancelar
                </DefaultButton>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    paddingBottom: 20,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 180,
    justifyContent: "center",
    alignItems: "center"
  },

  previewImage: {
    width: "100%",
    height: "100%"
  },
  image: {
    width: 120,
    height: 120
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FA4250"
  },
  location: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },

  address: { color: "#030406", fontSize: 15, paddingLeft: 10 },
  optional: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },

  buttons: {
    width: "100%",
    alignItems: "center"
  }
});

export default ReportCaseResume;
