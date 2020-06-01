import React, { Component } from "react";
import { FlatList, Image, Dimensions, StatusBar } from "react-native";
import Category from "./Category";
import CategoryHeader from "./CategoryHeader";
import { View } from "native-base";
import SpinnerLoading from "../../common/SpinnerLoading";

const { width } = Dimensions.get("window");
const cateWidth = width * 0.25;
export default class ListCategories extends Component {
  render() {
    const categories = this.props.navigation.getParam("categories");
    if (categories && categories.length > 0) {
      return (
        <View>
          <StatusBar hidden />
          <CategoryHeader
            subCategory="Danh mục"
            navigation={this.props.navigation}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 115
            }}
          >
            <Categories
              categories={categories}
              navigation={this.props.navigation}
            />
          </View>
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
    if (categories && categories.length) {
      return (
        <FlatList
          style={{ paddingTop: 5 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "column", margin: cateWidth * 0.07 }}>
              <Category category={item} navigation={this.props.navigation} />
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
  }
}
