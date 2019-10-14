import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DefaultButton from "../components/DefaultButton/DefaultButton";
import DefaultInput from "../components/DefaultInput/DefaultInput";
import moment from "moment";
import { connect } from "react-redux";
import _ from "lodash";
import { getAllComments } from "../store/actions/comments";
import { uiStartLoading, uiStopLoading } from "../store/actions/ui";
import api from "../services/api";
import maleAvatar from "../assets/avatar1.png";
import femaleAvatar from "../assets/avatar2.png";
import serverURL from "../services/serverUrl";

class Comments extends Component {
  state = {
    loaded: false,
    toRemove: null
  };
  componentDidMount = async () => {
    const id = this.props.hospital._id;
    const url = `/getAllComments/${id}`;

    const config = {
      headers: {
        Authorization: `bearer ${this.props.user.token}`
      }
    };
    this.props.onStartLoading();
    await api
      .get(url, config)
      .then(comments => {
        this.props.onGetAllComments(comments.data.allComments);

        this.props.onStopLoading();
        this.setState({ loaded: true });
      })
      .catch(err => {
        this.props.onStopLoading();
        Alert.alert("Erro ao carregar os comentários, tente de novo!");
      });
  };

  sendCommentHandler = comment => {
    const url = `/addComment`;
    var config = {
      headers: {
        Authorization: `bearer ${this.props.user.token}`,
        "Content-Type": "application/json"
      }
    };
    const body = {
      hospitalId: this.props.hospital._id,
      comment: comment
    };
    this.props.onStartLoading();
    api
      .post(url, body, config)
      .then(res => {
        this.props.onStopLoading();

        Alert.alert("Comentário adicionado!");
      })
      .catch(err => {
        this.props.onStopLoading();
        Alert.alert("Ocorreu um erro, tente novamente!");
      });
  };

  onDeleteComment = commentId => {
    const url = `/deleteComment/${commentId}`;
    var config = {
      headers: {
        Authorization: `bearer ${this.props.user.token}`
      }
    };
    this.props.onStartLoading();
    this.setState({ toRemove: commentId });
    setTimeout(() => {
      api
        .delete(url, config)
        .then(json => {
          this.props.onStopLoading();
          this.setState({ toRemove: null });
        })

        .catch(err => {
          this.props.onStopLoading();
          Alert.alert("Ocorreu um erro, por favor tente de novo");
        });
    }, 500);
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };
  resetInputAndSend = () => {
    this.sendCommentHandler(this.state.newComment);
    this.setState({ newComment: "" });
  };

  render() {
    let header = null;
    let content = null;
    let isLoading = null;

    let noComments = null;
    if (this.props.comments.length === 0)
      noComments = (
        <Text style={{ textAlign: "center", fontSize: 20, marginTop: 30 }}>
          Nenhum comentário disponível!
        </Text>
      );

    if (this.props.isLoading) {
      isLoading = <ActivityIndicator size={"large"} color={"red"} />;
    }

    header = (
      <View
        style={{
          backgroundColor: "#eee"
        }}
      >
        <TouchableOpacity
          style={styles.iconCloseModal}
          onPress={() => this.props.hide()}
        >
          <Icon name={"md-close-circle-outline"} size={40} />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <DefaultInput
            placeholder="Adicionar comentário..."
            icon={"ios-create"}
            maxLength={300}
            value={this.state.newComment}
            onChangeText={val => {
              this.setState({ newComment: val });
            }}
          />
          {isLoading && this.state.loaded && !this.state.toRemove ? (
            isLoading
          ) : (
            <DefaultButton
              width={"40%"}
              backgroundColor={"#F60E2E"}
              color={"#eee"}
              fontSize={17}
              borderRadius={20}
              onPress={() => this.resetInputAndSend()}
            >
              Enviar
            </DefaultButton>
          )}
        </View>
      </View>
    );

    let flatList = (
      <FlatList
        ListHeaderComponent={header}
        stickyHeaderIndices={[0]} //mantem header fixo no topo
        contentContainerStyle={{ paddingBottom: 30 }}
        data={this.props.comments}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={item => `${item._id}`}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <View
              style={{
                flexDirection: "row",
                width: "90%",

                alignItems: "center"
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Image
                  source={
                    item.userAvatar
                      ? { uri: `${serverURL()}/${item.userAvatar}` }
                      : item.userGenre === "" || item.userGenre === "male"
                      ? maleAvatar
                      : femaleAvatar
                  }
                  style={styles.avatar}
                />
              </View>
              <View style={styles.commentInfo}>
                <Text style={{ color: "black" }}>{item.userName}</Text>

                <Text>{item.comment}</Text>

                <View style={styles.commentDate}>
                  <Icon name={"ios-clock"} size={20} color={"#5485A2"} />

                  <Text style={{ color: "#5485A2", paddingLeft: 7 }}>
                    {moment(item.createdAt)
                      .local()
                      .format("DD.MM.YYYY    HH:mm:ss")}
                  </Text>
                </View>
              </View>
            </View>
            {this.props.user._id === item.user ? (
              isLoading && item._id === this.state.toRemove ? (
                isLoading
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    this.setState(
                      { toRemove: item._id },
                      this.onDeleteComment(item._id)
                    )
                  }
                >
                  <Icon
                    size={30}
                    name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                    color="red"
                  />
                </TouchableOpacity>
              )
            ) : null}
          </View>
        )}
      />
    );

    content = (
      <Modal
        animationType="slide"
        style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
      >
        {this.props.isLoading && !this.state.loaded ? (
          <>
            {header}
            {isLoading}
          </>
        ) : this.props.comments.length > 0 ? (
          flatList
        ) : (
          <>
            {header}
            {noComments}
          </>
        )}
      </Modal>
    );

    return content;
  }
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 5,
    paddingBottom: 20
  },

  commentContainer: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },
  commentInfo: {
    width: "95%",
    paddingLeft: 20,
    paddingRight: 20
  },
  commentDate: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 20
  },
  iconCloseModal: {
    width: 40,
    marginLeft: 10,
    marginTop: 12
  },
  avatar: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 30
  }
});
const mapStateToProps = state => {
  return {
    user: state.user,
    comments: state.comments.comments,
    isLoading: state.ui.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetAllComments: comments => dispatch(getAllComments(comments)),
    onStartLoading: () => dispatch(uiStartLoading()),
    onStopLoading: () => dispatch(uiStopLoading())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
