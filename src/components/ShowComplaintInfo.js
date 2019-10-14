import React, { Component } from "React";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import DefaultButton from "./DefaultButton/DefaultButton";
import iconLocate from "../assets/icon-locate.png";
import iconCamera from "../assets/icon-camera.png";
import iconInfo from "../assets/icon-info.png";
import iconPerson from "../assets/icon-person.png";
import iconRemove from "../assets/icon-remove.png";
import Photo from "../components/Photo";
import PhotoView from "react-native-photo-view-ex";

export default class ShowComplaintInfo extends Component {
  state = {
    showFotoModal: false
  };

  render() {
    let fotoModal = null;
    let opacityOnModal = 1;
    let screenWidth = Dimensions.get("window").width;

    if (this.state.showFotoModal) {
      opacityOnModal = 0.1;
      fotoModal = (
        <View>
          <Modal
            animationType="slide"
            visible={this.state.showModal}
            transparent={true}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              style={styles.iconCloseModal}
              onPress={() => this.setState({ showFotoModal: false })}
            >
              <Icon name={"md-close-circle-outline"} size={40} />
            </TouchableOpacity>
            <PhotoView
              source={{ uri: this.props.imageURL }}
              minimumZoomScale={0.5}
              maximumZoomScale={4}
              style={{
                width: screenWidth,
                height: 400
              }}
            />
          </Modal>
        </View>
      );
    }
    return (
      <ScrollView>
        <View style={[styles.container, { opacity: opacityOnModal }]}>
          <View style={styles.location}>
            <Image source={iconLocate} style={{ width: 40, height: 40 }} />
            <Text style={styles.locationText}>{this.props.location}</Text>
          </View>
          <View style={styles.user}>
            <Image source={iconPerson} style={{ width: 40, height: 40 }} />
            <Text style={styles.userText}>
              Denúncia criada por {this.props.userName}
            </Text>
          </View>
          <View style={styles.informations}>
            <Image source={iconInfo} style={{ width: 40, height: 40 }} />
            <Text style={styles.informationsText}>
              {this.props.informations != null
                ? this.props.informations
                : "Nenhuma informação extra disponível."}
            </Text>
          </View>
          <View style={styles.photo}>
            <Image source={iconCamera} style={{ width: 40, height: 40 }} />
            <TouchableOpacity
              onPress={() => this.setState({ showFotoModal: true })}
            >
              <Photo imageURL={this.props.imageURL} />
            </TouchableOpacity>
            {fotoModal}
          </View>
          <DefaultButton
            backgroundColor={"#3E697A"}
            width={"100%"}
            fontSize={24}
            color={"#eee"}
            onPress={() => this.props.onExit()}
            marginTop={20}
          >
            Voltar ao mapa
          </DefaultButton>
          {this.props.isLoading ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <DefaultButton
              onPress={() => this.props.onRemoveComplaint()}
              image={iconRemove}
              backgroundColor={"#FA4250"}
              width={"100%"}
              fontSize={24}
              color={"#eee"}
              marginTop={3}
            >
              Excluir denúncia
            </DefaultButton>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
    width: Dimensions.get("window").width * 1,
    paddingBottom: 20
  },
  user: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#0C161A",
    borderBottomWidth: 0.8,
    paddingTop: 7,
    paddingBottom: 7
  },
  location: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#0C161A",
    borderBottomWidth: 0.8,
    paddingTop: 7,
    paddingBottom: 7
  },
  locationText: {
    fontSize: 15,
    fontFamily: "Pangolin",
    color: "#3E697A"
  },
  userText: {
    fontSize: 15,
    fontFamily: "Pangolin",
    color: "#3E697A"
  },
  informations: {
    width: "90%",

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#0C161A",
    borderBottomWidth: 0.8,
    paddingTop: 7,
    paddingBottom: 7
  },
  informationsText: {
    fontSize: 15,
    fontFamily: "Pangolin",
    color: "#3E697A"
  },
  photo: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 7,
    paddingBottom: 7
  },
  photoText: {
    fontSize: 15,
    fontFamily: "Pangolin",
    color: "#3E697A"
  },
  iconCloseModal: {
    width: 40,

    marginLeft: 10,
    marginTop: 12
  }
});
