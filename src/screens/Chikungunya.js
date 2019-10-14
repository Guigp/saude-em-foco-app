import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Img from "../assets/chicungunya.jpg";
import Icon from "react-native-vector-icons/Ionicons";
import aedes from "../assets/aedes.png";

export default props => {
  return (
    <ScrollView>
      <View style={styles.header}>
        <Image source={aedes} style={styles.aedes} />
        <Text style={styles.headerText}>Descrição Chicungunya</Text>
      </View>
      <Text style={styles.description}>
        Vírus primeiramente descrito em 1952, quando ocorreu uma epidemia na
        Tanzânia. Pode ser transmitido pelos mosquitos Aedes aegypti e o Aedes
        albopictus, os mesmos que transmitem dengue e febre amarela. Ao
        contrário da dengue e Zika vírus, em que a maior parte dos casos são
        assintomáticos, na chikungunya a maior parte dos casos apresentam
        sintomas, que aparecem em até 12 dias após a picada, sendo os mais
        comuns febre alta, manchas vermelhas no corpo, fortes dores nas
        articulações e músculos, dor de cabeça e conjuntivite. A doença não
        possui tratamento, porém são utilizados remédios para melhorar os
        sintomas. O quadro da doença vai desaparecendo em até 10 dias, sendo que
        casos fatais são raros, ocorrendo principalmente em pacientes
        debilitados ou mais idosos. Em janeiro de 2016, o ministério da saúde
        confirmou as 3 primeiras mortes pela doença no Brasil. O principal
        sintoma são as dores articulares, que podem persistir por mais de 1 ano
        após o diagnóstico, prejudicando bastante a qualidade de vida da pessoa.
        Quando uma pessoa é infectada, ela adquire imunidade pelo resto da vida
        ao vírus, ou seja, a doença se manifesta no máximo 1 vez na vida de cada
        pessoa.
      </Text>
      <View style={styles.header}>
        <Icon name={"md-walk"} size={30} style={styles.icon} />
        <Text style={styles.headerText}>Visualização dos sintomas</Text>
      </View>

      <Image source={Img} style={styles.image} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3C6771",
    height: 60,
    fontWeight: "bold",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10
  },
  aedes: {
    marginLeft: 20,
    width: 25,
    height: 45
  },
  icon: {
    color: "#fff",
    marginLeft: 20
  },
  description: {
    padding: 20,
    fontSize: 16,
    fontWeight: "400"
  },

  image: {
    width: "100%",
    resizeMode: "contain",
    position: "relative",
    top: -120
  }
});
