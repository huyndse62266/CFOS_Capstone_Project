import React, { Component } from 'react';
import {Col,Row, Button} from 'antd';
import './Payment.css';
import qrImage from '../../images/QRCode.JPG'
export default class ComplePayment extends Component {
    render() {
        return (
            <div className="container-fluid container-custom">
                    <Row>
                        <Col span={8} offset={8} className="banner">
                            <h3 className="text-banner text-center">You have to payment to finish your order</h3>
                            <Col span={4} offset={10} >
                                <span className="l-1 text-center p-1" style={{color:'white'}}>.</span>
                                <span className="l-2 text-center p-1" style={{color:'white'}}>.</span>
                                <span className="l-3 text-center p-1" style={{color:'white'}}>.</span>
                                <span className="l-4 text-center p-1" style={{color:'white'}}>.</span>
                                <span className="l-5 text-center p-1" style={{color:'white'}}>.</span>
                                <span className="l-6 text-center p-1" style={{color:'white'}}>.</span>
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} offset={8}>
                            <Row justify="center">
                                <Col span={24} offset={9}>
                                    <div className="image-border p-1">
                                        <img src={qrImage} className="image-style" />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <div className="qr-text-div">
                                    <h3 className="text-center qr-text">Please take the QR code and go to the casher to payment</h3>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} offset={8}>
                            <div className="w-100 button-border-div">
                                <Button type="primary" size="large" className="w-100 px-5 button-custom">Go to home</Button>
                            </div>
                        </Col>
                    </Row>
            </div>
        )
    }
}
