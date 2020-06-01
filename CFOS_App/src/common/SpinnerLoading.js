import React, { Component } from "react";
import { Container, View, Content, Spinner } from "native-base";
export default class SpinnerLoading extends Component {
  render() {
    return (
      // <Container>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Spinner color="orange" />
        </View>
      // </Container>
    );
  }
}
