import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes ,
  Route
} from "react-router-dom";
export default class App extends Component {
  static defaultProps={
    country:'in',
    pagesize:'15',
    category:'general',
    API : 'fed9d1efed2840909c391da37cfe3787'
}
  render() {
    
    return (
      <>
       <Router>
      <div>
       <Navbar/>
       <Routes>
       <Route exact path='/' element={<News pagesize={this.pagesize} key="general" country='in' category='general'  />}/>
       <Route exact path='/sports' element={<News pagesize={this.pagesize} key="sports"country='in' category='sports'  />}/>
       <Route exact path='/business' element={<News pagesize={this.pagesize} key="business" country='in' category='business'  />}/>
       <Route exact path='/health' element={<News pagesize={this.pagesize} key="health" country='in' category='health'  />}/>
       <Route exact path='/science' element={<News pagesize={this.pagesize} key="science" country='in' category='science'  />}/>
       <Route exact path='/technology' element={<News pagesize={this.pagesize} key="technology" country='in' category='technology'  />}/>
       </Routes>
      </div>
      </Router></>
    )
  }
}

