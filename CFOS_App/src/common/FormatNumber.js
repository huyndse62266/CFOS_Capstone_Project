import React, { Component } from "react";
import { Text } from "native-base";
import NumberFormat from "react-number-format";
export default class FormatNumber extends Component {
  render() {
    let { number, size, bold, color } = this.props;
    return (
      <NumberFormat
        value={number}
        displayType={"text"}
        thousandSeparator={true}
        renderText={value => (
          <Text
            style={
              size > 0
                ? {
                    fontWeight: bold,
                    fontSize: size,
                    color: color
                  }
                : {
                    fontWeight: bold,
                    color: color
                  }
            }
          >
            {value}{" "}
            <Text
              style={
                size > 0
                  ? {
                      fontSize: size,
                      textDecorationLine: "underline",
                      color: color
                    }
                  : { textDecorationLine: "underline", color: color }
              }
            >
              đ
            </Text>
          </Text>
        )}
      />
    );
  }
}
