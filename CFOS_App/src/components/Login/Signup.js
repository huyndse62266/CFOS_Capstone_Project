import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Alert
} from 'react-native';

import { Item, Input, Icon,Button,Text, H1 } from 'native-base';
import { apiSignUp } from "./Api"; 
const {height} = Dimensions.get('window');
const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
import OfflineNotice from '../Notification/OfflineNotice'

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      fullname: "",
      
    };
  }
  _signUp(){
    apiSignUp({
      username: this.state.username,
      email: this.state.email,
      fullname : this.state.fullname
    }).then(result => {
      if (result !== 200) {
        Alert.alert("Thất bại!")
      }
      if(result === 200){
        this.props.navigation.navigate("Login");
        Alert.alert("Thành công! Mật khẩu đã được gởi qua email của bạn!")
      }
      
    
    });
  }
  _validate(){
    if(this.state.username.length === 0 || this.state.fullname.length=== 0 || this.state.email.length=== 0){
      Alert.alert("Xin đừng bỏ trống thông tin nào.");
    }
   
    if(reg.test(this.state.email) === false){
      Alert.alert("Xin hãy nhập vào một email hợp lệ");
    }
 
  }
    render() {
        return (
          <View style={styles.container}>
            <OfflineNotice/>
            <View style={styles.header}>
              <Button transparent style={styles.backButton}   onPress={() => this.props.navigation.goBack()}>
                <Icon name='md-arrow-round-back' />
              </Button>
              <H1 style={styles.titleStyle}>Đăng kí</H1>
            </View>
            <View>
              <Item style={styles.inputText}>
                <Input placeholder='Tên đăng nhập' style={styles.textField}
                keyboardType="email-address"
                // onSubmitEditing={() => this.refs.txtEmail.focus()}
                onChangeText={username => this.setState({ username })
                }
                 
                value={this.state.username}
                autoCorrect={false}/>
                <Icon active name='md-person' />
              </Item>
              <Item style={styles.inputText}>
                <Input placeholder='Email' style={styles.textField}
                ref={"txtEmail"}
                keyboardType="email-address"
                // onSubmitEditing={() => this.refs.txtFullname.focus()}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                autoCorrect={false}/>
                <Icon active name='md-mail' />
              </Item>

              <Item style={styles.inputText}>
                <Input  placeholder='Họ và tên' 
                style={styles.textField}
                ref={"txtFullname"}
                onChangeText={fullname => this.setState({ fullname })}
                value={this.state.fullname}
                autoCorrect={false}/>
                <Icon active name='md-person' />
              </Item>
            </View>
            <View style={styles.buttonGroupWrapper}>
              <View style={styles.signUpButtonWrapper}>
                <Button full style={styles.signUpButton}
                  onPress={() => {
                    this._validate();
                    this._signUp();
                  }}>
                  <Text>Đăng ký</Text>
                </Button>
              </View>
              {/* <View style={styles.otherButtonWrapper}>
                <Button full style={styles.facebookButton}>
                  <Icon name='logo-facebook' />
                  <Text>Đăng ký với Facebook</Text>
                </Button>
              </View>
              <View style={styles.otherButtonWrapper}>
                <Button light full style={styles.googleButton}>
                  <Icon name='logo-google' />
                  <Text>Đăng ký với Google</Text>
                </Button>
              </View> */}
            </View>
            
              <Text style={styles.notiMess}>Bạn đã có tài khoản ?<Text  onPress={() => this.props.navigation.navigate("Login")} > Đăng nhập</Text></Text>
            
          </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
      paddingLeft: '10%',
      paddingRight: '10%',
    },
    header:{
      paddingTop: '5%'
    },
    buttonGroupWrapper:{
      marginTop: height /40
    },
    backButton:{
      marginTop: '3%'
    },
    titleStyle:{
      marginTop: height/50,
      marginBottom: height/25,
      fontSize: 28,
      fontWeight:'bold',
    },
    inputText:{
      marginTop: '1%',
      marginBottom: '1%',
      flexDirection: 'row'
    },
    textField:{
      height: height/15,
    },
    buttonGroup:{
      paddingLeft: '8%',
      paddingRight: '8%'
    },
    signUpButtonWrapper:{
      paddingTop: height/30,
      paddingBottom: height/30,
    },
    signUpButton:{
      backgroundColor: '#FF5E25',
      borderRadius: 10,
      color: '#FFF',
      height: height/14,
    },
    otherButtonWrapper:{
      paddingTop: '2%',
      paddingBottom: '2%'
    },
    facebookButton:{
      backgroundColor: '#3C5A99',
      borderRadius: 10,
      color: '#FFF',
      height: height/14,

    },
    googleButton:{
      borderRadius: 10,
      height: height/14,
      color: '#000000',
      fontWeight:'bold',
      borderWidth: 1,
      borderColor: '#d3d3d3'
    },
    notiMess:{
      textAlign: 'center',
      paddingTop: height/7
    }
  });