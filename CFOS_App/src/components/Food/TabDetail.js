import React, { Component } from "react";
import { View, ListItem, Text, Left, Right, Button } from "native-base";
import { Icon } from "react-native-elements";
import { FlatList, Dimensions } from "react-native";
import FormatNumber from "../../common/FormatNumber";

const { height, width } = Dimensions.get("window");

export default class TabDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOptions: [],
      foodOptions: []
    };
  }
  componentWillMount() {
    this.setState({
      foodOptions: this.props.foodOptions,
      activeOptions: this.getActiveOption(this.props.foodOptions)
    });
  }
  getFoodOptions() {
    let foodOptions = this.state.foodOptions;
    return foodOptions.length > 0 ? foodOptions : undefined;
  }
  setFoodOptions(option, oldOption) {
    let foodOptions = this.state.foodOptions;
    if (option.isCount == true) {
      let flag = false;
      let tmp = {};
      foodOptions[0].foodOptionVMS.map(f => {
        if (f.option.foId == option.option.option.foId) {
          flag = true;
          f.quantity = f.quantity + option.option.quantity;
          if (f.quantity <= 0) {
            tmp = f;
          }
        }
      });
      let index = foodOptions[0].foodOptionVMS.indexOf(tmp);
      if (index !== -1) {
        foodOptions[0].foodOptionVMS.splice(index, 1);
      }
      if (flag == false && option.option.quantity > 0) {
        foodOptions[0].foodOptionVMS.push(option.option);
      }
      flag = false;
    }
    if (option.isCount == false && option.isSelectMore == true) {
      let flag = false;
      let tmp = {};
      foodOptions[1].foodOptionVMS.map(f => {
        if (f.option.foId == option.option.option.foId) {
          tmp = f;
          flag = true;
        }
      });
      let index = foodOptions[1].foodOptionVMS.indexOf(tmp);
      if (index !== -1) {
        foodOptions[1].foodOptionVMS.splice(index, 1);
      }
      if (flag == false) {
        foodOptions[1].foodOptionVMS.push(option.option);
      }
      flag = false;
    }
    if (option.isCount == false && option.isSelectMore == false) {
      let tmp = {};
      foodOptions[2].foodOptionVMS.map(f => {
        if (f.option.foId == oldOption.foId) {
          tmp = f;
        }
      });
      let index = foodOptions[2].foodOptionVMS.indexOf(tmp);
      if (index !== -1) {
        foodOptions[2].foodOptionVMS.splice(index, 1);
      }
      foodOptions[2].foodOptionVMS.push(option.option);
    }
    this.setState({
      foodOptions: foodOptions
    });
    return this.getActiveOption(foodOptions);
  }
  getActiveOption(foodOptions) {
    let activeOptions = [];
    foodOptions.map(f => {
      f.foodOptionVMS.map(o => {
        activeOptions.push(o.option.foId);
      });
    });
    return activeOptions;
  }
  getOptionQuantity = () => {
    let activeOptions = { id: [], quantity: [] };
    this.state.foodOptions.map(f => {
      f.foodOptionVMS.map(o => {
        activeOptions.id.push(o.option.foId);
        activeOptions.quantity.push(o.quantity);
      });
    });
    return activeOptions;
  };
  render() {
    const { food } = this.props;
    if (food) {
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: "Regular", fontSize: 15 }}>
            {food.foodDescription}
          </Text>
          {food.promotion > 0 ? (
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Icon name="tags" type="antdesign" color={"green"} />
              <Text style={{ fontFamily: "Semibold", fontSize: 15 }}>
                {"  "}
                {food.promotion}% Promotion
              </Text>
            </View>
          ) : null}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <FormatNumber
              number={(food.price * (100 - food.promotion)) / 100}
              size={20}
              bold={"bold"}
            />
            {/* {food.promotion > 0 ? (
              <Text>
                {"   "}
                <Text
                  note
                  style={{
                    textDecorationLine: "line-through",
                    marginTop: 3
                  }}
                >
                  <FormatNumber number={food.price} size={16} />
                </Text>
              </Text>
            ) : null} */}
          </View>
          {food.foodOptions && food.foodOptions.length > 0 ? (
            <Options
              foodOptions={food.foodOptions}
              setFoodOptions={(option, oldOptionId) =>
                this.setFoodOptions(option, oldOptionId)
              }
              getOptionQuantity={() => this.getOptionQuantity()}
              activeOptions={this.state.activeOptions}
            />
          ) : null}
        </View>
      );
    }
  }
}

class Options extends Component {
  setFoodOptions(option, oldOption) {
    return this.props.setFoodOptions(option, oldOption);
  }
  getOptionQuantity() {
    return this.props.getOptionQuantity();
  }
  render() {
    const { foodOptions } = this.props;
    if (foodOptions && foodOptions.length) {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={foodOptions}
          renderItem={({ item }) => (
            <OptionDetail
              foodOption={item}
              setFoodOptions={(option, oldOptionId) =>
                this.setFoodOptions(option, oldOptionId)
              }
              getOptionQuantity={() => this.getOptionQuantity()}
              activeOptions={this.props.activeOptions}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
  }
}

class OptionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {},
      activeOptions: this.props.activeOptions,
      quantity: 0,
      optionQuantity: this.props.getOptionQuantity()
    };
  }
  componentDidMount() {
    this.getActiveOptions();
  }

  getActiveOptions() {
    let active = {};
    this.props.foodOption.foodOptionVMS.map(o => {
      let index = this.props.activeOptions.indexOf(o.foId);
      if (index !== -1) {
        active = o;
      }
    });
    this.setState({
      active: active
    });
  }
  setFoodOptions(newOption, oldOption, quantity) {
    let foodOption = this.props.foodOption;
    let option = {
      isCount: foodOption.count,
      isSelectMore: foodOption.selectMore,
      option: {
        option: newOption,
        quantity: quantity
      }
    };
    let activeOptions = this.props.setFoodOptions(option, oldOption);
    let optionQuantity = this.props.getOptionQuantity();
    this.setState({
      activeOptions: activeOptions,
      optionQuantity: optionQuantity
    });
  }
  activeButton(newOption) {
    this.setFoodOptions(newOption, this.state.active, 1);
    this.setState({
      active: newOption
    });
  }
  render() {
    const { foodOption } = this.props;
    return (
      <View style={{ marginTop: 40 }}>
        <Text style={{ fontFamily: "Bold", fontSize: 19 }}>
          {foodOption.foodOptionNameParent}
        </Text>
        <View>
          {foodOption.count == true ? (
            <FlatList
              style={{ marginTop: 15 }}
              data={foodOption.foodOptionVMS}
              renderItem={({ item }) => (
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    paddingVertical: 10
                  }}
                >
                  <Left>
                    <View
                      style={{
                        flexDirection: "column"
                      }}
                    >
                      <Text style={{ fontFamily: "Semibold", fontSize: 16 }}>
                        {item.foName}
                      </Text>
                      <Text style={{ fontFamily: "Regular" }}>
                        + <FormatNumber number={item.optionPrice} size={13} />
                      </Text>
                    </View>
                  </Left>
                  <Right>
                    <View
                      style={{
                        flexDirection: "row"
                      }}
                    >
                      <Button
                        transparent
                        onPress={() => this.setFoodOptions(item, {}, -1)}
                      >
                        <View
                          style={{
                            borderWidth: 1,
                            borderRadius: 3,
                            width: width * 0.08,
                            height: width * 0.08,
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Icon name="minus" type="antdesign" size={15} />
                        </View>
                      </Button>
                      <Text
                        style={{
                          paddingVertical: 12,
                          paddingHorizontal: 15,
                          fontSize: 14,
                          fontFamily: "Bold"
                        }}
                      >
                        {this.state.optionQuantity &&
                        this.state.optionQuantity.id &&
                        this.state.optionQuantity.id.indexOf(item.foId) !== -1
                          ? this.state.optionQuantity.quantity[
                              this.state.optionQuantity.id.indexOf(item.foId)
                            ]
                          : 0}
                      </Text>
                      <Button
                        transparent
                        onPress={() => this.setFoodOptions(item, {}, 1)}
                      >
                        <View
                          style={{
                            borderWidth: 1,
                            borderRadius: 3,
                            width: width * 0.08,
                            height: width * 0.08,
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Icon name="plus" type="antdesign" size={15} />
                        </View>
                      </Button>
                    </View>
                  </Right>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={{ alignItems: "center" }}>
              <FlatList
                style={{ marginTop: 15 }}
                data={foodOption.foodOptionVMS}
                renderItem={({ item, index }) => (
                  <View style={{ padding: 5 }}>
                    <Button
                      style={
                        this.state.activeOptions.indexOf(item.foId) !== -1
                          ? {
                              width: width * 0.275,
                              height: width * 0.14,
                              justifyContent: "center",
                              alignItems: "stretch",
                              borderRadius: 5,
                              backgroundColor: "#30394D"
                            }
                          : {
                              width: width * 0.275,
                              height: width * 0.14,
                              justifyContent: "center",
                              alignItems: "stretch",
                              borderRadius: 5,
                              backgroundColor: "#FFFFFF",
                              borderWidth: 1,
                              borderColor: "black"
                            }
                      }
                      onPress={() => this.activeButton(item)}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          flex: 1
                        }}
                      >
                        <Text
                          style={
                            this.state.activeOptions.indexOf(item.foId) !== -1
                              ? {
                                  color: "white",
                                  fontFamily: "Bold",
                                  fontSize: 14,
                                  textAlign: "center"
                                }
                              : {
                                  fontFamily: "Bold",
                                  fontSize: 14,
                                  textAlign: "center"
                                }
                          }
                        >
                          {item.foName}
                        </Text>
                        {item.optionPrice != 0 ? (
                          <Text
                            style={
                              this.state.activeOptions.indexOf(item.foId) !== -1
                                ? {
                                    color: "white",
                                    fontFamily: "Bold",
                                    fontSize: 14
                                  }
                                : { fontFamily: "Regular", fontSize: 14 }
                            }
                          >
                            {item.optionPrice > 0 ? (
                              <Text
                                style={
                                  this.state.activeOptions.indexOf(
                                    item.foId
                                  ) !== -1
                                    ? {
                                        color: "white",
                                        fontFamily: "Bold",
                                        fontSize: 14
                                      }
                                    : { fontFamily: "Regular", fontSize: 14 }
                                }
                              >
                                +
                              </Text>
                            ) : null}
                            <FormatNumber number={item.optionPrice} />
                          </Text>
                        ) : null}

                        {this.state.activeOptions.indexOf(item.foId) !== -1 ? (
                          <View
                            style={{
                              position: "absolute",
                              top: -5,
                              right: 5
                            }}
                          >
                            <Icon
                              name="check"
                              type="antdesign"
                              color={"white"}
                              size={20}
                            />
                          </View>
                        ) : null}
                      </View>
                    </Button>
                  </View>
                )}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}
