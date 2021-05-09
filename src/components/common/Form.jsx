import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './Input';
import Select from './Select';

class Form extends Component {
  state = { 
    data: {}, errors: {}
   }

  validateProperty = ({name, value}) => {
    const obj = {[name]: value};
    const schema = {[name]: this.schema[name]};
    console.log(schema, obj);
    const {error} = Joi.validate(obj, schema, { abortEarly: false });
    return error ? error.details[0].message : null;
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
    if(errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = {...this.state.data};
    data[input.name] = input.value;
    this.setState({errors, data});
  }

  handleSubmit = e =>{
    e.preventDefault();

    const errors = this.validate();
    this.setState({errors: errors || {}});
    if(errors) return;

    this.doSubmit();
  }

  renderButton = label => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">{label}</button>
    );
  }

  renderInput = (name, label, type="text") => {
    const {data, errors} = this.state;

    return (
      <Input 
      id={name}
      name={name} 
      value={data[name]} 
      error={errors[name]} 
      label={label} 
      type={type}
      onChange={this.handleChange} />
    );
  }
  
  renderSelect = (name, label, options) => {
    const {data, errors} = this.state;
  
    return (
      <Select
      options={options}
      id={name}
      name={name} 
      value={data[name]} 
      error={errors[name]} 
      label={label} 
      onChange={this.handleChange} />
    );
  }
}
 
export default Form;