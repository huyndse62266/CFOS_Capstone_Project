import React, { Component } from 'react'
import {Row} from 'antd'
import FoodItem from '../Food/FoodItem'
import './History.scss'
import restaurantLogo from '../../images/khai-niem-nha-hang.jpg'
// import { Scrollbars } from 'react-custom-scrollbars';
// import ScrollBarHorizontal from '../ScrollBar/ScrollBarHorizontal'
export default class DishOrdered extends Component {
    render() {
        var food = {
            id: '1',
            foodName: 'AAA',
            foodImage: restaurantLogo
        }
        return (
            <div className="pl-4 py-4 container-dishes">
                <Row>
                    <h2>Hello, Huy</h2>
                </Row>
                <Row>
                    <h3>There are what you have eaten before</h3>
                </Row>
                <Row className="d-flex flex-row">
                    <FoodItem food={food}/>
                    <FoodItem food={food}/>
                    <FoodItem food={food}/>
                    <FoodItem food={food}/>
                </Row>
            </div>
        )
    }
}
