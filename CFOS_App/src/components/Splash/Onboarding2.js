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
import { Image, View,StatusBar} from "react-native";
import AppStyle from "../../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Onboarding1 extends Component {
  render() {
    return (
      <Container>
        <Content>
        <StatusBar hidden/>
          <View style={AppStyle.StyleOnboard.content1}>
            <Image
              source={require("../../image/drawable-xxhdpi/onboard2.png")}
              style={AppStyle.StyleOnboard.picture}
            />
            <View style={AppStyle.StyleOnboard.content2}>
              <View style={AppStyle.StyleOnboard.title1}>
              <Text style={AppStyle.StyleOnboard.text}><Text style={AppStyle.StyleOnboard.text3}>Thanh toán </Text>trực tiếp qua điện thoại</Text>
              </View>
              <View style={AppStyle.StyleOnboard.content3}>
              <Text style={AppStyle.StyleOnboard.text4}>
                Với style của ướng sắp đặt. Vậy các thanh phần con
                nên được phân bổ theo hướng từ điểm bắt đầu đến kết thúc
              </Text>
              </View>
            </View>

            <View style={AppStyle.StyleOnboard.footer}>
              <TouchableOpacity  onPress={() => this.props.navigation.navigate("Welcome")}>
                <Text  style={AppStyle.StyleOnboard.text}>Đã Hiểu</Text>
              </TouchableOpacity>
              <Button iconRight style={AppStyle.StyleOnboard.button} 
               onPress={() => this.props.navigation.navigate("Onboarding3")}>
                <Text>
                Tiếp tục
                </Text>
                <Icon name='arrow-forward' />
                </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
