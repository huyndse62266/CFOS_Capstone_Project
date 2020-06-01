import { Header, Text, Left, Right, Body, View, Button } from "native-base";
import React from "react";
import ListFood from "./ListFood";
import { StatusBar, Dimensions } from "react-native";
import Basket from "../../common/Basket";
import { Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import CategoryHeader from "../Category/CategoryHeader";
import SpinnerLoading from "../../common/SpinnerLoading";
import { connect } from "react-redux";
import { FoodService } from "../../service/FoodService";

class FoodByCategory extends React.Component {
  constructor(props) {
    super(props);
    this.FoodService = new FoodService();
    this.state = {
      foods: []
    };
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    let foodKey = this.props.navigation.getParam("foodKey");
    if (foodKey !== undefined) {
      switch (foodKey) {
        case 0:
          this.FoodService.getFoodNear()
            .then(result => {
              this.setState({ foods: result.data });
            })
            .catch(error => {
              console.log(error);
            });
          break;
        case 1:
          this.FoodService.getPopularFoods(1)
            .then(result => {
              this.setState({ foods: result.data });
            })
            .catch(error => {
              console.log(error);
            });
          break;
        case 2:
          this.FoodService.getPromotionFoods(1)
            .then(result => {
              this.setState({ foods: result.data });
            })
            .catch(error => {
              console.log(error);
            });
          break;
      }
    }

    let categoryId = this.props.navigation.getParam("categoryId");
    if (categoryId !== undefined) {
      this.FoodService.getFoodsByCateId(categoryId)
        .then(result => {
          this.setState({ foods: result.data });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const subCategory = this.props.navigation.getParam("subCategory");
    if (
      this.state.foods !== undefined &&
      this.state.foods.length !== undefined
    ) {
      return (
        <View>
          <StatusBar hidden />
          <CategoryHeader
            subCategory={subCategory}
            navigation={this.props.navigation}
          />
          <View
            style={{
              paddingBottom: 120
            }}
          >
            <ListFood
              foods={this.state.foods}
              navigation={this.props.navigation}
            />
          </View>
          {this.props.count > 0 ? (
            <Basket navigation={this.props.navigation} />
          ) : null}
        </View>
      );
    } else {
      return <SpinnerLoading />;
    }
  }
}

const mapStateToProps = state => {
  return {
    count: state.cart.count,
    foodsNear: state.data.foodsNear,
    promotionFoods: state.data.promotionFoods,
    popularFoods: state.data.popularFoods
  };
};
export default withNavigation(connect(mapStateToProps)(FoodByCategory));
