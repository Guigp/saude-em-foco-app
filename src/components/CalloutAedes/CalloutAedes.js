import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet, View, Text } from "react-native";

export default props => {
  const type = props.type;
  let content;
  if (type === "information") {
    let imageText = "Nenhuma imagem disponível!";

    if (props.image) {
      imageText = "Imagem disponível!";
    }
    content = (
      <View>
        <View style={[styles.bubble, { backgroundColor: "#007a80" }]}>
          <View style={styles.location}>
            <Icon name="md-locate" size={20} color={"#eee"} />
            <Text style={styles.locationText}>{props.locationName}</Text>
          </View>
          <View style={styles.addInfo}>
            <View>
              <Text style={styles.addInfoText}>
                {props.additionalInfo != null
                  ? "Clique para mais informações!"
                  : "Sem informações adicionais!"}
              </Text>
              <View style={{ paddingtop: 10, paddingBottom: 10 }}>
                <Text style={styles.imageText}>{imageText}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.arrow, { borderTopColor: "#007a80" }]} />
      </View>
    );
  } else {
    content = (
      <View>
        <View style={[styles.bubble, { backgroundColor: "#FA4250" }]}>
          <Text style={styles.makeComplaintText}>Faça sua denúncia aqui!</Text>
        </View>
        <View style={[styles.arrow, { borderTopColor: "#FA4250" }]} />
      </View>
    );
  }
  return content;
};

const styles = StyleSheet.create({
  bubble: {
    width: 280,
    justifyContent: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 6
  },
  location: {
    flexDirection: "row",
    alignSelf: "center"
  },
  locationText: {
    fontSize: 15,
    color: "#eee",
    fontWeight: "500",
    paddingLeft: 5
  },
  addInfo: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  addInfoText: {
    fontSize: 16
  },
  imageText: {
    fontSize: 16,
    fontFamily: "Pangolin",
    color: "#A60232"
  },
  makeComplaintText: {
    textAlign: "center",
    fontFamily: "Pangolin",
    color: "white",
    fontSize: 18
  },

  arrow: {
    backgroundColor: "transparent",
    borderWidth: 16,
    borderColor: "transparent",
    alignSelf: "center"
  }
});
