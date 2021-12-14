import './App.css';
import React,{useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes ,
  Route
} from "react-router-dom";

const App=()=> {
  let pagesize = 10;
  let API =process.env.REACT_APP_NEWS_API;
  const [progress, setProgress1] = useState(20)

  // const setProgress1=(element)=>{
  //   setprogress(element);
  // }
    
    return (
      <>
       <Router>
      <div>
      
       <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />
       <Navbar/>
       <Routes>
       <Route exact path='/' element={<News  API={API} setProgress={ setProgress1} pagesize={pagesize} key="general" country='in'   />}/>
       <Route exact path='/sports' element={<News  API={API} setProgress={ setProgress1} pagesize={pagesize} key="sports"country='in' category='sports'  />}/>
       <Route exact path='/business' element={<News  API={API} setProgress={setProgress1} pagesize={pagesize} key="business" country='in' category='business'  />}/>
       <Route exact path='/health' element={<News API={API}  setProgress={ setProgress1} pagesize={pagesize} key="health" country='in' category='health'  />}/>
       <Route exact path='/science' element={<News  API={API} setProgress={ setProgress1} pagesize={pagesize} key="science" country='in' category='science'  />}/>
       <Route exact path='/technology' element={<News  API={API} setProgress={ setProgress1} pagesize={pagesize} key="technology" country='in' category='technology'  />}/>
       </Routes>
      </div>
      </Router>
      </>
    )
  
}
export default App

