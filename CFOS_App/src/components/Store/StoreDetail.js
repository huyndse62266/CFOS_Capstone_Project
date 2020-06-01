import React, { Component } from "react";
import { Animated, Platform, StyleSheet, RefreshControl } from "react-native";
import {
  View,
  List,
  ListItem,
  TabHeading,
  Text,
  Left,
  Body,
  Right,
  Button,
  Header,
  Tabs,
  Tab,
  Container,
  ScrollableTab
} from "native-base";
import { Icon } from "react-native-elements";
import { FlatList, Image, Dimensions, StatusBar } from "react-native";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import ListFood from "../Food/ListFood";
import { withNavigation } from "react-navigation";
import SpinnerLoading from "../../common/SpinnerLoading";
import { StoreService } from "../../service/StoreService";
import { connect } from "react-redux";
import Basket from "../../common/Basket";

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 40 : 53;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const { width } = Dimensions.get("window");

class StoreDetail extends Component {
  constructor(props) {
    super(props);
    this.StoreService = new StoreService();
    this.state = {
      store: {}
    };
  }
  componentDidMount() {
    let store = this.props.navigation.getParam("store");
    this.StoreService.getStoreDetail(Number.parseInt(store.storeVM.storeId, 10))
      .then(result => {
        this.setState({ store: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    if (
      this.state.store !== undefined &&
      this.state.store.storeVM !== undefined
    ) {
      return (
        <StoreBody
          store={this.state.store}
          count={this.props.count}
          navigation={this.props.navigation}
        />
      );
    } else {
      return <SpinnerLoading />;
    }
  }
}

class StoreBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
      ),
      refreshing: false,
      data: this.props.store.appCategoryVMS[0],
      categories: this.props.store.appCategoryVMS,
      currentTab: 0
    };
  }
  tabChanged(tab) {
    this.setState({
      currentTab: tab
    });
    this.setState({
      data: this.state.categories[tab]
    });
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
    let store = this.props.store;
    if (store !== undefined) {
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
              <ListFood
                foods={
                  this.state.categories[this.state.currentTab]
                    .foodVMDetailResponses
                }
                navigation={this.props.navigation}
              />
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
                uri: store.storeVM.storeImage
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
              <StoreInfo store={store} />
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
                <Text style={styles.title}> {store.storeVM.storeName}</Text>
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
            <StoreCategory
              appCategoryVMS={store.appCategoryVMS}
              currentTab={currentTab => this.tabChanged(currentTab)}
            />
          </Animated.View>
          {this.props.count > 0 ? (
            <Basket navigation={this.props.navigation} />
          ) : null}
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
    paddingTop: Platform.OS !== "ios" ? HEADER_MAX_HEIGHT + 50 : 50
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
    fontSize: 16
  },
  textStyle: {
    color: "black",
    fontFamily: "Semibold",
    fontSize: 16
  }
});

class StoreInfo extends Component {
  render() {
    const { store } = this.props;
    return (
      <View
        style={{
          paddingVertical: 15,
          paddingHorizontal: width * 0.06,
          height: 200,
          backgroundColor: "white",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25
        }}
      >
        <Text style={{ fontFamily: "Bold", fontSize: 25 }}>
          {store.storeVM.storeName}
        </Text>
        <Text
          note
          numberOfLines={1}
          style={{ fontFamily: "Regular", fontSize: 14 }}
        >
          {store.storeVM.storeDescription}
        </Text>
        <View style={{ flexDirection: "row", paddingTop: 5 }}>
          {store.foodCount > 0 ? (
            <View style={{ flexDirection: "row", marginRight: 50 }}>
              <IconM name="room-service-outline" size={20} />
              <Text style={{ fontFamily: "Regular", fontSize: 14 }}>
                {"  "}
                {store.foodCount} món ăn
              </Text>
            </View>
          ) : null}
          {store.drinkCount > 0 ? (
            <View style={{ flexDirection: "row" }}>
              <IconM name="glass-cocktail" size={20} />
              <Text style={{ fontFamily: "Regular", fontSize: 14 }}>
                {"  "}
                {store.drinkCount} giải khát
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}
class StoreCategory extends Component {
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
    const { appCategoryVMS } = this.props;
    if (appCategoryVMS && appCategoryVMS.length > 0)
      return (
        <Container>
          {appCategoryVMS.length >= 3 ? (
            <Tabs
              initialPage={0}
              onChangeTab={({ i, ref, from }) => this.tabChanged(i)}
              tabBarBackgroundColor={"white"}
              tabBarUnderlineStyle={{
                backgroundColor: "transparent",
                paddingHorizontal: width * 0.06
              }}
              renderTabBar={() => <ScrollableTab />}
            >
              {appCategoryVMS.length > 0 &&
                appCategoryVMS.map((data, index) => (
                  <Tab
                    key={index}
                    heading={
                      <TabHeading style={{ backgroundColor: "white" }}>
                        <View
                          style={[
                            {
                              height: 45,
                              borderRadius: 8,
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "row",
                              paddingHorizontal: 20
                            },
                            this.state.currentTab == index
                              ? styles.activeTabStyle
                              : styles.tabStyle
                          ]}
                        >
                          <Text
                            style={
                              this.state.currentTab == index
                                ? styles.activeTextStyle
                                : styles.textStyle
                            }
                          >
                            {data.categoryVM.categoryName}
                          </Text>
                        </View>
                      </TabHeading>
                    }
                    // heading={data.categoryVM.categoryName}
                    // tabStyle={{ backgroundColor: "#EEEEEE" }}
                    // textStyle={{ color: "black", fontSize: 17 }}
                    // activeTabStyle={{ backgroundColor: "#CCCCCC" }}
                    // activeTextStyle={{
                    //   color: "black",
                    //   fontWeight: "bold",
                    //   fontSize: 17
                    // }}
                    // style={{
                    //   backgroundColor: "#EEEEEE"
                    // }}
                  />
                ))}
            </Tabs>
          ) : (
            <Tabs
              initialPage={0}
              onChangeTab={({ i, ref, from }) => this.tabChanged(i)}
              tabBarBackgroundColor={"white"}
              tabBarUnderlineStyle={{
                backgroundColor: "transparent",
                paddingHorizontal: width * 0.06
              }}
            >
              {appCategoryVMS.length > 0 &&
                appCategoryVMS.map((data, index) => (
                  <Tab
                    key={index}
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
                            this.state.currentTab == index
                              ? styles.activeTabStyle
                              : styles.tabStyle
                          ]}
                        >
                          <Text
                            style={
                              this.state.currentTab == index
                                ? styles.activeTextStyle
                                : styles.textStyle
                            }
                          >
                            {data.categoryVM.categoryName}
                          </Text>
                        </View>
                      </TabHeading>
                    }
                    // heading={data.categoryVM.categoryName}
                    // tabStyle={{ backgroundColor: "#EEEEEE" }}
                    // textStyle={{ color: "black", fontSize: 17 }}
                    // activeTabStyle={{ backgroundColor: "#CCCCCC" }}
                    // activeTextStyle={{
                    //   color: "black",
                    //   fontWeight: "bold",
                    //   fontSize: 17
                    // }}
                    // style={{
                    //   backgroundColor: "#EEEEEE"
                    // }}
                  />
                ))}
            </Tabs>
          )}
        </Container>
      );
  }
}

const mapStateToProps = state => {
  return {
    count: state.cart.count
  };
};
export default withNavigation(connect(mapStateToProps)(StoreDetail));
