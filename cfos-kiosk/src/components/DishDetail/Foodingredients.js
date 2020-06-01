import React, { Component } from 'react'
import {Row,Col} from 'antd'
import './Foodingredients.scss'
export default class Foodingredients extends Component {
    render() {
        return (
            <div>
                <Row>
                    <h5 className="font-weight-bold px-3 py-1">Dish's Ingredient</h5>
                </Row>
                <Row>
                    <Col span={12} className="px-3 py-2">
                        <div className="text-center rounded food-info-active">
                            Dolor
                        </div>
                    </Col>
                    <Col span={12} className="px-3 py-2">
                        <div className="text-center rounded food-info-inactive">
                            Dolor
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} className="px-3 py-2">
                        <div className="text-center rounded food-info-active">
                            Dolor
                        </div>
                    </Col>
                    <Col span={12} className="px-3 py-2">
                        <div className="text-center rounded food-info-active">
                            Dolor
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} className="px-3 py-2">
                        <div className="text-center rounded food-info-inactive">
                            Dolor
                        </div>
                    </Col>
                    <Col span={12} className="px-3 py-2">
                        <div className="text-center rounded food-info-inactive">
                            Dolor
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
