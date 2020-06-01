import React, { Component } from 'react'
import {Row,Col,Button} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faBackspace} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import './Numberpad.scss'
import {actFetchOrderRequest} from '../../../action/orders'
class Numberpad extends Component {

    constructor(){
        super();
        this.state ={
            number : ''
        }
    }

    addNumber = (num) =>{
        var a = this.state.number.concat(num);
        if(a.length <= 10){
            this.setState({
                number: a
            })
        }
       
    };
    subNumber = () =>{
        var a = this.state.number.substring(0,this.state.number.length-1);
        this.setState({
            number: a
        })
       
    };

    onSubmit = () =>{
        this.props.findOrder(this.state.number);
    }

    render() {
        return (
            <div className="px-5">
                <Row className="display-number-border py-5">
                    <Col type="flex" justify="space-around" align="middle">
                        <h3 className="font-weight-bold">Enter your order's number</h3>
                        <div className="display-number">
                            <h2 className="my-auto">{this.state.number}</h2>
                        </div>
                    </Col>
                </Row>
                <div className="py-5">
                    <Row className="py-2">
                        <Col span={8} className="px-2">
                            <Button className="number-div" onClick={()=>{this.addNumber('1')}}>
                                1   
                            </Button>
                        </Col>
                        <Col span={8} className="px-2">
                            <Button className="number-div" onClick={()=>{this.addNumber('2')}}>
                                2  
                            </Button>
                        </Col>
                        <Col span={8} className="px-2">
                            <Button className="number-div" onClick={()=>{this.addNumber('3')}}>
                                3  
                            </Button>
                        </Col>
                    
                    </Row>
                    <Row className="py-2">
                        <Col span={8} className="px-2">
                            <Button className="number-div" onClick={()=>{this.addNumber('4')}}>
                                4   
                            </Button>
                        </Col>
                        <Col span={8} className="px-2">
                            <Button className="number-div" onClick={()=>{this.addNumber('5')}}>
                                5  
                            </Button>
                        </Col>
                        <Col span={8} className="px-2">
                            <Button className="number-div" onClick={()=>{this.addNumber('6')}}>
                                6  
                            </Button>
                        </Col>
                    
                    </Row>
                    <Row className="py-2">
                        <Col span={8} className="px-2">
                            <Button className="number-div" onClick={()=>{this.addNumber('7')}}>
                                7   
                            </Button>
                        </Col>
                        <Col span={8} className="px-2">
                            <Button className="number-div" onClick={()=>{this.addNumber('8')}}>
                                8  
                            </Button>
                        </Col>
                        <Col span={8} className="px-2">
                            <Button className="number-div" onClick={()=>{this.addNumber('9')}}>
                                9  
                            </Button>
                        </Col>
                    
                    </Row>
                    <Row className="py-2">
                        <Col span={8} className="px-2">
                            <Button className="number-div" onClick={()=>{this.subNumber()}} >
                                <FontAwesomeIcon icon={faBackspace} />  
                            </Button>
                        </Col>
                        <Col span={8} className="px-2">
                            <Button className="number-div">
                                0  
                            </Button>
                        </Col>
                        <Col span={8} className="px-2">
                            <Button className="number-div" onClick={()=>{this.onSubmit()}} >
                                <FontAwesomeIcon icon={faCheck} style={{color:'green'}} />    
                            </Button>
                        </Col>
                    
                    </Row>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        findOrder: (number)=>{
            dispatch(actFetchOrderRequest(number))
        }
    }
}
export default connect(null,mapDispatchToProps)(Numberpad);