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
  ListItem
} from "native-base";
import { Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import SpinnerLoading from "../../common/SpinnerLoading";
import { Dimensions, TextInput, ScrollView, StatusBar } from "react-native";
import { OrderService } from "../../service/OrderService";
import { loadAcount } from "../../redux/actions/AccountActions";
import { apiGetAccount } from "../Account/AccountApi";
import { addCart, resetCart } from "../../redux/actions/CartActions";
import { connect } from "react-redux";
import FormatNumber from "../../common/FormatNumber";
import IconE from "react-native-vector-icons/EvilIcons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");
class OrderSuccess extends Component {
  constructor(props) {
    super(props);
    this.OrderService = new OrderService();
    this.state = {
      orderNumber: -1,
      totalOrder: 0
    };
  }
  loadAcount = () => {
    apiGetAccount()
      .then(accountInfo => {
        this.props.loadAcount(accountInfo);
      })
      .catch(error => {
        console.error(`Error is 2: ${error}`);
      });
  };
  componentDidMount = () => {
    let scheduleTime = this.props.navigation.getParam("scheduleTime");
    let days = this.props.navigation.getParam("days");
    if (this.props.count > 0) {
      this.setState({
        totalOrder: this.props.totalOrder
      });
      let orderDetails = [];
      this.props.orderDetails.map(o => {
        let orderDetailFoodOption = [];
        o.orderDetailFoodOption.map(o => {
          orderDetailFoodOption.push({
            foId: o.option.foId,
            quantity: o.quantity
          });
        });
        orderDetails.push({
          foodId: o.food.foodId,
          orderDetailFoodOption: orderDetailFoodOption,
          quantity: o.quantity,
          totalPrice: o.totalPrice
        });
      });
      let order = {
        orderDetails: orderDetails,
        originalPrice: this.props.originalPrice,
        totalOrder: this.props.totalOrder,
        scheduleTime:
          scheduleTime !== undefined && scheduleTime !== 0
            ? scheduleTime
            : undefined,
        days: days
      };
      this.OrderService.submitOrder(order)
        .then(result => {
          this.props.resetCart();
          this.loadAcount();
          this.setState({
            orderNumber: Number.parseInt(result.data, 10)
          });
        })
        .catch(error => {
          this.props.navigation.goBack();
          console.log(error);
        });
    }
  };

  render() {
    if (this.state.orderNumber !== undefined && this.state.orderNumber !== -1) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#F6F6F6"
          }}
        >
          <StatusBar hidden />

          {this.state.orderNumber == -2 ? (
            <View
              style={{
                padding: width * 0.06,
                alignItems: "center",
                width: width,
                paddingTop: height * 0.2
              }}
            >
              <View
                style={{ flexDirection: "row", paddingBottom: height * 0.04 }}
              >
                <IconE name="check" size={25} />
                <Text style={{ fontFamily: "Semibold", fontSize: 15 }}>
                  {"  "}Đặt hàng thành công!
                </Text>
              </View>
              <Thumbnail
                style={{
                  borderRadius: 5,
                  width: width * 0.3,
                  height: width * 0.3
                }}
                square
                source={require("../../image/orderSuccess.png")}
              />
            </View>
          ) : (
            <View
              style={{
                paddingHorizontal: width * 0.06,
                paddingTop: width * 0.06,
                alignItems: "center",
                width: width,
                backgroundColor: "#FFFFFF"
              }}
            >
              <View
                style={{ flexDirection: "row", paddingBottom: height * 0.04 }}
              >
                <IconE name="check" size={25} />
                <Text style={{ fontFamily: "Semibold", fontSize: 15 }}>
                  {"  "}Thanh toán thành công!
                </Text>
              </View>
              <Thumbnail
                style={{
                  borderRadius: 5,
                  width: width * 0.28,
                  height: width * 0.28
                }}
                square
                source={require("../../image/orderSuccess.png")}
              />
              <Text
                style={{
                  marginTop: height * 0.04,
                  fontFamily: "Semibold",
                  paddingVertical: 10,
                  paddingHorizontal: 25,
                  backgroundColor: "#F5311A",
                  color: "white",
                  borderRadius: 8,
                  fontSize: 17
                }}
              >
                Mã đơn hàng: {this.state.orderNumber}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  paddingVertical: height * 0.045,
                  fontFamily: "Regular",
                  fontSize: 17
                }}
              >
                Vui lòng lấy món ăn của bạn tại các khu vực để đồ ăn trước mỗi
                cửa hàng tương ứng với mã đơn hàng.
              </Text>
            </View>
          )}

          <View style={{ height: 10, backgroundColor: "#F6F6F6" }} />

          {this.state.orderNumber > 0 ? (
            <View
              style={{
                paddingHorizontal: width * 0.06,
                paddingVertical: width * 0.03,
                backgroundColor: "#FFEAC1",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 25,
                  backgroundColor: "#FFB82A",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name="warning" type="antdesign" size={15} />
              </View>
              <Text style={{ paddingHorizontal: 15 }}>
                <Text style={{ fontFamily: "Bold", fontSize: 15 }}>Lưu ý:</Text>
                <Text style={{ fontFamily: "Regular", fontSize: 15 }}>
                  {" "}
                  Món ăn sẽ bị
                </Text>
                <Text style={{ fontFamily: "Bold", fontSize: 15 }}>
                  {" "}
                  hủy sau 1 tiếng{" "}
                </Text>
                <Text style={{ fontFamily: "Regular", fontSize: 15 }}>
                  kề từ khi được hoàn thành nếu như không có người đến lấy
                </Text>
              </Text>
            </View>
          ) : null}

          <View style={{ height: 10, backgroundColor: "#F6F6F6" }} />

          {this.state.orderNumber > 0 ? (
            <View
              style={{
                paddingHorizontal: width * 0.06,
                alignItems: "center",
                backgroundColor: "#FFFFFF"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#F6F6F6"
                }}
              >
                <Left>
                  <Text style={{ fontFamily: "Regular", fontSize: 15 }}>
                    Số tiền giao dịch
                  </Text>
                </Left>
                <Right>
                  <FormatNumber
                    number={this.state.totalOrder}
                    bold={"bold"}
                    size={17}
                  />
                </Right>
              </View>

              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <Left>
                  <Text style={{ fontFamily: "Bold", fontSize: 15 }}>
                    Số dư trong ví
                  </Text>
                </Left>
                <Right>
                  <FormatNumber
                    number={
                      this.props.account.walletAmount !== undefined
                        ? this.props.account.walletAmount
                        : 0
                    }
                    bold={"bold"}
                    size={17}
                  />
                </Right>
              </View>
            </View>
          ) : null}
          <View
            style={{
              padding: width * 0.06,
              alignItems: "center",
              paddingVertical: 15
            }}
          >
            <Button
              style={{
                width: width * 0.8,
                borderRadius: 10,
                backgroundColor: "transparent"
              }}
              onPress={() => this.props.navigation.navigate("MyOrders")}
            >
              <LinearGradient
                colors={["#EC101A", "#EC601A"]}
                start={[0.0, 0.5]}
                end={[1.0, 0.5]}
                style={{
                  justifyContent: "center",
                  width: width * 0.8,
                  borderRadius: 10,
                  height: 45,
                  alignItems: "center",
                  flexDirection: "row"
                }}
              >
                <Icon name="clippy" type="octicon" color={"white"} />
                <Text style={{ fontFamily: "Bold", fontSize: 19 }}>
                  Xem đơn hàng
                </Text>
              </LinearGradient>
            </Button>
            <Button
              style={{
                justifyContent: "center",
                width: width * 0.8,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: "white",
                marginTop: 15
              }}
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Text
                style={{ fontFamily: "Bold", fontSize: 19, color: "black" }}
              >
                Về trang chủ
              </Text>
            </Button>
          </View>
        </View>
      );
    } else {
      return <SpinnerLoading />;
    }
  }
}

const mapStateToProps = state => {
  return {
    totalOrder: state.cart.totalOrder,
    originalPrice: state.cart.originalPrice,
    count: state.cart.count,
    orderDetails: state.cart.orderDetails,
    account: state.account.account
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addFood: (orderDetail, originalPrice, totalOrder) => {
      dispatch(addCart(orderDetail, originalPrice, totalOrder));
    },
    resetCart: () => {
      dispatch(resetCart());
    },
    loadAcount: account => {
      dispatch(loadAcount(account));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderSuccess);
