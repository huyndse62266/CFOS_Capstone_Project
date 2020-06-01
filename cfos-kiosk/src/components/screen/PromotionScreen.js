import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { connect } from 'react-redux'
import FoodType from '../Food/FoodType'
import PreviewCart from '../Cart/PreviewCart/PreviewCart'
import apiCaller from '../../utils/ApiCaller'



 class PromotionScreen extends Component {
    constructor(){
        super();
        this.state ={
            categories : []
        }
       
    }

    componentWillMount(){
        apiCaller(`fc/categories?fcId=1`,'GET',null).then(res => {
            this.setState({
                categories: res.data
            })
        })
    }

    

    render() {
        return(
            <Row className="pt-5" type="flex" justify="start">
                <div> 
                    <Col style={{width: '83%'}}>
                        {this.state.categories.map((category,index) =>{
                            return (<FoodType key={index} category={category} index={index} categoryLength={this.state.categories.length} type={'promotion'}/>)
                        })}
                    </Col>
                    <Col style={{width: '17%', position:'fixed', top: '6%', right: 0}}>
                        <PreviewCart />
                    </Col>
                </div>
            </Row>

            // <Row className="pt-5" type="flex" justify="start">
            // {this.props.items.length > 0 ?
            // <div> 
            //     <Col style={{width: '83%'}}>
            //         {this.state.categories.map((category,index) =>{
            //             return (<FoodType key={index} category={category} index={index} categoryLength={this.state.categories.length} type={'promotion'}/>)
            //         })}
            //     </Col>
            //     <Col style={{width: '17%', position:'fixed', top: '6%', right: 0}}>
            //         <PreviewCart />
            //     </Col>
            // </div>:
            // <Col span={24}>
            //     {this.state.categories.map((category,index) =>{
            //         return (<FoodType key={index} category={category} index={index} categoryLength={this.state.categories.length} type={'promotion'}  />)
            //     })}
            // </Col>
            // }
            // </Row>
        )
        
    }
}


const mapStateToProps = (state)=>{
    return{
        items: state.cart.addedItems,
    }
}

export default connect(mapStateToProps,null)(PromotionScreen);
