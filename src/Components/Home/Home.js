import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import './Home.css'


class Home extends Component {


render(){
 return (



     <div>

   <nav className = "nav">
  <Link  to ='timetable' className='timetable link'>Timetable</Link>
  <Link to ='advert' className="advert link">Adverts</Link>
  <Link to ='addStaff' className="add_staff link">Add Staff</Link>
  <div onClick = {() =>{

       this.props.authentication.signout();
      this.props.history.push('/signin')

  }} className="logout link">Logout</div>

   </nav>

     </div>




 )

}


}

export default withRouter(Home)
