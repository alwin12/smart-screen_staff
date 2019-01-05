import React,{Component} from 'react'
import axios from 'axios'
import * as EmailValidator from 'email-validator';
import {Redirect} from 'react-router-dom'
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,FormFeedback
} from 'reactstrap';

import './Register.css'



class Register extends Component {

    state ={

      email: '',
      password: '',
      validate:{
        validateEmail:true,
        validatePassword:true
      },
      isSignedIn: false
    }

onEmailChange = (event)=>{


  this.setState({email:event.target.value})

}
onPasswordChange = (event) =>{
  this.setState({password:event.target.value})

}
onSubmit = (event)=>{

  let validate = this.state.validate;
   validate.validateEmail = true;
   validate.validatePassword= true;
   this.setState({validate:validate})

      event.preventDefault();
     this.validator().then(()=>{


  axios.post('http://localhost:3002/staff/register',{

  email: this.state.email,
  password:this.state.password

}).then((resp)=>{

  console.log(resp.data);
//  sessionStorage.setItem('token', resp.data.token);

  if(resp.data.staff._id){

 //authorise user using authorisation object
   this.props.authentication.authenticate(resp.data.token)

   this.setState({isSignedIn:true});


  }



})

   }).catch(status=>{


    console.log('rejected')
    this.setState({validate:status})




})

}

 validator = () =>{

   const email = this.state.email;
   const password = this.state.password;


return  new Promise((resolve,reject)=>{


 let validate = this.state.validate;

if(email===''){

   validate.validateEmail = false
  console.log('email wrong')
  reject(validate);

}
if(password ===''){
  console.log('password wrong')
  validate.validatePassword = false;
  reject(validate);
}

if(!EmailValidator.validate(email)){

  validate.validateEmail = false;
  reject(validate);
}

resolve();



})



 }


render(){
  if (this.state.isSignedIn){
    return <Redirect to ='/home'/>
  }

return (




  <div className ='page'>


  <Container className="container">
          <h2>Welcome to TT System</h2>
          <Form className="form">
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="myemail@email.com"
                  onChange = {this.onEmailChange}
                />
          {  !this.state.validate.validateEmail &&   (

   <div className='error'> invalid email!</div>

//             <FormFeedback >
//  That's a tasty looking email you've got there.
//   cc
// </FormFeedback>


)
}
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="********"
                  onChange = {this.onPasswordChange}
                />
                {!this.state.validate.validatePassword && (<div className ='error'>invalid password!</div>)}
              </FormGroup>
            </Col>
            <Button onClick = {this.onSubmit}>Submit</Button>
          </Form>
        </Container>




  </div>
)




}

}

export default Register
