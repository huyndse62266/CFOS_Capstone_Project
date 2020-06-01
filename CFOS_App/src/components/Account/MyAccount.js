import React, { Component } from "react";
import {
  Text,
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  List,
  ListItem
} from "native-base";
import { TouchableOpacity,StatusBar} from "react-native";
import AppStyle from "../../theme";
import Account from "./Account2";
import { apiGetAccount } from "./AccountApi";
import SpinnerLoading from "../../common/SpinnerLoading";
export default class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      isChanged: true
    };
    // const isUpdated = this.props.navigation.getParam("isUpdated");
    // this.setState({
    // let isUpdated = this.props.navigation.getParam("isUpdated");
    // })
  }
  refreshDataFromServer() {
    apiGetAccount()
      .then(accountInfo => {
        this.setState({ account: accountInfo });
      })
      .catch(error => {
        console.error(`Error is 2: ${error}`);
        this.setState({ account: "" });
      });
  }
  // shouldComponentUpdate() {
  //  console.log(`shouldComponentUpdate`);
  //   if (this.state.isUpdated) {
  //     return true;
  //   }

  //   if (this.state.isChanged) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // }
  // componentWillUpdate() {
  //   console.log(`xxxxxx1`);
  //   this.refreshDataFromServer();

  // }
  // componentDidUpdate(){
  //   this.setState({
  //     isChanged: false,

  //   });
  // }

  componentWillMount() {
    apiGetAccount()
      .then(accountInfo => {
        this.setState({ account: accountInfo });
      })
      .catch(error => {
        console.error(`Error is 2: ${error}`);
        this.setState({ account: "" });
      });
  }
  // doRefresh(){
  //   this.setState({
  //     isChanged : false
  //   })
  // }

  render() {
    let isUpdated = this.props.navigation.getParam("isUpdated");

   // if (this.state.account) {
    return (

      <Container>
         <StatusBar hidden />
         <Header style={{
         
         backgroundColor:"transparent"
         }} >
           <Left>
             <Button transparent>
               <Icon
               style={{
                 color:"black"
              }}
                 name="arrow-back"
                 onPress={() => this.props.navigation.goBack()}
               />
             </Button>
           </Left>
          <Body>
            <Title style={AppStyle.StyleAccount.logout}
            style={{
         
              color:"black"
              }}>Thông tin tài khoản </Title>
          </Body>
        </Header>
        <List>
          <ListItem noIndent style={{ backgroundColor: "white" }}>
            <Body>
              <Text note>Tên đăng nhập</Text>
              <Text>{this.state.account.username}</Text>
            </Body>
          </ListItem>

          <TouchableOpacity>
            <ListItem noIndent style={{ backgroundColor: "white" }}>
              <Body>
                <Text note>Họ Tên</Text>

                {isUpdated === undefined ? (
                  this.state.account.fullname === null ? (
                    <Text>(Chưa cập nhật)</Text>
                  ) : (
                    <Text>{this.state.account.fullname}</Text>
                  )
                ) : (
                  isUpdated.fullname != null ? ( <Text>{isUpdated.fullname}</Text>) :
                  ( <Text>{this.state.account.fullname}</Text>)
                 
                )}
              </Body>
              <Right>
                <Right>
                  <Icon
                    name="arrow-forward"
                    onPress={() => {
                      this.props.navigation.navigate("UpdateInfo", {
                        info: {
                          screen: "UpdateName",
                          account: this.state.account
                        }
                      });
                    }}
                  />
                </Right>
              </Right>
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity>
            <ListItem noIndent style={{ backgroundColor: "white" }}>
              <Body>
                <Text note>Email</Text>
                {/* {this.state.account.email === null ? (
                  <Text>(Not Update)</Text>
                ) : (
                  <Text>{this.state.account.email}</Text>
                )} */}
                 {isUpdated === undefined ? (
                  this.state.account.email === null ? (
                    <Text>(Chưa cập nhật)</Text>
                  ) : (
                    <Text>{this.state.account.email}</Text>
                  )
                ) : (
                  isUpdated.email != null ? ( <Text>{isUpdated.email}</Text>) :
                  ( <Text>{this.state.account.email}</Text>)
                 
                )}
              </Body>
              <Right>
                <Right>
                  <Icon
                    name="arrow-forward"
                    onPress={() =>
                      this.props.navigation.navigate("UpdateInfo", {
                        info: {
                          screen: "UpdateEmail",
                          account: this.state.account
                        }
                      })
                    }
                  />
                </Right>
              </Right>
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity>
            <ListItem noIndent style={{ backgroundColor: "white" }}>
              <Body>
                <Text note>Số điện thoại</Text>
                {/* {this.state.account.phone === null ? (
                  <Text>(Not Update)</Text>
                ) : (
                  <Text>{this.state.account.phone}</Text>
                )} */}
                {isUpdated === undefined ? (
                  this.state.account.phone === null ? (
                    <Text>(Chưa cập nhật)</Text>
                  ) : (
                    <Text>{this.state.account.phone}</Text>
                  )
                ) : (
                  isUpdated.phone != null ? ( <Text>{isUpdated.phone}</Text>) :
                  ( <Text>{this.state.account.phone}</Text>)
                 
                )}
              </Body>
              <Right>
                <Right>
                  <Icon
                    name="arrow-forward"
                    onPress={() =>
                      this.props.navigation.navigate("UpdateInfo", {
                        info: {
                          screen: "UpdatePhone",
                          account: this.state.account
                        }
                      })
                    }
                  />
                </Right>
              </Right>
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity>
            <ListItem noIndent style={{ backgroundColor: "white" }}>
              <Body>
                <Text note>Giới tính</Text>
                {/* {this.state.account.gender === null ? (
                  <Text>Male</Text>
                ) : (
                  <Text>{this.state.account.gender}</Text>
                )} */}
                  {isUpdated === undefined ? (
                  this.state.account.gender === null ? (
                    <Text>(Chưa cập nhật)</Text>
                  ) : (
                    <Text>{this.state.account.gender}</Text>
                  )
                ) : (
                  isUpdated.gender != null ? ( <Text>{isUpdated.gender}</Text>) :
                  ( <Text>{this.state.account.gender}</Text>)
                 
                )}
              </Body>
              <Right>
                <Right>
                  <Icon
                    name="arrow-forward"
                    onPress={() =>
                      this.props.navigation.navigate("UpdateInfo", {
                        info: {
                          screen: "UpdateGender",
                          account: this.state.account
                        }
                      })
                    }
                  />
                </Right>
              </Right>
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity>
            <ListItem noIndent style={{ backgroundColor: "white" }}>
              <Body>
                <Text note>Mật khẩu</Text>
                <Text>********</Text>
              </Body>
              <Right>
                <Right>
                  <Icon
                    name="arrow-forward"
                    onPress={() =>
                      this.props.navigation.navigate("UpdateInfo", {
                        info: { screen: "UpdatePassword" }
                      })
                    }
                  />
                </Right>
              </Right>
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity>
            <ListItem noIndent style={{ backgroundColor: "white" }}>
              <Body>
                <Text>Bạn bị mất thẻ ?</Text>
              </Body>
              <Right>
                <Right>
                  <Icon
                    name="arrow-forward"
                    onPress={() =>
                      this.props.navigation.navigate("UpdateInfo", {
                        info: { screen: "UnActiveCard" }
                      })
                    }
                  />
                </Right>
              </Right>
            </ListItem>
          </TouchableOpacity>
        </List>
      </Container>
    );
                  // }else{
                  //   return <SpinnerLoading/>;
                  // }
  }
}
