import React, { Component } from 'react'
import { Menu,Row,Col,Button,Modal,Icon } from 'antd';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import ViewBasket from '../../pages/Basket/ViewBasket'
import {ReactComponent as ExpandBasketSVG } from '../../icons/expandBasket.svg'
import {ReactComponent as LongArrowLeft } from '../../icons/LongArrowLeft.svg'
import {ReactComponent as Basketicon } from '../../icons/Basketicon.svg'
import {ReactComponent as PopularIcon } from '../../icons/Popular icon.svg'
import {ReactComponent as SaleIcon } from '../../icons/Sale icon.svg'
import {ReactComponent as DishIcon } from '../../icons/Dish icon-1.svg'
import {ReactComponent as DrinkIcon } from '../../icons/Drink icon.svg'
import {ReactComponent as ComboIcon } from '../../icons/Comboicon.svg'
import {ReactComponent as StoreIcon } from '../../icons/StoreIcon.svg'
import './Header.css'


class TopBar extends Component {
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
    render() {
        return (
            <Row className="bg-light h-100" type="flex" justify="start">
                
                <Col style={{width:'10.4%'}} className="text-center bg-white">
                    <Link to="/">
                        <Button className="back-button">
                            <Icon component={LongArrowLeft} />
                            <span className="back-button-title">Trở về</span>
                        </Button>
                    </Link>
                </Col>
                <Col span={17} style={{width:'72.6%'}} className="menu-border">
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" inlineIndent='50' className="menu-wrapper">
                        <Menu.Item key="popular" className="menu-item-1">
                            <Link to="/menu/popular" className="menu-item-wrapper">
                                <Row className="menu-title" type="flex" justify="center">
                                    <Col span={4} className="test-1"><Icon component={PopularIcon} className="menu-icon"/></Col>    
                                    <Col span={12} >Nổi bật</Col>    
                                </Row>   
                              </Link>
                        </Menu.Item>
                        <Menu.Item key="promotion" className="menu-item">
                                <Link to="/menu/promotion" className="menu-item-wrapper">
                                    <Row className="menu-title" type="flex" justify="center">
                                        <Col span={5}><Icon component={SaleIcon} className="menu-icon"/></Col>    
                                        <Col span={17} >Khuyến mãi</Col>    
                                    </Row>   
                                    {/* <span className="menu-title"><FontAwesomeIcon icon={faPercentage} className="menu-icon"/>Khuyến mãi</span>  */}
                                </Link>  
                        </Menu.Item>
                        <Menu.Item key="meal" className="menu-item">                 
                                <Link to="/menu/meal" className="menu-item-wrapper">
                                    <Row className="menu-title" type="flex" justify="center">
                                        <Col span={3}><Icon component={DishIcon} className="menu-icon"/></Col>    
                                        <Col span={12} >Đồ ăn</Col>    
                                    </Row>   
                                </Link>       
                        </Menu.Item>
                        <Menu.Item key="drink" className="menu-item">        
                                <Link to="/menu/drink" className="menu-item-wrapper">        
                                    <Row className="menu-title" type="flex" justify="center">
                                        <Col span={4}><Icon component={DrinkIcon} className="menu-icon"/></Col>    
                                        <Col span={12} >Giải khát</Col>    
                                    </Row>  
                                </Link>                     
                        </Menu.Item>
                        <Menu.Item key="combo" className="menu-item">                           
                            <Link to="/menu/combo" className="menu-item-wrapper">
                                <Row className="menu-title" type="flex" justify="center">
                                    <Col span={4}><Icon component={ComboIcon} className="menu-icon"/></Col>    
                                    <Col span={12} >Combo</Col>    
                                </Row>   
                            </Link>                        
                        </Menu.Item>
                        <Menu.Item key="restaurant" className="menu-item-1">                     
                            <Link to="/menu/restaurant" className="menu-item-wrapper">                            
                                <Row className="menu-title" type="flex" justify="center">
                                    <Col span={5}><Icon component={StoreIcon} className="menu-icon"/></Col>    
                                    <Col span={12} >Nhà hàng</Col>    
                                </Row>  
                            </Link>                       
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col style={{width:'17%'}} className="h-100">
                    {this.props.items.length > 0? <Row className="cart-header">
                        <a onClick={this.showModal}>
                        <Row type="flex" justify="space-around" align="middle">
                            <Col span={2} offset={2}>
                                <Row type="flex" justify="space-around" align="middle" className="number-dishes-wrapper-topbar">
                                    <Col>
                                        {this.props.items.length}
                                    </Col>
                                </Row>    
                                <Icon component={Basketicon} className="basket-icon-topbar"/>
                                
                            </Col>
                            <Col span={4}><Icon component={ExpandBasketSVG} className="expand-icon"/></Col>
                            <Col span={16}><u className="px-3 opensan-18-bold ">Xem giỏ của bạn</u></Col>
                        </Row>
                        
                        
                        </a>
                    </Row> :
                     <div className="empty-cart">
                        <Row type="flex" justify="space-around" align="middle" className="px-3">
                            <Col span={1}><Icon component={Basketicon} className="empty-basket-icon"/></Col>
                            <Col span={20}> <span className="px-3">Chưa có món ăn</span></Col>
                        </Row>
                    </div> }
                   
                </Col>

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
                    <ViewBasket total={this.props.pricetotal} origin={this.props.originPrice}>fffff</ViewBasket>
                </Modal>
                
            </Row>
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




export default connect(mapStateToProps,null)(TopBar);