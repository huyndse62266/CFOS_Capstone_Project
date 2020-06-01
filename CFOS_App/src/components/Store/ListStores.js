import React, { Component } from "react";
import { View, Text, Button } from "native-base";
import { FlatList, Image, Dimensions, StatusBar } from "react-native";
import Stores from "./Stores";
import CategoryHeader from "../Category/CategoryHeader";
import SpinnerLoading from "../../common/SpinnerLoading";

export default class ListStores extends Component {
  render() {
    const stores = this.props.navigation.getParam("stores");
    if (stores && stores.length > 0) {
      return (
        <View>
          <View>
            <StatusBar hidden />
            <CategoryHeader
              navigation={this.props.navigation}
              subCategory="Stores"
            />
            <Stores stores={stores} navigation={this.props.navigation} />
          </View>
        </View>
      );
    } else {
      return  <SpinnerLoading />;
    }
  }
}
