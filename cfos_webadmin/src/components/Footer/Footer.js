import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer-custom">
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="float-left">
                                    <h4>A CAPSTONE PROJECT AT <img className="px-3" src="https://daihoc.fpt.edu.vn/media/2016/12/Logo-FU-01.png" alt="..."/></h4>
                                    
                                </div>
                            </div>
                            <div className=" d-flex justify-content-end align-items-center col-lg-6">
                                <div className="float-right" style={{marginRight:"30px"}}>
                                    <h5>© 2019 Copyright by <p className="text-info">CFOS Team</p></h5>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}
