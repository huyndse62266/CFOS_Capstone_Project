import React from "react";
import Home from "./Home/Home";
import LoginComponent from "./Login";
import MyOrders from "./MyOrders/MyOrders";
import Order from "./MyOrders/Order";
import ListCategories from "./Category/ListCategories";
import FoodByCategory from "./Food/FoodByCategory";
import ListStores from "./Store/ListStores";
import StoreDetail from "./Store/StoreDetail";
import FoodDetail from "./Food/FoodDetail";
import CustomerReview from "./Food/CustomerReview";
import Search from "./Search/Search";
import SearchOrder from "./Search/SearchOrder";
import Cart from "./Cart/Cart";
import BadgeCart from "./Cart/BadgeCart";
import BadgeNoti from "./Notification/BadgeNoti";
import OrderSuccess from "./Cart/OrderSuccess";
import SplashComponent from "./Splash";
import AccountComponent from "./Account";
import TransactionPage from "./Transaction/TransactionPage";
import { Icon } from "react-native-elements";
import { Text, View } from "native-base";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

const WelcomeStack = createStackNavigator(
  {
    Account: { screen: AccountComponent.Account },
    Login : {screen:LoginComponent.Login},
    MyAccount: { screen: AccountComponent.MyAccount },
    UpdateInfo: { screen: AccountComponent.UpdateInfo },
    MyWallet: { screen: AccountComponent.MyWallet },
    MyReview: { screen: AccountComponent.MyReview },
    PrivacyPolicy : {screen: AccountComponent.PrivacyPolicy},
    HelpCenter : {screen: AccountComponent.HelpCenter},
    TermOfUse : {screen: AccountComponent.TermOfUse}
  },
  {
    initialRouteName: "Account",
    defaultNavigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);

WelcomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};
const HomeStack = createStackNavigator(
  {
    Home: { screen: Home },
    FoodByCategory: { screen: FoodByCategory },
    ListCategories: { screen: ListCategories },
    ListStores: { screen: ListStores },
    StoreDetail: { screen: StoreDetail },
    FoodDetail: { screen: FoodDetail },
    CustomerReview: { screen: CustomerReview },
    Search: { screen: Search },
    SearchOrder: { screen: SearchOrder },
    Cart: { screen: Cart },
    OrderSuccess: { screen: OrderSuccess },
    Login : {screen:LoginComponent.Login},
    Account: { screen: AccountComponent.Account },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const OrderStack = createStackNavigator(
  {
    MyOrders: { screen: MyOrders },
    Order: { screen: Order }
  },
  {
    initialRouteName: "MyOrders",
    defaultNavigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);
OrderStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};
const TransactionStack = createStackNavigator(
  {
    Transaction: { screen: TransactionPage }
  },
  {
    initialRouteName: "Transaction",
    defaultNavigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);
TransactionStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default createBottomTabNavigator(
  {
    Cart: {
      screen: Cart,
      navigationOptions: {
        tabBarLabel: "Giỏ hàng",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <BadgeCart color={tintColor} />
          </View>
        )
      }
    },
    Order: {
      screen: OrderStack,
      navigationOptions: {
        tabBarLabel: "Đơn hàng",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="clippy" type="octicon" color={tintColor} />
        )
      }
    },
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: "Trang chủ",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon name="home" type="antdesign" color={tintColor} />
          </View>
        )
      }
    },
    Notification: {
      screen: TransactionStack,
      navigationOptions: {
        tabBarLabel: "Thông báo",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <BadgeNoti color={tintColor} />
          </View>
        )
      }
    },
    User: {
      screen: WelcomeStack,
      navigationOptions: {
        tabBarLabel: "Tài khoản",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" type="antdesign" color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: "#FF331C",
      upperCaseLabel: true,
      labelStyle: { fontWeight: "bold" }
    },
    resetOnBlur: true
  }
);
