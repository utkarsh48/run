import React from 'react';
import Joi from 'joi-browser';
import Form from './common/Form';

class RegisterForm extends Form {
  state = { 
    data: { username: "", password: "" , name: ""},
    errors: {}
  }

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name")
  }
  
  doSubmit = () =>{
    console.log("submitted");
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            name: "username",
            label: "Username",
          })}
          {this.renderInput({
            name: "password",
            label: "Password",
          })}
          {this.renderInput({
            name: "name",
            label: "Name",
          })}
          {this.renderButton("Register")}
        </form>
      </div>
     );
  }
}
 
export default RegisterForm;