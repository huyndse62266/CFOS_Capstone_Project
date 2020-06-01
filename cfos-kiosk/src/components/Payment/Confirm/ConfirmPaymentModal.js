import React, { Component } from 'react'
import {Row,Col} from 'antd'
import NumberFormat from 'react-number-format'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import './PaymentModal.css'
export default class ConfirmPaymentModal extends Component {
    render() {
        var {user} = this.props
        return (
            <div className="confirm-payment-modal-wrapper">
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={4} className="check-circle-icon"><FontAwesomeIcon icon={faCheckCircle}/></Col>
                    <Col span={20} className="confirm-payment-title">Xác nhận thanh toán</Col>
                </Row>
                <Row className="text-border">
                    <Col span={10} className="text-left">Họ và tên:</Col>
                    <Col span={14} className="text-right opensan-24-semibold ">{user.fullname}</Col>
                </Row>
                <Row className="text-border">
                    <Col span={10} className="text-left ">Tên tài khoản:</Col>
                    <Col span={14} className="text-right opensan-24-semibold ">{user.username}</Col>
                </Row>
                <Row className="text-border">
                    <Col span={10} className="text-left">Số tiền hiện có</Col>
                    <Col span={14} className="text-right opensan-20-semibold "><NumberFormat value={user.walletAmount} displayType={'text'} thousandSeparator={','}/>  đ</Col>
                </Row>
                <Row className="text-border">
                    <Col span={10} className="text-left ">Tiền thanh toán</Col>
                    <Col span={14} className="text-right opensan-20-semibold ">-<NumberFormat value={this.props.totalPrice} displayType={'text'} thousandSeparator={','}/>  đ</Col>
                </Row>
                <Row className="text-border">
                    <Col span={10} className="text-left">Số dư trong thẻ:</Col>
                    <Col span={14} className="text-right opensan-20-semibold "><NumberFormat value={user.walletAmount-this.props.totalPrice} displayType={'text'} thousandSeparator={','}/>  đ</Col>
                </Row>
            </div>
        )
    }
}
