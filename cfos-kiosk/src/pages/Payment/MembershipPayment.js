import React, { Component } from 'react'
import {Row,Col, Icon,Modal, message} from 'antd'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import './Payment.css'
import { addOrder} from '../../action/orders'
import {ReactComponent as LongArrowLeft } from '../../icons/LongArrowLeft.svg'
// import {ReactComponent as PriceCart } from '../../icons/PriceCart.svg'
import {ReactComponent as Purchaseicon } from '../../icons/Purchase icon.svg'
import cardSwiperImg from '../../images/Card input illustration.png'
import apiCaller from '../../utils/ApiCaller'
import ConfirmPaymentModal from '../../components/Payment/Confirm/ConfirmPaymentModal'

class MembershipPayment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            IDCard: '',
            loading: false,
            visible: false,
            user: '',
            isDone: false,
             isFound: false
        };
        this.handleChange = this.handleChange.bind(this)
    }
    goBackPage = () =>{
        var { history } = this.props
        history.goBack()
    }

    handleChange(event) {
        if(event.target.value.length === 10){
            apiCaller(`customer/info?cardId=${event.target.value}`,'GET',null).then(res => {
                this.setState({
                    user: res.data,
                    isFound: true
                },()=>{
                    if(this.state.user.walletAmount - this.props.pricetotal < 0){
                        message.error("Thẻ không đủ thanh toán")
                    }
                    this.showConfirm()
                })
            }).catch(error => {
                
                if(error.response.status === 400){
                    message.error("Thẻ của bạn không thể sử dụng")
                }
                if(error.response.status === 404){
                    message.error("Thẻ của bạn chưa được đăng kí")
                }
                this.setState({
                    user: '',
                    isFound: false
                })     
            })
            event.target.value= ''
            
        }
    }

    showConfirm(){
        if(this.state.isFound === true){
            document.getElementById('modal-btn').click();
        }
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
    };
    
    handleOk = () => {
        var {items,pricetotal,orginPrice } = this.props;
        
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
        this.checkoutClick(items,pricetotal,orginPrice, this.state.user.customerId)
    };
    
    handleCancel = () => {
        this.setState({ visible: false });
    };
    renderButton(loading){

        if(this.state.user.walletAmount - this.props.pricetotal < 0){
            return(<button  type="button" className="btn submit-disable-btn-modal" key="submit" loading={loading} onClick={this.handleOk} disabled>
            Xác nhận và thanh toán
          </button>)
        }else{
            var {items,pricetotal,orginPrice } = this.props;
            return (<button  type="button" className="btn submit-btn-modal" key="submit"  loading={loading} onClick={this.handleOk}>
            Xác nhận và thanh toán
          </button>)
        }
    }

    checkoutClick = (cart,total,orginPrice, customerId ) =>{
        if(cart.length > 0){
            var orderDetail = cart.map((cartItem) =>{
                
                return{
                    foodId: cartItem.foodId,
                    orderDetailFoodOption: cartItem.optionList,
                    quantity: cartItem.cartQuantity,
                    storeID: cartItem.storeId,
                    totalPrice: cartItem.totalPrice,
                }
            })
            var order ={
                "customerId": customerId    ,
                "orderDetails": orderDetail,
                "originalPrice": orginPrice,
                "totalOrder": total
            }
            apiCaller(`orders/orders/submit-order`,'POST',JSON.stringify(order)).then(res =>{
                this.setState({
                    orderID: res.data,
                    isDone: true
                });
                this.props.addOrder(res.data)
            }).catch(error => {
                // if(error){
                //     message.error(error.response.data.message)
                // }              
            })
        }

    }
    render() {
        const { visible, loading, isDone } = this.state;
        if(isDone) {
            return <Redirect to={{pathname: "/print"}}/>
        }
        

        return (
            <div className="membership-payment-container">
                <Row className="payment-process" type="flex" justify="center">
                    <Col span={5}>
                        <Row type="flex" justify="space-around" align="middle">
                            <Col span={4}>
                                <Icon component={Purchaseicon} className="price-cart-icon"/>
                            </Col>
                            <Col span={20} className="opensan-24-semibold   ">Tiến hành thanh toán ...</Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="text-center" style={{opacity:0}}>
                    <input class="form-control form-control-sm" type="text" autoFocus onChange={this.handleChange}/>
                </Row>
                <Row className="text-center">
                    <img src={cardSwiperImg} className="card-swipe-img"/>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={10}>
                     <div className="notifi-mess-wrapper">
                        <h3 className="py-0">Đặt <span style={{color:'#FF331C'}}>thẻ </span> của bạn gần máy thanh toán bên dưới và nhập mật khẩu nếu có</h3>
                    </div>
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col span={3}>
                        <button type="button" className="btn cancel-membership-button" onClick={()=>{this.goBackPage()}}>
                            <Row type="flex" justify="space-around" align="middle">
                                <Col span={10}><Icon component={LongArrowLeft} className="back-arrow-icon-membership" /></Col>
                                <Col span={14}><span className="opensan-32-bold">Hủy bỏ</span></Col>
                            </Row>
                        </button>
                    </Col>
                </Row>
                <button type="btn" id="modal-btn" type="primary" onClick={this.showModal} className="d-none">
                    Open Modal with customized footer
                </button>
                <Modal
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width="30%"
                    centered 
                    className="payment-membership-modal"
                    footer={[
                        <button type="btn" className="btn cancel-btn-modal" key="back" onClick={this.handleCancel}>
                          Hủy
                        </button>,
                        this.renderButton(loading)
                        ,
                    ]}
                    >
                        <ConfirmPaymentModal totalPrice={this.props.pricetotal} user={this.state.user}/>    
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        items: state.cart.addedItems,
        pricetotal: state.cart.total,
        orginPrice : state.cart.originPrice
    }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        addOrder: (id)=>{
            dispatch(addOrder(id))
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(MembershipPayment);
