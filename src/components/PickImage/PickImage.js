import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";

class PickImage extends Component {
  state = {
    pickedImage: null
  };

  reset = () => {
    this.setState({ pickedImage: null });
  };

  pickImageHandler = () => {
    if (this.state.pickedImage) {
      this.setState({ pickedImage: null });
      this.props.onImagePicked({ uri: null });
    } else {
      ImagePicker.showImagePicker(
        { title: "Escolha uma imagem", maxWidth: 800, maxHeight: 600 },
        res => {
          if (res.didCancel) {
            console.log("Cancelado!");
          } else if (res.error) {
            console.log("Erro", res.error);
          } else {
            console.log("foto:", res);
            this.setState(
              {
                pickedImage: {
                  uri: res.uri,
                  type: res.type,
                  name: res.fileName
                }
              },
              this.props.onImagePicked({
                uri: res.uri,
                type: res.type,
                name: res.fileName
              })
            );
          }
        }
      );
    }
  };

  render() {
    let option = "Adicionar foto";

    if (this.props.type === "avatar") {
      style = {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: 200,
        height: 200,
        borderRadius: 50
      };
    }
    if (this.state.pickedImage) {
      option = "Remover foto";
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.photo} onPress={this.pickImageHandler}>
          <Icon
            name="ios-camera"
            size={25}
            color={"gray"}
            style={{ paddingRight: 5 }}
          />
          <Text style={styles.photoText}>{option}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },

  photo: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 7
  },
  photoText: {
    fontSize: 18,
    paddingLeft: 5
  }
});
export default PickImage;
