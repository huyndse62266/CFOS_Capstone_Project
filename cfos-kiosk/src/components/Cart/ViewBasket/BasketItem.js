import React, { Component } from 'react'
import { Row, Col, Modal,Icon  } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import {findCart} from '../../../action/cart'
import NumberFormat from 'react-number-format';
import { addQuantity,subQuantity, removeCart } from '../../../action/cart';
import DishDetail from '../../../pages/DishDetail/DishTab/DishDetailTab'
import {ReactComponent as RecycleBinicon } from '../../../icons/RecycleBinicon.svg'
import './BasketItem.css'
class BasketItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
           clicks: this.props.food.quantity,
           discountPrice: 0,
           originPrice: 0,
          show: true
        };
    }
    state = { visible: false };

    showModal = () => {
        this.setState({
        visible: true,
        });
    };

    hideModalInPayment = ()=>{
        this.setState({
            visible: false
        })
    }

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
    IncrementItem = (id) => {
        this.props.addQuantity(id);
        this.calculatePrice()
    }
    DecreaseItem = (id) => {
        this.props.subQuantity(id);
        this.calculatePrice()
    }   
    removeItem = (id) =>{
        this.props.removeItem(id);     
    }
    ToggleClick = () => {
        this.setState({ show: !this.state.show });
    }

    componentDidMount(){
        this.calculatePrice()
    }
    calculatePrice = () => {
        const {food} = this.props
        this.setState({
            discountPrice: food.totalPrice,
            originPrice: food.totalPriceOrigin
        })
    }

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
        var {food,cartQuantity, item} = this.props;
        return (
            <div className="basket-item-wrapper">
                
                
                <Row className="info-basket"> 
                    <Row className="basket-header">
                        <Col span={19}>
                            <div className="background-header"></div>
                            <Row className="store-info" type="flex" justify="space-around" align="middle" >
                                <Col span={4}><div className="store-icon-wrapper"><img src={food.storeIcon} className="store-icon" alt="Image Not Found"/></div></Col>
                                <Col span={20} ><p className="restaurant-title d-inline-block text-truncate text-left">{food.storeName}</p></Col>
                            </Row>
                        </Col>
                        <Col span={5}>
                            {food.promotion > 0 ? <div className="promotion-tag-wrapper"><span>-{food.promotion }%</span></div>:<div className="promotion-tag-wrapper d-none"><span>-{food.promotion }%</span></div> }
                        </Col>
                        
                    </Row>
                    <div className="bg-info img-wrapper-basket-item">
                        <img src={food.foodImage} alt="Image Not Found" className="image-basket"/>
                    </div>       
                    
                    <Row className="food-name-basket"><h6 className="font-weight-bold text-left text-truncate">{food.foodName}</h6></Row>
                </Row>               
                <Row type="flex" justify="space-around" align="middle" className="edit-basket"> 
                    <Col span={14}>
                        <Row><span style={{fontSize:'15px', fontWeight: 'bold'}}><NumberFormat value={this.state.discountPrice} displayType={'text'} thousandSeparator={','}/> đ</span></Row>
                        {food.promotion > 0 ? <Row><span style={{fontSize:'15px', textDecoration:'line-through'}}> <NumberFormat value={this.state.originPrice} displayType={'text'} thousandSeparator={','}/> đ</span></Row> : <span/>}
                        
                        
                    </Col>
                    <Col span={10}>
                        <Row className="w-100" type="flex" justify="start" className="quantity-wrapper">
                            <Col span={7}>
                                <button type="button" className=" btn dec-button-basket" onClick={()=>{this.DecreaseItem(food.foodId)}} ><FontAwesomeIcon icon={faMinus} /></button>
                            </Col>
                            <Col span={10} className="h-100 " >
                                <div className="display-quantity opensan-18-bold">
                                    { this.state.show ? <span>{ cartQuantity }</span> : '' }
                                </div>
                            </Col>
                            <Col span={7}>
                                <button type="button" className="btn inc-button-basket"  onClick={()=>{this.IncrementItem(food.foodId)}} ><FontAwesomeIcon icon={faPlus} /></button> 
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {food.optionList?food.optionList.length > 0 ?<div className="customer-wrapper opensan-16-semibold d-inline-block text-truncate">
                    {this.renderFoodOptionName(food.optionList)}
                </div>:<div className="customer-wrapper opensan-16-semibold">
                    Mặc định   
                </div>:<div className="customer-wrapper opensan-16-semibold">
                    Mặc định   
                </div>}
                <Row className="px-2 pt-4" type="flex" justify="start">
                        <Col span={18}>
                            <div className="pb-2 w-100">
                                <button type="button" className="btn customize-order-button opensan-16-extrabold" onClick={this.showModal}>Tùy chọn món ăn</button>
                            </div>
                        </Col>
                        <Col span={1} offset={2}>
                            <button type="button" className="btn remove-basket-button" onClick={()=>{this.removeItem(food.foodId)}}>
                                <Icon component={RecycleBinicon} />
                            </button>
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
                    className="view-info-modal"
                    >
                    <DishDetail food={food} foodCart={item} cartQuantity={item!==undefined?item.cartQuantity:0}  selected = {'1'} type={'update'} hideModalTab={this.hideModalInPayment}/>
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

const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id) =>{
            dispatch(removeCart(id))
        },
        addQuantity: (id)=>{
            dispatch(addQuantity(id))
        },
        subQuantity:(id) =>{
            dispatch(subQuantity(id))
        },
        findCart: (id) => {
            dispatch(findCart(id))
        }
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(BasketItem)