import { Notifications } from "expo";
// import { Font, Expo } from "expo";
import * as Font from "expo-font";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Main } from "./src/components";
import React from "react";
import { Text } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import SplashComponent from "./src/components/Splash";
import LoginComponent from "./src/components/Login";
import SpinnerLoading from "./src/common/SpinnerLoading";

import { registerForPushNotificationsAsync } from "./src/service/Notification";
import AccountComponent from "./src/components/Account";
const AppNavigator = createStackNavigator(
  {
    First: { screen: SplashComponent.Splash },
    Onboarding1: { screen: SplashComponent.Onboarding1 },
    Onboarding2: { screen: SplashComponent.Onboarding2 },
    Onboarding3: { screen: SplashComponent.Onboarding3 },
    Welcome: { screen: LoginComponent.Welcome },
    Login: { screen: LoginComponent.Login },
    Signup : {screen:LoginComponent.Signup},
    ForgetPassword : {screen:LoginComponent.ForgetPassword},
    ForgetPasswordCode : {screen:LoginComponent.ForgetPasswordCode},
    Main: { screen: Main },
    Account : {screen: AccountComponent.Account}
  },
  {
    initialRouteName: "First",
    defaultNavigationOptions: {
      header: null  
    }
  }
);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      notification: {}
    };
  }
  componentWillMount() {
    registerForPushNotificationsAsync();
    this.loadFonts();
    this._notificationSubscription = Notifications.addListener(
      this.handleNotifications
    );
  }
  handleNotifications = notification => {
    this.setState({ notification });
  };
  async loadFonts() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/website/src/fonts/Ionicons.ttf"),
      Entypo: require("native-base/Fonts/Entypo.ttf"),
      Feather: require("native-base/Fonts/Feather.ttf"),
      FontAwesome: require("native-base/Fonts/FontAwesome.ttf"),
      Octicons: require("native-base/Fonts/Octicons.ttf"),
      Bold: require("./assets/fonts/OpenSans-Bold.ttf"),
      BoldItalic: require("./assets/fonts/OpenSans-BoldItalic.ttf"),
      ExtraBold: require("./assets/fonts/OpenSans-ExtraBold.ttf"),
      ExtraBoldItalic: require("./assets/fonts/OpenSans-ExtraBoldItalic.ttf"),
      Italic: require("./assets/fonts/OpenSans-Italic.ttf"),
      Light: require("./assets/fonts/OpenSans-Light.ttf"),
      LightItalic: require("./assets/fonts/OpenSans-LightItalic.ttf"),
      Regular: require("./assets/fonts/OpenSans-Regular.ttf"),
      Semibold: require("./assets/fonts/OpenSans-Semibold.ttf"),
      SemiboldItalic: require("./assets/fonts/OpenSans-SemiboldItalic.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {
    if (this.state.isReady) {
      return (
        <Provider store={store}>
          <AppContainer />
        </Provider>
      );
    } else {
      return <SpinnerLoading />;
    }
  }
}
