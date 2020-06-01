import React, { Component } from 'react'
import { Row, Col  } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import NumberFormat from 'react-number-format';
import './Option.css'

export default class MoreOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
          clicks: 0,
          show: true,
          ResetDefault: this.props.isResetDefault
        };
    }
    IncrementOption = () => {
        var quantity = this.state.clicks;
        quantity += 1;
        this.setState({ clicks: this.state.clicks + 1 });
        this.props.IncrementOption(this.props.foodOption,quantity) 
        
    }
    DecreaseOption = () => {

        if(this.state.clicks > 0){
            var quantity = this.state.clicks;
            quantity -= 1;
            this.setState({ clicks: this.state.clicks - 1 });
            this.props.DecreaseOption(this.props.foodOption,quantity) 
        } 
         
    }
    ToggleClick = () => {
        this.setState({ show: !this.state.show });
    }

    componentDidMount(){
        if(this.props.optionQuatity){
            let optionCart = this.props.optionQuatity.find(option => option.foId === this.props.foodOption.foId)  
            if(optionCart){
                this.setState({
                    clicks: optionCart.quantity
                })
            }          
            
        }
        
    }
    render() {
        var {foodOption} = this.props
        if(this.state.ResetDefault === true){
            this.state.clicks = 0
            this.props.changeDefaultStatus(false)
        }
        return (
            <Row className=" border-bottom py-2">
                <Col span={16}>
                    <div className="row font-weight-bold">
                        {foodOption.foName}
                    </div>
                    <div className="row">
                        <span><NumberFormat value={foodOption.optionPrice} displayType={'text'} thousandSeparator={','} />  đ</span>
                    </div>
                </Col>
                <Col span={8}>
                    <div className="d-flex flex-row dec-inc-more-option">
                        <button  type="button" className="btn bg-white" style={{backgroundColor: '#D2D2D2'}} onClick={this.DecreaseOption} ><FontAwesomeIcon icon={faMinus} /></button>
                        <div className="px-3 py-2">
                            { this.state.show ? <span style={{fontSize:'1rem'}}>{ this.state.clicks }</span> : '' }
                        </div>
                        <button  type="button" className="btn bg-white mr-2" style={{backgroundColor: '#D2D2D2'}} onClick={this.IncrementOption} ><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                </Col>
            </Row>
        )
    }
}


