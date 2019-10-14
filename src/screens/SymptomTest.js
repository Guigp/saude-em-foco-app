import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from "react-native";
import ListDiseaseQuestions from "../components/SymptomTest/ListDiseaseQuestions";
import Icon from "react-native-vector-icons/Ionicons";
import DefaultButton from "../components/DefaultButton/DefaultButton";
import Result from "../components/SymptomTest/Result";
import imagePlaces from "../assets/places.jpg";
import { connect } from "react-redux";

class SymptomTest extends Component {
  state = {
    questionary: [
      {
        segmentedQuestions: [
          { question: "Febre", answer: "Sem febre" },
          { question: "Dor articular", answer: "Sem dor articular" },
          { question: "Inchaço articular", answer: "Sem inchaço articular" },
          { question: "Dor muscular", answer: "Sem dor muscular" }
        ]
      },
      {
        toggleQuestions: [
          { question: "Dor de cabeça", answer: false },
          { question: "Manchas vermelhas no corpo", answer: false },
          { question: "Cansaço", answer: false },
          { question: "Dor atrás dos olhos", answer: false },
          { question: "Glânglios linfáticos aumentados", answer: false },
          { question: "Conjuntivite", answer: false },
          { question: "Fotofobia", answer: false },
          { question: "Sangramento", answer: false },
          { question: "Nausea", answer: false }
        ]
      }
    ],
    primaryQuestions: true,
    completed: false
  };

  exitModal = () => {
    this.setState({ completed: false });
  };

  pageHandler = primaryQuestions => {
    this.setState({ primaryQuestions });
  };
  questionaryHandler = (indexDisease, answer, primaryQuestions) => {
    this.setState(() => {
      if (primaryQuestions === true) {
        return this.state.questionary[0].segmentedQuestions.map(
          (item, index) => {
            if (index === indexDisease) return (item.answer = answer);
          }
        );
      } else {
        return this.state.questionary[1].toggleQuestions.map((item, index) => {
          if (index === indexDisease) return (item.answer = answer);
        });
      }
    });
  };

  submitHandler = () => {
    this.setState({ completed: true });
  };

  render() {
    const optionsSegmentedQuestions = [
      ["Sem febre", "Menor que 39 graus", "Maior que 39 graus"],
      ["Sem dor articular", "Dor articular moderada", "Dor articular forte"],
      [
        "Sem inchaço articular",
        "Inchaço articular moderado",
        "Inchaço articular forte"
      ],
      ["Sem dor muscular", "Dor muscular moderada", "Dor muscular forte"]
    ];

    let answers_index_SegmentedQuestions = [];
    this.state.questionary[0].segmentedQuestions.map((question, index) => {
      optionsSegmentedQuestions.forEach((opt, i) => {
        if (index === i) {
          opt.forEach((opt2, i2) => {
            if (opt2 === question.answer) {
              answers_index_SegmentedQuestions.push({
                answer: question.answer,
                index: i2
              });
            }
          });
        }
      });
    });

    let content;

    if (this.state.completed) {
      content = (
        <>
          <Result
            userAnswers={this.state.questionary}
            onExitModal={this.exitModal}
            user={this.props.user}
          />
        </>
      );
    } else if (this.state.primaryQuestions === true) {
      content = (
        <>
          <ListDiseaseQuestions
            options={optionsSegmentedQuestions}
            onChange={(indexDisease, answer) =>
              this.questionaryHandler(indexDisease, answer, true)
            }
            answers={answers_index_SegmentedQuestions}
          />

          <View
            style={{
              width: "98%",
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
          >
            <TouchableOpacity onPress={() => this.pageHandler(false)}>
              <Icon name="ios-redo" size={70} color={"#61F6DD"} />
            </TouchableOpacity>
          </View>
        </>
      );
    } else {
      content = (
        <>
          <View style={{ marginTop: 70 }} />
          <ListDiseaseQuestions
            onChange={(indexDisease, answer) =>
              this.questionaryHandler(indexDisease, answer, false)
            }
            questions={this.state.questionary[1].toggleQuestions}
          />
          <View
            style={{
              width: "90%",
              justifyContent: "flex-start",
              marginLeft: 15
            }}
          >
            <TouchableOpacity onPress={() => this.pageHandler(true)}>
              <Icon name="ios-undo" size={70} color={"#61F6DD"} />
            </TouchableOpacity>
          </View>
          <View style={styles.submitButton}>
            <DefaultButton
              backgroundColor={"#FA4250"}
              color={"#eee"}
              width={"100%"}
              marginTop={25}
              onPress={this.submitHandler}
            >
              Analisar sintomas
            </DefaultButton>
          </View>
        </>
      );
    }

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={imagePlaces}
          resizeMode={"cover"}
        >
          <View style={{ backgroundColor: "rgba(180,180,180,0.7)" }}>
            <ScrollView>{content}</ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  backgroundImage: {
    width: "100%",
    height: "100%"
  },
  text: {
    color: "#2A4E6E",
    fontWeight: "700",
    marginTop: 10,
    fontSize: 19
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    color: "#2A4E6E",
    marginTop: 10,
    marginRight: 15
  },
  questions: { height: "70%", marginTop: 10 },
  submitButton: {
    alignItems: "center"
  }
});
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(SymptomTest);
