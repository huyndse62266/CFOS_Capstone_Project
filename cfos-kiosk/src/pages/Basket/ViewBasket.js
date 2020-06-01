import React, { Component } from "react";
import {Row,Col, Icon} from 'antd';
import ScrollArea from 'react-scrollbar';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import BasketItem  from "../../components/Cart/ViewBasket/BasketItem";
import './ViewBasket.css'
import {ReactComponent as Basketicon } from '../../icons/Basketicon.svg'
import {ReactComponent as PriceCartWhite }  from '../../icons/PriceCartWhite.svg'

class ViewBasket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0,
      show: true
    };
  }

  hideModal = () =>{
    this.props.hideModal();
  }
  IncrementItem = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  };
  DecreaseItem = () => {
    this.setState({ clicks: this.state.clicks - 1 });
  };
  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  };
  componentDidMount(){
    document.getElementsByClassName('ant-modal-close-x')[0].innerHTML = "Thu gọn <img src=\"https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2FZoom%20out%20basket.svg?alt=media&token=6be687c2-6efe-4ffe-b182-1170619fb920\" class=\"zoomout-icon\" />"
}
  render() {
      let addedItems =  this.props.items.length ?
      (
        
          this.props.items.map((food, index) => {
            
            return (
                <Col span={6} className="px-3 py-1" key={index}>
                    <BasketItem key={index} food={food} index={index} cartQuantity={food.cartQuantity}/>
                </Col>)
                
        })
      ):(
          <Row type="flex" justify="space-around" align="middle" style={{height:'800px', width: '100%'}}>
              <Col span={24} className="text-center" >
                <h1>Giỏ hàng hiện tại rỗng</h1>
              </Col>
          </Row>
      )
    return (
      <Row className="view-basket-container">
        <Col span={20} className="scroll-basket-item-wrapper">
          <ScrollArea speed={0.8}
              verticalScrollbarStyle={{display:'none'}}
              className="area"
              contentClassName="content"
              horizontal={false} style={{height: '975px'}}>
            <Row>
              {addedItems}
            </Row>
          </ScrollArea>
        </Col>
        <Col span={4}>
          <div className="overview-basket-wrapper">
            <Row>
              <Col span={6}>   
                <div className="number-dishes-wrapper">
                {this.props.items.length} 
                </div>
                <Icon component={Basketicon} className="basket-icon"/>  
              </Col>
              <Col span={18}>
                <span className="basket-title">Giỏ của bạn <br/><small>({this.props.items.length} món)</small></span>
              </Col>
            </Row>
            <div className="cal-price-wrapper">
              <Row>
                <Col span={12}>Tạm tính:</Col>
                <Col span={12} className="text-right font-weight-bold"><NumberFormat value={this.props.origin} displayType={'text'} thousandSeparator={','} /> đ</Col>
              </Row>
              <Row>
                <Col span={12}>Khuyến mãi:</Col>
                <Col span={12} className="text-right font-weight-bold">-<NumberFormat value={this.props.origin-this.props.pricetotal} displayType={'text'} thousandSeparator={','} /> đ</Col>
              </Row>
            </div>
            <div className="total-price-wrapper">
              <Row>
                <span className="total-price-title">Tổng tiền: </span>
              </Row>
              <Row>
                <span className="total-price-detail"><NumberFormat value={this.props.pricetotal} displayType={'text'} thousandSeparator={','} /> đ</span>
              </Row>
            </div>
            <div className="button-purchase-wrapper">
              {this.props.isInPayment === true ?<button type="button" className="btn button-purchase-view-basket" onClick={this.hideModal}>
                    <Row type="flex" justify="space-around" align="middle">
                      <Col span={8} className="text-right"><Icon component={PriceCartWhite} className="price-cart-view-basket"/></Col>
                      <Col span={16} className="text-left px-2">Thanh toán</Col>
                    </Row>
                  </button> :<Link to="/payment">
                  <button type="button" className="btn button-purchase-view-basket">
                    <Row type="flex" justify="space-around" align="middle">
                      <Col span={8} className="text-right"><Icon component={PriceCartWhite} className="price-cart-view-basket"/></Col>
                      <Col span={16} className="text-left px-2">Thanh toán</Col>
                    </Row>
                  </button>
                </Link>}
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
      items: state.cart.addedItems,
      pricetotal: state.cart.total,
  }
}

export default connect(mapStateToProps)(ViewBasket)