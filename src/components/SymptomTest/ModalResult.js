import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DefaultButton from "../DefaultButton/DefaultButton";
import avatarMale from "../../assets/avatar1.png";
import avatarFemale from "../../assets/avatar2.png";
import imageBgn from "../../assets/symptomTest.jpg";
import serverURL from "../../services/serverUrl";

export default props => {
  let avatar = null;
  if (props.user.avatar)
    avatar = (
      <Image
        source={{
          uri: `${serverURL()}/${props.user.avatar}`
        }}
        style={styles.avatar}
      />
    );
  else
    avatar = (
      <Image
        source={props.user.genre === "female" ? avatarFemale : avatarMale}
      />
    );

  return (
    <ScrollView>
      <View style={{ alignItems: "center", flex: 1 }}>
        <Icon name={"ios-pulse"} size={80} style={styles.icon} />
        <View style={styles.title}>
          <Text style={[styles.textTitle, { fontFamily: "Pangolin" }]}>
            Seu resultado
          </Text>
          <View style={styles.avatarContainer}>{avatar}</View>
        </View>

        <View style={styles.testInformationResult}>
          <ImageBackground
            source={imageBgn}
            style={styles.image}
            resizeMode={"cover"}
          >
            <View
              style={{
                flex: 1,
                padding: 10,
                backgroundColor: "rgba(0,0,0,.6)",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={[styles.text, { color: props.informationColor }]}>
                {props.informationText}
              </Text>
              <View style={[styles.warning]}>
                <Text style={styles.text}>
                  Importante: este teste é apenas um indicativo e nunca deve
                  substituir uma consulta com seu médico!
                </Text>

                <DefaultButton
                  onPress={() => props.onFindHospital()}
                  icon={"ios-medkit"}
                  size={25}
                  backgroundColor={"#CC8A45"}
                  color={"white"}
                  borderRadius={7}
                  //width={"60%"}
                  fontSize={17}
                >
                  <Text style={{ paddingLeft: 5 }}>Encontre um hospital</Text>
                </DefaultButton>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{ width: "100%", paddingBottom: 20, marginBottom: 10 }}>
          <DefaultButton
            color={"#eee"}
            width={"100%"}
            backgroundColor={"#924A92"}
            onPress={() => props.onPress()}
          >
            Entendi
          </DefaultButton>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft: 5
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 100
  },
  image: {
    width: "100%",
    height: "100%"
  },
  textTitle: {
    fontSize: 27,
    color: "#4E9696"
  },
  icon: { color: "red" },
  testInformationResult: {
    height:
      Dimensions.get("window").height < 650
        ? Dimensions.get("window").height / 1.5
        : Dimensions.get("window").height / 1.8
  },

  find: {
    width: "60%",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontFamily: "Pangolin",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    padding: 10
  }
});
