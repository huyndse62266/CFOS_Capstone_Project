import React, { Component } from 'react'
import {Row,Col,Icon} from 'antd'
import {ReactComponent as StoreLocation } from '../../icons/Store Location icon.svg'
import {ReactComponent as StatusDone } from '../../icons/StatusDone.svg'
import {ReactComponent as StatusCooking } from '../../icons/StatusCooking.svg'
import {ReactComponent as StatusCancel } from '../../icons/Dish fail icon.svg'
import './DishStatus.css'
import ScrollArea from 'react-scrollbar';
export default class DishStatus extends Component {

    constructor(props){
        super(props);
        this.state = { 
            isReady : this.props.orderStaus
        }
    }

    renderFoodOptionName = (FoodOptionList) =>{
        let OptionString = "";
        FoodOptionList.map((FoodOption) =>{
            if(OptionString.indexOf(FoodOption.parentName) !== -1){
                OptionString +=  FoodOption.foName + ", "
            }else{
                OptionString += FoodOption.parentName + ": " + FoodOption.foName + ", "
            }
            
        })
        return OptionString.slice(0,OptionString.length-2)
    }
    renderStatus = (status) =>{
        if(status === "READY"){
            return (
                <Row type="flex" justify="space-around" align="middle"className="w-100">
                    <Col span={20}>
                        <span className="status-finish p-0">Hoàn thành</span><br/>
                        <span className="status-finish-description">Đang chờ lấy</span>
                    </Col>
                    <Col span={4} className="done-icon"><Icon component={StatusDone}/></Col>
                </Row>
            )
        }else if(status === "CANCELLED" || status === "GUEST_CANCEL" || status === "REFUNDED"){
            return(
                <Row type="flex" justify="space-around" align="middle"className="w-100">
                    <Col span={20}>
                        <span className="cancel-status-title p-0">Hủy bỏ</span><br/>
                        {/* <span className="cancel-description">Món ăn bị hủy</span> */}
                    </Col>
                    <Col span={4} className="cancel-close-icon"><Icon component={StatusCancel}/></Col>
                </Row>
            )
        }else{
            return(
                <Row type="flex" justify="space-around" align="middle"className="w-100">
                    <Col span={20}>
                        <span className="status-waiting">Đang nấu</span>
                    </Col>
                    <Col span={4} className="done-icon"><Icon component={StatusCooking}/></Col>
                </Row>
            )
        }
    }
    render() {
        var {orderDetail} = this.props;
        return (

            <Row className="dish-detai-wrapper" type="flex" justify="start">
                <Col span={2} className="text-center my-auto">
                    <div className="order-detail-quantity opensan-24-semibold">
                        <span >x{orderDetail.quantity}</span>
                    </div>
                </Col>
                <Col span={5} className="img-dish-status-wrapper" >
                    {orderDetail.foodVM.promotion > 0 ?  <span className="dish-status-promotion">
                        -{orderDetail.foodVM.promotion}%
                    </span>:<span></span>}
                    <div className="w-100 h-100">
                        <img src={orderDetail.foodVM.imageVMS[0].image} className="image-order-detail" alt="Image Not Found"/>
                    </div>
                    
                </Col>
                <Col span={10} className="text-left my-auto" offset={1}>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={2} style={{fontSize:'30px'}}><Icon component={StoreLocation}/></Col>
                        <Col span={16}><i className="opensan-18-bold text-left">{orderDetail.storeVM.storeName}</i></Col>
                        <Col span={6}></Col>
                    </Row>
                    <Row>
                        <h4 className="opensan-24-bold py-1">{orderDetail.foodVM.foodName}</h4>
                    </Row>
                    <Row>
                        <Col>
                            {/* {orderDetail.orderDetailFoodOption.length > 0 ? <div className="food-option-check-order ">{this.renderFoodOptionName(orderDetail.orderDetailFoodOption)}</div>:<span className="food-option-check-order">Tùy chọn: Mặc định</span> } */}
                            {orderDetail.orderDetailFoodOption.length > 0 ?
                            <ScrollArea speed={0.8}
                                verticalScrollbarStyle={{display:'none'}}
                                className="area food-option-check-order "
                                contentClassName="content"
                                horizontal={false}>
                                {this.renderFoodOptionName(orderDetail.orderDetailFoodOption)}
                            </ScrollArea> :<span className="food-option-check-order">Tùy chọn: Mặc định</span> }
                        </Col>
                    </Row>                  
                </Col>               
                <Col span={6} className="dish-status text-right">
                    {this.renderStatus(orderDetail.oderDetailStatus)}
                    
                </Col>
            </Row>
        )
    }
}
