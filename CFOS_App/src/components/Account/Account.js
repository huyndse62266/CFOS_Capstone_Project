import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Button,
  Thumbnai
} from "native-base";
import {
  View,
  TouchableHighlight,
  AsyncStorage,
  StatusBar,
  ImageBackground,
  Dimensions
} from "react-native";
import OfflineNotice from "../Notification/OfflineNotice";
import { ListItem, List } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppStyle from "../../theme";
import { apiGetAccount } from "./AccountApi";
import SpinnerLoading from "../../common/SpinnerLoading";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");
import FormatNumber from "../../common/FormatNumber";
export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {}
    };
  }
  
  componentWillMount(){
    this.refreshDataFromServer();
    this._defined();
  }
  _defined() {
    if (this.state.account.fullname === undefined) {
      this.state.account.fullname = "";
    }
    if (this.state.account.username === undefined) {
      this.state.account.username = "";
    }
  }

  refreshDataFromServer = () => {
    apiGetAccount()
      .then(accountInfo => {
        this.setState({ account: accountInfo });
      })
      .catch(error => {
        console.error(`Error is 2: ${error}`);
        this.setState({ account: "" });
      });
  };
  removeToken() {
    AsyncStorage.removeItem("TOKEN");
  }
  render() {
    if (this.state.account.fullname !== undefined) {
      return (
        <ImageBackground
          source={require("../../image/drawable-xxxhdpi/Untitled.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <OfflineNotice />
          <StatusBar hidden />
          <ListItem
            containerStyle={{
              backgroundColor: "transparent"
            }}
            leftAvatar={{
              source: require("../../image/drawable-xxxhdpi/Ellipse.png")
            }}
            title={"Tên : " + this.state.account.fullname}
            titleStyle={{ color: "white", fontWeight: "bold", fontSize: 20 }}
            subtitleStyle={{ color: "white" }}
            subtitle={"ID :" + this.state.account.username}
            rightIcon={{ name: "arrow-forward" }}
            onPress={() =>
              this.props.navigation.navigate("MyAccount", {
                account: this.state.account
              })
            }
          />

          <ListItem
            title={"Số dư ví"}
            leftIcon={{ name: "account-balance-wallet" }}
            rightTitle={
              <FormatNumber
                number={this.state.account.walletAmount}
                size={16}
                bold={"bold"}
              />
            }
            rightTitleStyle={{ fontWeight: "bold", fontSize: 16 }}
            containerStyle={{
              backgroundColor: "white",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              marginLeft: 15,
              marginRight: 15
            }}
          />
          {/* <ListItem
            title={"Nạp tiền vào ví"}
            onPress={() =>
              this.props.navigation.navigate("MyWallet", {
                money: this.state.account.walletAmount
              })
            }
            containerStyle={{
              backgroundColor: "white",
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              marginLeft: 15,
              marginRight: 15
            }}
          /> */}
          <ListItem
            containerStyle={{
              backgroundColor: "transparent",
              height: 1
            }}
          />
          <ListItem
            onPress={() =>
              this.props.navigation.navigate("MyReview", {
                username: this.state.account.username
              })
            }
            title={"Đánh giá của bạn"}
            leftIcon={{ name: "rate-review" }}
            containerStyle={{
              backgroundColor: "white",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              marginLeft: 15,
              marginRight: 15
            }}
          />
          {/* <ListItem
            title={"Cài đặt thông báo"}
            leftIcon={{ name: "settings" }}
            containerStyle={{
              backgroundColor: "white",

              marginLeft: 15,
              marginRight: 15
            }}
          />
          <ListItem
            title={"Ngôn ngữ"}
            leftIcon={{ name: "language" }}
            containerStyle={{
              backgroundColor: "white",

              marginLeft: 15,
              marginRight: 15
            }}
          /> */}
          <ListItem
       
          onPress={()=>{
            this.props.navigation.navigate("HelpCenter")
          }}
            title={"Hỗ trợ"}
            leftIcon={{ name: "info" }}
            containerStyle={{
              backgroundColor: "white",

              marginLeft: 15,
              marginRight: 15
            }}
          />
          <ListItem
           leftIcon={{ name: "settings" }}
            title={"Chính sách bảo mật"}
            containerStyle={{
              backgroundColor: "white",

              marginLeft: 15,
              marginRight: 15
            }}
            onPress={()=>{
              this.props.navigation.navigate("PrivacyPolicy")
            }}
          />
          <ListItem
              leftIcon={{ name: "language" }}
           onPress={()=>{
            this.props.navigation.navigate("TermOfUse")
          }}
            title={"Điều khoản sử dụng"}
            containerStyle={{
              backgroundColor: "white",
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              marginLeft: 15,
              marginRight: 15
            }}
          />
          <Button
            rounded 
            block
            light
            style={{
              marginTop: 10,
              marginLeft: 20,
              width: width - 50,
              borderRadius: 15,
              backgroundColor: "white"
            }}
            onPress={() => {
              this.removeToken();
              this.props.navigation.navigate("Login");
            }}
          >
            <Text style={{ fontFamily: "Semibold", fontSize: 16 }}>
              Đăng xuất
            </Text>
          </Button>
        </ImageBackground>
      );
    } else {
      return <SpinnerLoading />;
    }
  }
}
