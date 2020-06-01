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
  Thumbnai,
} from "native-base";
import { View, TouchableHighlight, AsyncStorage,StatusBar} from "react-native";
import {} from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";
import AppStyle from "../../theme";
import { apiGetAccount } from "./AccountApi";
import SpinnerLoading from "../../common/SpinnerLoading";
// const account = {
//   "id": 1,
//   "username": "khang",
//   "fullname": "Nguyen manh khang",
//   "address": null,
//   "birthday": null,
//   "phone": null,
//   "email": "khang@gmail.com",
//   "customerId": "CUS_1",
//   "cardId": "\u0001",
//   "point": 12,
//   "active": true,
//   "walletAmount": 122124,
//   "gender":"male",
//   "image":"https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/56644797_2261891834058938_6866828334576173056_n.jpg?_nc_cat=107&_nc_oc=AQkJkel8dr4jRSkMKXK-q2-BHm59_rNKkmxg5i_0SndL6Utak3KLLR_2UGG5XIEHOig&_nc_ht=scontent.fsgn2-1.fna&oh=b4d34380f8f6644c85775212de2845f6&oe=5DACCE5B"
// }
export default class Account2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {},
      tesst: AsyncStorage.getItem("TOKEN")
    };
  }

  // componentDidMount(){
  //   apiGetAccount().then((accountInfo) =>{
  //     this.setState({account:accountInfo});
  // }).catch((error) =>{
  //   this.setState({account:""});
  // });
  // }
  componentWillMount() {
    this.refreshDataFromServer();
  }

  refreshDataFromServer = () => {
    apiGetAccount()
      .then(accountInfo => {
        this.setState({ account: accountInfo });
      })
      .catch(error => {
        console.error(`Error is 2: ${error}`);
        this.setState({ account: "" });
      });
  };
  removeToken() {
    AsyncStorage.removeItem('TOKEN');
  }

  render() {
    if (this.state.account) {
      return (
        <Container>
           <StatusBar hidden />
          <Content >
            <List >
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("MyAccount", {
                    account: this.state.account
                  })
                }
              >
                <ListItem avatar >
                  <Left>
                    {/* <Thumbnail
                  source={{ uri: account.image }}
                /> */}
                  </Left>
                  <Body>
                    <Text>{this.state.account.fullname}</Text>
                    <Text note>ID : {this.state.account.username}</Text>
                  </Body>
                  <Right>
                    <Button transparent>
                      <Icon name="arrow-forward" />
                    </Button>
                  </Right>
                </ListItem>
              </TouchableOpacity>
              <ListItem itemDivider  />
              <TouchableOpacity
               style={{ backgroundColor: "red",
              borderRadius:15 }}
                onPress={() =>
                  this.props.navigation.navigate("MyWallet", {
                    money: this.state.account.walletAmount
                  })
                }
              >
                <ListItem icon   style={{ backgroundColor: "white",
              borderRadius:15 }}
                >
                  <Left>
                      <Icon 
                    active name="wallet" />
                    {/* </Button> */}
                  </Left>
                  <Body>
                    <Text>Số dư ví</Text>
                  </Body>
                  <Right>
                    <Text>{this.state.account.walletAmount} VND</Text>
                  </Right>
                </ListItem>

                <ListItem icon   style={{ backgroundColor: "red",
              borderRadius:15 }}>
                  <Body>
                    <Text>Nạp tiền vào ví</Text>
                  </Body>
                </ListItem>
              </TouchableOpacity>

              <ListItem itemDivider />
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("MyReview", {
                    username: this.state.account.username
                  })
                }
              >
                <ListItem icon>
                  <Left>
                  
                      <Icon active name="star-half" />
                  
                  </Left>
                  <Body>
                    <Text>Đánh giá của bạn</Text>
                  </Body>
                </ListItem>
              </TouchableOpacity>
             
              <TouchableOpacity>
                <ListItem icon>
                  <Left>
                 
                      <Icon active name="cog" />
                  
                  </Left>
                  <Body>
                    <Text>Cài đặt thông báo</Text>
                  </Body>
                </ListItem>
                <ListItem icon>
                  <Left>
                 
                      <Icon active name="planet" />
                   
                  </Left>
                  <Body>
                    <Text>Ngôn ngữ</Text>
                  </Body>
                </ListItem>
                <ListItem icon>
                  <Left>
             
                      <Icon active name="information-circle-outline" />
                 
                  </Left>
                  <Body>
                    <Text>Hỗ trợ</Text>
                  </Body>
                </ListItem>
                <ListItem icon>
                  <Left>
               
                      <Icon active name="book" />
               
                  </Left>
                  <Body>
                    <Text>Chính sách bảo mật</Text>
                  </Body>
                </ListItem>
                <ListItem icon>
                  <Left>
                 
                      <Icon active name="bookmarks" />
                   
                  </Left>
                  <Body>
                    <Text>Điều khoản sử dụng</Text>
                  </Body>
                </ListItem>
              </TouchableOpacity>
              <ListItem itemDivider />
              <TouchableOpacity  onPress={() => {
                console.log(`Logout....`);
                this.removeToken();
                this.props.navigation.navigate("Login")
              }}>
                <ListItem icon>
                  <Body>
                    <Text style={AppStyle.StyleAccount.logout}>Đăng xuất</Text>
                  </Body>
                </ListItem>
              </TouchableOpacity>
            </List>
          </Content>
        </Container>
      );
    } else {
      return <SpinnerLoading/>;
    }
  }
}
