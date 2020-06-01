import React, { Component } from "react";
import { View, List, ListItem, Thumbnail, Text, Left, Body } from "native-base";
import { Icon } from "react-native-elements";
import {
  FlatList,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");
export default class Stores extends Component {
  render() {
    const { stores } = this.props;
    if (stores && stores.length) {
      return (
        <View
          style={{
            paddingHorizontal: width * 0.05
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={stores}
            renderItem={({ item }) => (
              <Store store={item} navigation={this.props.navigation} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
  }
}

class Store extends Component {
  render() {
    const { store } = this.props;
    if (store) {
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("StoreDetail", { store: store })
          }
        >
          <View
            style={{
              paddingHorizontal: 15
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 15,
                borderBottomWidth: 1
              }}
            >
              <View
                style={{
                  flex: 2,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Thumbnail
                  style={{
                    width: width * 0.2,
                    height: width * 0.2,
                    borderRadius: 10
                  }}
                  square
                  source={{ uri: store.storeVM.storeImage }}
                />
              </View>
              <View
                style={{ flex: 8, alignItems: "flex-start", marginLeft: 20 }}
              >
                <Text style={{ fontFamily: "Semibold", fontSize: 16 }}>
                  {store.storeVM.storeName}
                </Text>
                <Text
                  note
                  numberOfLines={1}
                  style={{ fontFamily: "Regular", fontSize: 13 }}
                >
                  {store.storeVM.storeDescription}
                </Text>
                <View style={{ alignItems: "flex-start" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Icon color={"green"} name="tags" type="antdesign" />
                    <Text style={{ fontFamily: "Regular", fontSize: 13 }}>
                      {"  "}Khuyến mãi
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    {store.foodCount > 0 ? (
                      <View style={{ flexDirection: "row", marginRight: 40 }}>
                        <IconM name="room-service-outline" size={20} />
                        <Text style={{ fontFamily: "Regular", fontSize: 13 }}>
                          {"  "}
                          {store.foodCount} món ăn
                        </Text>
                      </View>
                    ) : null}
                    {store.drinkCount > 0 ? (
                      <View style={{ flexDirection: "row" }}>
                        <IconM name="glass-cocktail" size={20} />
                        <Text style={{ fontFamily: "Regular", fontSize: 13 }}>
                          {"  "}
                          {store.drinkCount} giải khát
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}
