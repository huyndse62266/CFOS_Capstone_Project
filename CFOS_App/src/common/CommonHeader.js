import React, { Component } from "react";
import { Header, Text, Left, Right, Body, Button } from "native-base";
import { Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
class CommonHeader extends Component {
  render() {
    const { header } = this.props;
    return (
      <Header style={{ backgroundColor: "#EEEEEE" }}>
        <Left style={{ flex: 2 }}>
          <Button
            transparent
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Icon name="left" type="antdesign" />
          </Button>
        </Left>
        <Body style={{ alignItems: "center", flex: 6 }}>
          <Text style={{ fontWeight: "bold" }}>{header}</Text>
        </Body>
        <Right style={{ flex: 2 }} />
      </Header>
    );
  }
}
export default withNavigation(CommonHeader);
