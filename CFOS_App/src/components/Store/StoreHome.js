import React, { Component } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { Text, View, Button, Left, Right } from "native-base";
import { Icon } from "react-native-elements";
import Stores from "./Stores";

const { width } = Dimensions.get("window");
export default class StoreHome extends Component {
  render() {
    const { stores } = this.props;
    if (stores && stores.length > 0) {
      return (
        <View style={{ paddingBottom: 100 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: width * 0.05
            }}
          >
            <Left style={{ flex: 2 }}>
              <Text style={{ fontSize: 23, fontFamily: "Bold" }}>Cửa hàng</Text>
            </Left>
            <Right style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("ListStores", {
                    stores: stores
                  })
                }
              >
                <Text style={{ fontSize: 14, fontFamily: "Semibold" }}>
                  Xem tất cả{"  "}>
                </Text>
              </TouchableOpacity>
            </Right>
          </View>
          <Stores stores={stores} navigation={this.props.navigation} />
        </View>
      );
    }
  }
}
