import React, { Component } from 'react'
import {Row} from 'antd'
import FoodItem from '../Food/FoodItem'
import './History.scss'
import restaurantLogo from '../../images/khai-niem-nha-hang.jpg'
export default class PopularDishes extends Component {
    render() {
        var food = {
            id: '1',
            foodName: 'AAA',
            foodImage: restaurantLogo
        }
        return (
            <div className="pl-4 py-4 container-dishes">
                <Row>
                    <h2>Popular dishes for you</h2>
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
