import React, { Component } from 'react'
import { Tabs,Row,Col, Icon} from 'antd';
import './DishDetailTab.css'
import apiCaller from '../../../utils/ApiCaller'
import DishInfo from '../DishInfo/DishInfo'
import DishFeedback from  '../DishFeedback/DishFeedback'
import {ReactComponent as Dishicon } from '../../../icons/Dish icon.svg'
import {ReactComponent as Commenticon } from '../../../icons/Comment icon.svg'
const { TabPane } = Tabs;



export default class DishDetailTab extends Component {

    constructor(){
        super();
        this.state ={
            food : ''
        }
       
    }
    componentWillMount(){
        apiCaller(`foods/${this.props.food.foodId}`,'GET',null).then(res => {
            this.setState({
                food: res.data
            })
        })
    }

    hideModalTab = () =>{
        this.props.hideModalTab();
    }
    render() {
        var {selected} = this.props;
        return (
            <Tabs defaultActiveKey={selected} size={'default'} style={{width: '100%'}}>
                <TabPane tab={
                <Row type="flex" justify="space-around" align="middle" className="tab-button text-center">
                    <Col span={1}><Icon component={Dishicon} className="icon-tab"/></Col>
                    <Col span={9}>Chi tiết món ăn </Col>
                </Row>} key="1" size="large">
                    <DishInfo foodDetail={this.state.food} foodCart={this.props.foodCart?this.props.foodCart:this.props.food} cartQuantity={this.props.cartQuantity} hideModal={this.hideModalTab}/>
                </TabPane>
                <TabPane tab={<Row type="flex" justify="space-around" align="middle" className="tab-button text-center">
                    <Col span={1}><Icon component={Commenticon} className="icon-tab"/></Col>
                    <Col span={6}>Đánh giá</Col>
                </Row>} key="2"  size="large">
                   <DishFeedback foodDetail={this.state.food} foodCart={this.props.foodCart?this.props.foodCart:this.props.food} />
                </TabPane>   
            </Tabs>
        )
    }
}
