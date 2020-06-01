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
import CategoryHeader from "../Category/CategoryHeader";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from "react-native";
import IconE from "react-native-vector-icons/Entypo";
import { addCart } from "../../redux/actions/CartActions";
import { connect } from "react-redux";
import FormatNumber from "../../common/FormatNumber";
import CartItem from "./CartItem";
import { loadAcount } from "../../redux/actions/AccountActions";
import { apiGetAccount } from "../Account/AccountApi";
import { LinearGradient } from "expo-linear-gradient";
import Moment from "moment";
import ClockPicker from "./ClockPicker";

const { width, height } = Dimensions.get("window");
class Cart extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }
  componentDidMount() {
    this.loadAcount();
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
  submitCart() {
    this.loadAcount();
    if (this.props.totalOrder > this.props.account.walletAmount) {
      alert(
        "Ví của bạn không đủ tiền để thực hiện giao dịch! Làm ơn nạp tiền vào ví để tiếp tực giao dịch!!"
      );
      return;
    }
    let scheduleTime = this.child.current.getSheduleTime();
    let days = this.child.current.getDays();
    if (days.length < 1) {
      let minTime = Moment(
        new Date(new Date().getTime() + 30 * 1000 * 60)
      ).format("HH:mm");

      if (scheduleTime < minTime) {
        alert("Bạn chỉ phải đặt sau ít nhất 30 phút kể từ khi đặt món");
        return;
      }
    }

    this.props.navigation.navigate("OrderSuccess", {
      scheduleTime: scheduleTime,
      days: days
    });
  }
  render() {
    return (
      <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
        <StatusBar hidden />
        <CategoryHeader
          subCategory={"Giỏ hàng của bạn"}
          navigation={this.props.navigation}
        />
        {this.props.count > 0 ? (
          <View
            style={{
              backgroundColor: "#F6F6F6",
              flex: 1
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ height: 10, backgroundColor: "transparent" }} />
              <CartBody orderDetails={this.props.orderDetails} />
              <View style={{ height: 10, backgroundColor: "transparent" }} />
              <Scheduler ref={this.child} />
              <View style={{ height: 10, backgroundColor: "transparent" }} />
              <Payment
                totalOrder={this.props.totalOrder}
                originalPrice={this.props.originalPrice}
                count={this.props.count}
              />
              <View style={{ height: 10, backgroundColor: "transparent" }} />
              <Wallet
                walletAmount={
                  this.props.account.walletAmount !== undefined
                    ? this.props.account.walletAmount
                    : 0
                }
              />
              <View style={{ height: 120 }} />
            </ScrollView>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                paddingHorizontal: width * 0.06,
                paddingVertical: 15,
                backgroundColor: "#FFFFFF"
              }}
            >
              <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                <Left>
                  <Text style={{ fontFamily: "Bold", fontSize: 19 }}>
                    Tổng tiền
                  </Text>
                </Left>
                <Right>
                  <FormatNumber
                    number={this.props.totalOrder}
                    bold={"bold"}
                    size={21}
                  />
                </Right>
              </View>
              <Button
                style={{
                  width: width * 0.88,
                  borderRadius: 10,
                  backgroundColor: "transparent"
                }}
                onPress={() => this.submitCart()}
              >
                <LinearGradient
                  colors={["#EC101A", "#EC601A"]}
                  start={[0.0, 0.5]}
                  end={[1.0, 0.5]}
                  style={{
                    justifyContent: "center",
                    width: width * 0.88,
                    borderRadius: 10,
                    height: 45,
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontFamily: "Bold", fontSize: 19 }}>
                    Thanh toán
                  </Text>
                </LinearGradient>
              </Button>
            </View>
          </View>
        ) : (
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
                  width: width * 0.88,
                  height: width * 0.44
                }}
                square
                source={require("../../image/emptyCart.png")}
              />
              <Text
                style={{ fontFamily: "Semibold", fontSize: 21, paddingTop: 20 }}
              >
                Giỏ hàng trống
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
                Hãy đặt món để thưởng thức những món ăn ngon tại khu ẩm thực
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
class CartBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 0,
      orderDetails: []
    };
  }
  componentWillMount = () => {
    this.setState({
      orderDetails: this.props.orderDetails,
      size: this.props.orderDetails.length
    });
  };
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  render() {
    let { orderDetails } = this.props;
    if (orderDetails && orderDetails.length > 0)
      return (
        <View
          style={{
            paddingHorizontal: width * 0.06,
            paddingVertical: 15,
            backgroundColor: "#FFFFFF"
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.orderDetails}
            extraData={this.state.orderDetails}
            renderItem={({ item, index }) => (
              <CartItem orderDetail={item} index={index} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
  }
}
class Payment extends Component {
  render() {
    return (
      <View
        style={{
          paddingHorizontal: width * 0.06,
          backgroundColor: "white",
          paddingVertical: 15
        }}
      >
        <Text style={{ fontFamily: "Bold", paddingTop: 15, fontSize: 21 }}>
          Chi tiết thanh toán
        </Text>
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <Left>
            <Text style={{ fontFamily: "Regular", fontSize: 15 }}>Giá gốc</Text>
          </Left>
          <Right>
            <FormatNumber
              number={this.props.originalPrice}
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
              number={this.props.totalOrder - this.props.originalPrice}
              bold={"bold"}
              size={17}
            />
          </Right>
        </View>
        <View style={{ flexDirection: "row", paddingTop: 15 }}>
          <Left>
            <Text style={{ fontFamily: "Bold", fontSize: 15 }}>Tổng tiền</Text>
          </Left>
          <Right>
            <FormatNumber
              number={this.props.totalOrder}
              bold={"bold"}
              size={17}
            />
          </Right>
        </View>
      </View>
    );
  }
}
class Wallet extends Component {
  render() {
    return (
      <View
        style={{
          paddingVertical: 20,
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF"
        }}
      >
        <IconE name="wallet" size={30} />
        <Text>{"  "}</Text>
        <FormatNumber
          number={this.props.walletAmount}
          bold={"bold"}
          size={17}
        />
      </View>
    );
  }
}
class Scheduler extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      schedule: 0,
      sheduleTime: 0,
      days: []
    };
  }
  renderSchedule(num) {
    this.setState({ schedule: num });
    if (num == 0) {
      this.setState({ sheduleTime: 0, days: [] });
      this.child.current.hideSchedule();
    }
  }
  getSheduleTime() {
    return this.state.sheduleTime;
  }
  getDays() {
    return this.state.days;
  }
  setSheduleTime(sheduleTime, days) {
    this.setState({ sheduleTime: sheduleTime, days: days });
  }
  render() {
    return (
      <View
        style={{
          paddingVertical: 20,
          flex: 1,
          backgroundColor: "#FFFFFF"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: width * 0.06,
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Thumbnail
              style={{
                width: 15,
                height: 20
              }}
              square
              source={require("../../image/schedulerIcon.png")}
            />
            <Text style={{ fontFamily: "Semibold", fontSize: 14 }}>
              {"  "}
              {this.state.schedule < 1 ? "Đặt trước" : "Đặt trước thời gian ăn"}
            </Text>
          </View>
          {this.state.schedule < 1 ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text style={{ fontFamily: "Regular", fontSize: 14 }}>
                Ăn ngay (Không đặt trước){"  "}
              </Text>
              <TouchableOpacity onPress={() => this.renderSchedule(1)}>
                <Icon name="down" type="antdesign" size={25} />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                alignItems: "center"
              }}
            >
              <TouchableOpacity onPress={() => this.renderSchedule(0)}>
                <Icon name="up" type="antdesign" size={25} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {this.state.schedule > 0 ? (
          <ClockPicker
            ref={this.child}
            setSheduleTime={(time, days) => this.setSheduleTime(time, days)}
          />
        ) : null}
      </View>
    );
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
    loadAcount: account => {
      dispatch(loadAcount(account));
    }
  };
};
export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Cart)
);
