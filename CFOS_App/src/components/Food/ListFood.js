import React, { Component } from "react";
import { StyleSheet, ScrollView, FlatList } from "react-native";
import { Text, View, Button } from "native-base";
import Food from "./Food";
import SpinnerLoading from "../../common/SpinnerLoading";

export default class ListFood extends Component {
  render() {
    let { foods } = this.props;
    if (foods && foods.length !== undefined) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Foods foods={foods} navigation={this.props.navigation} />
        </View>
      );
    } else {
      return <SpinnerLoading />;
    }
  }
}

class Foods extends Component {
  render() {
    let { foods } = this.props;
    if (foods && foods.length !== undefined) {
      return (
        <FlatList
          style={{
            paddingTop: 15
          }}
          showsVerticalScrollIndicator={false}
          data={foods}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: "column",
                marginLeft: 5,
                paddingBottom: 10
              }}
            >
              <Food
                key={index}
                food={item}
                navigation={this.props.navigation}
              />
            </View>
          )}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    } else {
      return <SpinnerLoading />;
    }
  }
}
