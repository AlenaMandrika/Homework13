import React, { Component } from 'react';
import Badge from '../BadgeComponent/BadgeComponentContainer'

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import {EMAIL_REGEX, DIGIT_REGEX} from '../../emailValidationConstans'
import './Form.css'

export default class Form extends Component{
  componentDidMount () {
    console.log('props in component', this.props)
  }

  render() {
    return (
      <div>
        <h1>Attendees</h1>
        <hr/>
        <AddAttendee addAttendee={this.props.addAttendee} />
        <hr/>
        {/*<Attendees attendees={this.props.attendees} removeAttendee={this.props.removeAttendee}/>*/}
      </div>
    )
  }
}


class Attendees extends React.Component {

  componentDidMount () {
    console.log('props in component', this.props.attendees)
  }

  render() {
    return (
      <ul className="attendees">
        {this.props.attendees.map((attendee, index) =>
          <li className="attendees__attendee" key={index}>
            <Badge attendee={attendee} />
            <RemoveAttendee removeAttendee={this.props.removeAttendee} index={index} />
          </li>
        )}
      </ul>
    )
  }
}
class RemoveAttendee extends React.Component {
  handleOnClick() {
    let index = this.props.index;

    this.props.removeAttendee(index);
  }
  render() {
    return (
      <button className="alert button tiny" onClick={this.handleOnClick.bind(this)}> &times; Remove attendee</button>
    )
  }
}



const renderDatePicker = ({input, placeholder, defaultValue, label, meta: {touched, error} }) => (
  <div>
    <label>{label}</label>
    <div>
      <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null} />
      {touched && error && <div className='error'>{error}</div>}
    </div>
  </div>
);


class AddAttendee extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      startDate: moment(),
      isValid: true
    }
    this.changeInput = this.changeInput.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
  }


  handleSubmit(e) {
    // Stop page refreshing
    e.preventDefault();

    let refs = this.refs;
    let firstName = refs.firstName.value;
    let lastName = refs.lastName.value;
    let date = refs.date.value;
    let email = refs.email.value;
    let phone = refs.phone.value;
    let address = refs.address.value;

    // Trigger action
    this.props.addAttendee(firstName, lastName, date, email, phone, address);

    // Reset form
    refs.addAttendee.reset();
  }

  changeInput ({target: {value, name}}) {
    console.log('value', value, name)
    let errors = {}
    this.setState({
      isValid: true
    })

    if (name === 'firstName' && (!value || value.length === 0)) {
      errors['nameError'] = 'This field should not be blank.'
      this.setState({
        isValid: false
      })
    }
    if (name === 'lastName' && (!value || value.length === 0)) {
      errors['nameError'] = 'This field should not be blank.'
      this.setState({
        isValid: false
      })
    }
    if (name === 'email' && (!value || value.length === 0)) {
      errors['emailError'] = 'This field should not be blank.'
      this.setState({
        isValid: false
      })
    } else if (name === 'email' && !this.validateEmail(value)) {
      errors['emailError'] = 'Please choose a valid email.'
      this.setState({
        isValid: false
      })
    }
    if (name === 'phone' && value) {
      if (value.length < 8 || !DIGIT_REGEX.test(value)) {
        errors['phoneError'] = 'Please provide a valid phone number.'
        this.setState({
          isValid: false
        })
      }
    }
    if (name === "address") {
      if (value.length < 10 || !value.length > 100) {
        errors['addressError'] = 'Min 10 characters, max 100'
        this.setState({
          isValid: false
        })
      }
    }


    this.setState({errors})
  }

  validateEmail(email) {
    return EMAIL_REGEX.test(email);
  }

  render() {
    return (
      <div className="row">
        <div className="medium-6 medium-offset-3 columns">
          <form ref="addAttendee" onSubmit={this.handleSubmit.bind(this)}>
            <div className='block'>
              <label htmlFor="firstName">firstName:</label>
              <input id="firstName"
                     className={`form-control ${this.state.errors.nameError ? "is-invalid" : null}`}
                     type="text"
                     ref="firstName"
                     name='firstName'
                     placeholder="firstName"
                     onChange={this.changeInput}/>
              <div className='invalid'>
                {this.state.errors.nameError}
              </div>
            </div>

            <div className='block'>
              <label htmlFor="lastName">lastName:</label>
              <input id="lastName"
                     className={`form-control ${this.state.errors.nameError ? "is-invalid" : null}`}
                     name='lastName'
                     type="text"
                     ref="lastName"
                     placeholder="lastName"
                     onChange={this.changeInput}/>
              <div className='invalid'>
                {this.state.errors.nameError}
              </div>
            </div>

            <div className='block'>
              <label htmlFor="date">date:</label>
              <input id="date"
                     className='valid'
                     type="date"
                     ref="date"
                     placeholder="date"
                     component={renderDatePicker}/>
              <div>

              </div>
            </div>

            <div className='block'>
              <label htmlFor="email">email:</label>
              <input id="email"
                     className={`form-control ${this.state.errors.nameError ? "is-invalid" : null}`}
                     name='email'
                     type="email"
                     ref="email"
                     placeholder="email@gmail.com"
                     onChange={this.changeInput}/>
              <div className='invalid'>
                {this.state.errors.nameError}
              </div>
            </div>

            <div className='block'>
              <label htmlFor="phone">phone:</label>
              <input id="phone"
                     name='phone'
                     className={`form-control ${this.state.errors.nameError ? "is-invalid" : null}`}
                     type="number"
                     ref="phone"
                     placeholder="(***)**-**-***"
                     onChange={this.changeInput}/>
              <div className='invalid'>
                {this.state.errors.nameError}
              </div>
            </div>

            <div className='block'>
              <label htmlFor="address">address:</label>
              <textarea id="address"
                     name='address'
                     className={`form-control ${this.state.errors.nameError ? "is-invalid" : null}`}
                     type="text"
                     ref="address"
                     placeholder="address"
                     onChange={this.changeInput}/>
              <div className='invalid'>
                {this.state.errors.nameError}
              </div>
            </div>
            <button type="submit" className="button">Add attendee</button>
          </form>
        </div>
      </div>
    )
  }
}



