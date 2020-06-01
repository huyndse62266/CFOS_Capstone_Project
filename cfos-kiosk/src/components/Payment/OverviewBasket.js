import React, { Component } from 'react'
import {Row,Col, Icon,Modal} from 'antd'
import ScrollArea from 'react-scrollbar';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import Cart from '../Cart/CheckoutCart/Cart'
import ViewBasket from '../../pages/Basket/ViewBasket'
import './Payment.css'
import {ReactComponent as Basketicon } from '../../icons/Basketicon.svg'
import {ReactComponent as Editdishicon } from '../../icons/Edit dish icon.svg'
class OverviewBasket extends Component {
    state = {
        visible: false,
        current: 'popular',
      };
    
    handleClick = e => {
        this.setState({
            current: e.key,
        });
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    
    hideModalInPayment = ()=>{
        this.setState({
            visible: false
        })
    }
    render() {
        let addedItems =  this.props.items.map((food, index) => {
            return (
                <Col span={24} className="px-2" key={index }>
                    <Cart key={index} food={food} index={index} cartQuantity={food.cartQuantity} type={'done'}/>
                </Col>)})
 
        return (
            <div className="overview-basket-container">
                <Row className="overview-basket-title" type="flex" justify="start">
                    <Col span={4}>
                        <div className="number-dishes-wrapper">
                        {this.props.items.length} 
                        </div>
                        <Icon component={Basketicon} className="basket-icon"/>     
                    </Col>
                    <Col span={20}>
                        <p className="your-basket-title">Giỏ của bạn</p>
                        <p className="number-basket-item">({this.props.items.length} món)</p>
                    </Col>
                </Row>
                {this.props.items.length>0?<ScrollArea speed={0.8}
                    verticalScrollbarStyle={{display:'none'}}
                    className="area"
                    contentClassName="content"
                    horizontal={false} style={{height: '73%'}}>
                    <Row>
                        {addedItems}
                    </Row>
                </ScrollArea>:<Row style={{height:'73%'}} type="flex" justify="space-around" align="middle">
                    <Col span={24} className="text-center">
                        <h1>Empty</h1>
                    </Col>
                </Row>}
                
                <Row type="flex" justify="space-around" align="middle" className="bg-white">
                    <Col span={16} >
                        <button type="button" className="btn edit-button" onClick={this.showModal}>
                        <Row type="flex" justify="space-around" align="middle">
                            <Col span={6} className="text-right">
                                <Icon component={Editdishicon} className="edit-dish-icon"/>
                            </Col>
                            <Col span={16} className="text-left">
                            CHỈNH SỬA MÓN
                            </Col>
                        </Row>
                         
                        </button>
                    </Col>
                </Row> 
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    closable
                    width="100%"
                    footer={null}
                    bodyStyle={{padding: 0, height: '100%'}}
                    centered
                    className="view-basket-modal"
                >
                    <ViewBasket total={this.props.pricetotal} isInPayment={true} hideModal={this.hideModalInPayment} origin={this.props.originPrice}/>
                </Modal>

            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        items: state.cart.addedItems,
        pricetotal: state.cart.total,
        originPrice: state.cart.originPrice
    }
  }
  
  export default connect(mapStateToProps)(OverviewBasket)
