import React, {Component} from 'react';
import {
  StyleSheet,
  View,Alert
} from 'react-native';

import { Item, Input, Icon,Button,Text, H1 } from 'native-base';
import { apiForgotPassword } from "./Api"; 
const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
          email: "",
      
        };
      }
      _reset(){
        apiForgotPassword({
         
          email: this.state.email
         
        }).then(result => {
          if (result === 500) {
            Alert.alert("Email này không tồn tại")
          }
          if(result === 200){
            this.props.navigation.navigate("Login");
            Alert.alert("Thành công! Mật khẩu của bạn đã được gởi qua email!")
          }
          
        
        });
      }
      _validate(){
        
        if(reg.test(this.state.email) === false){
          Alert.alert("Xin nhập vào email hợp lệ");
        }
       
        
       
      }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}> 
                    <Button transparent style={styles.backButton} 
                    onPress={() => this.props.navigation.goBack()}>
                        <Icon name='md-arrow-round-back' />
                    </Button>
                    <H1 style={styles.titleStyle}>Quên mật khẩu</H1>
                    <Text>Vui lòng điền vào email hay số điện thoại</Text>
                </View>
                <View style={styles.formWrapper} > 
                    <Item style={styles.inputText}>
                        <Input placeholder='Email hoặc số điện thoại' style={styles.textField}
                          keyboardType="email-address"
                          autoCorrect={false}
                                        onChangeText={email => this.setState({ email })}
                                        />
                        <Icon active name='md-mail' />
                    </Item>
                </View>
                <View style={styles.signUpButtonWrapper}>
                    <Button full style={styles.signUpButton}
                    onPress ={()=>{
                        this._validate();
                         this._reset();
                         }}>
                    <Text>Đặt lại</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
    //   flex: 1,
    //   flexDirection: 'column',
      paddingLeft: '10%',
      paddingRight: '10%',
    },
    header:{
        paddingTop: '5%'
    },
    backButton:{
        marginTop: '3%'
    },
    titleStyle:{
        marginTop: '5%',
        marginBottom: '2%',
        fontSize: 28,
        fontWeight:'bold',
    },
    formWrapper:{
        marginTop: '20%'
    },
    signUpButtonWrapper:{
        paddingTop: '15%',
        paddingBottom: '5%',
    },
    signUpButton:{
        backgroundColor: '#FF5E25',
        borderRadius: 10,
        color: '#FFF',
    },
})
