import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'



class Timetable extends Component{


  state = {
    isSignedIn:true
  }

  componentDidMount(){
console.log(sessionStorage.getItem('token'));
    axios.post('http://localhost:3002/staff/timetable',{
      token: sessionStorage.getItem('token')
    }).then((data)=>{
      console.log(data)


    }).catch(e=>{
      console.log('error')
      this.setState({isSignedIn:false})

      this.props.history.push('/register')

    })



  }

render(){


 return (

     <div>

   timetable page

     </div>




 )


}

}

export default withRouter(Timetable)
