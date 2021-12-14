import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes ,
  Route
} from "react-router-dom";

export default class App extends Component {
  pagesize = 10;
  API =process.env.REACT_APP_NEWS_API;
  setProgress=(progress)=>
  {
    this.setState({progress:progress})
  }
  state = {
    progress: 10
  }
 
  render() {
    
    return (
      <>
       <Router>
      <div>
      
       <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
      />
       <Navbar/>
       <Routes>
       <Route exact path='/' element={<News  API={this.API} setProgress={ this.setProgress} pagesize={this.pagesize} key="general" country='in'   />}/>
       <Route exact path='/sports' element={<News  API={this.API} setProgress={ this.setProgress} pagesize={this.pagesize} key="sports"country='in' category='sports'  />}/>
       <Route exact path='/business' element={<News  API={this.API} setProgress={this.setProgress} pagesize={this.pagesize} key="business" country='in' category='business'  />}/>
       <Route exact path='/health' element={<News API={this.API}  setProgress={ this.setProgress} pagesize={this.pagesize} key="health" country='in' category='health'  />}/>
       <Route exact path='/science' element={<News  API={this.API} setProgress={ this.setProgress} pagesize={this.pagesize} key="science" country='in' category='science'  />}/>
       <Route exact path='/technology' element={<News  API={this.API} setProgress={ this.setProgress} pagesize={this.pagesize} key="technology" country='in' category='technology'  />}/>
       </Routes>
      </div>
      </Router></>
    )
  }
}

