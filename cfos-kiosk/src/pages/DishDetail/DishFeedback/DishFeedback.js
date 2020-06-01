import React, { Component } from 'react'
import { Row,Col,Icon } from 'antd';
import Rating from 'react-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NumberFormat from 'react-number-format';
import { faStar  as faStaro, faCommentDots} from '@fortawesome/free-regular-svg-icons'
import {ReactComponent as StoreIcon } from '../../../icons/StoreIcon.svg'
import {ReactComponent as StoreLocation } from '../../../icons/Store Location icon.svg'
import {ReactComponent as CommentIcon } from '../../../icons/Comment icon.svg'
import NoFeedbackImg from '../../../images/Review empty illustration.png'
import './DishFeedback.css'

export default class DishFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
          clicks: 0,
          show: true,
          data: ''
        };
    }
    IncrementItem = () => {
        this.setState({ clicks: this.state.clicks + 1 });
    }
    DecreaseItem = () => {
        this.setState({ clicks: this.state.clicks - 1 });
    }
    ToggleClick = () => {
        this.setState({ show: !this.state.show });
    }

    componentWillReceiveProps({foodDetail}){
        if(foodDetail){
            this.setState({
                data: foodDetail
            })
        }
        
    }

    render() {
        var {foodDetail} = this.props;    
        var {feedbackVMS} = foodDetail;

        
        return (
            <Row type="flex" justify="start" className="h-100">
                <Col span={8} className="info-feedback-container">
                    <div className="feedback-info">
                        <h3><FontAwesomeIcon icon={faStaro} className="avarage-star-icon"/>{foodDetail.rate}</h3>
                        <h6 className="rate-count">Trên tổng 35 đánh giá</h6>
                        <Rating               
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            initialRating={foodDetail.rate}
                            readonly
                            className="star-rate-style"/>
                        <h6 className="number-feedback"><FontAwesomeIcon icon={faCommentDots} className="number-feedback-icon"/> 
                            {this.props.foodDetail.feedbackVMS ? <span className="px-2">{this.props.foodDetail.feedbackVMS.length} ý kiến</span> : <span className="px-2">Không có ý kiến</span>}
                        </h6>
                    </div>
                    <div className="food-info">
                        <h5 className="opensan-24-bold mb-0 py-1">{foodDetail.foodName}</h5>
                        <Row type="flex" justify="space-around" align="middle" className="py-1">
                            <Col span={2}><Icon component={StoreLocation}  className="store-location-icon-feedback"/></Col>
                            <Col span={22}>
                                <h6 className="store-name-info mb-0">
                                    {this.state.data ? this.state.data.storeVM.storeName    : <div/>}
                                </h6>
                            </Col>
                        </Row>
                        
                        <h6 className="food-price py-1"><NumberFormat value={foodDetail.price} displayType={'text'} thousandSeparator={','}/> <u>đ</u></h6>
                    </div>
                    <div className="food-court-info">
                        <Row type="flex" justify="space-around" align="middle">
                            <Col span={2}><Icon component={StoreIcon} className="food-court-icon"/></Col>
                            <Col span={22}>
                                <h6 className="opensan-16-semibold mb-0">
                                    Khu ẩm thực
                                </h6>
                            </Col>
                        </Row>
                        <h5 className="opensan-24-bold">{this.state.data ? this.state.data.foodCourtVM.fcName: <div/>}</h5>
                        <h6 className="food-court-address">{this.state.data ? this.state.data.foodCourtVM.fcLocation: <div/>}</h6>
                    </div>
                </Col>        
                <Col span={16} className="feedback-container">
                    
                    <Row className="w-100 h-100">
                        {this.state.data ? !feedbackVMS.length > 0 ? <div className="w-100">
                            <Row className="text-center">
                                <img src={NoFeedbackImg} className="no-feedback-img"/>
                            </Row>
                            <Row type="flex" justify="center" className="pt-4">
                                <Col span={13} className="text-center">
                                    <span className="opensan-32-semibold ">Chưa có đánh giá</span><br/>
                                    <span className="comment-press-meal">Chia sẽ cảm nhận của bạn về món ăn (Trên ứng dụng Press Meal)</span>
                                </Col>
                            </Row>
                        </div> : <div>
                            <Row>
                                <h6>Đánh giá ({this.props.foodDetail.feedbackVMS ? <span>{this.props.foodDetail.feedbackVMS.length}</span> : <span>0</span>})</h6>
                            </Row>
                           {feedbackVMS.map((feedback, index) => 
                                <Row className="feedback-wrapper" type="flex" justify="center" align="top" key={index}>
                                    <Col className="icon-wrapper" span={2}><Icon component={CommentIcon} className="comment-icon"/></Col>
                                    <Col className="feedback-content" span={22}><Rating               
                                        emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x"
                                        initialRating={feedback.rate}
                                        readonly
                                        style={{fontSize:'8px',color:'orange'}}/>
                                    <h6 className="py-1">{feedback.fbContent} </h6>
                                    </Col>
                            </Row>) }
                        </div>: <div/>}
                    </Row>
                </Col>        
            </Row>
        )
    }
}


{/* <div>
                            
                            <Row>
                                <h6>Đánh giá ({this.props.foodDetail.feedbackVMS ? <span>{this.props.foodDetail.feedbackVMS.length}</span> : <span>0</span>})</h6>
                            </Row>
                            feedbackVMS.map((feedback, index) => 
                            <Row className="feedback-wrapper" type="flex" justify="start">
                                <Col className="icon-wrapper"><FontAwesomeIcon icon={faCommentDots}/></Col>
                                <Col className="feedback-content"><Rating               
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    initialRating={feedback.rate}
                                    readonly
                                    style={{fontSize:'8px',color:'orange'}}/>
                                <h6 className="py-1">{feedback.fbContent} </h6>
                                </Col>
                            </Row> 
                        </div> */}