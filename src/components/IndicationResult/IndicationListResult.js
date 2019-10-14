import React, { Component } from "react";
import { Alert, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import IndicationItem from "./IndicationItemResult";
import getCurrentPosition from "../../common/common";
import {
  uiStartLoading,
  uiStopLoading,
  getIndications
} from "../../store/actions/index";
import api from "../../services/api";
import Comments from "../Comments";
import { GOOGLE_MAPS_KEY } from "react-native-dotenv";

class IndicationListResult extends Component {
  state = {
    hospitalsWithIndication: [],
    hospitalsWithoutIndication: [],
    indications: [],
    prevHospitalsRedux: this.props.hospitals,

    indicationsResult: false,
    chosenHospital: "",
    showComments: false
  };

  componentDidMount = async () => {
    try {
      const eventLocalization = await getCurrentPosition();
      const userLocalization = eventLocalization.nativeEvent.coordinate;
      const hospitalsLocalizations = this.props.hospitals.map(hospital => {
        return {
          hospitalId: hospital._id,
          localization: {
            latitude: hospital.location.coordinates[1],
            longitude: hospital.location.coordinates[0]
          }
        };
      });

      //criação da url no formato correto
      let arrayDestinations = "";
      hospitalsLocalizations.forEach((hospital, index) => {
        arrayDestinations += hospital.localization.latitude + "%2C";
        if (index === hospitalsLocalizations.length - 1)
          arrayDestinations += hospital.localization.longitude;
        else arrayDestinations += hospital.localization.longitude + "%7C";
      });

      const matrixApi = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=-30.011666%2C-51.197892
      &destinations=${arrayDestinations}&language=pt_BR&key=${GOOGLE_MAPS_KEY}`;
      var googleApi = await axios.get(matrixApi);

      const sendArray = hospitalsLocalizations.map((hospital, index) => {
        return {
          hospitalId: hospital.hospitalId,
          distance: googleApi.data.rows[0].elements[index].distance.text,
          duration: googleApi.data.rows[0].elements[index].duration.text
        };
      });
      const url = "/indication";
      const config = {
        headers: {
          Authorization: `bearer ${this.props.user.token}`
        }
      };
      let returnedIndication = await api.post(url, sendArray, config);

      this.setState({
        indications: returnedIndication.data.indicationList,

        indicationsResult: returnedIndication.data.results
      });

      this.props.onGetIndications(returnedIndication.data.indicationList);
    } catch (err) {
      Alert.alert("Ocorreu um erro, tente de novo!");
    }
  };

  componentDidUpdate = () => {};

  //props é props após o update,state contém a props antes do update
  //atualiza apenas ao mudar o tempo de espera de algum hospital
  static getDerivedStateFromProps = (props, state) => {
    if (props.hospitals !== state.prevHospitalsRedux) {
      let id_changed_time = null;
      let new_waiting_time = null;

      var changedWaitingTime = props.hospitals.some(hospital => {
        var prevHospital = state.prevHospitalsRedux.find(prevHospital => {
          return hospital._id === prevHospital._id;
        });
        if (hospital.waitingTime != prevHospital.waitingTime) {
          id_changed_time = hospital._id;
          new_waiting_time = hospital.waitingTime;
          return hospital;
        }
      });
      if (changedWaitingTime) {
        let resultFlags = null;

        let new_indications_state = state.indications.map(indication => {
          if (indication.hospitalId === id_changed_time) {
            return { ...indication, waitingTime: new_waiting_time };
          } else return { ...indication };
        });

        let resultSort = new_indications_state.sort((a, b) =>
          parseInt(a.duration) + parseInt(a.waitingTime) >
          parseInt(b.duration) + parseInt(b.waitingTime)
            ? 1
            : -1
        );
        let findBetterTime = resultSort.find(
          indication => indication.waitingTime > 0
        );
        findBetterTime =
          parseInt(findBetterTime.waitingTime) +
          parseInt(findBetterTime.duration);
        let range = Math.round(findBetterTime / 2.5); //distância do melhor valor para saber se se encaixa na mesma flag
        console.log("SORT:", resultSort);

        console.log("BETTER:", findBetterTime);
        let limit = findBetterTime + range; //valor limite para entrar na flag green
        resultFlags = resultSort.map(res => {
          if (parseInt(res.waitingTime) === 0) {
            return {
              ...res,
              flag: "normal"
            };
          } else if (
            limit >=
            parseInt(res.waitingTime) + parseInt(res.duration)
          ) {
            return {
              ...res,
              flag: "green"
            };
          } else {
            return {
              ...res,
              flag: "red"
            };
          }
        });
        props.onGetIndications(resultFlags);
        return {
          prevHospitalsRedux: props.hospitals,
          indications: resultFlags
        };
      }
    }
    return null;
  };

  render() {
    let modal = null;
    if (this.state.showComments) {
      modal = (
        <Comments
          hospital={this.state.chosenHospital}
          hide={() =>
            this.setState({ chosenHospital: "", showComments: false })
          }
        />
      );
    }
    let list1 = [];
    let list2 = [];
    if (!this.state.indicationsResult) {
      content = <ActivityIndicator size={"large"} />;
    } else {
      this.state.indications.map(indication => {
        if (indication.waitingTime === 0) {
          list2.push(
            <IndicationItem
              onShowModal={hospital =>
                this.setState({
                  chosenHospital: hospital,
                  showComments: true
                })
              }
              indication={indication}
              key={indication.hospitalId}
            />
          );
        } else {
          list1.push(
            <IndicationItem
              onShowModal={hospital =>
                this.setState({
                  chosenHospital: hospital,
                  showComments: true
                })
              }
              indication={indication}
              key={indication.hospitalId}
            />
          );
        }
      });
      content = list1.concat(list2);
    }
    return (
      <>
        {content}
        {modal}
      </>
    );
  }
}

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
    onStopLoading: () => dispatch(uiStopLoading()),
    onGetIndications: indications => dispatch(getIndications(indications))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndicationListResult);
