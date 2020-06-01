import React from "react";
import {
  Container,
  Tab,
  Tabs,
  Text,
  View,
  TabHeading,
  Header
} from "native-base";
import Today from "./Today";
import History from "./History";
import WeekSchedule from "./WeekSchedule";
import { StatusBar, Dimensions, StyleSheet } from "react-native";
import Moment from "moment";
import SpinnerLoading from "../../common/SpinnerLoading";

const { height, width } = Dimensions.get("window");
export default class MyOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    };
  }
  tabChanged(tab) {
    this.setState({
      currentTab: tab
    });
  }

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Header
          style={{
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <View
            style={{
              paddingHorizontal: width * 0.04,
              backgroundColor: "white"
            }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 19 }}>
              Lịch sử đơn hàng
            </Text>
          </View>
        </Header>
        <Tabs
          initialPage={0}
          onChangeTab={({ i, ref, from }) => this.tabChanged(i)}
          tabBarBackgroundColor={"white"}
          tabBarUnderlineStyle={{
            backgroundColor: "transparent",
            paddingHorizontal: width * 0.06
          }}
        >
          <Tab
            key={0}
            heading={
              <TabHeading style={{ backgroundColor: "white" }}>
                <View
                  style={[
                    {
                      height: 45,
                      width: width * 0.3,
                      borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row"
                    },
                    this.state.currentTab === 0
                      ? styles.activeTabStyle
                      : styles.tabStyle
                  ]}
                >
                  <Text
                    style={
                      this.state.currentTab === 0
                        ? styles.activeTextStyle
                        : styles.textStyle
                    }
                  >
                    Hôm nay
                  </Text>
                </View>
              </TabHeading>
            }
          >
            <Today navigation={this.props.navigation} />
          </Tab>
          <Tab
            key={1}
            heading={
              <TabHeading style={{ backgroundColor: "white" }}>
                <View
                  style={[
                    {
                      height: 45,
                      width: width * 0.3,
                      borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row"
                    },
                    this.state.currentTab === 1
                      ? styles.activeTabStyle
                      : styles.tabStyle
                  ]}
                >
                  <Text
                    style={
                      this.state.currentTab === 1
                        ? styles.activeTextStyle
                        : styles.textStyle
                    }
                  >
                    Tất cả
                  </Text>
                </View>
              </TabHeading>
            }
          >
            <History navigation={this.props.navigation} />
          </Tab>
          <Tab
            key={2}
            heading={
              <TabHeading style={{ backgroundColor: "white" }}>
                <View
                  style={[
                    {
                      height: 45,
                      width: width * 0.3,
                      borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row"
                    },
                    this.state.currentTab === 2
                      ? styles.activeTabStyle
                      : styles.tabStyle
                  ]}
                >
                  <Text
                    style={
                      this.state.currentTab === 2
                        ? styles.activeTextStyle
                        : styles.textStyle
                    }
                  >
                    Lịch đặt
                  </Text>
                </View>
              </TabHeading>
            }
          >
            <WeekSchedule navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: "#F6F6F6"
  },
  activeTabStyle: {
    backgroundColor: "#F5311A"
  },
  activeTextStyle: {
    color: "white",
    fontFamily: "Semibold",
    fontSize: 17
  },
  textStyle: {
    color: "black",
    fontFamily: "Semibold",
    fontSize: 17
  }
});
