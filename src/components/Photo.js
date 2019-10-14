import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default props => {
  let content = <Text style={styles.noImage}>Nenhuma imagem!</Text>;
  let image = props.imageURL;
  if (image) {
    content = (
      <View style={styles.placeholder}>
        <Image
          source={{ uri: props.imageURL }}
          style={styles.image}
          resizeMode={"contain"}
        />
      </View>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12
  },
  noImage: {
    textAlign: "center",
    fontFamily: "Pangolin"
  },
  image: {
    width: 150,
    height: 150
  }
});
