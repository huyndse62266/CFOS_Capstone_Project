import React, { Component } from 'react'
import {Row,Col, Icon} from 'antd'
import {ReactComponent as StoreLocation } from '../../../icons/Store Location icon.svg'
import './Cart.css'
export default class Cart extends Component {
    renderFoodOptionName = (FoodOptionList) =>{
        let OptionString = "";
        FoodOptionList.map((FoodOption) =>{
            if(OptionString.indexOf(FoodOption.parentName) !== -1){
                OptionString +=  FoodOption.foName + ", "
            }else{
                if(FoodOption.count === true && FoodOption.selectMore === false){
                    OptionString +=  FoodOption.foName + ", "
                }else{
                    OptionString += FoodOption.parentName + ": " + FoodOption.foName + ", "
                }
                
            }
            
        })
        return OptionString.slice(0,OptionString.length-2)
    }
    render() {
        var {food} = this.props;
        return (
            <Row className="h-100 cart-checkout-container pb-2" type="flex" justify="space-around" align="middle">
                <Col span={8} className="h-100">
                    <Row>
                        <Row className="display-quantity-checkout-wrapper">
                            <div className="display-quantity-checkout">
                                x{food.cartQuantity}
                            </div>
                        </Row>
                        <Row>
                            <img src={food.foodImage} className="img-style" alt="Image Not Found"/>
                        </Row>  
                    </Row>
                </Col>
                <Col span={16} className="cart-item-info-wrapper" type="flex" justify="start">
                    <Row>
                        <Col span={3}><Icon component={StoreLocation} style={{fontSize:'25px'}}/></Col>
                        <Col span={21}><span className="store-name">{food.storeName}</span></Col>
                    </Row>
                    <Row className="food-name">{food.foodName}</Row>
                    <Row className="option-name">{food.optionList ?this.renderFoodOptionName(food.optionList):<span>Mặc định</span>}</Row>
                </Col>
            </Row>
        )
    }
}
