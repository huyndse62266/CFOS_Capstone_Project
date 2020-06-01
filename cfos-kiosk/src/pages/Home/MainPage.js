import React, { Component } from 'react'
import {Row,Col, Icon,Carousel} from 'antd'
import { Link } from "react-router-dom";
// import { Carousel } from 'react-responsive-carousel';
import {ReactComponent as Checkstatusicon } from '../../icons/Checkstatusicon.svg'
import {ReactComponent as FoodDrinkIcon } from '../../icons/FoodDrinkIcon.svg'
import {ReactComponent as LongArrowRight } from '../../icons/LongArrowRight.svg'
import {ReactComponent as Logo } from '../../images/logo.svg'
import apiCaller from '../../utils/ApiCaller';
import 'antd/dist/antd.css';
import './Main.css'
export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: '' 
    };
  }

  componentWillMount(){
    apiCaller(`get-banner?fcId=1`,'GET',null).then(res => {
        this.setState({
            banner: res.data.image
        })     
    })
}

    render() {
      var {banner} = this.state
        return (

          <div>
            <Row className="banner-wrapper">
              {/* <Carousel showThumbs = {false} emulateTouch = {true} autoPlay = {true} infiniteLoop= {true} dynamicHeight showArrows={false} className="carousel">
                  <div>
                    <img src={this.state.banner} className="banner-img"/>
                  </div>
                  <div>
                    <img src={this.state.banner} className="banner-img"/>
                  </div>
                  <div>
                    <img src={this.state.banner} className="banner-img"/>
                  </div>
              </Carousel> */}
              <Carousel autoplay className="carousel-wrapper">
                {banner.length > 0 ? banner.map((image, index) =>{
                  return(
                    <div key={index}>
                      <img src={image.image} className="banner-img"/>
                    </div>
                  )
                }):<div></div>}
    
              </Carousel>,
              <div className="logo-wrapper">
                <Icon component={Logo} className="logo"/>
              </div>
            </Row>
            <Row>
              <Col span={12} className="text-right p-5">
  
                <Link to="/check-order">
                  <button type="button" className="btn button-check">
                    <Row type="flex" justify="space-around" align="middle">
                      <Col span={4} className="home-icon"><Icon component={Checkstatusicon} /></Col>
                      <Col span={20}>Kiểm tra tình trạng món ăn</Col>
                    </Row>
                  </button>
                </Link>
              </Col>
              <Col span={12} className="text-left p-5">
                <Link to="/menu">
                  <button type="button" className="btn button-order" >
                    <Row type="flex" justify="space-around" align="middle">
                      <Col span={4} className="home-icon"><Icon component={FoodDrinkIcon} /></Col>
                      <Col span={16} className="check-status-title-button">Chạm để đặt món ăn</Col>
                      <Col span={4} className="home-icon"><Icon component={LongArrowRight} /></Col>
                    </Row>
                  </button>
                </Link>
              </Col>
            </Row>
            
            
          </div>
            
        )
    }
}
