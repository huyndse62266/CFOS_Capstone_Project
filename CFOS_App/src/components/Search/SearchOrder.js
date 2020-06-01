import React, { Component } from "react";
import {
  Header,
  Text,
  Left,
  Right,
  Body,
  View,
  Button,
  Item,
  Input,
  Thumbnail,
  ListItem,
  Container,
  Tab,
  Tabs
} from "native-base";
import { Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import {
  Dimensions,
  TextInput,
  FlatList,
  StatusBar,
  ScrollView
} from "react-native";
import ListFood from "../Food/ListFood";
import Stores from "../Store/Stores";
import FormatNumber from "../../common/FormatNumber";
import { OrderService } from "../../service/OrderService";
import SpinnerLoading from "../../common/SpinnerLoading";

const { width } = Dimensions.get("window");
class SearchOrder extends Component {
  constructor(props) {
    super(props);
    this.OrderService = new OrderService();
    this.state = {
      order: {},
      flag: 0,
      result: true
    };
  }
  onTextChange(value) {
    this.setState({
      flag: 1
    });
    this.OrderService.searchOrder(Number.parseInt(value, 10))
      .then(result => {
        this.setState({
          order: result.data !== undefined ? result.data : {},
          flag: 0,
          result: true
        });
        // console.log("order", result.data);
      })
      .catch(error => {
        this.setState({
          order: {},
          flag: 0,
          result: false
        });
        console.log(error);
      });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <SearchHeader
          navigation={this.props.navigation}
          onTextChange={value => this.onTextChange(value)}
        />
        {this.state.order !== undefined &&
        this.state.order.orderDetailReponseVMList !== undefined &&
        this.state.order.orderDetailReponseVMList.length > 0 ? (
          <View style={{ padding: width * 0.06 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text
                style={{ fontFamily: "Bold", fontSize: 16, paddingBottom: 25 }}
              >
                Thông tin món ăn đơn hàng số:{" "}
                {this.state.order.orderNumberString}
              </Text>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.order.orderDetailReponseVMList}
                renderItem={({ item, index }) => <OrderDetail item={item} />}
                keyExtractor={(item, index) => index.toString()}
              />
              <View style={{ height: 50 }}></View>
            </ScrollView>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            {this.state.flag == 0 ? (
              <View>
                {this.state.result == false ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      backgroundColor: "#F6F6F6"
                    }}
                  >
                    <View
                      style={{
                        paddingTop: width * 0.3,
                        alignItems: "center",
                        flexDirection: "column"
                      }}
                    >
                      <Thumbnail
                        style={{
                          width: width * 0.6,
                          height: width * 0.6
                        }}
                        square
                        source={require("../../image/SearchOrderNoItem.png")}
                      />
                      <Text
                        style={{
                          fontFamily: "Semibold",
                          fontSize: 21,
                          paddingTop: 20
                        }}
                      >
                        Đơn hàng không tồn tại
                      </Text>
                      <Text
                        note
                        style={{
                          fontFamily: "Regular",
                          fontSize: 17,
                          paddingTop: 10,
                          paddingHorizontal: width * 0.12,
                          textAlign: "center"
                        }}
                      >
                        Xin mời quý khách đặt món để thưởng thức những món ăn
                        hấp dẫn
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
            ) : (
              <SpinnerLoading />
            )}
          </View>
        )}
      </View>
    );
  }
}
class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
  }
  onTextChange() {
    this.props.onTextChange(this.state.searchValue);
  }
  render() {
    return (
      <Header style={{ backgroundColor: "#FFFFFF" }}>
        <Left style={{ flex: 1 }}>
          <Button
            transparent
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Icon name="left" type="antdesign" />
          </Button>
        </Left>
        <Body style={{ flex: 9 }}>
          <Item>
            <Input
              style={{ fontFamily: "Bold", fontSize: 19 }}
              placeholder="Nhập số đơn của bạn"
              placeholderTextColor="#AAAAAA"
              onChangeText={text => this.setState({ searchValue: text })}
              value={this.state.searchValue}
              returnKeyType="search"
              autoFocus={true}
              onSubmitEditing={e => this.onTextChange()}
              keyboardType="numeric"
            />
          </Item>
        </Body>
      </Header>
    );
  }
}

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsList: ""
    };
  }
  componentDidMount() {
    this.renderOption();
  }
  renderOption() {
    let item = this.props.item;
    let options = [];
    let optionsList = "";
    if (item.orderDetailFoodOption.length > 0) {
      item.orderDetailFoodOption.map(o => {
        let flag = false;
        options.map(i => {
          if (i.parentName === o.parentName) {
            flag = true;
            i.option =
              i.option +
              o.foName +
              (o.quantity > 1 ? " x" + o.quantity : "") +
              ", ";
          }
        });
        if (flag == false) {
          options.push({
            parentName: o.parentName,
            option: o.foName + (o.quantity > 1 ? " x" + o.quantity : "") + ", "
          });
        }
        flag = false;
      });
      if (options.length > 0) {
        options.map(o => {
          optionsList = optionsList + o.parentName + " " + o.option;
        });
      }
    }
    this.setState({
      optionsList:
        optionsList.length > 0
          ? optionsList.slice(0, optionsList.length - 2)
          : "Mặc định"
    });
  }
  render() {
    const { item } = this.props;
    return (
      <View
        style={{
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#DCDCDC"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 10
          }}
        >
          <View
            style={{
              width: width * 0.24,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Thumbnail
              style={{
                borderRadius: 10,
                width: width * 0.21,
                height: width * 0.21
              }}
              source={{
                uri: item.foodVM.imageVMS[0].image
              }}
            />
            <Text
              style={{
                color: "black",
                position: "absolute",
                bottom: -5,
                right: 0,
                padding: 5,
                minWidth: 25,
                height: 25,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FFFFFF",
                textAlign: "center",
                fontSize: 14,
                fontFamily: "Bold"
              }}
            >
              x{item.quantity}
            </Text>
          </View>
          <View
            style={{
              width: width * 0.567,
              justifyContent: "center",
              paddingHorizontal: 10
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Thumbnail
                style={{ height: 20, width: 20 }}
                source={{
                  uri: item.storeVM.storeImage
                }}
              />
              <Text style={{ fontFamily: "Regular", fontSize: 14 }}>
                {"  "}
                {item.storeVM.storeName}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={{ fontFamily: "Bold", fontSize: 17 }}
            >
              {item.foodVM.foodName}
            </Text>
            <Text
              note
              numberOfLines={1}
              style={{ fontFamily: "Regular", fontSize: 14 }}
            >
              {this.state.optionsList}
            </Text>
          </View>
          <View
            style={{
              width: width * 0.073,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {item.oderDetailStatus === "READY" ? (
              <Thumbnail
                style={{
                  width: width * 0.08,
                  height: width * 0.1
                }}
                square
                source={require("../../image/FinishIcon.png")}
              />
            ) : (
              <View>
                {item.oderDetailStatus === "CANCELLED" ? (
                  <Thumbnail
                    style={{
                      width: width * 0.08,
                      height: width * 0.1
                    }}
                    square
                    source={require("../../image/DishFailIcon.png")}
                  />
                ) : (
                  <Thumbnail
                    style={{
                      width: width * 0.08,
                      height: width * 0.1
                    }}
                    square
                    source={require("../../image/cooking.png")}
                  />
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}
export default withNavigation(SearchOrder);
