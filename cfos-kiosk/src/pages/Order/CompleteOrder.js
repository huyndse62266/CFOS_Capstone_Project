import React, { Component } from 'react'
import {Col, Row, Icon} from 'antd';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, } from '@fortawesome/free-regular-svg-icons'

import './Order.css'

import completeCart from '../../images/Finish payment illustration.png'
import {ReactComponent as LongArrowLeft } from '../../icons/LongArrowLeft.svg'
import {ReactComponent as alertsvg } from '../../icons/alert.svg'
class CompleteOrder extends Component {
    constructor(props){
        super(props);
        this.state= {
            orderNumber: 0
        }
       
    }

    componentDidMount(){
        this.setState({
            orderNumber: this.props.orderNumber
        })
    }
    render() {
        return (
            <div className="complete-order-container">
                <Row className="warning-wrapper">
                    <Col span={4}>
                        <div className="warning-icon-wrapper">
                            <Icon component={alertsvg} style={{fontSize : '50px'}} />
                        </div>
                    </Col>
                    <Col span={20} className="warning-info">
                        <span>Lưu ý: Món ăn sẽ bị hủy sau 1 tiếng kể từ khi được hoàn thành nếu như không có người đến lấy</span>
                    </Col>
                </Row>
                <Row className="display-message-success">
                    <p> <FontAwesomeIcon icon={faCheckCircle}/> Thanh toán thành công</p>
                </Row>
                <Row className="thank-you-message">
                    <p className="mb-0">Xin cảm ơn</p>
                </Row>
                <Row>
                    <div className="py-2 text-center">
                        <img src={completeCart} className="comple-cart-img"/>;
                    </div>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={5}>
                        <div className="display-order-number">
                            <span className="order-id-text py-0">Mã đơn hàng: {this.props.orderNumber}</span>
                        </div>
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={10}>
                     <div className="notifi-mess-wrapper">
                        <h3 className="py-0">Vui lòng lấy <span style={{color:'#FF331C'}}>món ăn </span> của bạn tại các khu vực để đồ ăn <span style={{color:'#FF331C'}}>trước mỗi cửa hàng</span> tương ứng với <span style={{color:'#FF331C'}}>mã đơn hàng</span></h3>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={6} offset={9}>
                        <div className="back-home-button-wrapper">
                            <Link to="/">
                                <button type="button" className="btn button-custom">
                                    <Row type="flex" justify="center"> 
                                        <Col span={4} className="long-back-arrow-icon"><Icon component={LongArrowLeft} /></Col>
                                        <Col span={20} className="opensan-32-semibold pt-1"><span>Trở về trang chủ</span></Col>
                                    </Row>
                                </button>
                            </Link>                       
                        </div>
                    </Col>
                </Row>
                
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        orderNumber: state.orders.orderNumber
    }
}


export default connect(mapStateToProps,null)(CompleteOrder);
