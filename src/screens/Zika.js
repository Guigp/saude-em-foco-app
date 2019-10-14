import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Img from "../assets/zika.jpg";
import Icon from "react-native-vector-icons/Ionicons";
import aedes from "../assets/aedes.png";

export default props => {
  return (
    <ScrollView>
      <View style={styles.header}>
        <Image source={aedes} style={styles.aedes} />
        <Text style={styles.headerText}>Descrição Zika</Text>
      </View>
      <Text style={styles.description}>
        Zika é um vírus que pertence à família Flaviviridae. Assim como os vírus
        da dengue e da febre amarela, ele é transmitido predominantemente
        através do mosquito Aedes aegypti, embora a transmissão por outras
        formas, como transfusão sanguínea e relações sexuais, estão sendo
        estudas para averiguar o real risco de contaminação. O vírus recebe esse
        nome em referência ao local onde foi originalmente descoberto, a
        floresta Zika, em Uganda. A partir daí, se espalhou por várias regiões
        da África e Ásia, atingindo também a Oceania. Recentemente, começaram a
        surgir casos no continente Americano, inclusive no Brasil. Não são todos
        os casos de infecção pelo vírus que apresentam sintomas, sendo apenas
        cerca de 20\% dos casos sintomáticos. Quando os sintomas aparecem, os
        mais frequentemente encontrados são febre, dores de cabeça, dores nas
        articulações, manchas na pele e conjuntivite. Geralmente, a doença tem
        um curso benigno, com os sintomas desaparecendo em até 1 semana.
        Atualmente, ainda não existe um tratamento efetivo, assim como vacinas
        ainda não foram desenvolvidas. São recomendados remédios para controle
        da febre e dores, até os sintomas desaparecerem. O ministério da saúde
        já confirmou o envolvimento do Zica vírus com outro problema crescente
        entre gestantes no Brasil, principalmente gestantes com até 3 meses de
        gravidez, a microcefalia. Ela pode ser descrita como uma má formação
        congênita do cérebro do feto. Isso pode acarretar em sequelas, como
        algum retardo mental, ou até levar a criança a óbito em casos graves.
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
    fontSize: 19,
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
