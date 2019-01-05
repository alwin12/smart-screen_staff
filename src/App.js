import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Redirect,Link,Switch} from 'react-router-dom'

import Home from './Components/Home/Home';
import Timetable from './Components/Timetable/Timetable';
import Register from './Components/Register/Register';
import Signin from './Components/Signin/Signin';
import './App.css';


const PrivateRoute = ({render: Component, ...rest})=>(

 <Route {...rest} render = {(props)=>(

  authentication.isAuthenticated ===true? <Component {...props}/> : <Redirect to ='/signin'/>

)} />

)

const authentication = {

  isAuthenticated: false,

  authenticate(token,cb) {
    this.isAuthenticated = true
  sessionStorage.setItem('token',token)
    setTimeout(cb,100)

  },
  signout(cb){
    this.isAuthenticated = false
   sessionStorage.removeItem('token')
    setTimeout(cb,100)
  }
}


class App extends Component
{



    render() {
      return (

       <Router>
       <div>
       <Route path ='/register' render = {()=>{
       return (<Register authentication = {authentication} />)
        }} />
        <Route path = 'signin' render = {()=>{

          return (<Signin authentication = {authentication}/>)
        }}/>

       <PrivateRoute path ='/home' render={()=>{
        return (<Home authentication = {authentication}/>)
       }
       }/>
       <PrivateRoute path = '/timetable' render = {()=>{
         return (<Timetable/>)
       }}/>


     </div>
     </Router>
           );
          }
}

export default App;
