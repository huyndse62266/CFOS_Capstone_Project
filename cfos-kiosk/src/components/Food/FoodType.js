import React, { Component } from 'react'
import FoodItem from './FoodItem'
import apiCaller from '../../utils/ApiCaller'
import {Col, Row} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp,faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import './Menu.scss'
class FoodType extends Component {

    constructor(){
        super();
        this.state ={
            isExpand: false,
            foods : []
        }
        this.checkIsExpand = this.checkIsExpand.bind(this);
    }

    componentWillMount(){
        
        if(this.props.type === 'promotion'){
            apiCaller(`category/${this.props.category.categoryId}/foods/promotion`,'GET',null).then(res => {
                this.setState({
                    foods: res.data
                })
            })
        }else if(this.props.type === 'popular'){ 
            apiCaller(`category/${this.props.category.categoryId}/foods-top`,'GET',null).then(res => {
                this.setState({
                    foods: res.data
                })
            })
        }else{ 
            apiCaller(`category/${this.props.category.categoryId}/foods`,'GET',null).then(res => {
                this.setState({
                    foods: res.data
                })
            })
        }
        

    }

    checkIsExpand(){
        this.setState({
            isExpand: !this.state.isExpand
        })
    
    }


    render() {
        var { category,categoryLength, index} = this.props;
        var { foods } = this.state;
        return (
            <div>

            
           
            <Row type="flex" justify="space-around" align="middle">
                <Col span={3}className="text-center h-100 bg-white" style={{margin:'auto', textAlign: 'center'}}>
                    <div>
                        <img src={category.image} className="image-category" alt="Not Found"/>
                        <h4 className="opensan-28-extrabold">{category.categoryName}</h4>
                        {foods ? foods.length > 4 ? <button type="button" className="btn opensan-16-semibold bg-light" onClick={this.checkIsExpand}>{this.state.isExpand === true ? <div>Thu gọn <FontAwesomeIcon icon={faAngleUp} /></div> : <div>Xem thêm <FontAwesomeIcon icon={faAngleDown} /></div> } </button>:<div/> : <div/>}
                    </div>
                </Col>
                
                <Col span={21} className="d-flex flex-column bg-light">
                    <Row type="flex" justify="start">
                     
                        {foods ? foods.map((food, index) => {
                            if(index < 4)
                                return (
                                    <Col span={6} className="px-4" key={index}>
                                        <FoodItem food={food}/>
                                    </Col> 
                                )
                            }) : <span></span>}
                    </Row>
                    <span id="more">
                        <Row type="flex" justify="start">
                            {this.state.isExpand ? foods.map((food, index) => {
                            if(index > 3)
                                return (
                                    <Col span={6} className="px-4">
                                        <FoodItem key={index} food={food} index={index}/>
                                    </Col> 
                                )
                            }): <span></span>}
                        </Row>
                    </span>
                    { categoryLength-1 !== index ? <hr style={{width: '95%'}}/>:<span/>}
                </Col>
            </Row>


            
            {/* {!this.props.items.length > 0 ? 
            <Row type="flex" justify="start">
                <Col className="category-wrapper">
                    <div>
                        <img src={category.image} className="image-category" alt="Not Found"/>
                        <h4 className="opensan-28-extrabold">{category.categoryName}</h4>
                        {foods ? foods.length >5 ? <button type="button" className="btn opensan-16-semibold bg-light" onClick={this.checkIsExpand}>{this.state.isExpand === true ? <div>Thu gọn <FontAwesomeIcon icon={faAngleUp} /></div> : <div>Xem thêm <FontAwesomeIcon icon={faAngleDown} /></div> } </button>:<div/> : <div/>}
                        
                    </div>
                </Col>
                
                <Col className="list-food-wrapper">
                    <Row type="flex" justify="start">
                 
                        {foods ? foods.map((food, index) => {
                            if(index < 5)
                                return (
                                    <Col style={{width:'20%'}} className="px-4" key={index} >
                                        <FoodItem food={food}/>
                                    </Col> 
                                )
                            }) : <span></span>}
                    </Row>
                    <span id="more">
                        <Row type="flex" justify="start">
                            {this.state.isExpand ? foods.map((food, index) => {
                            if(index > 4)
                                return (
                                    <Col style={{width:'20%'}}  className="px-4" key={index}>
                                        <FoodItem food={food}/>
                                    </Col> 
                                )
                            }): <span></span>}
                        </Row>
                    </span>
                    { categoryLength-1 !== index ? <hr style={{width: '95%'}}/>:<span/>}
                    
                </Col>
            </Row>
            :
            <Row type="flex" justify="space-around" align="middle">
                <Col span={3}className="text-center h-100 bg-white" style={{margin:'auto', textAlign: 'center'}}>
                    <div>
                        <h4 className="opensan-28-extrabold">{category.categoryName}</h4>
                        {foods ? foods.length > 4 ? <button type="button" className="btn opensan-16-semibold bg-light" onClick={this.checkIsExpand}>{this.state.isExpand === true ? <div>Thu gọn <FontAwesomeIcon icon={faAngleUp} /></div> : <div>Xem thêm <FontAwesomeIcon icon={faAngleDown} /></div> } </button>:<div/> : <div/>}
                    </div>
                </Col>
                
                <Col span={21} className="d-flex flex-column bg-light">
                    <Row type="flex" justify="start">
                     
                        {foods ? foods.map((food, index) => {
                            if(index < 4)
                                return (
                                    <Col span={6} className="px-4" key={index}>
                                        <FoodItem food={food}/>
                                    </Col> 
                                )
                            }) : <span></span>}
                    </Row>
                    <span id="more">
                        <Row type="flex" justify="start">
                            {this.state.isExpand ? foods.map((food, index) => {
                            if(index > 3)
                                return (
                                    <Col span={6} className="px-4">
                                        <FoodItem key={index} food={food} index={index}/>
                                    </Col> 
                                )
                            }): <span></span>}
                        </Row>
                    </span>
                    { categoryLength-1 !== index ? <hr style={{width: '95%'}}/>:<span/>}
                </Col>
            </Row>} */}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        items: state.cart.addedItems,
    }
}


export default connect(mapStateToProps, null)(FoodType);