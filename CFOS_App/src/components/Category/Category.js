import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { Text, View, Button } from "native-base";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const cateWidth = width * 0.39;
export default class Category extends Component {
  render() {
    const { category } = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("FoodByCategory", {
            subCategory: category.categoryName,
            categoryId: category.categoryId
          })
        }
      >
        <View style={{ margin: 5 }}>
          <ImageBackground
            source={{ uri: category.image }}
            style={{ width: cateWidth, height: (cateWidth * 2) / 3 }}
            imageStyle={{ borderRadius: 10 }}
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,1)"]}
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                borderRadius: 10,
                paddingTop: (cateWidth + 10) / 3
              }}
            >
              <Text
                style={{
                  fontFamily: "Bold",
                  fontSize: 16,
                  textAlign: "center",
                  color: "white"
                }}
              >
                {category.categoryName}
              </Text>
              <Text
                style={{
                  fontFamily: "Regular",
                  fontSize: 14,
                  textAlign: "center",
                  color: "white"
                }}
              >
                {category.dishsCount} món
              </Text>
            </LinearGradient>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }
}
