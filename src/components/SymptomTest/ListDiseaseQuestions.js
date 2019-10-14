import React, { Component } from "react";
import DiseaseSegmentedQuestion from "./DiseaseSegmentedQuestion";
import DiseaseToggleQuestion from "./DiseaseToggleQuestion";

class ListDiseaseQuestions extends Component {
  questionaryHandler = (disease, answer) => {
    this.props.onChange(disease, answer);
  };

  render() {
    let content;
    if (this.props.options) {
      return (content = this.props.options.map((item, index) => {
        return (
          <DiseaseSegmentedQuestion
            options={item}
            onChangeAnswer={answer => this.questionaryHandler(index, answer)}
            selected={this.props.answers[index].answer}
            indexSelected={this.props.answers[index].index}
            key={index}
          />
        );
      }));
    } else {
      content = this.props.questions.map((item, index) => {
        return (
          <DiseaseToggleQuestion
            question={item.question}
            answer={item.answer}
            onChangeAnswer={answer => this.questionaryHandler(index, answer)}
            key={index}
          />
        );
      });
      return <>{content}</>;
    }
  }
}

export default ListDiseaseQuestions;
