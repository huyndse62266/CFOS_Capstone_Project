import React, { Component } from "react";
import {
  Text,
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Body,
  Left,
  Right,
  Button,
  Icon
} from "native-base";
import { Image, View,TouchableOpacity } from "react-native";
import AppStyle from "../../theme";

export default class Welcome extends Component {
  render() {
    return (
      <Container>
        <Content>
          <View style={AppStyle.StyleOnboard.content1}>
            <Image
              source={require("../../image/drawable-xxxhdpi/welcome.png")}
            //  style={AppStyle.StyleOnboard.pictureWelcome}
            />
            <View style={AppStyle.StyleOnboard.contenWelcome}>
              <View style={AppStyle.StyleOnboard.title1}>
              <Text style={AppStyle.StyleOnboard.textWelcome}>Mang đến bạn trải nghiệm ăn uống tiện lợi!</Text>
              </View>
              
            </View>
          <View  style={AppStyle.StyleOnboard.footerWelcome}>
           
          <TouchableOpacity  onPress={() => this.props.navigation.navigate("Signup")}>
              <View iconRight style={AppStyle.StyleOnboard.signUp} 
              >
                <Text style={AppStyle.StyleOnboard.textSignUp}>
               Đăng ký
                </Text>
               
                </View>
                </TouchableOpacity> 
                <TouchableOpacity   onPress={() => this.props.navigation.navigate("Login")}>
              <View iconRight style={AppStyle.StyleOnboard.signIn}
             >
                <Text style={AppStyle.StyleOnboard.textSignIn}>
               Đăng Nhập
                </Text>
               
                </View>
                </TouchableOpacity> 
                {/* <TouchableOpacity>
              <View iconRight style={AppStyle.StyleOnboard.button} 
               onPress={() => this.props.navigation.navigate("Home")}>
                <Text>
               Đăng ký
                </Text>
               
                </View>
                </TouchableOpacity> 
                <TouchableOpacity>
              <View iconRight style={AppStyle.StyleOnboard.button} 
               onPress={() => this.props.navigation.navigate("Home")}>
                <Text>
               Đăng ký
                </Text>
               
                </View>
                </TouchableOpacity>  */}
           
          </View>
          </View>
        </Content>
      </Container>
    );
  }
}
