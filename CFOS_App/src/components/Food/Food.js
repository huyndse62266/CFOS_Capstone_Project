import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Text, View, Button, Thumbnail } from "native-base";
import { Icon } from "react-native-elements";
import Carousel from "react-native-banner-carousel";
import IconM from "react-native-vector-icons/MaterialIcons";
import StarRating from "react-native-star-rating";
import FormatNumber from "../../common/FormatNumber";
import { connect } from "react-redux";
import { addCart } from "../../redux/actions/CartActions";
import { LinearGradient } from "expo-linear-gradient";
import SpinnerLoading from "../../common/SpinnerLoading";

const { width } = Dimensions.get("window");
const foodWidth = width * 0.39;
class Food extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      size: 0,
      quantity: 0,
      food: this.props.food,
      image: []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.food !== this.props.food) {
      this.setState({ food: nextProps.food });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.count !== -2) return true;
  }

  getFoodOptions(food) {
    let foodOptions = [
      {
        isCount: true,
        isSelectMore: true,
        foodOptionVMS: []
      },
      {
        isCount: false,
        isSelectMore: true,
        foodOptionVMS: []
      },
      {
        isCount: false,
        isSelectMore: false,
        foodOptionVMS: []
      }
    ];
    food.foodOptions.map(f => {
      f.foodOptionVMS.map(o => {
        if (o.default == true && f.count == true) {
          foodOptions[0].foodOptionVMS.push({ option: o, quantity: 1 });
        }
        if (o.default == true && f.count == false && f.selectMore == true) {
          foodOptions[1].foodOptionVMS.push({ option: o, quantity: 1 });
        }
        if (o.default == true && f.count == false && f.selectMore == false) {
          foodOptions[2].foodOptionVMS.push({ option: o, quantity: 1 });
        }
      });
    });
    return foodOptions;
  }

  addBasket(quantity, food) {
    let orderDetail = [];
    let originalPrice = quantity * food.price;
    let totalOrder = quantity * food.price * (1 - food.promotion / 100);

    orderDetail.push({
      food: food,
      orderDetailFoodOption: [],
      quantity: quantity,
      totalPrice: totalOrder,
      foodOptions: this.getFoodOptions(food),
      optionsList: "Mặc định",
      originalPrice: originalPrice
    });

    this.props.addFood(orderDetail, originalPrice, totalOrder);
  }
  render() {
    if (this.state.food !== undefined && this.state.food.foodId !== undefined) {
      let quantity = 0;
      if (this.props.orderDetails && this.props.orderDetails.length > 0) {
        this.props.orderDetails.map(o => {
          if (
            o.food.foodId === this.state.food.foodId &&
            o.orderDetailFoodOption.length < 1 &&
            o.quantity > 0
          ) {
            quantity = o.quantity;
          }
        });
      }
      return (
        <View>
          <View
            style={{
              padding: 5,
              borderRadius: 10,
              marginVertical: 10,
              backgroundColor: "rgba(192,192,192,0.15)"
            }}
          >
            {/* <View
            style={{
              padding: 5,
              borderRadius: 10,
              shadowColor: "#E6E6E6",
              shadowOpacity: 0.24,
              shadowRadius: 10,
              elevation: 24,
              marginVertical: 10
            }}
          > */}
            <View
              style={{
                backgroundColor: "white",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("FoodDetail", {
                    food: this.state.food
                  })
                }
              >
                <View>
                  {this.state.food.imageVMS &&
                  this.state.food.imageVMS.length > 0 ? (
                    <Image
                      style={{
                        width: foodWidth,
                        height: width / 4,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                      }}
                      source={{ uri: this.state.food.imageVMS[0].image }}
                    />
                  ) : null}
                </View>
              </TouchableOpacity>

              {quantity == 0 ? (
                <TouchableOpacity
                  onPress={() => this.addBasket(1, this.state.food)}
                  style={{
                    position: "absolute",
                    bottom: 5,
                    right: 5,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <LinearGradient
                    colors={["#EC101A", "#EC601A"]}
                    start={[0.0, 0.5]}
                    end={[1.0, 0.5]}
                    style={{
                      borderRadius: 5,
                      padding: 5
                    }}
                  >
                    <IconM name="add" size={20} color="#FFFFFF" />
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <LinearGradient
                  colors={["#EC101A", "#EC601A"]}
                  start={[0.0, 0.5]}
                  end={[1.0, 0.5]}
                  style={{
                    position: "absolute",
                    bottom: 5,
                    right: 5,
                    flexDirection: "row",
                    borderRadius: 5,
                    paddingHorizontal: 7,
                    paddingVertical: 5
                  }}
                >
                  <TouchableOpacity
                    style={{ paddingTop: 2 }}
                    onPress={() => this.addBasket(-1, this.state.food)}
                  >
                    <Icon
                      name="minus"
                      type="antdesign"
                      size={15}
                      color={"white"}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      paddingHorizontal: 8,
                      color: "white"
                    }}
                  >
                    {quantity}
                  </Text>
                  <TouchableOpacity
                    style={{ paddingTop: 2 }}
                    onPress={() => this.addBasket(1, this.state.food)}
                  >
                    <Icon
                      name="plus"
                      type="antdesign"
                      size={15}
                      color={"white"}
                    />
                  </TouchableOpacity>
                </LinearGradient>
              )}
            </View>
            <View
              style={{
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                width: foodWidth,
                paddingHorizontal: 10,
                paddingBottom: 5,
                backgroundColor: "white"
              }}
            >
              <Text
                style={{
                  fontFamily: "Semibold",
                  fontSize: 14,
                  padding: 2
                }}
                numberOfLines={1}
              >
                {this.state.food.foodName}
              </Text>
              <View
                style={{
                  padding: 2
                }}
              >
                <FormatNumber
                  number={this.state.food.price}
                  size={14}
                  bold={"bold"}
                />
              </View>
              <View
                style={{
                  padding: 2
                }}
              >
                {this.state.food.rate > 0 ? (
                  <Rating rating={this.state.food.rate} />
                ) : (
                  <Rating rating={0} />
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  padding: 2
                }}
              >
                {/* <Thumbnail
                  style={{ height: 20, width: 20 }}
                  source={{ uri: this.state.food.storeVM.storeImage }}
                /> */}
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 13, fontFamily: "Regular" }}
                >
                  {/* {"  "} */}
                  {this.state.food.storeVM.storeName}
                </Text>
              </View>
            </View>
          </View>

          {this.state.food.promotion > 0 ? (
            <Text
              style={{
                color: "white",
                position: "absolute",
                top: 25,
                marginLeft: (foodWidth * 2) / 3 + 8,
                minWidth: foodWidth / 3,
                height: 25,
                borderRadius: 5,
                backgroundColor: "#2657BE",
                textAlign: "center",
                fontFamily: "Semibold",
                fontSize: 14,
                paddingTop: 3
              }}
            >
              -{this.state.food.promotion}%
            </Text>
          ) : null}
        </View>
      );
    } else {
      return <SpinnerLoading />;
    }
  }
}

class Rating extends Component {
  render() {
    return (
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.props.rating}
        fullStarColor={"#FFA200"}
        starSize={12}
        containerStyle={(style = { width: (foodWidth * 3) / 7 })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    orderDetails: state.cart.orderDetails,
    count: state.cart.count
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addFood: (orderDetail, originalPrice, totalOrder) => {
      dispatch(addCart(orderDetail, originalPrice, totalOrder));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Food);
