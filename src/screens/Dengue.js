import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Img from "../assets/dengue.jpg";
import aedes from "../assets/aedes.png";
import Icon from "react-native-vector-icons/Ionicons";

export default props => {
  return (
    <ScrollView>
      <View style={styles.header}>
        <Image source={aedes} style={styles.aedes} />
        <Text style={styles.headerText}>Descrição Dengue</Text>
      </View>
      <Text style={styles.description}>
        Doença dengue virótica que teve seu primeiro caso no Brasil identificado
        em 1986. Tem como principal transmissor o mosquito Aedes aegypti, embora
        existam casos de transmissão de gestantes para os bebês e também por
        transfusões sanguíneas. A maior parte dos casos são assintomáticos.
        Quando existem sintomas, os mais comuns em adultos são febre alta, dor
        de cabeça, dores musculares, dor atrás dos olhos, manchas vermelhas no
        corpo e coceira. Em crianças, geralmente além de febre ocorrem alguns
        sintomas comuns à outras doenças, como sono excessivo, recusa de
        alimentação, apatia, irritabilidade, choro, vômitos e diarreia. No
        quadro de dengue hemorrágica, caracterizada por um caso mais sério de
        dengue, após a remissão da febre, entre o terceiro e sétimo dia, ocorrem
        manifestações de hemorragia, como sangramento nasal, gengival ou
        vaginal, entre outros. Existem casos graves da doença, que podem até
        levar o paciente a óbito. Alterações neurológicas, cardiorrespiratórias,
        dores abdominais que não passam, tonturas, vômito ou fezes com presença
        de sangue, extremidades das mãos e pés azulados, entre outros sintomas,
        são indícios de casos mais graves da doença, e requerem tratamento
        imediato. O tratamento é apenas paliativo, ou seja, não existe uma forma
        direta de combater o vírus. São utilizados remédios para controlar os
        sintomas e combater a desidratação. Assim como em qualquer doença, a
        automedicação nunca é aconselhada. Nunca devem ser utilizados alguns
        tipos de medicamentos, como anti-inflamatórios, porque podem provocar
        sangramentos, trazendo grande risco ao paciente, principalmente nos
        casos de dengue hemorrágica.
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
