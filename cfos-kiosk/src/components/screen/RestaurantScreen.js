import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import PreviewCart from '../Cart/PreviewCart/PreviewCart'
import StoreMenu from '../Food/StoreMenu'
import apiCaller from '../../utils/ApiCaller'
class RestaurantScreen extends Component {
    constructor(){
        super();
        this.state ={
            stores : []
        }
       
    }

    componentWillMount(){
        apiCaller(`stores/1`,'GET',null).then(res => {
            this.setState({
                stores: res.data
            })           
        })
    }


    render() {
        return (
 
            <Row className="pt-5" type="flex" justify="start">
                <div> 
                    <Col style={{width: '83%'}}>
                        {this.state.stores.map((store,index) =>{
                             return (<StoreMenu key={index} storeInfo={store} index={index}/>)
                        })}
                    </Col>
                    <Col style={{width: '17%', position:'fixed', top: '6%', right: 0}}>
                        <PreviewCart />
                    </Col>
                </div>
            </Row>
        //     <Row className="pt-5" type="flex" justify="start">
        //     {this.props.items.length > 0 ?
        //     <div> 
        //         <Col style={{width: '83%'}}>
        //             {this.state.stores.map((store,index) =>{
        //                  return (<StoreMenu key={index} storeInfo={store} index={index}/>)
        //             })}
        //         </Col>
        //         <Col style={{width: '17%', position:'fixed', top: '6%', right: 0}}>
        //             <PreviewCart />
        //         </Col>
        //     </div>:
        //         <Col span={24}>
        //             {this.state.stores.map((store,index) =>{
        //                 return (<StoreMenu key={index} storeInfo={store} index={index}/>)
        //             })}
        //         </Col>
        //     }
            
        // </Row>
        )
    }

}


const mapStateToProps = (state)=>{
    return{
        items: state.cart.addedItems,
    }
}

export default connect(mapStateToProps,null)(RestaurantScreen);

