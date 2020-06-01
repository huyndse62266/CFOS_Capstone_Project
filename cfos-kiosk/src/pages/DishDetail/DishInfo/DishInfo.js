import React, { Component } from 'react'
import { Row,Col, message,Icon } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import ScrollArea from 'react-scrollbar';
import Rating from 'react-rating'
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux'
import { addToCart, updateItemCart } from '../../../action/cart';
import {ReactComponent as StoreLocation } from '../../../icons/Store Location icon.svg'
import {ReactComponent as PromotionTagIcon } from '../../../icons/Promotion Tag Icon.svg'
import {ReactComponent as ResetIcon } from '../../../icons/Reset icon.svg'
import OptionCount from '../../../components/FoodOption/OptionCount'
import 'antd/dist/antd.css';
import './DishInfo.css'



class DishInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          clicks: 0,
          show: true,
          totalPrice: 0,
          food: undefined,
          optionList: [],
          isRestore: false,
          choosePriceSize: 0,
          priceSize: 0,
          isResetDefault: false,      
        };
        this.handleFoodOption = this.handleFoodOption.bind(this);
        this.handleResetDefault = this.handleResetDefault.bind(this);
        this.changeResetDefaultStatus = this.changeResetDefaultStatus.bind(this);
    }

    hideModal = () =>{
        this.props.hideModal();
    }

    handleFoodOption(option,quantity){
        let index = -1;
        index = this.state.optionList.findIndex(optionObject => optionObject.foId === option.foId);
       
        if(index !== -1){
            if(this.props.cartQuantity > 0){
                var data = [...this.state.optionList];
                var oldQuantity = data[index].quantity;
                if(quantity !== 0){
                    data[index].quantity = quantity;
                }else{
                    data = data.filter(optionObject => optionObject.foId !== option.foId)
                }
                
                this.setState({
                    optionList: data,
                    totalPrice: this.state.totalPrice + option.optionPrice*(quantity-oldQuantity)*this.state.clicks
                })
            }else{
                var data = [...this.state.optionList];    
                var oldQuantity = data[index].quantity;          
                if(quantity !== 0){
                    data[index].quantity = quantity;
                }else{
                    data = data.filter(optionObject => optionObject.foId !== option.foId)
                }
                
                if(this.state.clicks > 0 ){
                    this.setState({
                        optionList: data,
                        totalPrice: this.state.totalPrice + option.optionPrice*(quantity-oldQuantity)*this.state.clicks
                    })
                }else{
                    if(quantity-oldQuantity > 0){
                        this.setState({
                            optionList: data,
                        })
                    }else{
                        this.setState({
                            optionList: data,
                        })
                    }        
                }
            }
        }else{
            option.quantity = parseInt(quantity);
            let newOptionList = this.state.optionList;
            newOptionList.push(option);
            if(this.state.clicks === 0){
                this.setState({
                    optionList: newOptionList,
                })
            }else{
                this.setState({
                    optionList: newOptionList,
                    totalPrice: this.state.totalPrice + option.optionPrice*this.state.clicks
                })
            }
            
        }
        
    }

    handelSelectMore = (e,option) => {
        if(e.target.value === true){
            let newOptionList = this.state.optionList;
            newOptionList.push(option)
            this.setState({
                optionList: newOptionList
            })
        }else{
            let index = -1;
            index = this.state.optionList.findIndex(optionObject => optionObject.foId === option.foId);
            if(index  != -1){
                let newOptionList = this.state.optionList;
                newOptionList.splice(index,1);
                this.setState({
                    optionList: newOptionList
                })
            }
        }

      }
    

    
    IncrementItem = () => {
        let optionPrice = 0;
        if(this.state.optionList){
            this.state.optionList.map(option => {
                if(option.count === true){
                    optionPrice += option.optionPrice * parseInt(option.quantity);
                }else{
                    optionPrice += option.optionPrice
                }
            })
        }
        this.setState({ 
            clicks: this.state.clicks + 1,
            totalPrice: this.state.totalPrice + (this.props.foodDetail.price*((100-this.props.foodDetail.promotion)/100) +optionPrice )
        });

    }
    DecreaseItem = () => {
        if(this.state.clicks > 0){
            let optionPrice = 0;
            if(this.state.optionList){
                this.state.optionList.map(option => {
                    if(option.count === true){
                        optionPrice += option.optionPrice * parseInt(option.quantity);
                    }else{
                        optionPrice += option.optionPrice
                    }
                })
            }
            this.setState({ 
                clicks: this.state.clicks - 1,
                totalPrice: this.state.totalPrice - (this.props.foodDetail.price*((100-this.props.foodDetail.promotion)/100)+optionPrice)
            })
        };
    }
    addtoCartRequest = (food,quantity,optionList, priceSize,choosePriceSize) => {
        if(quantity > 0){
            this.props.addtoCart(food,quantity,optionList,priceSize,choosePriceSize);
            // let data = this.state.optionList;
            // data.splice(0, data.length);
            // this.setState({
            //     optionList:data
            // })
            this.hideModal();
            
        }else{
            message.error('Vui lòng chọn số lượng');
        }
        
    }
    updateItemCartRequest = (id,cart,optionList,priceSize, choosePriceSize) => {
        this.props.updateCart(id,cart,optionList,priceSize, choosePriceSize);
        this.hideModal()
    }
    ToggleClick = () => {
        this.setState({ show: !this.state.show });
    }

    stickOption = (option) => {
        let index = -1;
        index = this.state.optionList.findIndex(optionObject => optionObject.foodOptionParent === option.foodOptionParent);
        if(index !== -1){
            var data = [...this.state.optionList];
            data.splice(index,1);
            data.push(option)
            this.setState({
                optionList: data,
            })
        }else{
            let newOptionList = this.state.optionList;
            newOptionList.push(option);
            this.setState({
                optionList: newOptionList,
            })
        }
    }
    
    changeOptionPrice = (option, priceSize) =>{
        let index = -1;
        index = this.state.optionList.findIndex(optionObject => optionObject.foodOptionParent === option.foodOptionParent);
        if(index !== -1){
            var data = [...this.state.optionList];
            data.splice(index,1);
            data.push(option)
            if(this.state.clicks > 0){
                this.setState({
                    optionList: data,
                    choosePriceSize: option.optionPrice,
                    priceSize: option.optionPrice,
                    totalPrice: this.state.totalPrice + priceSize*this.state.clicks
                })
            }else{
                this.setState({
                    optionList: data,
                    choosePriceSize: option.optionPrice,
                    priceSize: option.optionPrice
                })
            }
            
        }else{
            let newOptionList = this.state.optionList;
            newOptionList.push(option);
            if(this.state.clicks > 0){
                this.setState({
                    optionList: newOptionList,
                    choosePriceSize: option.optionPrice,
                    priceSize: option.optionPrice,
                    totalPrice: this.state.totalPrice + priceSize*this.state.clicks 
                })
            }else{
                this.setState({
                    optionList: newOptionList,
                    choosePriceSize: option.optionPrice,
                    priceSize: option.optionPrice,
                })
            }
            
        }
    }

    restoreOption = ()=>{
        this.setState({
            optionList: [],
            totalPrice: this.props.foodDetail.price * this.state.clicks * ((100-this.props.foodDetail.promotion)/100),
            isRestore: true
        })
    }

    handleResetDefault(foodDetail){
        this.setState({
            totalPrice: 0,
            clicks: 0,
            isResetDefaule: true
        })
        foodDetail.foodOptions.map((option, index) => {
            if(option.foodOptionVMS !== null){
                option.foodOptionVMS.map((optionVMS) => {
                    if(optionVMS.count === 0){
                        optionVMS.quantity = 0;
                    }else if(optionVMS.selectMore === false && optionVMS.count === false){
                        // document.getElementById(optionVMS.foId).checked = false;
                    }
                        
                })
            }
        })

        this.state.optionList.map((option)=>{
            option.quantity =0
        })
    }

    changeResetDefaultStatus(status){
        this.setState({
            isResetDefault: status
        })
    }
    
    componentWillMount(){
        if(this.props.cartQuantity !== undefined){
            if(this.props.cartQuantity !== 0){
                var {foodCart} = this.props
                if(foodCart.optionList){
                    let totalOption  = 0;
                    foodCart.optionList.map(option => {
                        totalOption += option.optionPrice * option.quantity;
                    })
                    this.setState({
                        clicks: this.props.cartQuantity,
                        priceSize: foodCart.priceSize,
                        choosePriceSize: foodCart.choosePriceSize,
                        optionList: foodCart.optionList,
                        totalPrice:(foodCart.cartQuantity * (foodCart.price*((100-foodCart.promotion)/100) + totalOption + foodCart.priceSize)) 
                    })
                }else{
                    this.setState({
                        clicks: this.props.cartQuantity,
                        totalPrice: (foodCart.cartQuantity * foodCart.price)*((100-foodCart.promotion)/100)
                    })
                }
            }else{
       
                this.setState({
                    clicks: 0
                })
            }
        }
        

    }

    componentWillReceiveProps({foodDetail}){
        if(this.props.foodCart.choosePriceSize){
            this.setState({
                choosePriceSize: this.props.foodCart.choosePriceSize
            })
        }else if(foodDetail){

            foodDetail.foodOptions.map(foodOption => {
                foodOption.foodOptionVMS.map(foodOptionVMSDetail =>
                    {
                        if(foodOptionVMSDetail.foName === "Nhỏ" ||foodOptionVMSDetail.foName === "S" ){
                            this.setState({
                                choosePriceSize: foodOptionVMSDetail.optionPrice,
                                priceSize: 0
                            })
                        }    
                    }
                )
            })
        }
        
    }
    componentDidUpdate(){

        if(this.props.foodCart.optionList){
            this.props.foodCart.optionList.map(optionChoosen => 
               {
                   if(optionChoosen.count === false && optionChoosen.selectMore === false){
                       console.log(`rd${this.props.foodCart.foodId}-opt${optionChoosen.foId}`)
                        document.getElementById(`rd${this.props.foodCart.foodId}-opt${optionChoosen.foId}`).click();
                   }
               }
            
            )
        }
    }



    rendeSize = (foodOption, index, foodId) =>{
        if(foodOption.foodOptionNameParent === 'Kích cỡ' || foodOption.foodOptionNameParent === 'Size'  ){
            return <div key={index}>
            <Row>
                <h6 className="option-title">{foodOption.foodOptionNameParent}</h6>
            </Row>
            <Row className="mb-3">
                <form className="form cf">
                    <section className="plan cf">
                        {foodOption.foodOptionVMS.map((foodOptionVMSDetail, index) => 
                        <Col span={8} key={index}>
                            <input type="radio" name={`rd${foodId}`} id={`rd${foodId}-opt${foodOptionVMSDetail.foId}`} value={foodOptionVMSDetail.foId} onChange={ () => this.changeOptionPrice(foodOptionVMSDetail, foodOptionVMSDetail.optionPrice-this.state.choosePriceSize)} />
                            <label className="check-box-label size-label" htmlFor={`rd${foodId}-opt${foodOptionVMSDetail.foId}`}>
                                {this.renderLabel(foodOptionVMSDetail)}
                            </label>
                        </Col>)
                        }
                    </section>
                </form>
            </Row>
        </div>
        }
    }
    renderLabel(foodOptionVMSDetail){
        if((foodOptionVMSDetail.optionPrice-this.state.choosePriceSize) !== 0){
            return  <span>
            {foodOptionVMSDetail.foName}<br/>
            <span className="price-size"><NumberFormat value={foodOptionVMSDetail.optionPrice-this.state.choosePriceSize} displayType={'text'} thousandSeparator={','}/> đ</span></span>
        }else{
            return <span className="choose-price-label">{foodOptionVMSDetail.foName}</span>
        }
    }

    renderOption = (foodOption, index, foodId) =>{
        if(foodOption.count === true){
            return <div key={index}>
            <Row>
                <h6 className="option-title">{foodOption.foodOptionNameParent}</h6>
            </Row>
            <Row className="px-4 mb-3">
                {this.props.foodCart ?foodOption.foodOptionVMS ? foodOption.foodOptionVMS.map((foodOptionVMSDetail, index)=>
                <OptionCount Restore={this.state.isRestore} foodOption={foodOptionVMSDetail} optionQuatity={this.props.foodCart.optionList} IncrementOption={this.handleFoodOption} DecreaseOption={this.handleFoodOption} isResetDefault = {this.state.isResetDefaule} changeDefaultStatus = {this.changeResetDefaultStatus} key={`i`+index} />) : <div/>:
                foodOption.foodOptionVMS ? foodOption.foodOptionVMS.map((foodOptionVMSDetail, index)=>
                <OptionCount Restore={this.state.isRestore} foodOption={foodOptionVMSDetail} IncrementOption={this.handleFoodOption} isResetDefault = {this.state.isResetDefaule} changeDefaultStatus = {this.changeResetDefaultStatus} key={`u`+index}/>) : <div/> }
            
            </Row>
        </div>
        }else if(foodOption.selectMore === false && foodOption.count === false && foodOption.foodOptionNameParent !== 'Kích cỡ' && foodOption.foodOptionNameParent !== 'Size'){
            return <div key={index}>
            <Row>
                <h6 className="option-title">{foodOption.foodOptionNameParent}</h6>
            </Row>
            <Row className="mb-3">
                <form className="form cf">
                    <section className ="plan cf">
                        {foodOption.foodOptionVMS.map((foodOptionVMSDetail, index) => 
                        <Col span={8} key={index}>
                            <input type="radio" name={`rd${foodId}`} id={`rd${foodId}-opt${foodOptionVMSDetail.foId}`} value={foodOptionVMSDetail.foId} onChange={ () => this.stickOption(foodOptionVMSDetail)} />
                            <label className="radio-button-label" htmlFor={`rd${foodId}-opt${foodOptionVMSDetail.foId}`}>{foodOptionVMSDetail.foName}</label>
                        </Col>)
                        }
                    </section>
                </form>
            </Row>
        </div>
        }
        else if(foodOption.selectMore === true){
            return <div key={index}>
            <Row>
                <h6 className="option-title">{foodOption.foodOptionNameParent}</h6>
            </Row>
            <Row className="mb-3">
                <form className="form cf">
                    <section className ="plan cf">
                        {foodOption.foodOptionVMS.map((foodOptionVMSDetail, index) => 
                        <Col span={8} key={index}>
                            <input type="checkbox" name="checkbox-input" id={foodOptionVMSDetail.foId} value={foodOptionVMSDetail.foId} onChange={(e) => {this.handelSelectMore({target: {name: e.target.value,value: e.target.checked}},foodOptionVMSDetail )}} />
                            <label className="check-box-label" htmlFor={foodOptionVMSDetail.foId}><Row className="h-100" type="flex" justify="space-around" align="middle"><Col>{foodOptionVMSDetail.foName}</Col></Row></label>
                        </Col>)
                        }
                    </section>
                </form>
            </Row>
        </div>
        }
    }

    render() {
        var {cartQuantity,foodDetail} = this.props;
        var {foodOptions,storeVM} = foodDetail;
        return (
            <div className="info-feedback-container">
                <Row type="flex" justify="start">
                    {/* cột hình ảnh */}
                    <Col style={{width:'30%'}}>
                        <ScrollArea speed={0.8}
                            verticalScrollbarStyle={{display:'none'}}
                            className="area"
                            contentClassName="content"
                            horizontal={false} style={{height: '630px'}}>
                        <Row className="d-flex flex-column pr-3">
                            {foodDetail.imageVMS ? foodDetail.imageVMS.map((imageURL,index) => {
                                return <Col span={24} className="pb-4" key={index}>    
                                    <img src={imageURL.image} className="image-info" alt="Image Not Found"/>
                                </Col>
                            }):<div/>}                   
                        </Row>
                        </ScrollArea>
                    </Col>
                    {/* cột thông tin món */}
                    <Col style={{width:'70%'}}>
                        <Row>
                            {/* chi tiết món  */}
                            <Col span={12} className="px-3">
                                {/* thông tin cửa hàng */}
                                <Row type="flex" justify="space-around" align="middle">
                                    <Col span={2}>
                                        <Icon component={StoreLocation} className="store-location-icon-feedback"/>
                                    </Col>
                                    <Col span={22}className="store-name-info">
                                        {this.props.foodCart.storeName}
                                    </Col>
                                </Row>
                                {/* tên món ăn */}
                                <Row className="pt-1" >
                                    <h4 className="opensan-24-extrabold text-left">{foodDetail.foodName}</h4>
                                </Row>
                                {/* đánh giá */}
                                <Row  >
                                    <Rating               
                                        emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x"
                                        initialRating={foodDetail.rate}
                                        readonly
                                        style={{fontSize:'10px', color:'orange'}}
                                    />
                                </Row>
                                {/* giá tiền */}
                                <Row className="pt-2">
                                    <h5 className="font-weight-bold"> <NumberFormat value={foodDetail.price} displayType={'text'} thousandSeparator={','}/> đ</h5>
                                </Row>
                                {/* ghi chú */}
                                <Row className="py-2">
                                    <span className="text-left" className="food-description">{foodDetail.foodDescription}</span>
                                </Row>
                                {/* thẻ giảm giá */}
                                {foodDetail.promotion > 0? 
                                    <Row type="flex" justify="space-around" align="middle" className="py-3">
                                        <Col span={2}>
                                            <Icon component={PromotionTagIcon} className="promotion-icon"/>
                                        </Col>
                                        <Col span={22}>
                                            <span className="text-left opensan-20-semibold pl-3">{foodDetail.promotion}% Giảm giá toàn menu</span>
                                        </Col>
                                    </Row>
                                   :<span/>} 
                               {/* chọn số lượng */}
                               {foodOptions?<div>{foodOptions.map((foodOption, index) =>
                                    this.rendeSize(foodOption,index, foodDetail.foodId)
                                    )} </div>:<div/>}
                                <Row className="pt-2 mb-2">
                                    <h6 className="opensan-22-bold">Số lượng</h6>
                                </Row>
                                <Row>
                                    <Col span={9}>
                                        <Row className="quantity-button-wrapper">
                                            <Col span={8}>                                
                                                <button type="button" className="btn bg-white dec-inc-dish-info" onClick={this.DecreaseItem} ><FontAwesomeIcon icon={faMinus} /></button> 
                                            </Col>
                                            <Col span={8}>
                                                <div className="display-quantity-div">
                                                    { this.state.show ? <span>{this.state.clicks }</span> : '' }
                                                </div>
                                            </Col>
                                            <Col span={8}>
                                                <button type="button" className="btn bg-white dec-inc-dish-info" onClick={this.IncrementItem} ><FontAwesomeIcon icon={faPlus} /></button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            {/* cột chọn lựa chọn thêm cho món */}
                            <Col span={12}>
                                <ScrollArea speed={0.8}
                                verticalScrollbarStyle={{display:'none'}}
                                className="area"
                                contentClassName="content"
                                horizontal={false} style={{height: '610px'}}>
                                    {foodOptions?<div>{foodOptions.map((foodOption, index) =>
                                    this.renderOption(foodOption,index, foodDetail.foodId)
                                    )}{foodOptions.length > 0 ? <Row className="py-3 px-4 float-right">
                                    <button type="btn" className="btn restore-btn" onClick={() => this.handleResetDefault(this.props.foodDetail)}>
                                        <Row type="flex" justify="space-around" align="middle">
                                            <Col span={4}><Icon component={ResetIcon} className="reset-icon"/> </Col>
                                            <Col span={19} className="opensan-16-semibold pl-1 pr-4">Khôi phục mặc định</Col>
                                        </Row>
                                    </button>
                                </Row>: <div></div>}</div>:<div/>}
                                    
                                </ScrollArea>
                                
                            </Col>
                        </Row>
                        <Row type="flex" justify="end" className="h-100 py-4">
                            <Col span={14} className="px-2 h-100">
                                <Row type="flex" justify="end" className="total-price-dish-info">
                                    <Col span={8}> <h3 className="font-weight-bold text-right"><small>Tạm tính:</small></h3></Col>
                                    <Col span={10}><h3 className="font-weight-bold text-right"><NumberFormat value={this.state.totalPrice} displayType={'text'} thousandSeparator={','} /> đ</h3></Col>
                                </Row>
                            </Col>
                            <Col span={8} className="h-100" offset={1}>
                                {cartQuantity === 0 ? 
                                <button type="button" className="btn cart-button" onClick={()=>{this.addtoCartRequest(this.props.foodCart,this.state.clicks, this.state.optionList, this.state.priceSize, this.state.choosePriceSize)}}>
                                    <FontAwesomeIcon icon={faCartPlus} className="cart-plus-icon"/> Thêm vào giỏ
                                </button> :
                                <button type="button" className="btn cart-button" onClick={()=>{this.updateItemCartRequest(foodDetail.foodId,this.state.clicks,this.state.optionList,this.state.priceSize,this.state.choosePriceSize)}}>
                                    <FontAwesomeIcon icon={faCartPlus} className="cart-plus-icon"/> Cập nhật giỏ
                                </button> }
                                
                            </Col>
                        </Row>
                    </Col>

                    
                </Row>
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
        addtoCart: (food,quantity,optionList,priceSize, choosePriceSize)=>{
            dispatch(addToCart(food,quantity,optionList,priceSize,choosePriceSize))
        },
        updateCart: (id,quantity,optionList,priceSize, choosePriceSize)=>{
            dispatch(updateItemCart(id,quantity,optionList,priceSize, choosePriceSize))
        }
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DishInfo)
