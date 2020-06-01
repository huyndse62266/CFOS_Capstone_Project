import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Button,
  Thumbnail,
  Title
} from "native-base";
import {
  FlatList,
  Dimensions,
  View,
  StatusBar,
  ScrollView
} from "react-native";

const { width } = Dimensions.get("window");
export default class TermOfUse extends Component {
  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Header
          style={{
            backgroundColor: "transparent"
          }}
        >
          <Left>
            <Button transparent>
              <Icon
                style={{
                  color: "black"
                }}
                name="arrow-back"
                onPress={() => this.props.navigation.goBack()}
              />
            </Button>
          </Left>
          <Body>
            <Title
              style={{
                color: "black"
              }}
            >
              Điều khoản sử dụng
            </Title>
          </Body>
        </Header>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: 15
          }}
        >
          <Text
            style={{
              padding: 15,
              fontSize: 19,
              fontFamily: "Bold"
            }}
          >
           Thu thập dữ liệu cá nhân
          </Text>
          <Text
            style={{
              padding: 15
            }}
          >
            Chúng tôi thu thập Dữ liệu Cá nhân về bạn theo những cách được liệt kê bên dưới. Chúng ta có thể
đồng thời kết hợp Dữ liệu Cá nhân được thu thập với Dữ liệu Cá nhân khác trong
cơ sở dữ liệu của chúng tôi.
          </Text>
          <Text
            style={{
              padding: 15,
              fontSize: 19,
              fontFamily: "Bold"
            }}
          >
            Từ nhiều nguồn thông tin khác
          </Text>
          <Text
            style={{
              padding: 15
            }}
          >
       Khi chúng tôi thu thập Dữ liệu Cá nhân từ các nguồn khác, chúng tôi đảm bảo rằng
dữ liệu đó được chuyển cho chúng tôi theo luật pháp hiện hành
          </Text>
          <Text
            style={{
              padding: 15,
              fontSize: 19,
              fontFamily: "Bold"
            }}
          >
            Dữ liệu cá nhân nhạy cảm
          </Text>
          <Text  style={{
              padding: 15
            }}>
            Một số thông tin mà chúng tôi thu thập rất nhạy cảm trong tự nhiên. Điều này
bao gồm thông tin như số ID quốc gia, chủng tộc, hôn nhân
thông tin khi điều này là cần thiết để tuân thủ pháp luật hoặc
yêu cầu quy định.
          </Text>
        </ScrollView>
      </Container>
    );
  }
}
