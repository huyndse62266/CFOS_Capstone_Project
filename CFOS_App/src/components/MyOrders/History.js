import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Text, View, Thumbnail } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Moment from "moment";
import FormatNumber from "../../common/FormatNumber";
import SpinnerLoading from "../../common/SpinnerLoading";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  componentDidMount() {
    let orders = this.props.orders;
    orders.forEach(order => {
      if (order.days.length < 1) {
        this.setState({ show: true });
      }
    });
  }
  render() {
    let { orders } = this.props;
    if (orders !== undefined && orders.length !== undefined) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            flex: 1
          }}
        >
          {this.state.show == true ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  width: width,
                  height: 10,
                  backgroundColor: "#F6F6F6"
                }}
              />
              {orders.map((order, i) => (
                <View key={i}>
                  {order.days.length < 1 ? (
                    <Order order={order} navigation={this.props.navigation} />
                  ) : null}
                </View>
              ))}
            </ScrollView>
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: "#F6F6F6",
                paddingTop: width * 0.3,
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <Thumbnail
                style={{
                  width: width * 0.5,
                  height: width * 0.4
                }}
                square
                source={require("../../image/OrderHistoryEmpty.png")}
              />
              <Text
                style={{
                  fontFamily: "Semibold",
                  fontSize: 21,
                  paddingTop: 20
                }}
              >
                Lịch sử trống
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
                Hãy đặt món để thưởng thức những món ăn hấp dẫn tại khu ẩm thực
              </Text>
            </View>
          )}
        </View>
      );
    } else {
      return <SpinnerLoading />;
    }
  }
}

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  componentDidMount = () => {
    let count = 0;
    this.props.order.orderDetailReponseVMList.forEach(detail => {
      count = count + detail.quantity;
    });
    this.setState({ count: count });
  };

  render() {
    let { order } = this.props;
    if (order) {
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Order", { order: order })
          }
        >
          <View
            style={{
              width: width,
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#F6F6F6"
            }}
          >
            <View
              style={{
                alignItems: "center",
                shadowOpacity: 1,
                flexDirection: "row",
                flex: 1,
                backgroundColor: "#FFFFFF"
              }}
            >
              <View
                style={{
                  flex: 2,
                  alignItems: "center",
                  paddingBottom: 10,
                  paddingLeft: 10,
                  justifyContent: "center"
                }}
              >
                {order.status === "FINISHED" ? (
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
                    {order.status === "CANCELLED" ? (
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
              <View style={{ flex: 5, padding: 10 }}>
                <Text style={{ fontFamily: "Semibold", fontSize: 15 }}>
                  Mã đơn hàng: {order.orderNumberString}
                </Text>
                <Text note style={{ fontFamily: "Regular", fontSize: 15 }}>
                  {order.orderDetailReponseVMList[0].scheduleTime.slice(0, 5)},{" "}
                  {Moment(order.orderDate).format("DD")} tháng{" "}
                  {Moment(order.orderDate).format("MM")}
                </Text>
                <Text note style={{ fontFamily: "Regular", fontSize: 14 }}>
                  {this.state.count} món
                </Text>
              </View>
              <View style={{ flex: 3, alignItems: "center" }}>
                <FormatNumber
                  number={order.totalOrder}
                  size={17}
                  bold={"bold"}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    orders: state.data.orders
  };
};
export default connect(mapStateToProps)(History);
