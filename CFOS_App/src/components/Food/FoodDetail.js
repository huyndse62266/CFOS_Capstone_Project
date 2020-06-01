import React, { Component } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from "react-native";
import {
  View,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Header,
  Tabs,
  Tab,
  Container,
  ScrollableTab,
  TabHeading
} from "native-base";
import { Icon } from "react-native-elements";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import IconM2 from "react-native-vector-icons/MaterialIcons";
import TabDetail from "./TabDetail";
import TabReview from "./TabReview";
import { withNavigation } from "react-navigation";
import { addCart, removeItem } from "../../redux/actions/CartActions";
import { connect } from "react-redux";
import FormatNumber from "../../common/FormatNumber";
import { LinearGradient } from "expo-linear-gradient";

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 40 : 53;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const { height, width } = Dimensions.get("window");
class FoodDetail extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
      ),
      refreshing: false,
      currentTab: 0,
      foodOptions: [
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
      ],
      optionsDefault: [],
      food: {},
      index: -1
    };
  }
  componentWillMount() {
    this.loadData();
  }
  loadData() {
    let food = this.props.navigation.getParam("food");
    let foodOptions = this.props.navigation.getParam("foodOptions");
    let index = this.props.navigation.getParam("index");
    this.setState({
      food: food
    });
    if (foodOptions !== undefined && index > -1 && foodOptions.length > 0) {
      this.setState({
        foodOptions: foodOptions,
        index: index
      });
    } else {
      foodOptions = this.state.foodOptions;
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
      this.setState({
        foodOptions: foodOptions
      });
    }
    this.setOptionsDefault(food);
  }

  setOptionsDefault(food) {
    let optionsDefault = [];
    food.foodOptions.map(f => {
      f.foodOptionVMS.map(o => {
        if (o.default == true) {
          optionsDefault.push(o.foId);
        }
      });
    });
    this.setState({
      optionsDefault: optionsDefault
    });
  }
  tabChanged(tab) {
    this.setState({
      currentTab: tab,
      foodOptions:
        this.child.current.getFoodOptions() !== undefined
          ? this.child.current.getFoodOptions()
          : this.state.foodOptions
    });
  }
  removeItem() {
    let orderDetail = this.props.navigation.getParam("orderDetail");
    this.props.removeItem(
      this.state.index,
      orderDetail.quantity,
      orderDetail.originalPrice,
      orderDetail.totalPrice
    );
  }
  addBasket(quantity, food) {
    if (this.state.index > -1) {
      this.removeItem();
    }
    let orderDetail = [];

    let foodOptions =
      this.child.current.getFoodOptions() !== undefined
        ? this.child.current.getFoodOptions()
        : this.state.foodOptions;

    let orderDetailFoodOption = [];
    foodOptions.map(f => {
      f.foodOptionVMS.map(o => {
        let index = -1;
        this.state.optionsDefault.map((od, i) => {
          if (od === o.option.foId) {
            index = i;
          }
        });
        if (index == -1) {
          orderDetailFoodOption.push(o);
        }
      });
    });
    let optionsPrice = 0;
    orderDetailFoodOption.map(o => {
      optionsPrice = optionsPrice + o.option.optionPrice * o.quantity;
    });

    let originalPrice = quantity * food.price + quantity * optionsPrice;
    let totalOrder =
      quantity * food.price * (1 - food.promotion / 100) +
      quantity * optionsPrice;

    let optionsList = this.renderOption(
      this.state.optionsDefault,
      orderDetailFoodOption,
      foodOptions
    );

    orderDetail.push({
      food: food,
      orderDetailFoodOption:
        orderDetailFoodOption !== undefined ? orderDetailFoodOption : [],
      quantity: quantity,
      totalPrice:
        quantity * food.price * (1 - food.promotion / 100) +
        quantity * optionsPrice,
      foodOptions: foodOptions,
      optionsList: optionsList,
      originalPrice: originalPrice
    });
    this.props.addFood(orderDetail, originalPrice, totalOrder);
    this.props.navigation.goBack();
  }
  renderOption(optionsDefault, orderDetailFoodOption, foodOptions) {
    let optionsList = "";
    let options = [];
    if (
      orderDetailFoodOption !== undefined &&
      orderDetailFoodOption.length !== undefined
    ) {
      orderDetailFoodOption.map(o => {
        let tmp = false;
        optionsDefault.map(od => {
          if (od === o.option.foId) {
            tmp = true;
          }
        });
        if (tmp == false) {
          let flag = false;
          options.map(i => {
            if (i.parentName === o.option.parentName) {
              flag = true;
              i.option =
                i.option +
                o.option.foName +
                (o.quantity > 1 ? " x" + o.quantity : "") +
                ", ";
            }
          });
          if (flag == false) {
            options.push({
              parentName: o.option.parentName,
              option:
                o.option.foName +
                (o.quantity > 1 ? " x" + o.quantity : "") +
                ", "
            });
          }
          flag = false;
        }
        tmp = false;
      });
      if (options.length > 0) {
        options.map(o => {
          optionsList = optionsList + o.parentName + " " + o.option;
        });
      }
    }
    return optionsList.length > 0
      ? optionsList.slice(0, optionsList.length - 2)
      : "Mặc định";
  }

  getOrderDetailFoodOption(foodOptions) {
    let orderDetailFoodOption = [];
    foodOptions.map(f => {
      f.foodOptionVMS.map(o => {
        orderDetailFoodOption.push(o);
      });
    });
    return orderDetailFoodOption.length > 0 ? orderDetailFoodOption : undefined;
  }
  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp"
    });
    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp"
    });
    const textOpacity = scrollY.interpolate({
      inputRange: [1, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE / 2],
      outputRange: [0, 1, 0],
      extrapolate: "clamp"
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp"
    });
    const storeInfoTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: "clamp"
    });
    const tabsTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp"
    });
    // const store = this.props.navigation.getParam("store");
    let food = this.state.food;
    let orderDetail = this.props.navigation.getParam("orderDetail");
    if (food !== undefined && food.foodId !== undefined) {
      return (
        <View style={styles.fill}>
          <StatusBar hidden />
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.fill}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              { useNativeDriver: true }
            )}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.setState({ refreshing: true });
                  setTimeout(() => this.setState({ refreshing: false }), 1000);
                }}
                // Android offset for RefreshControl
                progressViewOffset={HEADER_MAX_HEIGHT}
              />
            }
            // iOS offset for RefreshControl
            contentInset={{
              top: HEADER_MAX_HEIGHT
            }}
            contentOffset={{
              y: -HEADER_MAX_HEIGHT
            }}
          >
            <View style={styles.scrollViewContent}>
              {this.state.currentTab == 0 ? (
                <TabDetail
                  food={food}
                  navigation={this.props.navigation}
                  ref={this.child}
                  foodOptions={this.state.foodOptions}
                />
              ) : (
                <TabReview
                  food={food}
                  navigation={this.props.navigation}
                  ref={this.child}
                  updateFood={foodId => this.props.updateFood(foodId)}
                />
              )}
            </View>
          </Animated.ScrollView>
          <Animated.View
            pointerEvents="none"
            style={[
              styles.header,
              { transform: [{ translateY: headerTranslate }] }
            ]}
          >
            <Animated.Image
              style={[
                styles.backgroundImage,
                {
                  opacity: imageOpacity,
                  transform: [{ translateY: imageTranslate }]
                }
              ]}
              source={{
                uri: food.imageVMS[0].image
              }}
            />
            <Animated.View
              style={[
                styles.backgroundStoreInfo,
                {
                  transform: [{ translateY: storeInfoTranslate }]
                }
              ]}
            >
              <FoodInfo food={food} />
              {/* Store info here */}
            </Animated.View>
          </Animated.View>
          <Animated.View style={[styles.bar]}>
            <View
              style={{
                width: width,
                flexDirection: "row"
              }}
            >
              <Left>
                <Button
                  style={{
                    left: 15
                  }}
                  transparent
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                >
                  <Icon name="left" type="antdesign" color={"white"} />
                </Button>
              </Left>
            </View>
          </Animated.View>
          <Animated.View
            style={[
              styles.bar,
              {
                opacity: textOpacity
              }
            ]}
          >
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <Left style={{ flex: 1 }}>
                <Button
                  style={{
                    left: 15
                  }}
                  transparent
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                >
                  <Icon name="left" type="antdesign" color={"black"} />
                </Button>
              </Left>
              <Body style={{ flex: 6, alignItems: "flex-start" }}>
                <Text style={styles.title}> {food.foodName}</Text>
              </Body>
            </View>
          </Animated.View>
          <Animated.View
            style={[
              styles.backgroundTabs,
              {
                transform: [{ translateY: tabsTranslate }]
              }
            ]}
          >
            <FoodTabs currentTab={currentTab => this.tabChanged(currentTab)} />
          </Animated.View>
          <View>
            <AddCart
              navigation={this.props.navigation}
              totalOrder={this.props.totalOrder}
              originalPrice={this.props.originalPrice}
              count={this.props.count}
              addCart={quantity => this.addBasket(quantity, food)}
              quantity={orderDetail !== undefined ? orderDetail.quantity : 1}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: "cover"
  },
  backgroundStoreInfo: {
    position: "absolute",
    top: 200,
    left: 0,
    right: 0,
    width: null,
    height: 150,
    resizeMode: "cover"
  },
  backgroundTabs: {
    position: "absolute",
    top: 300,
    left: 0,
    right: 0,
    width: null,
    height: 50,
    resizeMode: "cover"
  },
  bar: {
    backgroundColor: "transparent",
    marginTop: Platform.OS === "ios" ? 0 : 10,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  title: {
    fontSize: 20,
    fontFamily: "Bold"
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== "ios" ? HEADER_MAX_HEIGHT + 70 : 70,
    paddingHorizontal: width * 0.06
  },
  tabStyle: {
    backgroundColor: "#F6F6F6"
  },
  activeTabStyle: {
    backgroundColor: "#F5311A"
  },
  activeTextStyle: {
    color: "white",
    fontFamily: "Semibold",
    fontSize: 17
  },
  textStyle: {
    color: "black",
    fontFamily: "Semibold",
    fontSize: 17
  },
  activeIconStyle: {
    color: "white"
  },
  IconStyle: {
    color: "black"
  },
  addCart: {
    backgroundColor: "white",
    marginTop: height,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute"
  }
});

class FoodTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0
    };
  }
  tabChanged(tab) {
    this.setState({
      currentTab: tab
    });
    var currentTab = tab != null ? tab : 0;
    this.props.currentTab(currentTab);
  }
  render() {
    return (
      <Container>
        <Tabs
          initialPage={0}
          onChangeTab={({ i, ref, from }) => this.tabChanged(i)}
          tabBarBackgroundColor={"white"}
          tabBarUnderlineStyle={{
            backgroundColor: "transparent",
            paddingHorizontal: width * 0.06
          }}
        >
          <Tab
            key={0}
            heading={
              <TabHeading style={{ backgroundColor: "white" }}>
                <View
                  style={[
                    {
                      height: 45,
                      width: width * 0.44,
                      borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row"
                    },
                    this.state.currentTab === 0
                      ? styles.activeTabStyle
                      : styles.tabStyle
                  ]}
                >
                  <IconM
                    name="room-service"
                    size={22}
                    style={
                      this.state.currentTab === 0
                        ? styles.activeIconStyle
                        : styles.IconStyle
                    }
                  />
                  <Text
                    style={
                      this.state.currentTab === 0
                        ? styles.activeTextStyle
                        : styles.textStyle
                    }
                  >
                    {"  "}
                    Thông tin
                  </Text>
                </View>
              </TabHeading>
            }
          />
          <Tab
            key={1}
            heading={
              <TabHeading style={{ backgroundColor: "white" }}>
                <View
                  style={[
                    {
                      height: 45,
                      width: width * 0.44,
                      borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row"
                    },
                    this.state.currentTab === 1
                      ? styles.activeTabStyle
                      : styles.tabStyle
                  ]}
                >
                  <IconM2
                    name="rate-review"
                    size={22}
                    style={
                      this.state.currentTab === 1
                        ? styles.activeIconStyle
                        : styles.IconStyle
                    }
                  />
                  <Text
                    style={
                      this.state.currentTab === 1
                        ? styles.activeTextStyle
                        : styles.textStyle
                    }
                  >
                    {"  "}
                    Đánh giá
                  </Text>
                </View>
              </TabHeading>
            }
          />
        </Tabs>
      </Container>
    );
  }
}

class AddCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: this.props.quantity
    };
  }
  quantityChange(quantity) {
    var tmp = this.state.quantity + quantity;
    if (tmp > 0) {
      this.setState({
        quantity: tmp
      });
    }
  }

  addBasket() {
    this.props.addCart(this.state.quantity);
  }
  render() {
    return (
      <View style={{ paddingHorizontal: width * 0.06, paddingVertical: 10 }}>
        {this.props.count > 0 ? (
          <View style={{ paddingBottom: 10 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Cart")}
            >
              <LinearGradient
                colors={["#EC101A", "#EC601A"]}
                start={[0.0, 0.5]}
                end={[1.0, 0.5]}
                style={{
                  paddingHorizontal: width * 0.06,
                  height: 45,
                  paddingVertical: 10,
                  borderRadius: 10,
                  flexDirection: "row"
                }}
              >
                <Left>
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <IconM name="basket" size={25} color={"white"} />
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "Bold",
                        fontSize: 16
                      }}
                    >
                      {"   "}
                      Xem giỏ
                    </Text>
                  </View>
                </Left>
                <Body>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Regular",
                      fontSize: 16
                    }}
                  >
                    {"    "}
                    {this.props.count} items
                  </Text>
                </Body>
                <Right>
                  <FormatNumber
                    number={this.props.totalOrder}
                    size={16}
                    bold={"bold"}
                    color={"white"}
                  />
                </Right>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: "row",
            padding: 15,
            backgroundColor: "#2657BE",
            height: 45,
            borderRadius: 10
          }}
        >
          <Left style={{ alignItems: "flex-start", flex: 5 }}>
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <Button transparent onPress={() => this.quantityChange(-1)}>
                <Icon name="minus" type="antdesign" size={20} color={"white"} />
              </Button>
              <Text
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 25,
                  fontFamily: "Bold",
                  fontSize: 17,
                  color: "white"
                }}
              >
                {this.state.quantity}
              </Text>
              <Button transparent onPress={() => this.quantityChange(1)}>
                <Icon name="plus" type="antdesign" size={20} color={"white"} />
              </Button>
            </View>
          </Left>
          <Right style={{ alignItems: "flex-start", flex: 5 }}>
            <Button transparent onPress={() => this.addBasket()}>
              <Text
                style={{
                  fontFamily: "Bold",
                  fontSize: 15,
                  color: "white"
                }}
              >
                Thêm vào giỏ
              </Text>
            </Button>
          </Right>
        </View>
      </View>
    );
  }
}

class FoodInfo extends Component {
  render() {
    const { food } = this.props;
    return (
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 30,
          height: 200,
          backgroundColor: "white",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25
        }}
      >
        <Text style={{ fontFamily: "Bold", fontSize: 21 }}>
          {food.foodName}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Thumbnail
            style={{ width: 20, height: 20, backgroundColor: "#F6F6F6" }}
            source={{ uri: food.storeVM.storeIcon }}
          />
          <Text
            numberOfLines={1}
            style={{ fontFamily: "Regular", fontSize: 15 }}
          >
            {"   "}
            {food.storeVM.storeName}
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    totalOrder: state.cart.totalOrder,
    originalPrice: state.cart.originalPrice,
    count: state.cart.count
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addFood: (orderDetail, originalPrice, totalOrder) => {
      dispatch(addCart(orderDetail, originalPrice, totalOrder));
    },
    removeItem: (index, count, originalPrice, totalOrder) => {
      dispatch(removeItem(index, count, originalPrice, totalOrder));
    }
  };
};
export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FoodDetail)
);
