import React from 'react';
import Joi from 'joi-browser';
import Form from './common/Form';

class LoginForm extends Form {
  state = { 
    data: { username: "", password: "" },
    errors: {}
  }

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password")
  }

  validateProperty = ({name, value}) => {
    const obj = {[name]: value};
    const schema = {[name]: this.schema[name]};
    const {error} = Joi.validate(obj, schema);
    return error ? error.detalis[0].message : null;
  }

  validate = () => {
    const options = {abortEarly: false};
    const {error} = Joi.validate(this.state.data, this.schema, options);

    if(!error) return null;

    const errors = {};
    for(let item of error.details)
      errors[item.path[0]] = item.message;

    return errors;
  }

  handleChange = ({currentTarget: input}) => {
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);
    if(errorMessage) error[input.name] = errorMessage;
    else delete errors[input.name];

    this.setState({errors});
  }

  handleSubmit = e =>{
    e.preventDefault();

    const errors = this.validate();
    this.setState({errors: errors || {}});
    if(errors) return;

    this.doSubmit();
  }
  
  doSubmit = () =>{
    console.log("submitted");
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            name: "username",
            label: "Username",
          })}
          {this.renderInput({
            name: "password",
            label: "Password",
          })}
          {this.renderButton("Login")}
        </form>
      </div>
     );
  }
}
 
export default LoginForm;