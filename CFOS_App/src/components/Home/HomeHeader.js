import React from "react";
import {
  Input,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Item,
  Badge,
  View,
  Text,
  Spinner
} from "native-base";
import Foodcourt from "./Foodcourt";
import { Icon } from "react-native-elements";
import { Dimensions, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

class HomeHeader extends React.Component {
  render() {
    return (
      <View>
        <HeaderHome
          navigation={this.props.navigation}
          account={this.props.account}
        />
        <SearchHeader navigation={this.props.navigation} />
      </View>
    );
  }
}
class HeaderHome extends React.Component {
  render() {
    return (
      <Header style={{ backgroundColor: "#FFFFFF" }}>
        <Body style={{ paddingLeft: 10, flex: 2 }}>
          <Foodcourt />
        </Body>
        <Right
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: width * 0.03
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SearchOrder")}
          >
            <LinearGradient
              colors={["#EC101A", "#EC601A"]}
              start={[0.0, 0.5]}
              end={[1.0, 0.5]}
              style={{
                width: width * 0.29,
                height: 40,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row"
              }}
            >
              <Icon
                name="clippy"
                type="octicon"
                iconStyle={{ color: "#FFFFFF" }}
              />
              <Text
                style={{
                  color: "white",
                  fontFamily: "Semibold",
                  fontSize: 15
                }}
              >
                {" "}
                Kiểm tra
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Right>
      </Header>
    );
  }
}

class SearchHeader extends React.Component {
  render() {
    return (
      <Header
        style={{
          backgroundColor: "#FFFFFF",
          paddingBottom: 10,
          // paddingHorizontal: width * 0.03,
          paddingTop: 10
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Search")}
        >
          <View
            style={{
              paddingHorizontal: 30,
              width: width * 0.9,
              height: 35,
              backgroundColor: "#F6F6F6",
              borderRadius: 10,
              alignItems: "center",
              flexDirection: "row"
              // justifyContent: "space-between"
            }}
          >
            <Icon name="search" type="material" color="#707070" />
            <Text
              note
              style={{
                fontFamily: "Regular",
                fontSize: 15
              }}
            >
              {"  "}Tìm kiếm món ăn, cửa hàng...
            </Text>
            {/* <IconM name="food" size={25} /> */}
          </View>
        </TouchableOpacity>
      </Header>
    );
  }
}
const mapStateToProps = state => {
  return {
    account: state.account.account
  };
};
export default connect(mapStateToProps)(HomeHeader);
