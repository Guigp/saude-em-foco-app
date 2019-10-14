import React from "react";
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { BackHandler } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DrawerText from "./DrawerText";
import Home from "./Home";
import Auth from "../../screens/Auth";
import Profile from "../../screens/Profile";

cleanProfileAndNavigate = navigation => {
  navigation.replace("Perfil");
  navigation.navigate("Home");
  BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
};

const stackProfile = createStackNavigator({
  Perfil: {
    name: "Profile",
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        headerTintColor: "#eee",
        headerStyle: {
          backgroundColor: "#547CBD"
        },
        title: "Perfil",
        headerLeft: (
          <Icon
            name="md-arrow-back"
            size={25}
            color="#eee"
            style={{ marginLeft: 15 }}
            onPress={() => this.cleanProfileAndNavigate(navigation)}
          />
        )
      };
    }
  }
});

const DrawerNav = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "Home",
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-home" size={25} color={"#246068"} />
        )
      }
    },
    Perfil: {
      screen: stackProfile,
      navigationOptions: {
        title: "Perfil",
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-person" size={25} color={"#246068"} />
        )
      }
    }
  },

  {
    contentComponent: DrawerText,

    contentOptions: {
      labelStyle: {
        color: "#246068",
        fontWeight: "bold",
        fontSize: 20
      }
    }
  }
);

const SwitchNav = createSwitchNavigator({
  Auth: {
    name: "Auth",
    screen: Auth,
    navigationOptions: { headerTransparent: true }
  },

  Home: {
    name: "Home",
    screen: DrawerNav
  }
});

const MainApp = createAppContainer(SwitchNav, { initialRouteName: "Auth" });

export default MainApp;
