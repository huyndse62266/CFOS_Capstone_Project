import React, { Component } from "react";
import { Icon } from "react-native-elements";
import { Text, View } from "native-base";
import { connect } from "react-redux";

class BadgeCart extends Component {
  render() {
    return (
      <View>
        <Icon name="shoppingcart" type="antdesign" color={this.props.color} />
        {this.props.count > 0 ? (
          <Text
            style={{
              color: "white",
              position: "absolute",
              top: 1,
              right: -3,
              margin: -1,
              minWidth: 15,
              height: 15,
              borderRadius: 7,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#2657BE",
              textAlign: "center",
              fontSize: 9,
              fontFamily: "Semibold"
            }}
          >
            {this.props.count}
          </Text>
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    count: state.cart.count
  };
};
export default connect(mapStateToProps)(BadgeCart);
