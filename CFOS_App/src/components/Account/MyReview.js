import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Button,
  Thumbnail,
  Title
} from "native-base";
import { FlatList, Dimensions, View, StatusBar } from "react-native";
import StarRating from "react-native-star-rating";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppStyle from "../../theme";
import { apiGetFeedback } from "./AccountApi";
import { Avatar } from "react-native-elements";
const { width } = Dimensions.get("window");
export default class MyReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listFeedback: []
    };
  }
  componentWillMount() {
    apiGetFeedback()
      .then(listFeedback => {
        this.setState({ listFeedback: listFeedback });
      })
      .catch(error => {
        console.error(`Error is 2: ${error}`);
        this.setState({ listFeedback: [] });
      });
  }
  render() {
    //  if (this.state.listFeedback && this.state.listFeedback.length) {
    return (
      <Container>
        <StatusBar hidden />
        <Header
          style={{
            backgroundColor: "transparent"
          }}
        >
          <Left>
            <Button transparent>
              <Icon
                style={{
                  color: "black"
                }}
                name="arrow-back"
                onPress={() => this.props.navigation.goBack()}
              />
            </Button>
          </Left>
          <Body>
            <Title
              style={{
                color: "black"
              }}
            >
              Đánh giá của bạn
            </Title>
          </Body>
        </Header>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.listFeedback}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "white",
                paddingLeft: 10,
                paddingTop: 5,
                paddingBottom: 7,
               // marginTop: 15,
                
                // justifyContent: "center",
                // alignItems: "center"
                borderBottomColor: "#EEF0EF",
                borderBottomWidth: 1
              }}
            >
              <Text note>{item.fbDate.slice(0, 10)}</Text>
              <View
                style={{
                  backgroundColor: "white",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  paddingBottom:10,
                  paddingTop:10,
                  backgroundColor:'white',
                  // padding: 15,
                  // marginTop: 25,
                  borderRadius: 10
                }}
              >
                <Left
                  style={{
                    flex: 2,
                    backgroundColor:'white'
                    // borderRadius:10,
                    // borderColor:'black',
                    //    borderWidth:1
                  }}
                >
                  <Avatar
                  containerStyle={{
                    borderRadius:10,
                    backgroundColor:"white",
                  }}
                 
                
                    size="medium"
                    avatarStyle={{
                    
                    
                      backgroundColor:'white',
                     
                    }}
                    source={{
                      uri:
                      item.storeVM.storeImage
                    }}
                  />
                </Left>
                <Body
                  style={{
                    flex: 8,
                    alignItems: "flex-start",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>
                    {item.foodVM.foodName}
                  </Text>
                  <Text note> {item.storeVM.storeName}</Text>
                </Body>
                {/* <Right
                  style={{
                    flex: 1,
                    alignItems: "flex-end"
                  }}
                >
                  <Icon name="more-horiz" type="MaterialIcons" />
                </Right> */}
              </View>

              <Rate rating={item.rate} style={{ marginTop: 5,
              }} />
              <Text style={{ marginTop: 5 }}>{item.fbContent}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </Container>
    );
  }
}

class Rate extends Component {
  render() {
    return (
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.props.rating}
        fullStarColor={"orange"}
        starSize={20}
        containerStyle={(style = { width: width / 4 })}
      />
    );
  }
}
