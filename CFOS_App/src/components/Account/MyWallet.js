import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, 
  Left, Body, Right, Thumbnail, Text,Button,Icon,Title,Image} from 'native-base';
  import AppStyle from '../../theme'
  import {View,StatusBar} from 'react-native';
export default class MyWallet extends Component {
  render() {
    const money = this.props.navigation.getParam("money");

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
            <Title>Ví của tôi </Title>
          </Body>
        </Header>
        <Content>
          <View style={AppStyle.StyleWallet.balance}>
            <Text style={AppStyle.StyleWallet.text}>
             {money} VND
            </Text>
          
         </View >
          <List>
            <ListItem itemDivider/>
        
            <ListItem avatar noBorder> 
              <Left>
               {/* <Thumbnail square source={require("../../image/drawable-xxhdpi/wallet.png")} /> */}
                <Icon type="SimpleLineIcons" name="wallet" />
               
              </Left>
              <Body>
                <Text>Top up your wallet</Text>
                <Text note>Doing what you like will</Text>
              </Body>
              
              <Right>
              <Button transparent>
              <Icon name="arrow-forward" 
                  onPress={() => this.props.navigation.navigate("UpdateInfo",
                  {info : 
                    {screen : "UpdateName",name: account.fullname}})}/>
              </Button>
                
                </Right>
              
            </ListItem>
        
           
            <ListItem itemDivider />
            <ListItem avatar noBorder>
              <Left>
                {/* <Thumbnail square source={require("../../image/drawable-xxhdpi/credit.png")} /> */}
                <Icon type="MaterialCommunityIcons" name="credit-card-plus" />
              </Left>
              <Body>
                <Text>Add payment card</Text>
                <Text note>Doing what you like will</Text>
              </Body>
              
              <Right>
              <Button transparent>
              <Icon name="arrow-forward" 
                  onPress={() => this.props.navigation.navigate("UpdateInfo",
                  {info : 
                    {screen : "UpdateName",name: account.fullname}})}/>
              </Button>
                
                </Right>
              
           
            
            </ListItem>
            <ListItem itemDivider />
            <ListItem avatar noBorder>
              <Left>
              {/*   <Thumbnail square source={require("../../image/drawable-xxhdpi/dollar.png")} /> */}
              <Icon type="FontAwesome" name="money" />
               
              </Left>
              <Body>
                <Text>Top up at cashier</Text>
                <Text note>Doing what you like will</Text>
              </Body>
              
           
              <Right>
              <Button transparent>
              <Icon name="arrow-forward" 
                  onPress={() => this.props.navigation.navigate("UpdateInfo",
                  {info : 
                    {screen : "UpdateName",name: account.fullname}})}/>
              </Button>
                
                </Right>  
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}