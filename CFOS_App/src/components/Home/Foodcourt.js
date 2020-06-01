import React from "react";
import { Picker, View, Text } from "native-base";
import { Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import IconM from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");

export default class Foodcourt extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     selected: "key1"
  //   };
  // }
  // onValueChange(value) {
  //   this.setState({
  //     selected: value
  //   });
  // }
  render() {
    return (
      // <View style={{ flexDirection: "row" }}>
      //   <View style={{ marginTop: 10 }}>
      //     <Icon name="business" type="material" />
      //   </View>
      //   <Picker
      //     mode="dropdown"
      //     style={{ width: width * 0.6 }}
      //     selectedValue={this.state.selected}
      //     onValueChange={this.onValueChange.bind(this)}
      //   >
      //     <Picker.Item label="AEON Citimart" value="key0" />
      //     <Picker.Item label="Vivo City" value="key1" />
      //     <Picker.Item label="FPT University" value="key2" />
      //     <Picker.Item label="Crescent Mall" value="key3" />
      //     <Picker.Item label="Lotte Mart" value="key4" />
      //   </Picker>
      // </View>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconM name="location-on" size={17} color="#EC301A" />
          <Text style={{ fontFamily: "Regular", fontSize: 15 }}>
            {" "}
            Khu ẩm thực
          </Text>
        </View>
        <Text style={{ fontFamily: "Bold", fontSize: 19 }}>
          Aeon Citimart Gò Vấp
        </Text>
      </View>
    );
  }
}
