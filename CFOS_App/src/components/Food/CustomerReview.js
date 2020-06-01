import React, { Component } from "react";
import {
  Header,
  Text,
  Left,
  Right,
  Body,
  View,
  Button,
  Item,
  Input
} from "native-base";
import { Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import StarRating from "react-native-star-rating";
import { Dimensions, TextInput } from "react-native";
import CategoryHeader from "../Category/CategoryHeader";
import { FeedbackService } from "../../service/FeedbackService";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
class CustomerReview extends Component {
  constructor(props) {
    super(props);
    this.FeedbackService = new FeedbackService();
    this.state = {
      starCount: 5,
      txtRate: ""
    };
  }

  submit(foodId) {
    let feedback = {
      fbContent: this.state.txtRate,
      foodId: foodId,
      rate: this.state.starCount
    };
    this.FeedbackService.submitFeedback(feedback)
      .then(result => {
        this.props.navigation.state.params.onGoBack(foodId);
        this.props.navigation.goBack();
      })
      .catch(error => {
        alert("Bạn chỉ được đánh giá một lần trong ngày những món ăn bạn đã từng dùng!");
        this.props.navigation.goBack();
        console.log(error);
      });
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    let food = this.props.navigation.getParam("food");
    return (
      <View>
        <CategoryHeader
          subCategory={food.foodName}
          navigation={this.props.navigation}
        />
        <View style={{ padding: 25, alignItems: "center" }}>
          <Text style={{ fontFamily: "Semibold", fontSize: 19 }}>
            Đánh giá món ăn
          </Text>
          <View style={{ marginTop: 30 }}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={this.state.starCount}
              selectedStar={rating => this.onStarRatingPress(rating)}
              fullStarColor={"#FFA200"}
              starSize={30}
              containerStyle={(style = { width: width / 2 })}
            />
          </View>
          <Item>
            <Input
              style={{ fontFamily: "Semibold", fontSize: 19, marginTop: 30 }}
              placeholder="Cho chúng tôi biết cảm nhận của bạn."
              onChangeText={text => this.setState({ txtRate: text })}
              value={this.state.txtRate}
              editable={true}
              multiline={true}
            />
          </Item>
          <Button
            style={{
              marginTop: 35,
              width: width - 50,
              borderRadius: 15,
              backgroundColor: "transparent"
            }}
            onPress={() => {
              this.submit(food.foodId);
            }}
          >
            <LinearGradient
              colors={["#EC101A", "#EC601A"]}
              start={[0.0, 0.5]}
              end={[1.0, 0.5]}
              style={{
                width: width - 50,
                borderRadius: 15,
                height: 45,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontFamily: "Semibold", fontSize: 19 }}>Đăng</Text>
            </LinearGradient>
          </Button>
        </View>
      </View>
    );
  }
}

export default withNavigation(CustomerReview);
