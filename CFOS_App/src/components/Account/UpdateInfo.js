import React, { Component } from 'react';
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
  Form,
  Item,
  Input,
  Label,
  Title,
  Picker
} from 'native-base';
import { LinearGradient } from "expo-linear-gradient";

import md5 from "md5";
//import {Button} from 'react-native-button'
import { View, TouchableHighlight, TextInput, Alert,StatusBar,Dimensions} from 'react-native';
import AppStyle from '../../theme';
import { MyAccount } from './MyAccount';
import { apiUpdateAccount,apiChangePassword,apiDeactive} from './AccountApi';
const { width } = Dimensions.get("window");
const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


export default class UpdateInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const info = this.props.navigation.getParam('info');

    return info.screen === 'UpdateName' ? (
      <UpdateName navigation={this.props.navigation} />
    ) : info.screen === 'UpdateEmail' ? (
      <UpdateEmail navigation={this.props.navigation} />
    ) : info.screen === 'UpdatePhone' ? (
      <UpdatePhone navigation={this.props.navigation} />
    ) : info.screen === 'UpdateGender' ? (
      <UpdateGender navigation={this.props.navigation} />
    ) : info.screen === 'UnActiveCard' ? (
      <UnActiveCard navigation={this.props.navigation} />
    ): (
      <UpdatePassword navigation={this.props.navigation} />
    ) ;
  }
}
export class UpdateName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: ''
    };
  }
  //   componentDidMount(){
  // const info =  this.props.navigation.getParam("info");
  //     this.setState =({
  //       fullname : info.account.fullname
  //     })
  //   }
  render() {
    const info = this.props.navigation.getParam('info');
    let full = info.account.fullname;
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
            <Title style={{
               color:"black"
            }}>Họ và tên</Title>
          </Body>
        </Header>
        <Form>
          <Item floatingLabel>
            <Label>Họ và tên</Label>
            <Input onChangeText={text => this.setState({ fullname: text })} maxLength={50}/>
          </Item>
        </Form>

        <Button
        style={{
          marginTop: 55,
          marginLeft:20,
          width: width - 50,
          borderRadius: 15,
          backgroundColor: "transparent"
        }}
          rounded
          block
          light
          onPress={() => {
            if (this.state.fullname.length == 0) {
              alert('Hãy nhập vào tên!');
              return;
            }
            apiUpdateAccount({
              fullname: this.state.fullname,
              username: info.account.username
            })
              .then(result => {
                if (result === 'SUCCESSFULL') {
                  this.props.navigation.navigate('MyAccount', {
                    isUpdated: {
                      fullname: this.state.fullname
                    }
                  });
                  // let isUpdate = true;
                  //<MyAccount navigation={this.props.navigation}/>checkUpdate={isUpdate}
                }
                if (result === 'UNSUCCESSFULL') {
                  alert('Đã có lỗi xảy ra!');
                  this.props.navigation.navigate('MyAccount');
                }
              })
              .catch(error => {
                console.log(`error = ${error}`);
              });
          }}
        >
          <LinearGradient
              colors={["#EC101A", "#EC601A"]}
              start={[0.0, 0.5]}
              end={[1.0, 0.5]}
              style={{
                width: width - 50,
                borderRadius: 15,
                height: 45,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontFamily: "Semibold", fontSize: 19 }}>Cập nhật</Text>
            </LinearGradient>
          {/* <Text>Update</Text> */}
        </Button>
      </Container>
    );
  }
}
class UpdateEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }
  _validate(){
   
    if(reg.test(this.state.email) === false){
      Alert.alert("Please input valid email");
    }
 
  }
  render() {
    const info = this.props.navigation.getParam('info');
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
            <Title style={AppStyle.StyleAccount.logout} style={{
               color:"black"
            }}>Email</Title>
          </Body>
        </Header>
        {/* <Form>
          <Item floatingLabel>
            <Label>Your email</Label>
            <Input />
          </Item>
        </Form>
        <Button rounded block light>
          <Text>Update</Text>
        </Button> */}
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={text => this.setState({ email: text })} />
          </Item>
        </Form>
        <Button
        style={{
          marginTop: 55,
          marginLeft:20,
          width: width - 50,
          borderRadius: 15,
          backgroundColor: "transparent"
        }}
          rounded
          block
          light
          onPress={() => {
            this._validate();
            apiUpdateAccount({
              username: info.account.username,
              email: this.state.email
            })
              .then(result => {
                if (result === 'SUCCESSFULL') {
                  this.props.navigation.navigate('MyAccount', {
                    isUpdated: {
                      email: this.state.email
                    }
                  });
                }
                if (result === 'UNSUCCESSFULL') {
                  alert('Đã có lỗi xảy ra!');
                  this.props.navigation.navigate('MyAccount');
                }
              })
              .catch(error => {
                console.log(`error = ${error}`);
              });
          }}
        >
          <LinearGradient
              colors={["#EC101A", "#EC601A"]}
              start={[0.0, 0.5]}
              end={[1.0, 0.5]}
              style={{
                width: width - 50,
                borderRadius: 15,
                height: 45,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontFamily: "Semibold", fontSize: 19 }}>Cập nhật</Text>
            </LinearGradient>
        </Button>
      </Container>
    );
  }
}
class UpdatePhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: ''
    };
  }
  _validatePhone(){
    if(this.state.phone.length > 14){
      Alert.alert("Too long");
    }
    if(this.state.phone.length <3){
      Alert.alert("Too short");
    }
  }
  render() {
    const info = this.props.navigation.getParam('info');
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
            <Title style={AppStyle.StyleAccount.logout} style={{
               color:"black"
            }}>Số điện thoại</Title>
          </Body>
        </Header>
        {/* <Form>
          <Item floatingLabel>
            <Label>Your phone number</Label>
            <Input />
          </Item>
        </Form>
        <Button rounded block light>
          <Text>Update</Text>
        </Button> */}
        <Form>
          <Item stackedLabel>
            <Label>Số điện thoại</Label>
            <Input
            keyboardType="numeric"
              onChangeText={text => this.setState({ phone: text })}
              // value={info.account.phone}
            />
          </Item>
        </Form>
        <Button
        style={{
          marginTop: 55,
          marginLeft:20,
          width: width - 50,
          borderRadius: 15,
          backgroundColor: "transparent"
        }}
          rounded
          block
          light
          onPress={() => {
            this._validatePhone();
            apiUpdateAccount({
           
              phone: this.state.phone
            })
              .then(result => {
                if (result === 'SUCCESSFULL') {
                  this.props.navigation.navigate('MyAccount', {
                    isUpdated: {
                      phone: this.state.phone
                    }
                  });
                }
                if (result === 'UNSUCCESSFULL') {
                  alert('Đã có lỗi xảy ra!');
                  this.props.navigation.navigate('MyAccount');
                }
              })
              .catch(error => {
                console.log(`error = ${error}`);
              });
          }}
        >
           <LinearGradient
              colors={["#EC101A", "#EC601A"]}
              start={[0.0, 0.5]}
              end={[1.0, 0.5]}
              style={{
                width: width - 50,
                borderRadius: 15,
                height: 45,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontFamily: "Semibold", fontSize: 19 }}>Cập nhật</Text>
            </LinearGradient>
        </Button>
      </Container>
    );
  }
}
class UpdateGender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    };
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
  render() {
    const info = this.props.navigation.getParam('info');
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
            <Title style={AppStyle.StyleAccount.logout} style={{
               color:"black"
            }}>Giới tính</Title>
          </Body>
        </Header>
        <Form>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Giới tính"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Picker.Item label="Nam" value="Male" />
              <Picker.Item label="Nữ" value="Female" />
            </Picker>
          </Item>
        </Form>
        <Button
        style={{
          marginTop: 55,
          marginLeft:20,
          width: width - 50,
          borderRadius: 15,
          backgroundColor: "transparent"
        }}
          rounded
          block
          light
          onPress={() => {
            apiUpdateAccount({
              gender: this.state.selected2
            })
              .then(result => {
                if (result === 'SUCCESSFULL') {
                  this.props.navigation.navigate('MyAccount', {
                    isUpdated: {
                      gender: this.state.selected2
                    }
                  });
                }
                if (result === 'UNSUCCESSFULL') {
                  alert('Đã có lỗi xảy ra!');
                  this.props.navigation.navigate('MyAccount');
                }
              })
              .catch(error => {
                console.log(`error = ${error}`);
              });
          }}
        >
          <LinearGradient
              colors={["#EC101A", "#EC601A"]}
              start={[0.0, 0.5]}
              end={[1.0, 0.5]}
              style={{
                width: width - 50,
                borderRadius: 15,
                height: 45,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontFamily: "Semibold", fontSize: 19 }}>Cập nhật</Text>
            </LinearGradient>
        </Button>
        {/* <Button rounded block light>
          <Text>Update</Text>
        </Button> */}
      </Container>
    );
  }
}
class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword:"",
      newPassword2:"",
    };
  }
  _validatePassword(){
    if(this.state.newPassword.length === 0 || this.state.oldPassword.length === 0){
      Alert.alert("Xin điền đủ thông tin")
    }
    if(this.state.newPassword !== this.state.newPassword2){
      Alert.alert("Mật khẩu không trùng nhau")
    }
  }
  render() {
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
            <Title style={AppStyle.StyleAccount.logout} style={{
               color:"black"
            }}>Mật khẩu</Title>
          </Body>
        </Header>
        <Form>
          <Item floatingLabel>
            <Label>Mật khẩu cũ</Label>
            <Input secureTextEntry onChangeText={text => this.setState({ oldPassword: text })}/>
          </Item>
          <Item floatingLabel>
            <Label>Mật khẩu mới</Label>
            <Input secureTextEntry  onChangeText={text => this.setState({ newPassword: text })} />
          </Item>

          <Item floatingLabel>
            <Label>Nhập lại mật khẩu</Label>
            <Input secureTextEntry  onChangeText={text => this.setState({ newPassword2: text })} />
          </Item>
        </Form>
        <Button rounded block light
        style={{
          marginTop: 75,
          marginLeft:20,
          width: width - 50,
          borderRadius: 15,
          backgroundColor: "transparent"
        }}
        onPress={() => {
          this._validatePassword();
          apiChangePassword({
            oldPassword:md5(this.state.oldPassword) ,
            newPassword: md5(this.state.newPassword)
          })
            .then(result => {
              if (result === 'success') {
                this.props.navigation.navigate('MyAccount');
                alert("Đổi mật khẩu thành công!")
              }else{
                alert(result);
              }
              // if (result === 'UNSUCCESSFULL') {
              //   alert('Your update has an error...');
              //   console.log(`UNSUCCESSFULL`);
              //   this.props.navigation.navigate('MyAccount');
              // }
            })
            .catch(error => {
              console.log(`error = ${error}`);
            });
        }}>
         <LinearGradient
              colors={["#EC101A", "#EC601A"]}
              start={[0.0, 0.5]}
              end={[1.0, 0.5]}
              style={{
                width: width - 50,
                borderRadius: 15,
                height: 45,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontFamily: "Semibold", fontSize: 19 }}>Cập nhật</Text>
            </LinearGradient>
        </Button>
      </Container>
    );
  }

  
}

class UnActiveCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: ""
     
    };
  }
  _validatePassword(){
    if( this.state.oldPassword.length === 0){
      Alert.alert("Please input your password")
    }
    
  }
  render() {
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
            <Title style={AppStyle.StyleAccount.logout} style={{
               color:"black"
            }}>Khóa thẻ</Title>
          </Body>
        </Header>
        <Form>
          <Item floatingLabel>
            <Label>Nhập lại mật khẩu</Label>
            <Input secureTextEntry onChangeText={text => this.setState({ oldPassword: text })}/>
          </Item>
        </Form>
        <Button rounded block light
        style={{
          marginTop: 75,
          marginLeft:20,
          width: width - 50,
          borderRadius: 15,
          backgroundColor: "transparent"
        }}
        onPress={() => {
          this._validatePassword();
          apiDeactive({
            oldPassword:md5(this.state.oldPassword)
        
          })
            .then(result => {
              if (result === 'success') {
                this.props.navigation.navigate('MyAccount');
                alert("Cập nhật thành công !")
              }else{
                alert(result);
              }
              // if (result === 'UNSUCCESSFULL') {
              //   alert('Your update has an error...');
              //   console.log(`UNSUCCESSFULL`);
              //   this.props.navigation.navigate('MyAccount');
              // }
            })
            .catch(error => {
              console.log(`error = ${error}`);
            });
        }}>
         <LinearGradient
              colors={["#EC101A", "#EC601A"]}
              start={[0.0, 0.5]}
              end={[1.0, 0.5]}
              style={{
                width: width - 50,
                borderRadius: 15,
                height: 45,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontFamily: "Semibold", fontSize: 19 }}>Khóa thẻ</Text>
            </LinearGradient>
        </Button>
      </Container>
    );
  }

  
}

