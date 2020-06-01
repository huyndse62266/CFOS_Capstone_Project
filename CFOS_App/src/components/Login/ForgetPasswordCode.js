import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { Item, Input, Icon,Button,Text, H1 } from 'native-base';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

export default class ForgetPasswordCode extends Component {
    state = {
        code: '',
        password: '',
    };
    pinInput = React.createRef();   
    _checkCode = (code) => {
        if (code != '1234') {
            this.pinInput.current.shake()
            .then(() => this.setState({ code: '' }));
        }
    } 
    render() {
        const { code, password } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}> 
                    <Button transparent style={styles.backButton}>
                        <Icon name='md-arrow-round-back' />
                    </Button>
                    <H1 style={styles.titleStyle}>Quên mật khẩu</H1>
                    <Text>Điền mã xác nhận mà chúng tôi đã gửi vào email của bạn</Text>
                </View>
                <View style={styles.inputPin} > 
                    <SmoothPinCodeInput
                        ref={this.pinInput}
                        value={code}
                        onTextChange={code => this.setState({ code })}
                        onFulfill={this._checkCode}
                        onBackspace={() => console.log('No more back.')}
                    />
                </View>
                <View style={styles.signUpButtonWrapper}>
                    <Button full style={styles.signUpButton}>
                    <Text>Đăng ký</Text>
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
    inputPin:{
        marginTop: '15%',
        alignItems:'center'
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
