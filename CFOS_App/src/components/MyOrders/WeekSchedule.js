import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Switch
} from "react-native";
import { Text, View, Thumbnail } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Moment from "moment";
import FormatNumber from "../../common/FormatNumber";
import SpinnerLoading from "../../common/SpinnerLoading";
import { connect } from "react-redux";
import { SchedulerService } from "../../service/SchedulerService";
import { OrderService } from "../../service/OrderService";
import { loadOrder } from "../../redux/actions/DataActions";

const { width, height } = Dimensions.get("window");
const orderWidth = width * 0.9;
const orderHeight = orderWidth * 0.4;
class WeekSchedule extends Component {
  constructor(props) {
    super(props);
    this.SchedulerService = new SchedulerService();
    this.OrderService = new OrderService();
    this.state = {
      show: false
    };
  }
  componentDidMount() {
    let orders = this.props.orders;
    orders.forEach(order => {
      if (order.days.length > 0) {
        this.setState({ show: true });
      }
    });
  }

  changeActive(orderId) {
    this.SchedulerService.changeActive(orderId)
      .then(result => {
        this.reloadOrders();
      })
      .catch(error => {
        console.log(error);
      });
  }
  reloadOrders() {
    this.OrderService.getOrderHistores()
      .then(result => {
        this.props.loadOrder(result.data !== undefined ? result.data : []);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let { orders } = this.props;
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F6F6F6",
          flex: 1
        }}
      >
        {this.state.show == true ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {orders.map((order, i) => (
              <View key={i}>
                {order.days.length > 0 ? (
                  <Order
                    order={order}
                    navigation={this.props.navigation}
                    changeActive={orderId => this.changeActive(orderId)}
                  />
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
              Bạn chưa có lịch đặt nào
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
  }
}
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      show: false
    };
  }
  componentDidMount = () => {
    let count = 0;
    this.props.order.orderDetailReponseVMList.forEach(detail => {
      count = count + detail.quantity;
    });
    this.setState({ count: count, show: this.props.order.schedulerStatus });
  };
  switchChange = orderId => {
    this.setState({ show: !this.state.show });
    this.props.changeActive(orderId);
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
              width: orderWidth,
              paddingVertical: 10
            }}
          >
            <Image
              style={{
                width: orderWidth,
                height: height * 0.13,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10
              }}
              source={{
                uri: order.orderDetailReponseVMList[0].foodVM.imageVMS[0].image
              }}
            />
            <View
              style={{
                alignItems: "center",
                shadowOpacity: 1,
                flexDirection: "row",
                flex: 1,
                backgroundColor: "#FFFFFF",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10
              }}
            >
              <View
                style={{
                  flex: 4,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontFamily: "Bold", fontSize: 30 }}>
                  {order.scheduleTime}
                </Text>
              </View>
              <View style={{ flex: 6, flexDirection: "column" }}>
                <View style={{ flex: 1, paddingTop: 10, paddingRight: 20 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <View
                      style={
                        order.days.indexOf(1) !== -1
                          ? {
                              width: 20,
                              height: 20,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 25,
                              backgroundColor: "#30394D"
                            }
                          : {
                              width: 20,
                              height: 20,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 25,
                              backgroundColor: "#FFFFFF",
                              borderWidth: 1,
                              borderColor: "black"
                            }
                      }
                    >
                      <Text
                        style={
                          order.days.indexOf(1) !== -1
                            ? {
                                color: "white",
                                fontFamily: "Bold",
                                fontSize: 14
                              }
                            : { fontFamily: "Bold", fontSize: 14 }
                        }
                      >
                        2
                      </Text>
                    </View>
                    <View
                      style={
                        order.days.indexOf(2) !== -1
                          ? {
                              width: 20,
                              height: 20,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 25,
                              backgroundColor: "#30394D"
                            }
                          : {
                              width: 20,
                              height: 20,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 25,
                              backgroundColor: "#FFFFFF",
                              borderWidth: 1,
                              borderColor: "black"
                            }
                      }
                    >
                      <Text
                        style={
                          order.days.indexOf(2) !== -1
                            ? {
                                color: "white",
                                fontFamily: "Bold",
                                fontSize: 14
                              }
                            : { fontFamily: "Bold", fontSize: 14 }
                        }
                      >
                        3
                      </Text>
                    </View>
                    <View
                      style={
                        order.days.indexOf(3) !== -1
                          ? {
                              width: 20,
                              height: 20,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 25,
                              backgroundColor: "#30394D"
                            }
                          : {
                              width: 20,
                              height: 20,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 25,
                              backgroundColor: "#FFFFFF",
                              borderWidth: 1,
                              borderColor: "black"
                            }
                      }
                    >
                      <Text
                        style={
                          order.days.indexOf(3) !== -1
                            ? {
                                color: "white",
                                fontFamily: "Bold",
                                fontSize: 14
                              }
                            : { fontFamily: "Bold", fontSize: 14 }
                        }
                      >
                        4
                      </Text>
                    </View>
                    <View
                      style={
                        order.days.indexOf(4) !== -1
                          ? {
                              width: 20,
                              height: 20,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 25,
                              backgroundColor: "#30394D"
                            }
                          : {
                              width: 20,
                              height: 20,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 25,
                              backgroundColor: "#FFFFFF",
                              borderWidth: 1,
                              borderColor: "black"
                            }
                      }
                    >
                      <Text
                        style={
                          order.days.indexOf(4) !== -1
                            ? {
                                color: "white",
                                fontFamily: "Bold",
                                fontSize: 14
                              }
                            : { fontFamily: "Bold", fontSize: 14 }
                        }
                      >
                        5
                      </Text>
                    </View>
                    <View
                      style={
                        order.days.indexOf(5) !== -1
                          ? {
                              width: 20,
                              height: 20,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 25,
                              backgroundColor: "#30394D"
                            }
                          : {
                              width: 20,
                              height: 20,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 25,
                              backgroundColor: "#FFFFFF",
                              borderWidth: 1,
                              borderColor: "black"
                            }
                      }
                    >
                      <Text
                        style={
                          order.days.indexOf(5) !== -1
                            ? {
                                color: "white",
                                fontFamily: "Bold",
                                fontSize: 14
                              }
                            : { fontFamily: "Bold", fontSize: 14 }
                        }
                      >
                        6
                      </Text>
                    </View>
                    <View
                      style={
                        order.days.indexOf(6) !== -1
                          ? {
                              width: 20,
                              height: 20,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 25,
                              backgroundColor: "#30394D"
                            }
                          : {
                              width: 20,
                              height: 20,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 25,
                              backgroundColor: "#FFFFFF",
                              borderWidth: 1,
                              borderColor: "black"
                            }
                      }
                    >
                      <Text
                        style={
                          order.days.indexOf(6) !== -1
                            ? {
                                color: "white",
                                fontFamily: "Bold",
                                fontSize: 14
                              }
                            : { fontFamily: "Bold", fontSize: 14 }
                        }
                      >
                        7
                      </Text>
                    </View>
                    <View
                      style={
                        order.days.indexOf(0) !== -1
                          ? {
                              width: 20,
                              height: 20,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 25,
                              backgroundColor: "#30394D"
                            }
                          : {
                              width: 20,
                              height: 20,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 25,
                              backgroundColor: "#FFFFFF",
                              borderWidth: 1,
                              borderColor: "black"
                            }
                      }
                    >
                      <Text
                        style={
                          order.days.indexOf(0) !== -1
                            ? {
                                color: "white",
                                fontFamily: "Bold",
                                fontSize: 14
                              }
                            : { fontFamily: "Bold", fontSize: 14 }
                        }
                      >
                        C
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View
                    style={{
                      flex: 5,
                      justifyContent: "flex-start",
                      paddingBottom: 10
                    }}
                  >
                    <Text
                      note
                      style={{
                        fontFamily: "Regular",
                        fontSize: 14,
                        paddingTop: 5
                      }}
                    >
                      {this.state.count} món
                    </Text>
                    <FormatNumber
                      number={order.totalOrder}
                      size={15}
                      bold={"bold"}
                    />
                  </View>
                  <View
                    style={{
                      flex: 5,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Switch
                      onValueChange={() => this.switchChange(order.orderId)}
                      value={this.state.show}
                    />
                  </View>
                </View>
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
const mapDispatchToProps = dispatch => {
  return {
    loadOrder: orders => {
      dispatch(loadOrder(orders));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekSchedule);
