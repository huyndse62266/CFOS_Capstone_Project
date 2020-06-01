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
  TabHeading,
  Container,
  Tab,
  Tabs
} from "native-base";
import { Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import {
  Dimensions,
  AsyncStorage,
  StyleSheet,
  StatusBar,
  FlatList
} from "react-native";
import ListFood from "../Food/ListFood";
import Stores from "../Store/Stores";
import SpinnerLoading from "../../common/SpinnerLoading";
import { FoodService } from "../../service/FoodService";
import Basket from "../../common/Basket";
import { connect } from "react-redux";

const { height, width } = Dimensions.get("window");
class Search extends Component {
  constructor(props) {
    super(props);
    this.FoodService = new FoodService();
    this.state = {
      result: {},
      flag: 0,
      currentTab: 0,
      history: []
    };
  }
  componentDidMount() {
    this.loadSearchHistory();
  }
  onTextChange(value) {
    if (value.length < 1) {
      this.setState({
        result: {}
      });
      this.loadSearchHistory();
      return;
    }
    this.setState({
      flag: 1
    });
    this.FoodService.searchFoods(1, value)
      .then(result => {
        this.setState({
          result: result.data !== undefined ? result.data : {},
          flag: 0
        });
      })
      .catch(error => {
        this.setState({
          order: {},
          flag: 0
        });
        console.log(error);
      });
  }
  tabChanged(tab) {
    this.setState({
      currentTab: tab
    });
  }
  loadSearchHistory = async () => {
    let history = await AsyncStorage.getItem("SEARCH");
    if (history !== null) {
      this.setState({
        history: history.split(",")
      });
    }
  };
  render() {
    let result = this.state.result;
    return (
      <Container>
        <StatusBar hidden />
        <SearchHeader
          navigation={this.props.navigation}
          onTextChange={value => this.onTextChange(value)}
        />
        {result !== undefined &&
        result.foodVMDetailResponses !== undefined &&
        result.foodVMDetailResponses.length > 0 ? (
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
                    <Text
                      style={
                        this.state.currentTab === 0
                          ? styles.activeTextStyle
                          : styles.textStyle
                      }
                    >
                      Món ăn
                    </Text>
                  </View>
                </TabHeading>
              }
            >
              <ListFood
                navigation={this.props.navigation}
                foods={result.foodVMDetailResponses}
              />
            </Tab>
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
                    <Text
                      style={
                        this.state.currentTab === 1
                          ? styles.activeTextStyle
                          : styles.textStyle
                      }
                    >
                      Cửa hàng
                    </Text>
                  </View>
                </TabHeading>
              }
            >
              <Stores
                stores={result.appStoreVMS}
                navigation={this.props.navigation}
              />
            </Tab>
          </Tabs>
        ) : (
          <View style={{ flex: 1 }}>
            {this.state.flag == 0 ? (
              <View style={{ padding: 25 }}>
                {this.state.history.length > 0 ? (
                  <View>
                    <Text style={{ fontFamily: "Bold", fontSize: 17 }}>
                      Bạn đã tìm kiếm
                    </Text>
                    <FlatList
                      style={{
                        paddingTop: 15
                      }}
                      showsVerticalScrollIndicator={false}
                      data={this.state.history}
                      renderItem={({ item }) => (
                        <Text
                          note
                          style={{
                            marginTop: 15,
                            fontFamily: "Regular",
                            fontSize: 17
                          }}
                        >
                          {item}
                        </Text>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                ) : null}
              </View>
            ) : (
              <SpinnerLoading />
            )}
          </View>
        )}

        {this.props.count > 0 ? (
          <Basket navigation={this.props.navigation} />
        ) : null}
      </Container>
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
    this.setHistorySearch(this.state.searchValue);
  }
  deleteText() {
    this.setState({ searchValue: "" });
    this.props.onTextChange("");
  }

  setHistorySearch = async text => {
    let search = "";
    const value = await AsyncStorage.getItem("SEARCH");
    if (value !== null) {
      search = text + "," + value;
    } else {
      search = text;
    }
    try {
      await AsyncStorage.setItem("SEARCH", search);
    } catch (error) {
      console.log(`${error}`);
    }
  };
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
        <Body style={{ flex: 8 }}>
          <Item>
            <Input
              style={{ fontFamily: "Bold", fontSize: 19 }}
              placeholder="Tên món ăn, cửa hàng..."
              placeholderTextColor="#AAAAAA"
              onChangeText={text => this.setState({ searchValue: text })}
              value={this.state.searchValue}
              returnKeyType="search"
              autoFocus={true}
              onSubmitEditing={e => this.onTextChange()}
            />
          </Item>
        </Body>
        {this.state.searchValue.length > 0 ? (
          <Right style={{ flex: 2 }}>
            <Button transparent onPress={() => this.deleteText()}>
              <Icon name="clear" type="material" />
            </Button>
          </Right>
        ) : null}
      </Header>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});

const mapStateToProps = state => {
  return {
    count: state.cart.count
  };
};
export default withNavigation(connect(mapStateToProps)(Search));
