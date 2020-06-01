import React from "react";
import Carousel from "react-native-banner-carousel";
import { StyleSheet, Image, View, Dimensions } from "react-native";
import { FoodcourtService } from "../../service/FoodcourtService";

const { width } = Dimensions.get("window");
const BannerWidth = width * 0.9;
const BannerHeight = BannerWidth * 0.5;

export default class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.FoodcourtService = new FoodcourtService();
    this.state = {
      images: [
        {
          image:
            "https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2FKiosk%20banner%201.jpg?alt=media&token=8cc1ce48-7f30-4a82-9462-19a416a55d66&fbclid=IwAR3TqUB_-Gn5MmevYMdaRqzLI5AWhkhWQFsr_EyEzMoIfaghKtGzfZsU6nE"
        }
      ]
    };
  }
  componentWillMount() {
    this.FoodcourtService.getBanner(1)
      .then(result => {
        this.setState({
          images:
            result.data !== undefined && result.data.image.length > 0
              ? result.data.image
              : this.state.images
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  renderPage(image, index) {
    return (
      <View key={index}>
        <Image
          style={{ width: BannerWidth, height: BannerHeight }}
          source={{ uri: image }}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        <Carousel
          autoplay
          autoplayTimeout={3000}
          loop
          index={0}
          pageSize={BannerWidth}
        >
          {this.state.images.map((image, index) =>
            this.renderPage(image.image, index)
          )}
        </Carousel>
      </View>
    );
  }
}
