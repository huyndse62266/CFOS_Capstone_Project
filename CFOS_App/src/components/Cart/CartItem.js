import React, { Component } from "react";
import {
  Text,
  Left,
  Right,
  Body,
  View,
  Button,
  Thumbnail,
  ListItem
} from "native-base";
import { Icon } from "react-native-elements";
import { TouchableOpacity, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { addCart } from "../../redux/actions/CartActions";
import { connect } from "react-redux";
import FormatNumber from "../../common/FormatNumber";
import IconE from "react-native-vector-icons/EvilIcons";

const { width } = Dimensions.get("window");
class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      optionsList: "Mặc định"
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  addBasket(quantity) {
    let orderDetail = [];
    let order = this.props.orderDetail;
    let food = order.food;
    let options =
      order.orderDetailFoodOption !== undefined
        ? order.orderDetailFoodOption
        : undefined;
    orderDetail.push({
      food: food,
      orderDetailFoodOption: options,
      quantity: quantity,
      totalPrice: quantity * (order.totalPrice / order.quantity)
    });
    let originalPrice =
      quantity *
      (order.totalPrice / order.quantity + food.price * (food.promotion / 100));
    let totalOrder = quantity * (order.totalPrice / order.quantity);

    this.props.addFood(orderDetail, originalPrice, totalOrder);
    this.setState({
      index: this.props.index
    });
  }

  render() {
    let orderDetail = this.props.orderDetails[this.state.index];
    // let optionsList = this.renderOption(orderDetail);
    if (orderDetail)
      return (
        <View
          style={{
            paddingVertical: 20,
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
                  uri: orderDetail.food.imageVMS[0].image
                }}
              />
            </View>
            <View
              style={{
                flex: 6,
                alignItems: "flex-start",
                paddingHorizontal: 10
              }}
            >
              <Text
                numberOfLines={1}
                style={{ fontFamily: "Bold", fontSize: 17 }}
              >
                {orderDetail.food.foodName}
              </Text>
              <Text
                note
                numberOfLines={1}
                style={{ fontFamily: "Regular", fontSize: 14 }}
              >
                {orderDetail.optionsList !== undefined &&
                orderDetail.optionsList.length > 0
                  ? orderDetail.optionsList
                  : "Mặc định"}
                {/* {optionsList} */}
              </Text>
              {/* <View
              style={{
                flexDirection: "row"
              }}
            > */}
              {/* <Left> */}
              <FormatNumber
                number={orderDetail.totalPrice}
                size={17}
                bold={"bold"}
              />
              {/* </Left> */}
              {/* <Right>
                <View
                  style={{
                    flexDirection: "row"
                  }}
                >
                  <Button transparent dark onPress={() => this.addBasket(-1)}>
                    <Icon name="minus" type="antdesign" size={15} />
                  </Button>
                  <Text
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 15,
                      fontSize: 20
                    }}
                  >
                    {orderDetail.quantity}
                  </Text>
                  <Button transparent dark onPress={() => this.addBasket(1)}>
                    <Icon name="plus" type="antdesign" size={15} />
                  </Button>
                </View>
              </Right> */}
              {/* </View> */}
            </View>
            <View
              style={{
                flex: 2,
                flexDirection: "row"
              }}
            >
              <Text
                style={{
                  fontFamily: "Regular",
                  paddingTop: 5,
                  fontSize: 14,
                  width: 30,
                  height: 30,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#DCDCDC",
                  textAlign: "center"
                }}
              >
                x{orderDetail.quantity}
              </Text>
              <Text> </Text>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#DCDCDC",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => this.addBasket(-orderDetail.quantity)}
              >
                <IconE name="trash" size={25} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Thumbnail
                style={{ height: 20, width: 20 }}
                source={{ uri: orderDetail.food.storeVM.storeImage }}
              />
              <Text style={{ fontFamily: "Regular", fontSize: 14 }}>
                {"  "}
                {orderDetail.food.storeVM.storeName}
              </Text>
            </View>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() =>
                this.props.navigation.navigate("FoodDetail", {
                  food: orderDetail.food,
                  foodOptions: orderDetail.foodOptions,
                  index: this.state.index,
                  orderDetail: orderDetail
                })
              }
            >
              <Text
                style={{
                  fontFamily: "Semibold",
                  fontSize: 14,
                  color: "#2657BE"
                }}
              >
                Chỉnh sửa{"  "}
              </Text>
              <Icon name="form" type="antdesign" size={15} color={"#2657BE"} />
            </TouchableOpacity>
          </View>
        </View>
      );
  }
}
const mapStateToProps = state => {
  return {
    orderDetails: state.cart.orderDetails
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addFood: (orderDetail, originalPrice, totalOrder) => {
      dispatch(addCart(orderDetail, originalPrice, totalOrder));
    }
  };
};
export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CartItem)
);
