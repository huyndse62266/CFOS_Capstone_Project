import React, { Component }  from 'react'
import { Row,Col,Icon } from 'antd';
import { connect } from 'react-redux'
import ScrollArea from 'react-scrollbar';
import NumberFormat from 'react-number-format';
import { Link} from "react-router-dom";
import CartItemSimple from './CartItemSimple'
import {ReactComponent as PriceCartWhite } from '../../../icons/PriceCartWhite.svg'
import './PreviewCart.css'

class PreviewCart extends Component {
    state = {
        visible: false,
        items: this.props.items
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

        let addedItems =  this.props.items.length ?
            (
                this.props.items.map((item,index) =>{
                    return <CartItemSimple food={item} key={index}  index={index} cartQuantity={item.cartQuantity}/>
                })
            ):(
                <span></span>
            );
          
        return (
            
            <div className="mini-cart-wrapper" >
                <ScrollArea speed={0.8}
                    verticalScrollbarStyle={{display:'none'}}
                    className="area"
                    contentClassName="content"
                    horizontal={false} style={{height: '78%'}}>
                    <Row className="pt-5 pb-2">
                        {addedItems}
                    </Row>
                </ScrollArea>
                <Row className="py-4">
                    <Col span={20} offset={2}>
                        <Link to="/payment">
                            <button type="button"  className="btn purchase-button-1">
                                <Row type="flex" justify="space-around" align="middle">
                                    <Col span={4} offset={2} className="text-right"><Icon component={PriceCartWhite} className="price-cart-view-basket"/></Col>
                                    <Col span={16} className="text-left px-2">THANH TOÁN</Col>
                                </Row>
                            </button>
                        </Link>
                    </Col>   
                </Row>
                <Row>
                    <h4 className="text-center font-weight-bold"><NumberFormat value={this.props.pricetotal} displayType={'text'} thousandSeparator={','}/> đ</h4>
                </Row>
                
                
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        items: state.cart.addedItems,
        pricetotal: state.cart.total,

    }
}



export default connect(mapStateToProps,null)(PreviewCart);
