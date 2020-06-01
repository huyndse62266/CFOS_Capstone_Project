import React, { Component } from "react";
import { Dimensions, ScrollView, Image, TouchableOpacity } from "react-native";
import { Text, View, Button, Left, Right } from "native-base";
import { Icon } from "react-native-elements";
import Food from "./Food";

const { width } = Dimensions.get("window");
class FoodHome extends Component {
  render() {
    let { subCategory, foods, description } = this.props;
    if (foods && foods.length > 0) {
      return (
        <View style={{ paddingBottom: 10 }}>
          <SubCategory
            subCategory={subCategory}
            foods={foods}
            navigation={this.props.navigation}
            description={description}
            foodKey={this.props.foodKey}
          />
          <Foods
            foods={foods}
            navigation={this.props.navigation}
          />
        </View>
      );
    }
  }
}

class SubCategory extends Component {
  render() {
    let { subCategory, foods, description } = this.props;
    if (foods && foods.length > 0) {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: width * 0.05
            }}
          >
            <Left style={{ flex: 2 }}>
              <Text style={{ fontSize: 23, fontFamily: "Bold" }}>
                {subCategory}
              </Text>
            </Left>
            <Right style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("FoodByCategory", {
                    subCategory: subCategory,
                    foodKey: this.props.foodKey
                  })
                }
              >
                <Text style={{ fontSize: 14, fontFamily: "Semibold" }}>
                  Xem tất cả{"  "}>
                </Text>
              </TouchableOpacity>
            </Right>
          </View>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Regular",
              paddingHorizontal: width * 0.05
            }}
          >
            {description}
          </Text>
        </View>
      );
    }
  }
}

class Foods extends Component {
  render() {
    let { foods } = this.props;
    if (foods && foods.length) {
      return (
        <View style={{ paddingTop: 10 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ width: width * 0.05 - 5 }} />
            {foods.map((food, i) => (
              <Food key={i} food={food} navigation={this.props.navigation} />
            ))}
            <View style={{ width: width * 0.05 }} />
          </ScrollView>
        </View>
      );
    }
  }
}

export default FoodHome;
