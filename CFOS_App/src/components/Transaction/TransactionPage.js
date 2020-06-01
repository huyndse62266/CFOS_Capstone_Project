import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button,
  View
} from 'native-base';

import { Image } from 'react-native';
import { StatusBar } from 'react-native';
import { apiGetTransactions, apiChangeNoti } from './TransactionService';
import { TransactionService } from '../../service/TransactionService';
import Moment from 'moment';
import { connect } from 'react-redux';
import { countNoti } from '../../redux/actions/DataActions';
import doneFood from '../../image/done.png';
import cancelFood from '../../image/fail.png';
import money from '../../image/coin.png';

class TransactionPage extends Component {
  constructor(props) {
    super(props);
    this.TransactionService = new TransactionService();
    this.state = {
      transactions: []
    };
  }

  componentWillMount() {
    this.refreshDataFromServer();
    this.resetNoti();
  }
  resetNoti() {
    apiChangeNoti()
      .then(result => {
        this.props.countNoti(0);
      })
      .catch(error => {
        console.error(`Error is 2: ${error}`);
      });
  }

  refreshDataFromServer = () => {
    apiGetTransactions()
      .then(listTransaction => {
        this.setState({ transactions: listTransaction });
      })
      .catch(error => {
        console.error(`Error is 2: ${error}`);
        this.setState({ transactions: '' });
      });
  };
  convertDate = date => {
    console.log('test', date);
    console.log('date', new Date(date).getDay());
  };
  render() {
    const { transactions } = this.state;
    return (
      <Container>
        <StatusBar hidden />
        <Header style={{ backgroundColor: '#EEEEEE' }}>
          <Body style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold' }}>Hộp Thư </Text>
          </Body>
        </Header>
        <Content>
          <List>
            {transactions.map(item => (
              <ListItem avatar key={item.tranId}>
                <Left>
                  {item.status == 'ORDERD' && (
                    <Image
                      style={{ width: 30, height: 41, marginTop: 10 }}
                      source={doneFood}
                    />
                  )}
                  {item.status == 'ROLLBACK' && (
                    <Image
                      style={{ width: 30, height: 43, marginTop: 10 }}
                      source={cancelFood}
                    />
                  )}
                  {item.status == 'DEPOSIT' && (
                    <Image
                      style={{ width: 35, height: 35, marginTop: 10 }}
                      source={money}
                    />
                  )}
                </Left>
                <Body>
                  {item.status == 'ORDERD' && (
                    <View>
                      <Text>Món ăn đã được đầu bếp nhận được</Text>
                      <Text note>
                        Món ăn số đơn hàng: {item.orderNumber}.
                      </Text>
                      <Text note>
                        {Moment(item.tranDate).format('HH:mm a')}, &nbsp;
                        {Moment(item.tranDate).format('DD-MM-YYYY')}
                      </Text>
                    </View>
                  )}
                  {item.status == 'ROLLBACK' && (
                    <View>
                      <Text>Món ăn bị hủy</Text>
                      <Text note>
                        Món ăn số đơn hàng: {item.orderNumber} đã bị hủy.
                      </Text>
                      <Text note>
                        {Moment(item.tranDate).format('HH:mm a')}, &nbsp;
                        {Moment(item.tranDate).format('DD-MM-YYYY')}
                      </Text>
                    </View>
                  )}
                  {item.status == 'DEPOSIT' && (
                    <View>
                      <Text>Nộp tiền thành công</Text>
                      <Text note>
                        Số tiền được cộng vào tài khoản là: {item.tranTotal}
                      </Text>
                      <Text note>
                        {Moment(item.tranDate).format('HH:mm a')}, &nbsp;
                        {Moment(item.tranDate).format('DD-MM-YYYY')}
                      </Text>
                    </View>
                  )}
                </Body>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    countNoti: count => {
      dispatch(countNoti(count));
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(TransactionPage);
