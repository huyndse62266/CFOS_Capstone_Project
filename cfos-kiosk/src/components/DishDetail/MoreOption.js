import React, { Component } from 'react'
import { Row, Col  } from 'antd';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import NumberFormat from 'react-number-format';
import {actDecOption, actIncOption} from '../../action/options'
class MoreOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
          clicks: 0,
          show: true
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
        return (
            <Row className=" border-bottom px-2 py-1">
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
                        <button  type="button" className="btn" style={{backgroundColor: '#D2D2D2'}} onClick={this.DecreaseOption} ><FontAwesomeIcon icon={faMinus} /></button>
                        <div className="px-3 py-1">
                            { this.state.show ? <h2 style={{fontSize:'1rem'}}>{ this.state.clicks }</h2> : '' }
                        </div>
                        <button  type="button" className="btn" style={{backgroundColor: '#D2D2D2'}} onClick={this.IncrementOption} ><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                   
                </Col>
            </Row>
        )
    }
}


const mapDispatchToProps= (dispatch)=>{
    return{
        incQuantity: (foodOption, foodId)=>{
     
            // dispatch(actIncOption(foodOption, foodId))
        },
        decQuantity: (foodOption, foodId)=>{
            // dispatch(actDecOption(foodOption, foodId))
        },
    }
}
export default connect(null,mapDispatchToProps)(MoreOption);