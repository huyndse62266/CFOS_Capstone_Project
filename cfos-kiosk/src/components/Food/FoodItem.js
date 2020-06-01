import React, { Component } from 'react'
import { Row, Col,Modal  } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import Rating from 'react-rating'
import NumberFormat from 'react-number-format';
import { addToCart, findCart } from '../../action/cart';
import ImageButton from './FoodItemComponent/ImageButton'
import DishDetail from '../../pages/DishDetail/DishTab/DishDetailTab'
import 'antd/dist/antd.css';
import './Menu.scss'

class FoodItem extends Component {
    state = { visible: false };

    showModal = (id) => {
        this.setState({
            visible: true,
        });
        this.props.findCart(id);
        
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

    addToCartClick = (food) =>{
        this.props.addToCart(food);
    }
    


    render() {
        var { food, item } = this.props;
        return (
            <div>
               
                <Row>
                    <Col span={24}><ImageButton food={food}/></Col>
                </Row>  
                <Row className="text-left">
                    <span className="d-inline-block text-truncate food-name-style">{food.foodName}</span>  
                </Row>
                <Row className="pb-2" type="flex" justify="space-around" align="middle">
                    <Col span={16} className="text-left">
                        <p className="mb-0 food-name-menu"><NumberFormat value={food.price} displayType={'text'} thousandSeparator={','}/> <u>đ</u></p>                        
                        <span onClick={()=>{this.showModal(food.foodId)}}><Rating               
                                emptySymbol="fa fa-star-o fa-2x"
                                fullSymbol="fa fa-star fa-2x"
                                initialRating={food.rate}
                                readonly
                                style={{fontSize:'7px', color: '#FFA200'}}
                        /></span>

                    </Col>
                    <Col span={8}>
                        <button type="button" className="btn button-add px-0" onClick={()=>{this.addToCartClick(food)}}>
                            <Row>
                                <Col span={6} className="px-2"><FontAwesomeIcon icon={faPlus}/></Col>
                                <Col span={18}>Thêm</Col>
                            </Row>
                        </button>
                        {/* <button type="button" onClick={()=>{this.addToCartClick(food)}}>Add</button> */}
                    </Col>
                </Row>
             
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    closable
                    width="65%"
                    bodyStyle={{padding:0, height: '850px'}}
                    footer={null}
                    centered
                    >
                    <DishDetail food={food} foodCart={item} cartQuantity={item!==undefined?item.cartQuantity:0} selected = {'2'}/>
                </Modal>

            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return{     
        item: state.cart.findItem,
    }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        addToCart: (food)=>{
            dispatch(addToCart(food,parseInt(1),null))
        },
        findCart: (id) => {
            dispatch(findCart(id))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FoodItem);