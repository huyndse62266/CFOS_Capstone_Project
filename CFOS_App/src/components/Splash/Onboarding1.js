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
import { Image, View,TouchableOpacity,StatusBar} from "react-native";
import AppStyle from "../../theme";

export default class Onboarding1 extends Component {
  render() {
    return (
      <Container>
        <Content>
          <StatusBar hidden/>
          <View style={AppStyle.StyleOnboard.content1}>
            <Image
              source={require("../../image/drawable-xxhdpi/onboard1.png")}
              style={AppStyle.StyleOnboard.picture}
            />
            <View style={AppStyle.StyleOnboard.content2}>
              <View style={AppStyle.StyleOnboard.title1}>
              <Text style={AppStyle.StyleOnboard.text}><Text style={AppStyle.StyleOnboard.text3}>Tìm kiếm và chọn </Text>món ăn của bạn</Text>
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
               onPress={() => this.props.navigation.navigate("Onboarding2")}>
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
