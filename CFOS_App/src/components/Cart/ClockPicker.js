import React, { Component } from "react";
import { Text, View, Button } from "native-base";
import { Dimensions, TouchableOpacity } from "react-native";
import Moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";

const { width, height } = Dimensions.get("window");
export default class ClockPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      timeResult: 0,
      timePicker: "",
      days: []
    };
  }
  componentDidMount() {
    let order = this.props.order;
    if (order !== undefined) {
      this.setState({ timeResult: order.scheduleTime, days: order.days });
    }
  }
  
  getSheduleTime() {
    return this.state.timeResult;
  }
  getDays() {
    return this.state.days;
  }

  hideSchedule() {
    this.setState({ timeResult: 0 });
  }

  showPicker = () => {
    this.setState({ isVisible: true });
  };

  hidePicker = () => {
    this.setState({ isVisible: false });
  };

  handlePicker = time => {
    let timeResult = 0;
    let start = Moment(new Date(1800000)).format("HH:mm");
    let end = Moment(new Date(45000000)).format("HH:mm");
    let timePicker = Moment(time).format("HH:mm");
    if (timePicker < start) {
      alert("Bạn chỉ có thẻ đặt sau 7 giờ 30 phút");
      this.hidePicker();
      return;
    }
    if (timePicker > end) {
      alert("Bạn chỉ có thể đặt trước 19 giờ 30 phút");
      this.hidePicker();
      return;
    }
    if (timePicker >= start && timePicker <= end) {
      if (
        Number.parseInt(
          Moment(time)
            .format("mm")
            .charAt(1),
          10
        ) == 0
      ) {
        timeResult =
          Moment(time).format("HH") +
          ":" +
          Moment(time)
            .format("mm")
            .charAt(0) +
          "0";
      } else {
        let tmp = new Date(time.getTime() + 10 * 1000 * 60);
        timeResult =
          Moment(tmp).format("HH") +
          ":" +
          Moment(tmp)
            .format("mm")
            .charAt(0) +
          "0";
      }
      this.setState({ timeResult: timeResult, timePicker: timePicker });
      this.props.setSheduleTime(timeResult, this.state.days);
    }
    this.hidePicker();
  };

  changeActive(num) {
    let days = this.state.days;
    let index = days.indexOf(num);
    if (index !== -1) {
      days.splice(index, 1);
    } else {
      days.push(num);
    }
    this.setState({ days: days });
  }

  render() {
    return (
      <View style={{ justifyContent: "center" }}>
        {this.state.timeResult !== 0 ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: width * 0.12,
                paddingTop: 15
              }}
            >
              <Button
                transparent
                style={
                  this.state.days.indexOf(1) !== -1
                    ? {
                        width: width * 0.08,
                        height: width * 0.08,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,
                        backgroundColor: "#30394D"
                      }
                    : {
                        width: width * 0.08,
                        height: width * 0.08,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,
                        backgroundColor: "#FFFFFF",
                        borderWidth: 1,
                        borderColor: "black"
                      }
                }
                onPress={() => this.changeActive(1)}
              >
                <View>
                  <Text
                    style={
                      this.state.days.indexOf(1) !== -1
                        ? {
                            color: "white",
                            fontFamily: "Bold",
                            fontSize: 14
                          }
                        : { fontFamily: "Bold", fontSize: 14 }
                    }
                  >
                    2
                  </Text>
                </View>
              </Button>
              <Button
                transparent
                style={
                  this.state.days.indexOf(2) !== -1
                    ? {
                        width: width * 0.08,
                        height: width * 0.08,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,
                        backgroundColor: "#30394D"
                      }
                    : {
                        width: width * 0.08,
                        height: width * 0.08,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,
                        backgroundColor: "#FFFFFF",
                        borderWidth: 1,
                        borderColor: "black"
                      }
                }
                onPress={() => this.changeActive(2)}
              >
                <View>
                  <Text
                    style={
                      this.state.days.indexOf(2) !== -1
                        ? {
                            color: "white",
                            fontFamily: "Bold",
                            fontSize: 14
                          }
                        : { fontFamily: "Bold", fontSize: 14 }
                    }
                  >
                    3
                  </Text>
                </View>
              </Button>
              <Button
                transparent
                style={
                  this.state.days.indexOf(3) !== -1
                    ? {
                        width: width * 0.08,
                        height: width * 0.08,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,
                        backgroundColor: "#30394D"
                      }
                    : {
                        width: width * 0.08,
                        height: width * 0.08,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,
                        backgroundColor: "#FFFFFF",
                        borderWidth: 1,
                        borderColor: "black"
                      }
                }
                onPress={() => this.changeActive(3)}
              >
                <View>
                  <Text
                    style={
                      this.state.days.indexOf(3) !== -1
                        ? {
                            color: "white",
                            fontFamily: "Bold",
                            fontSize: 14
                          }
                        : { fontFamily: "Bold", fontSize: 14 }
                    }
                  >
                    4
                  </Text>
                </View>
              </Button>
              <Button
                transparent
                style={
                  this.state.days.indexOf(4) !== -1
                    ? {
                        width: width * 0.08,
                        height: width * 0.08,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,
                        backgroundColor: "#30394D"
                      }
                    : {
                        width: width * 0.08,
                        height: width * 0.08,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,
                        backgroundColor: "#FFFFFF",
                        borderWidth: 1,
                        borderColor: "black"
                      }
                }
                onPress={() => this.changeActive(4)}
              >
                <View>
                  <Text
                    style={
                      this.state.days.indexOf(4) !== -1
                        ? {
                            color: "white",
                            fontFamily: "Bold",
                            fontSize: 14
                          }
                        : { fontFamily: "Bold", fontSize: 14 }
                    }
                  >
                    5
                  </Text>
                </View>
              </Button>
              <Button
                transparent
                style={
                  this.state.days.indexOf(5) !== -1
                    ? {
                        width: width * 0.08,
                        height: width * 0.08,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,
                        backgroundColor: "#30394D"
                      }
                    : {
                        width: width * 0.08,
                        height: width * 0.08,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,
                        backgroundColor: "#FFFFFF",
                        borderWidth: 1,
                        borderColor: "black"
                      }
                }
                onPress={() => this.changeActive(5)}
              >
                <View>
                  <Text
                    style={
                      this.state.days.indexOf(5) !== -1
                        ? {
                            color: "white",
                            fontFamily: "Bold",
                            fontSize: 14
                          }
                        : { fontFamily: "Bold", fontSize: 14 }
                    }
                  >
                    6
                  </Text>
                </View>
              </Button>
              <Button
                transparent
                style={
                  this.state.days.indexOf(6) !== -1
                    ? {
                        width: width * 0.08,
                        height: width * 0.08,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,
                        backgroundColor: "#30394D"
                      }
                    : {
                        width: width * 0.08,
                        height: width * 0.08,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,
                        backgroundColor: "#FFFFFF",
                        borderWidth: 1,
                        borderColor: "black"
                      }
                }
                onPress={() => this.changeActive(6)}
              >
                <View>
                  <Text
                    style={
                      this.state.days.indexOf(6) !== -1
                        ? {
                            color: "white",
                            fontFamily: "Bold",
                            fontSize: 14
                          }
                        : { fontFamily: "Bold", fontSize: 14 }
                    }
                  >
                    7
                  </Text>
                </View>
              </Button>
              <Button
                transparent
                style={
                  this.state.days.indexOf(0) !== -1
                    ? {
                        width: width * 0.08,
                        height: width * 0.08,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,
                        backgroundColor: "#30394D"
                      }
                    : {
                        width: width * 0.08,
                        height: width * 0.08,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,
                        backgroundColor: "#FFFFFF",
                        borderWidth: 1,
                        borderColor: "black"
                      }
                }
                onPress={() => this.changeActive(0)}
              >
                <View>
                  <Text
                    style={
                      this.state.days.indexOf(0) !== -1
                        ? {
                            color: "white",
                            fontFamily: "Bold",
                            fontSize: 14
                          }
                        : { fontFamily: "Bold", fontSize: 14 }
                    }
                  >
                    C
                  </Text>
                </View>
              </Button>
            </View>
            <Text
              style={{
                fontFamily: "Bold",
                color: "black",
                textAlign: "center",
                padding: 15
              }}
            >
              Ăn lúc: {this.state.timeResult}
            </Text>
          </View>
        ) : null}
        <TouchableOpacity
          onPress={this.showPicker}
          style={{ justifyContent: "center" }}
        >
          {this.state.timeResult !== 0 ? (
            <Text
              style={{
                fontFamily: "Bold",
                color: "black",
                textAlign: "center"
              }}
            >
              Thay đổi
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: "Bold",
                color: "black",
                textAlign: "center"
              }}
            >
              Đặt lịch
            </Text>
          )}
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}
          mode={"time"}
          timePickerModeAndroid={"spinner"}
        />
      </View>
    );
  }
}
