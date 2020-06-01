import React, { Component } from "react";
import { Text, Left, Right, View, Body } from "native-base";
import { Dimensions, TouchableOpacity } from "react-native";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import FormatNumber from "./FormatNumber";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

class Basket extends Component {
  render() {
    return this.props.count > 0 ? (
      <TouchableOpacity
        style={{
          position: "absolute",
          // marginLeft: 25,
          borderRadius: 10,
          top: height - 70,
          width: width - 25
        }}
        onPress={() => this.props.navigation.navigate("Cart")}
      >
        <LinearGradient
          colors={["#EC101A", "#EC601A"]}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
          style={{
            paddingHorizontal: 25,
            paddingVertical: 13,
            marginLeft: 25,
            borderRadius: 10,
            flexDirection: "row",
            flex: 1
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
                style={{ color: "white", fontFamily: "Bold", fontSize: 16 }}
              >
                {"   "}
                Xem giỏ
              </Text>
            </View>
          </Left>
          <Body>
            <Text
              style={{ color: "white", fontFamily: "Regular", fontSize: 16 }}
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
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    totalOrder: state.cart.totalOrder,
    originalPrice: state.cart.originalPrice,
    count: state.cart.count
  };
};
export default connect(mapStateToProps)(Basket);
