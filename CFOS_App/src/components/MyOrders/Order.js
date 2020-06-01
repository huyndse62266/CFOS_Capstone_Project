import React, { Component } from "react";
import { Text, Left, Right, View, Thumbnail, Button } from "native-base";
import { Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import StarRating from "react-native-star-rating";
import CategoryHeader from "../Category/CategoryHeader";
import { Dimensions, FlatList, ScrollView } from "react-native";
import Moment from "moment";
import FormatNumber from "../../common/FormatNumber";
import SpinnerLoading from "../../common/SpinnerLoading";
import { LinearGradient } from "expo-linear-gradient";
import { OrderService } from "../../service/OrderService";
import { SchedulerService } from "../../service/SchedulerService";
import { connect } from "react-redux";
import { loadOrder, loadToday } from "../../redux/actions/DataActions";
import ClockPicker from "../Cart/ClockPicker";

const { width } = Dimensions.get("window");
class Order extends Component {
  constructor(props) {
    super(props);
    this.OrderService = new OrderService();
    this.SchedulerService = new SchedulerService();
    this.child = React.createRef();
    this.state = {
      cancel: false,
      show: true
    };
  }
  componentDidMount() {
    let order = this.props.navigation.getParam("order");
    let hour = Moment(new Date(new Date().getTime() + 15 * 1000 * 60)).format(
      "HH"
    );
    let minutes = Moment(
      new Date(new Date().getTime() + 15 * 1000 * 60)
    ).format("mm");
    if (
      order.scheduleTime !== null &&
      order.status === "COOKING" &&
      order.days.length < 1
    ) {
      let scheduleTime =
        Number.parseInt(order.scheduleTime.slice(0, 2), 10) * 60 +
        Number.parseInt(order.scheduleTime.slice(3, 5), 10);
      let now = Number.parseInt(hour, 10) * 60 + Number.parseInt(minutes, 10);
      if (scheduleTime >= now) {
        this.setState({ cancel: true });
      }
    }
    this.setState({ show: true });
  }

  cancelOrder(orderNumber) {
    this.setState({ show: false });
    this.OrderService.cancelOrder(orderNumber)
      .then(result => {
        this.reloadOrders();
        this.setState({ show: true });
        this.props.navigation.goBack();
      })
      .catch(error => {
        this.setState({ show: true });
        console.log(error);
      });
  }
  reloadOrders() {
    this.OrderService.getOrderHistores()
      .then(result => {
        this.props.loadOrder(result.data !== undefined ? result.data : []);
        let moment = Moment(new Date()).format("DD-MM-YYYY");
        let today = [];
        result.data.forEach(order => {
          if (Moment(order.orderDate).format("DD-MM-YYYY") === moment) {
            today.push(order);
          }
        });
        this.props.loadToday(today);
      })
      .catch(error => {
        console.log(error);
      });
  }
  deleteScheduler(orderId) {
    this.setState({ show: false });
    this.SchedulerService.deleteScheduler(orderId)
      .then(result => {
        this.reloadOrders();
        this.setState({ show: true });
        this.props.navigation.goBack();
      })
      .catch(error => {
        this.setState({ show: true });
        console.log(error);
      });
  }
  updateScheduler(orderId) {
    this.setState({ show: false });
    let order = {
      days: this.child.current.getDays(),
      orderId: orderId,
      scheduleTime: this.child.current.getSheduleTime()
    };
    this.SchedulerService.updateScheduler(order)
      .then(result => {
        this.reloadOrders();
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSheduleTime(sheduleTime, days) {
    this.setState({ sheduleTime: sheduleTime, days: days });
  }
  render() {
    let order = this.props.navigation.getParam("order");
    if (order && this.state.show == true) {
      return (
        <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
          <CategoryHeader
            subCategory={"Order #" + order.orderNumberString}
            navigation={this.props.navigation}
          />
          <View style={{ paddingHorizontal: width * 0.06 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <OrderItem order={order} />
              <OrderPayment order={order} />
              {order.days.length > 0 ? (
                <ClockPicker
                  ref={this.child}
                  setSheduleTime={(time, days) =>
                    this.setSheduleTime(time, days)
                  }
                  order={order}
                />
              ) : null}
              {this.state.cancel == true ? (
                <Button
                  danger
                  style={{
                    width: width * 0.88,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => this.cancelOrder(order.orderNumber)}
                >
                  <Text style={{ fontFamily: "Bold", fontSize: 19 }}>
                    Hủy đơn hàng
                  </Text>
                </Button>
              ) : null}
              {order.days.length > 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingVertical: 25
                  }}
                >
                  <Button
                    style={{
                      width: width * 0.4,
                      borderRadius: 10,
                      backgroundColor: "red",
                      marginRight: width * 0.04,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onPress={() => this.deleteScheduler(order.orderId)}
                  >
                    <Text style={{ fontFamily: "Bold", fontSize: 19 }}>
                      Xóa lịch
                    </Text>
                  </Button>
                  <Button
                    style={{
                      width: width * 0.4,
                      borderRadius: 10,
                      backgroundColor: "blue",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onPress={() => this.updateScheduler(order.orderId)}
                  >
                    <Text style={{ fontFamily: "Bold", fontSize: 19 }}>
                      Sửa đổi
                    </Text>
                  </Button>
                </View>
              ) : null}
              <View style={{ height: 80 }} />
            </ScrollView>
          </View>
        </View>
      );
    } else {
      return <SpinnerLoading />;
    }
  }
}

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  componentWillMount = () => {
    let count = 0;
    this.props.order.orderDetailReponseVMList.forEach(detail => {
      count = count + detail.quantity;
    });
    this.setState({ count: count });
  };

  render() {
    const { order } = this.props;
    if (order)
      return (
        <View
          style={{
            borderRadius: 10,
            paddingTop: 20
          }}
        >
          {order.days.length < 1 ? (
            <Text note style={{ fontFamily: "Regular", fontSize: 15 }}>
              {order.orderDetailReponseVMList[0].scheduleTime.slice(0, 5)},{" "}
              {Moment(order.orderDate).format("DD")} tháng{" "}
              {Moment(order.orderDate).format("MM")}
            </Text>
          ) : null}
          <Text>
            <Text style={{ fontFamily: "Bold", fontSize: 19 }}>Giỏ hàng</Text>{" "}
            <Text note style={{ fontFamily: "Regular", fontSize: 17 }}>
              ({this.state.count} món)
            </Text>
          </Text>
          <FlatList
            style={{
              paddingTop: 15
            }}
            showsVerticalScrollIndicator={false}
            data={order.orderDetailReponseVMList}
            renderItem={({ item }) => <FoodItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
  }
}

class FoodItem extends Component {
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
              flex: 2,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Thumbnail
              style={{
                borderRadius: 10,
                width: width * 0.165,
                height: width * 0.165
              }}
              source={{
                uri: item.foodVM.imageVMS[0].image
              }}
            />
          </View>
          <View
            style={{
              flex: 7,
              alignItems: "flex-start",
              paddingHorizontal: 10
            }}
          >
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
            <FormatNumber number={item.totalPrice} size={17} bold={"bold"} />
          </View>
          <View
            style={{
              flex: 1
            }}
          >
            <Text
              style={{
                fontFamily: "Regular",
                paddingTop: 5,
                fontSize: 14
              }}
            >
              x{item.quantity}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Thumbnail
            style={{ height: 20, width: 20 }}
            source={{ uri: item.storeVM.storeIcon }}
          />
          <Text style={{ fontFamily: "Regular", fontSize: 14 }}>
            {"  "}
            {item.storeVM.storeName}
          </Text>
        </View>
      </View>
    );
  }
}

class OrderPayment extends Component {
  render() {
    const { order } = this.props;
    if (order)
      return (
        <View
          style={{
            backgroundColor: "white",
            paddingVertical: 15,
            borderRadius: 10
          }}
        >
          <Text style={{ fontFamily: "Bold", paddingTop: 15, fontSize: 21 }}>
            Chi tiết thanh toán
          </Text>
          <View style={{ flexDirection: "row", paddingTop: 10 }}>
            <Left>
              <Text style={{ fontFamily: "Regular", fontSize: 15 }}>
                Giá gốc
              </Text>
            </Left>
            <Right>
              <FormatNumber
                number={order.originalPrice}
                bold={"bold"}
                size={17}
              />
            </Right>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 10
            }}
          >
            <Left>
              <Text style={{ fontFamily: "Regular", fontSize: 15 }}>
                Khuyến mãi
              </Text>
            </Left>
            <Right>
              <FormatNumber
                number={order.totalOrder - order.originalPrice}
                bold={"bold"}
                size={17}
              />
            </Right>
          </View>
          <View style={{ flexDirection: "row", paddingTop: 15 }}>
            <Left>
              <Text style={{ fontFamily: "Bold", fontSize: 15 }}>
                Tổng tiền
              </Text>
            </Left>
            <Right>
              <FormatNumber number={order.totalOrder} bold={"bold"} size={17} />
            </Right>
          </View>
        </View>
      );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadOrder: orders => {
      dispatch(loadOrder(orders));
    },
    loadToday: today => {
      dispatch(loadToday(today));
    }
  };
};
export default withNavigation(
  connect(
    null,
    mapDispatchToProps
  )(Order)
);
