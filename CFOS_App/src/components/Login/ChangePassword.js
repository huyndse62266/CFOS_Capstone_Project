import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { Item, Input, Icon,Button,Text, H1 } from 'native-base';


export default class ChangePassword extends Component {

    render() {
 
        return (
            <View style={styles.container}>
                <View style={styles.header}> 
                    <Button transparent style={styles.backButton}  
                     onPress={() => this.props.navigation.goBack()}>
                        <Icon name='md-arrow-round-back' />
                    </Button>
                    <H1 style={styles.titleStyle}>Đổi mật khẩu</H1>
                    <Text>Vui lòng điền mật khẩu mới</Text>
                </View>
                <View style={styles.inputPin} > 
                    <Item style={styles.inputText}>
                        <Input placeholder='Mật khẩu' style={styles.textField}/>
                        <Icon active name='md-eye-off' />
                    </Item>
                    <Item style={styles.inputText}>
                        <Input placeholder='Xác nhận mật khẩu' style={styles.textField}/>
                        <Icon active name='md-eye-off' />
                    </Item>
                </View>
                <View style={styles.signUpButtonWrapper}>
                    <Button full style={styles.signUpButton}>
                    <Text>Đặt lại mật khẩu</Text>
                    </Button>
                </View>
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
