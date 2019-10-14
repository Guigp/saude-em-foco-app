import React from "react";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { Image } from "react-native";
import logo from "../../assets/logo.jpg";
import Icon from "react-native-vector-icons/Ionicons";
import Hospitals from "../../screens/HospitalsTab";
import Places from "../../screens/Places";
import WaitingTimeLocation from "../../screens/WaitingTimeLocation";
import Indication from "../../screens/Indication";
import SymptomTest from "../../screens/SymptomTest";
import Aedes from "../../screens/Aedes";
import InformationDeseases from "../../screens/InformationDeseases";
import ReportFocus from "../../screens/ReportFocus";

const Routes = {
  Aedes: {
    name: "Aedes",
    screen: Aedes,

    navigationOptions: {
      title: "Aedes Aegypti",

      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-search" size={30} color={tintColor} />
      )
    }
  },
  Hospitals: {
    name: "Hospitals",
    screen: Hospitals,
    navigationOptions: {
      title: "Hospitais",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-locate" size={30} color={tintColor} />
      )
    }
  }
};
const Config = {
  initialRouteName: "Aedes",
  tabBarOptions: {
    style: {
      backgroundColor: "#274472"
    },
    activeBackgroundColor: "#547CBD",
    activeTintColor: "#79C4CF",
    inactiveTintColor: "#B0B9BA"
  }
};

const TabNavigator = createBottomTabNavigator(Routes, Config);

TabNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];

  let title;
  if (routeName === "Aedes") {
    title = "Aedes";
  } else if (routeName === "Hospitals") title = "Hospitais";
  else {
    title = "Perfil";
  }
  return {
    title
  };
};
const StackNav = createStackNavigator(
  {
    Home: {
      name: "Home",
      screen: TabNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Icon
              name="md-menu"
              size={30}
              color="#2E7979"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: (
            <Image
              source={logo}
              style={{
                width: 90,
                height: 35,
                borderRadius: 20,
                marginRight: 20
              }}
            />
          )
        };
      }
    },

    InformationDeseases: {
      name: "InformationDeseases",
      screen: InformationDeseases,
      navigationOptions: {
        headerRight: (
          <Image
            source={logo}
            style={{
              width: 90,
              height: 35,
              borderRadius: 20,
              marginRight: 20
            }}
          />
        ),
        headerStyle: {
          backgroundColor: "#09263E"
        },
        headerTintColor: "#eee"
      }
    },
    ReportFocus: {
      name: "ReportFocus",
      screen: ReportFocus,
      navigationOptions: {
        headerStyle: {},
        headerTintColor: "red",
        headerTransparent: true
      }
    },
    SymptomTest: {
      name: "SymptomTest",
      screen: SymptomTest,
      navigationOptions: {
        headerStyle: {},
        headerTintColor: "red",
        headerTransparent: true
      }
    },
    Places: {
      name: "Places",
      screen: Places,
      navigationOptions: {
        headerStyle: {},
        headerTintColor: "red",
        headerTransparent: true
      }
    },
    WaitingTimeLocation: {
      name: "WaitingTimeLocation",
      screen: WaitingTimeLocation,
      navigationOptions: {
        headerStyle: {},
        headerTintColor: "red",
        headerTransparent: true
      }
    },
    Indication: {
      name: "Indication",
      screen: Indication,
      navigationOptions: {
        headerStyle: {},
        headerTintColor: "red",
        headerTransparent: true
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#B0B9BA"
      },
      headerTintColor: "#2E7979",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
const MainNavigator = createAppContainer(StackNav);

export default MainNavigator;
