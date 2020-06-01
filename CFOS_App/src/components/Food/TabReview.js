import React, { Component } from "react";
import { View, Thumbnail, Text, Left, Right, Button } from "native-base";
import { Icon } from "react-native-elements";
import { FlatList, Dimensions, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";
import IconF from "react-native-vector-icons/FontAwesome";
import Moment from "moment";
import { FoodService } from "../../service/FoodService";

const { width } = Dimensions.get("window");

export default class TabReview extends Component {
  constructor(props) {
    super(props);
    this.FoodService = new FoodService();
    this.state = {
      count: 0,
      food: {}
    };
  }
  updateFood(foodId) {
    this.FoodService.getFoodById(foodId)
      .then(result => {
        this.setState({ food: result.data });
        this.countFeedBack(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentWillMount() {
    this.setState({ food: this.props.food });
    this.countFeedBack(this.props.food);
  }
  countFeedBack(food) {
    let count = 0;
    food.feedbackVMS.map(r => {
      if (r.fbContent !== null && r.fbContent !== "") {
        count = count + 1;
      }
    });
    this.setState({
      count: count
    });
  }

  getFoodOptions() {
    return undefined;
  }
  render() {
    if (this.state.food !== undefined && this.state.food.foodId !== undefined) {
      let food = this.state.food;
      return (
        <View>
          <View>
            <Text style={{ fontFamily: "Bold", fontSize: 20 }}>
              Aeon Citimart Gò Vấp
            </Text>
            <Text style={{ fontFamily: "Regular", fontSize: 16 }}>
              672 Quang Trung, Quận Gò Vấp, TP. HCM
            </Text>
          </View>
          {food.feedbackVMS && food.feedbackVMS.length > 0 ? (
            <View
              style={{
                flexDirection: "row",
                paddingTop: 25
              }}
            >
              <Text
                style={{ fontFamily: "Bold", fontSize: 40, paddingRight: 15 }}
              >
                {food.rate}
              </Text>
              <View style={{ justifyContent: "center" }}>
                <Rate rating={food.rate} />
                <View
                  style={{
                    flexDirection: "row"
                  }}
                >
                  {food.feedbackVMS && food.feedbackVMS.length > 0 ? (
                    <Text style={{ fontFamily: "Regular", fontSize: 14 }}>
                      trên {food.feedbackVMS.length} đánh giá{"          "}
                    </Text>
                  ) : null}
                  {food.feedbackVMS && food.feedbackVMS.length > 0 ? (
                    <View
                      style={{
                        flexDirection: "row"
                      }}
                    >
                      <IconF name="commenting-o" size={17} color="#F5311A" />
                      <Text style={{ fontFamily: "Regular", fontSize: 14 }}>
                        {" "}
                        {this.state.count} ý kiến
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          ) : null}
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("CustomerReview", {
                food: food,
                onGoBack: foodId => this.updateFood(foodId)
              })
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
                marginTop: 25,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#DCDCDC"
              }}
            >
              <Left
                style={{
                  flex: 3,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name="edit" type="antdesign" color="black" />
              </Left>
              <Right
                style={{
                  flex: 7,
                  alignItems: "flex-start",
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontFamily: "Bold", fontSize: 17 }}>
                  Viết đánh giá
                </Text>
                <Text note style={{ fontFamily: "Regular", fontSize: 14 }}>
                  {" "}
                  Cảm nhận của bạn về món ăn
                </Text>
              </Right>
            </View>
          </TouchableOpacity>
          {food.feedbackVMS && food.feedbackVMS.length > 0 ? (
            <FoodReviews reviews={food.feedbackVMS} />
          ) : (
            <View
              style={{
                paddingBottom: 50,
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <Thumbnail
                style={{
                  width: width * 0.76,
                  height: width * 0.38
                }}
                square
                source={require("../../image/ReviewEmpty.png")}
              />
              <Text
                style={{ fontFamily: "Semibold", fontSize: 21, paddingTop: 20 }}
              >
                Chưa có đánh giá
              </Text>
              <Text
                note
                style={{
                  fontFamily: "Regular",
                  fontSize: 17,
                  paddingTop: 10,
                  paddingHorizontal: width * 0.06,
                  textAlign: "center"
                }}
              >
                Cho chúng tôi biết cảm nhận cũng như ý kiến của bạn về món ăn
              </Text>
            </View>
          )}
        </View>
      );
    }
  }
}

class FoodReviews extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  render() {
    let { reviews } = this.props;
    if (reviews && reviews.length > 0) {
      reviews.sort(
        (a, b) =>
          new Moment(b.fbDate).format("YYYYMMDDHHMM") -
          new Moment(a.fbDate).format("YYYYMMDDHHMM")
      );
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={reviews}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", paddingTop: 30 }}>
              <IconF name="commenting-o" size={30} />
              <View
                style={{
                  paddingLeft: 20,
                  paddingRight: 10
                }}
              >
                <Rate rating={item.rate} />
                <Text
                  note
                  style={{
                    marginTop: 5,
                    fontFamily: "Regular",
                    fontSize: 16,
                    flexDirection: "row"
                  }}
                >
                  {Moment(item.fbDate).format("HH:mm")}
                  {"  "}
                  {Moment(item.fbDate).format("DD")} tháng{" "}
                  {Moment(item.fbDate).format("MM")}
                </Text>
                <Text style={{ marginTop: 5 }}>{item.fbContent}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
  }
}

class Rate extends Component {
  render() {
    return (
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.props.rating}
        fullStarColor={"#FFA200"}
        starSize={15}
        containerStyle={(style = { width: width / 4 })}
      />
    );
  }
}
