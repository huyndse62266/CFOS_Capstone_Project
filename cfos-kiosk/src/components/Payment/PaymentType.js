import React, { Component } from 'react'
import {Row,Col,message,Icon } from 'antd'
import { connect } from 'react-redux'
import { Link,Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faMoneyBillAlt, faAddressCard } from '@fortawesome/free-regular-svg-icons'
import NumberFormat from 'react-number-format'; 
import { addOrder} from '../../action/orders'
import visaLogo from '../../images/visa-logo.png';
import mastercardLogo from '../../images/mastercard_logo.0.png';
import napasLogo from '../../images/napas-logo.png';
import {ReactComponent as OnCashIcon } from '../../icons/On cash icon.svg'
import {ReactComponent as MembershipIcon } from '../../icons/Member icon.svg'
import {ReactComponent as Globalcardicon } from '../../icons/Global card icon.svg'
import {ReactComponent as PriceCart } from '../../icons/PriceCart.svg'
import aeonlogo from '../../images/aeon-logo.png';
import apiCaller from '../../utils/ApiCaller'
import './Payment.css'

class PaymentType extends Component {
    constructor(props){
        super(props);
        this.state ={
            orderID: 0,
            isDone: false,
        }
    }
    
    checkoutClick = (cart,total,orginPrice ) =>{
        if(cart.length > 0){
            var orderDetail = cart.map((cartItem) =>{
            
                return{
                    foodId: cartItem.foodId,
                    orderDetailFoodOption: cartItem.optionList,
                    quantity: cartItem.cartQuantity,
                    storeID: cartItem.storeId,
                    totalPrice: cartItem.totalPrice,
                }
            })
            var order ={
                "customerId": null,
                "orderDetails": orderDetail,
                "originalPrice": orginPrice,
                "totalOrder": total
            }
            apiCaller(`orders/orders/submit-order`,'POST',JSON.stringify(order)).then(res =>{
                this.setState({
                    orderID: res.data,
                    isDone: true
                },()=>{
                    this.props.addOrder(res.data)
                });           
            }).catch(error => {
                if(error.response.status === 400){
                    message.error(error.response.data.message)
                }              
            })
        }

    }
 
    render() {
        var {items,pricetotal,orginPrice } = this.props;
        const {isDone} = this.state;
        if(isDone) {
            return <Redirect to={{pathname: "/print"}}/>
        }
        return (
            <div>
                <Row className="choose-payment-title">
                    <Col span={24}>
                        <div className="opensan-32-bold text-center mb-0">Vui lòng chọn phương thức thanh toán</div>
                        <div className="payment-title-sub text-center mb-0">Chọn hình thức thanh toán mong muốn của bạn</div>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle" className="total-price-choose-payment-wrapper">
                    <Col span={3} className="text-right" >
                        <Icon component={PriceCart} className="price-cart-icon"/>
                    </Col>
                    <Col span={7}>
                        <span className="total-price-choose-payment-title">Tổng tiền: </span>
                    </Col>
                    <Col span={14} className="opensan-32-extrabold text-right px-4">
                        <NumberFormat value={this.props.pricetotal} displayType={'text'} thousandSeparator={','} />  <u>đ</u>
                    </Col>
                </Row>
                {/* <Row className="payment-type-wrapper" type="flex" justify="space-around" align="middle">
                    <Col span={6} className="icon-type text-left">
                        <Icon component={Globalcardicon}/>
                    </Col>
                    <Col span={18}>
                        <Row className="opensan-24-bold">
                            Thẻ tín dụng/thanh toán quốc tế
                        </Row>
                        <Row type="flex" justify="start" className="type-group-wrapper">
                            <img src={visaLogo} className="payment-card-img"/>
                            <img src={mastercardLogo} className="payment-card-img"/>
                            <img src={napasLogo} className="payment-card-img"/>
                        </Row>
                    </Col>
                </Row> */}
                <Link to="/payment/membership">
                    <button type="button" className=" btn membership-btn">
                        <Row className="" type="flex" justify="space-around" align="middle">
                            <Col span={6} className="icon-type text-left">
                                <Icon component={MembershipIcon}/>
                            </Col>
                            <Col span={7} className="opensan-24-bold text-left">
                                Thẻ thành viên
                            </Col>
                            <Col span={11} className="text-left">
                                <img src={aeonlogo} className="payment-membership-card-img"/>
                            </Col>
                        </Row>
                    </button>
                </Link>
                <button type="button" className="btn on-cash-btn" onClick={()=>{this.checkoutClick(items,pricetotal,orginPrice)}}>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={6} className="money-type">
                            <Icon component={OnCashIcon}/>
                        </Col>
                        <Col span={18} >
                            <Row className="on-cash-title text-left">
                                Thanh toán bằng tiền mặt
                            </Row>
                            <Row className="on-cash-mess text-left">
                                Khách hàng thanh toán bằng tiền mặt tại thu ngân
                            </Row>
                        </Col>
                    </Row>
                </button>
            </div>
        )
    }
}



const mapStateToProps = (state)=>{
    return{
        items: state.cart.addedItems,
        pricetotal: state.cart.total,
        orginPrice : state.cart.originPrice
    }
}
const mapDispatchToProps= (dispatch)=>{
    return{
        addOrder: (id)=>{
            dispatch(addOrder(id))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PaymentType);
