import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import PlaceItem from "./PlaceItem";
import DefaultButton from "../DefaultButton/DefaultButton";
import Comments from "../Comments";
import { uiStartLoading, uiStopLoading } from "../../store/actions/ui";

class PlaceList extends Component {
  state = {
    hospitalsFiltered: this.props.hospitals,
    prevHospitalsRedux: [],
    chosenHospital: "",
    showModal: false
  };

  //props é props após o update,state contém a props antes do update
  static getDerivedStateFromProps = (props, state) => {
    console.log(props.hospitals);
    if (props.hospitals !== state.prevHospitalsRedux) {
      return {
        prevHospitalsRedux: props.hospitals,
        hospitalsFiltered: props.hospitals.filter(hospProps => {
          return state.hospitalsFiltered.some(hospFilt => {
            return hospFilt._id === hospProps._id;
          });
        })
      };
    }

    return null;
  };
  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextState.showModal && this.state.showModal) return false;
    else return true;
  };

  onSwipeFromLeftHandler = id => {
    this.setState({
      hospitalsFiltered: this.state.hospitalsFiltered.filter(hospital => {
        return hospital._id !== id;
      })
    });
  };

  render() {
    let content = null;
    let modal = null;
    if (
      this.state.hospitalsFiltered.length === 0 &&
      this.props.isLoading === false
    ) {
      content = (
        <DefaultButton
          onPress={() =>
            this.setState({ hospitalsFiltered: this.props.hospitals })
          }
          backgroundColor="#F60E2E"
          color="#eee"
          width={"100%"}
          fontSize={22}
        >
          Buscar todos hospitais
        </DefaultButton>
      );
    } else if (this.props.isLoading) {
      content = <ActivityIndicator size={"large"} color={"red"} />;
    } else {
      comments = "null";
      content = this.state.hospitalsFiltered.map(hospital => {
        return (
          <PlaceItem
            onSwipeFromLeft={id => this.onSwipeFromLeftHandler(id)}
            hospital={hospital}
            key={hospital._id}
            onShowModal={hospital =>
              this.setState({
                chosenHospital: hospital,

                showModal: true
              })
            }
            isLoading={this.props.isLoading}
          />
        );
      });
    }
    if (this.state.showModal) {
      modal = (
        <Comments
          hospital={this.state.chosenHospital}
          hide={() => this.setState({ chosenHospital: "", showModal: false })}
        />
      );
    }
    return (
      <View style={styles.container}>
        {content}
        {modal}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    hospitals: state.hospitals.hospitals,
    isLoading: state.ui.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onStartLoading: () => dispatch(uiStartLoading()),
    onStopLoading: () => dispatch(uiStopLoading())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceList);
