import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,AsyncStorage
} from "react-native";
import AppStyle from "../../theme";
import { Button } from "native-base";
export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = { timer: 0 };

    setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
    }, 1000);
  }
  componentDidMount(){
    this._retrieveData();
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('TOKEN');
      if (value !== null) {
        this.props.navigation.navigate("Home")
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  render() {
    return (
      // <View style={AppStyle.StyleSplash.container}>
      //    <StatusBar hidden/>
      //   <TouchableOpacity       onPress={() => this.props.navigation.navigate("Onboarding1")}>
      //     <View style={AppStyle.StyleSplash.button}>
      //       <Text style={AppStyle.StyleSplash.text1}>Press <Text style={AppStyle.StyleSplash.text2}>Meal</Text></Text>
      //     </View>
      //   </TouchableOpacity>
      // </View>
      <View>
        <TouchableWithoutFeedback       onPress={() => this.props.navigation.navigate("Onboarding1")}>
        <Image   source={require('../../image/drawable-xxxhdpi/Group4382.png')}
        style={AppStyle.StyleSplash.image}/>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
