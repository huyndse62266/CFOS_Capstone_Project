import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router,Switch } from "react-router-dom";
import MainScreen from './pages/Home/MainPage'
import ChoosePayment from './pages/Payment/ChoosePayment'
import CheckOrder from './pages/Order/CheckOrder'
import MenuPage from './pages/Menu/MenuPage'
import CompleteOrder from './pages/Order/CompleteOrder'
import MembershipPayment from './pages/Payment/MembershipPayment'
import PrintPage from './pages/Printer/PrintProcess'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/"  exact component={MainScreen}></Route>
        <Route path="/check-order" exact component={CheckOrder}></Route>
        <Route path="/menu" component={MenuPage}></Route>
        <Route path="/payment" exact component={({history}) => <ChoosePayment history={history}/>}></Route> 
        <Route path="/payment/membership" exact component={({history}) => <MembershipPayment history={history}/>}></Route> 
        <Route path="/complete" exact component={CompleteOrder}></Route> 
        <Route path="/print" exact component={PrintPage}></Route> 
      </Switch>
    </Router>
  );
}

export default App;
