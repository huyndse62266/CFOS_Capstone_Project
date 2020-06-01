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
export default class HelpCenter extends Component {
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
              Hổ trợ
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
           
              fontFamily:"Bold"
              
            }}
          >
            Press Meal là gì?
          </Text >
          <Text  style={{
              padding: 15,
              
              
            }}>
            Press Meal là một dịch vụ đăt muac thức ăn nhanh vừa được Press Meal
            ra mắt phiên bản trải nghiệm. Khách hàng có thể lựa chọn món ăn yêu
            thích (sẽ có một số nhà hàng liên kết với Press Meal và đưa thực đơn
            trên ứng dụng để khách hàng chọn món).
          </Text>
          <Text style={{
              padding: 15,
           
              
            }}>
            Khách gõ vào thanh công cụ tìm kiếm địa điểm (hoặc món) cần tìm quán
            ăn để Press Meal gợi ý, sau đó xác nhận giá tiền và chọn cuốc xe.
            Tài xế sẽ đến tận nơi lấy đồ ăn và chuyển tận tay khách.
          </Text>
          <Text style={{
              padding: 15,
            }}>
            Ngoài phí trả cho món ăn tại quán (tài xế Press Meal ứng trước) thì
            khách sẽ chịu thêm chi phí vận chuyển. Nhiều người cho biết cảm thấy
            hứng thú với dịch vụ giao đồ ăn mới ra mắt của Press Meal vì có thêm
            kênh “mua hộ” để lựa chọn.
          </Text>
    
        </ScrollView>
      </Container>
    );
  }
}
