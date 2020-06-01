import React, { Component } from 'react'
import {Row,Col, Icon} from 'antd'

import OverviewBasket from '../../components/Payment/OverviewBasket'
import PaymentType from '../../components/Payment/PaymentType'
import {ReactComponent as LongArrowLeft } from '../../icons/LongArrowLeft.svg'
import './Payment.css';
export default class ChoosePayment extends Component {
    goBackPage = () =>{
        var { history } = this.props
        history.goBack()
    }
    render() {
        return (
            <Row className="choose-payment-container">
                <Col span={4} className="back-page-wrapper">
                    <button type="button" className="btn arrow-button bg-white"onClick={()=>{this.goBackPage()}}>
                        <Row type="flex" justify="space-around" align="middle">
                            <Col span={10}>
                                <Icon component={LongArrowLeft} className="arrow-icon-choose-payment"/>
                            </Col>
                            <Col span={14}>
                                <span className="opensan-24-bold">Trở về</span>
                            </Col>
                        </Row>
                    </button>
                </Col>
                <Col span={9} className="payment-type-container">
                    <PaymentType/>
                </Col>
                <Col span={6} offset={5} style={{height: '100%'}}>
                    <OverviewBasket />
                </Col>
            </Row>
        )
    }
}
