import React from "react";
import { StatusBar, ScrollView, Dimensions, FlatList } from "react-native";
import styles from "../../theme/StyleCommon";
import HomeHeader from "./HomeHeader";
import Banner from "./Banner";
import FoodHome from "../Food/FoodHome";
import CategoryHome from "../Category/CategoryHome";
import Store from "../Store/StoreHome";
import SpinnerLoading from "../../common/SpinnerLoading";
import { CategoryService } from "../../service/CategoryService";
import { apiCountNoti } from "../Transaction/TransactionService";
import { apiGetFoodNear } from "../Account/AccountApi";
import { StoreService } from "../../service/StoreService";
import { FoodService } from "../../service/FoodService";
import { Text, View } from "native-base";
import { connect } from "react-redux";
import {
  loadCategories,
  loadStores,
  loadFoodsNear,
  loadPopularFoods,
  loadPromotionFoods,
  countNoti,
  showHome
} from "../../redux/actions/DataActions";
const { width } = Dimensions.get("window");
const BannerHeight = width * 0.5 * 0.85;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.CategoryService = new CategoryService();
    this.StoreService = new StoreService();
    this.FoodService = new FoodService();
  }
  componentDidMount = () => {
    this.CategoryService.getCategoriesByFcId(1)
      .then(result => {
        this.props.showHome(1);
        this.props.loadCategories(result.data !== undefined ? result.data : []);
      })
      .catch(error => {
        this.props.showHome(1);
        console.log(error);
      });

    this.StoreService.getAllStore(1)
      .then(result => {
        this.props.showHome(1);
        this.props.loadStores(result.data !== undefined ? result.data : []);
      })
      .catch(error => {
        this.props.showHome(1);
        console.log(error);
      });

    apiGetFoodNear()
      .then(result => {
        this.props.showHome(1);
        this.props.loadFoodsNear(result !== undefined ? result : []);
      })
      .catch(error => {
        this.props.showHome(1);
        console.log(error);
      });

    this.FoodService.getPopularFoods(1)
      .then(result => {
        this.props.showHome(1);
        this.props.loadPopularFoods(
          result.data !== undefined ? result.data : []
        );
      })
      .catch(error => {
        this.props.showHome(1);
        console.log(error);
      });

    this.FoodService.getPromotionFoods(1)
      .then(result => {
        this.props.showHome(1);
        this.props.loadPromotionFoods(
          result.data !== undefined ? result.data : []
        );
      })
      .catch(error => {
        this.props.showHome(1);
        console.log(error);
      });

    apiCountNoti()
      .then(result => {
        this.props.showHome(1);
        this.props.countNoti(result);
      })
      .catch(error => {
        this.props.showHome(1);
        console.error(`Error is 2: ${error}`);
      });
  };
  render() {
    if (
      this.props.categories.length > 0 &&
      this.props.stores.length > 0 &&
      this.props.show > 0
    ) {
      return (
        <View style={styles.container}>
          <StatusBar hidden />
          <HomeHeader navigation={this.props.navigation} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                alignItems: "center",
                marginTop: 15,
                marginBottom: 15,
                width: width,
                height: BannerHeight
              }}
            >
              <Banner />
            </View>
            <View style={{ marginBottom: 30 }}>
              <CategoryHome
                navigation={this.props.navigation}
                categories={this.props.categories}
              />
              {this.props.foodsNear.length > 0 ? (
                <FoodHome
                  foodKey={0}
                  subCategory={"Ăn lại món quen"}
                  description={"Món ăn bạn đã ăn trước đó"}
                  foods={this.props.foodsNear}
                  navigation={this.props.navigation}
                />
              ) : null}
              {this.props.popularFoods.length > 0 ? (
                <FoodHome
                  foodKey={1}
                  subCategory={"Nổi bật trong tuần"}
                  description={"Được mọi người ưu thích trong 7 ngày qua"}
                  foods={this.props.popularFoods}
                  navigation={this.props.navigation}
                />
              ) : null}
              {this.props.promotionFoods.length > 0 ? (
                <FoodHome
                  foodKey={2}
                  subCategory={"Khuyến mãi"}
                  description={"Những món được ưu đãi gần đây"}
                  foods={this.props.promotionFoods}
                  navigation={this.props.navigation}
                />
              ) : null}
              <Store
                stores={this.props.stores}
                navigation={this.props.navigation}
              />
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return <SpinnerLoading />;
    }
  }
}

const mapStateToProps = state => {
  return {
    show: state.data.show,
    categories: state.data.categories,
    stores: state.data.stores,
    foodsNear: state.data.foodsNear,
    promotionFoods: state.data.promotionFoods,
    popularFoods: state.data.popularFoods
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadCategories: categories => {
      dispatch(loadCategories(categories));
    },
    loadStores: stores => {
      dispatch(loadStores(stores));
    },
    loadPromotionFoods: promotionFoods => {
      dispatch(loadPromotionFoods(promotionFoods));
    },
    loadPopularFoods: popularFoods => {
      dispatch(loadPopularFoods(popularFoods));
    },
    loadFoodsNear: foodsNear => {
      dispatch(loadFoodsNear(foodsNear));
    },
    countNoti: count => {
      dispatch(countNoti(count));
    },
    showHome: show => {
      dispatch(showHome(show));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
