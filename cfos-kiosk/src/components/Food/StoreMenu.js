import React, { Component } from 'react'
import FoodItem from './FoodItem'
import apiCaller from '../../utils/ApiCaller'
import {Col, Row, Button} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import './Menu.scss'
class StoreMenu extends Component {

    constructor(){
        super();
        this.state ={
            isExpand: false,
            foods : [],
            foodFilter : [],
        }
        this.checkIsExpand = this.checkIsExpand.bind(this);
    }

    componentWillMount(){
        apiCaller(`store/${this.props.storeInfo.storeId}/foods/`,'GET',null).then(res => {
            this.setState({              
                foods: res.data,
                foodFilter : res.data
            })
        })
    }

    checkIsExpand(){
        this.setState({
            isExpand: !this.state.isExpand
        })
    
    }

    buttonMore(){
        if (this.state.isExpand) {
            return (<Row>
                <Col span={14} offset={5}>
                    <Button className="store-category" onClick={()=>{this.findAll()}}>All</Button>

                </Col>
            </Row>)
        }
        
    }
    buttonMoreDetail(categories){
        if (this.state.isExpand) {
            
            return categories.map((category, index) => {
                return (
                    <Row>
                        <Col span={14} offset={5} key={index}>
                            <Button className="store-category opensan-20-bold" onClick={()=>{this.findByCategory(category.categoryId)}}>{category.categoryName}</Button>
                        </Col>
                    </Row>
                )
            })
            
        }
    }

    findByCategory = (id) =>{
        var { foods} = this.state;
        let a = foods.filter(food => food.storeCategoryId === id)
        this.setState({
            foodFilter: a
        })
    }

    findAll = () =>{
        var { foods} = this.state;
        let a = foods.filter(food => food.storeCategoryId === 0)
        this.setState({
            foodFilter: this.state.foods
        })
    }
    render() {
        var { storeInfo,categoryLength, index } = this.props;
        var { foods, foodFilter} = this.state;
        
        return (
            <div>
        
                <Row type="flex" justify="start">
                    <Col span={3} className="text-center h-100" >
                        <div style={{marginTop:'10%'}}>
                            <h4 className="opensan-28-extrabold">{storeInfo.storeName}</h4>
                            <img src={storeInfo.storeIcon} className="image-category"/>
                            {this.buttonMore()}
                            {this.buttonMoreDetail(storeInfo.categoryVMList)}
                            <Row>
                                <Col span={16} offset={4}>
                                    <button type="button" className="btn opensan-16-semibold bg-light mt-3 w-100" onClick={this.checkIsExpand}>{this.state.isExpand === true ? <div>Thu gọn <FontAwesomeIcon icon={faAngleUp} /></div> : <div>Xem thêm <FontAwesomeIcon icon={faAngleDown} /></div> } </button>
                                </Col>      
                            </Row>                  
                        </div>
                    </Col>
                    <Col span={21} className="store-menu-cart-wrapper">
                        <Row type="flex" justify="start">
                            {this.state.foodFilter.length > 0 ? foodFilter.map((food, index) => {
                                if(index < 4){
                                    return (
                                        <Col span={6} className="px-4" key={index}>
                                            <FoodItem key={index} food={food} index={index}/>
                                        </Col> 
                                    )
                                }
                                
                            }):<span></span>}
                        </Row>
                        <span id="more">
                            <Row type="flex" justify="start">
                                {this.state.isExpand ? foodFilter.map((food, index) => {
                                if(index > 3)
                                    return (
                                        <Col span={6} className="px-4" key={index}>
                                            <FoodItem key={index} food={food} index={index}/>
                                        </Col> 
                                    )
                                }): <span></span>}
                            </Row>
                        </span>
                        { categoryLength-1 !== index ? <hr style={{width: '95%'}}/>:<span/>}
                    </Col>
                </Row>
            </div>

          
            // <div>
            //     {!this.props.items.length > 0 ?
            //     <Row type="flex" justify="start">
            //         <Col className="text-center h-100" style={{ width: '10.4%'}}>
            //             <div style={{marginTop:'10%'}}>
            //                 <img src={storeInfo.storeIcon} className="image-category"/>
            //                 <h4 className="opensan-28-extrabold">{storeInfo.storeName}</h4>
            //                 {this.buttonMore()}
            //                 {this.buttonMoreDetail(storeInfo.categoryVMList)}
            //                 <Row>
            //                     <Col span={16} offset={4}>
            //                         <button type="button" className="btn opensan-16-semibold bg-light mt-3 w-100" onClick={this.checkIsExpand}>{this.state.isExpand === true ? <div>Thu gọn <FontAwesomeIcon icon={faAngleUp} /></div> : <div>Xem thêm <FontAwesomeIcon icon={faAngleDown} /></div> } </button>
            //                     </Col>
            //                 </Row>
                            
            //             </div>
            //         </Col>
            //         <Col className="list-food-wrapper">
            //             <Row type="flex" justify="start">
            //                 {this.state.foodFilter.length > 0 ? foodFilter.map((food, index) => {
            //                     if(index < 5){
            //                         return (
            //                             <Col style={{width:'20%'}} className="px-4">
            //                                 <FoodItem key={index} food={food} index={index}/>
            //                             </Col> 
            //                         )
            //                     }
                                
            //                 }):<span></span>}
            //             </Row>  
            //             <span id="more">
            //                 <Row type="flex" justify="start">
            //                     {this.state.isExpand ? foodFilter.map((food, index) => {
            //                     if(index > 4)
            //                         return (
            //                             <Col style={{width:'20%'}}  className="px-4">
            //                                 <FoodItem key={index} food={food} index={index}/>
            //                             </Col> 
            //                         )
            //                     }): <span></span>}
            //                 </Row>
            //             </span>
            //             { categoryLength-1 !== index ? <hr style={{width: '95%'}}/>:<span/>}
            //         </Col>
            //     </Row>:
            //     <Row type="flex" justify="start">
            //         <Col span={3} className="text-center h-100" >
            //             <div style={{marginTop:'10%'}}>
            //                 <h4 className="opensan-28-extrabold">{storeInfo.storeName}</h4>
            //                 <img src={storeInfo.storeIcon} className="image-category"/>
            //                 {this.buttonMore()}
            //                 {this.buttonMoreDetail(storeInfo.categoryVMList)}
            //                 <Row>
            //                     <Col span={16} offset={4}>
            //                         <button type="button" className="btn opensan-16-semibold bg-light mt-3 w-100" onClick={this.checkIsExpand}>{this.state.isExpand === true ? <div>Thu gọn <FontAwesomeIcon icon={faAngleUp} /></div> : <div>Xem thêm <FontAwesomeIcon icon={faAngleDown} /></div> } </button>
            //                     </Col>      
            //                 </Row>                  
            //             </div>
            //         </Col>
            //         <Col span={21} className="store-menu-cart-wrapper">
            //             <Row type="flex" justify="start">
            //                 {this.state.foodFilter.length > 0 ? foodFilter.map((food, index) => {
            //                     if(index < 4){
            //                         return (
            //                             <Col span={6} className="px-4">
            //                                 <FoodItem key={index} food={food} index={index}/>
            //                             </Col> 
            //                         )
            //                     }
                                
            //                 }):<span></span>}
            //             </Row>
            //             <span id="more">
            //                 <Row type="flex" justify="start">
            //                     {this.state.isExpand ? foodFilter.map((food, index) => {
            //                     if(index > 3)
            //                         return (
            //                             <Col span={6} className="px-4">
            //                                 <FoodItem key={index} food={food} index={index}/>
            //                             </Col> 
            //                         )
            //                     }): <span></span>}
            //                 </Row>
            //             </span>
            //             { categoryLength-1 !== index ? <hr style={{width: '95%'}}/>:<span/>}
            //         </Col>
            //     </Row>}
            // </div>
            
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        myFoods: state.foods,
        items: state.cart.addedItems,
    }
}


export default connect(mapStateToProps, null)(StoreMenu);