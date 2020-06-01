import { Header, Text, Left, Right, Body, View, Button } from "native-base";
import React from "react";
import { Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
class CategoryHeader extends React.Component {
  render() {
    const { subCategory } = this.props;
    return (
      <Header style={{ backgroundColor: "#FFFFFF" }}>
        <Left style={{ flex: 1, alignItems:'center'}}>
          <Button
            transparent
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Icon name="left" type="antdesign" />
          </Button>
        </Left>
        <Body style={{ flex: 6 }}>
          <Text style={{ fontFamily: "Bold", fontSize: 18 }}> {"  "}
            {subCategory}
          </Text>
        </Body>
        {/* <Right style={{ flex: 2 }}>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate("Search")}
          >
            <Icon name="search" type="material" />
          </Button>
        </Right> */}
      </Header>
    );
  }
}
export default withNavigation(CategoryHeader);
