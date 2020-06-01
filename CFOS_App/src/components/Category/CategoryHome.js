import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Text, View, Button, Left, Right } from "native-base";
import { Icon } from "react-native-elements";
import Category from "./Category";
import SpinnerLoading from "../../common/SpinnerLoading";

const { width } = Dimensions.get("window");
export default class CategoryHome extends Component {
  render() {
    const { categories } = this.props;
    if (categories && categories.length > 0) {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: width * 0.05
            }}
          >
            <Left>
              <Text style={{ fontSize: 23, fontFamily: "Bold" }}>Danh mục</Text>
            </Left>
            <Right>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("ListCategories", {
                    categories: categories
                  })
                }
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Semibold"
                  }}
                >
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
            Chọn món theo nhu cầu của bạn
          </Text>
          <Categories
            categories={categories}
            navigation={this.props.navigation}
          />
        </View>
      );
    } else {
      return <SpinnerLoading />;
    }
  }
}
class Categories extends Component {
  render() {
    const { categories } = this.props;
    return (
      <View style={{ paddingVertical: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ width: width * 0.05 - 5 }} />
          {categories.map((category, i) => (
            <Category
              key={i}
              category={category}
              navigation={this.props.navigation}
            />
          ))}
          <View style={{ width: width * 0.05 }} />
        </ScrollView>
      </View>
    );
  }
}
