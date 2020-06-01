import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
  AsyncStorage

} from "react-native";
import AppStyle from "../../theme";
import md5 from "md5";
import { apiLogin } from "./Api";
import { Icon, Container, Input, Item } from "native-base";
import * as SecureStore from "expo-secure-store";
import { apiGetAccount, apiUpdateDeviceToken } from "../Account/AccountApi";
import { apiCountNoti } from "../Transaction/TransactionService";
import { connect } from "react-redux";
import { loadAcount } from "../../redux/actions/AccountActions";
import { countNoti } from "../../redux/actions/DataActions";
import { Notifications } from "expo";
const { width } = Dimensions.get("window");
import OfflineNotice from '../Notification/OfflineNotice'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: "",

    };
  }
  _storeData = async token => {
    try {
      await AsyncStorage.setItem("TOKEN", token);
      await AsyncStorage.setItem("SEARCH", "");
      await SecureStore.setItemAsync("token", token);
    } catch (error) {
      console.log(`${error}`);
    }
  };
  _countNoti = () => {
    apiCountNoti()
      .then(result => {
        this.props.countNoti(result);
      })
      .catch(error => {
        console.error(`Error is 2: ${error}`);
      });
  };
  _retrieveData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
      }
    } catch (error) {
      console.error(`Error is : ${error}`);
    }
  };
  componentDidMount() {
    this.getTokenDevice();
  }
  getTokenDevice = async () => {
    const res = await Notifications.getExpoPushTokenAsync();
    this.setState({ token: res });
  };
  refreshDataFromServer = () => {
    apiGetAccount()
      .then(accountInfo => {
        this.props.loadAcount(accountInfo);
      })
      .catch(error => {
        console.error(`Error is : ${error}`);
      });
  };

  loginUsername() {
    const { token } = this.state;
    apiLogin({
      username: this.state.username,
      password: md5(this.state.password)
    }).then(result => {
      if (result === null) {
        this._showToast();
      }
      if (result.startsWith("Bearer", 0)) {
        apiUpdateDeviceToken({
          deviceToken: token
        }, result)
          .then(token => {
            if (token === null) {
            }
          })
          .catch(err => {
            console.log("Error :-S", err);
          });
        this._storeData(result);
        this._countNoti(result);
        this._retrieveData("TOKEN");
        this.refreshDataFromServer();
        this.props.navigation.navigate("Main");
      } else {
        this._showToast();
      }
    });
  }
  _showToast() {
    Alert.alert('         Sai mật khẩu', "Hãy thử lại!",
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false });
  }
  _validate(){
    if(this.state.username.length === 0 || this.state.password.length=== 0){
      Alert.alert("Xin điền đủ thông tin!");
    }
  
    }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        <OfflineNotice/>
          <View style={styles.container1}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Welcome")}
            >
              <Icon name="arrow-round-back" />
            </TouchableOpacity>

            <Text style={styles.title}>Đăng nhập</Text>
          </View>
          <View style={styles.container2}>
            <Item style={styles.inputText}>
              <Input keyboardType="email-address"
                onSubmitEditing={() => this.refs.txtPassword.focus()}
                onChangeText={username => this.setState({ username })}
                value={this.state.username}
                autoCorrect={false}
                style={styles.input}
                placeholder="Tên người dùng" />
              <Icon active name='md-person' />
            </Item>
            <Item style={styles.inputText}>
              <Input autoCorrect={false}
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry
                ref={"txtPassword"}
                onChangeText={password => this.setState({ password })}
                value={this.state.password} />
              <Icon active name='md-eye-off' />
            </Item>
          </View>
          <View style={styles.container3}>
            <TouchableOpacity
              onPress={() => {
                this._validate();
                this.loginUsername();
              }}
            >
              <View iconRight style={AppStyle.StyleOnboard.signUp}>
                <Text style={AppStyle.StyleOnboard.textSignUp}>Đăng Nhập</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={AppStyle.StyleOnboard.notiMess}>Bạn đã có tài khoản ?<Text onPress={() => this.props.navigation.navigate("Signup")} > Đăng ký</Text></Text>
          <View>
            <Text style={AppStyle.StyleOnboard.forget}>Quên mật khẩu ?<Text onPress={() => this.props.navigation.navigate("ForgetPassword")} > Đặt lại</Text></Text>
          </View>
        </View>

      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    padding: 20
  },
  person: {
    padding: 50
  },
  container1: {
    flex: 2,

    borderColor: "black"
  },
  container2: {
    flex: 2,

    borderColor: "black"
  },
  container3: {
    flex: 6,

    borderColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  arrow: {
    height: 30
  },
  logoContainer: {
    // alignItems: "center",
    // justifyContent: "center",
    //flex: 1
  },
  logo: {
    width: 128,
    height: 56
  },
  title: {
    color: "black",
    fontSize: 28,
    // textAlign: "center",
    marginTop: 5
    // opacity: 0.9,
    // flex: 1
  },
  infoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 20,
    height: 200,
    padding: 20
    // backgroundColor: 'red'
  },
  input: {
    height: 40,
    backgroundColor: "white",
    color: "black",
    marginBottom: 20,
    paddingHorizontal: 10,

    width: width - 40
  },
  buttonContainer: {
    backgroundColor: "#f7c744",
    paddingVertical: 15
  },
  buttonText: {
    textAlign: "center",
    color: "rgb(32, 53, 70)",
    fontWeight: "bold",
    fontSize: 18
  }
});
{
  /* <View style={styles.logoContainer}>
<View style={styles.logoContainer}>
<Icon name='arrow-back' style={styles.arrow} />
  <Text style={styles.title}>Đăng nhập</Text>
</View>
<View style={styles.infoContainer}>
  <TextInput
    // style={styles.input}
    placeholder="Username"
    placeholderTextColor="rgba(255,255,255,0.8)"
    keyboardType="email-address"
    returnKeyType="next"
    autoCorrect={false}
    onSubmitEditing={() => this.refs.txtPassword.focus()}
    onChangeText={email => this.setState({ email })}
    value={this.state.email}
  />
  <TextInput
    // style={styles.input}
    placeholder="Enter password"
    placeholderTextColor="rgba(255,255,255,0.8)"
    returnKeyType="go"
    secureTextEntry
    autoCorrect={false}
    ref={"txtPassword"}
    onChangeText={password => this.setState({ password })}
    value={this.state.password}
  />
    <TouchableOpacity   onPress={() => this.props.navigation.navigate("Login")}>
  <View iconRight style={AppStyle.StyleOnboard.signUp}
 >
    <Text style={AppStyle.StyleOnboard.textSignUp}>
   Đăng Nhập
    </Text>
   
    </View>
    </TouchableOpacity> 
</View>
</View> */
}

const mapDispatchToProps = dispatch => {
  return {
    loadAcount: account => {
      dispatch(loadAcount(account));
    },
    countNoti: count => {
      dispatch(countNoti(count));
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Login);
