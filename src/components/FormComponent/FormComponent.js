import React, { Component } from 'react';

import update from 'immutability-helper'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import {EMAIL_REGEX, DIGIT_REGEX} from '../../emailValidationConstans'

import './Form.css'

export default class Form extends Component{
  componentDidMount () {
    console.log('props in component', this.props)
  }

  constructor (props) {
    super(props)
    this.state = {
      attendeeList : this.props.attendeeList,
      startDate: moment(),
      errors: {},

    }
    this.changeInput = this.changeInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitAttendeeList = this.submitAttendeeList.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
  }

  changeInput ({target: {value, name}}) {
    this.setState({
      attendeeList: update(this.state.attendeeList, {
        [name]: {$set: value}
      })
    })

  }
  handleChange (target) {
    this.setState({
      startDate: target,
      attendeeList: update(this.state.attendeeList, {
        'date': {$set: target.toString()}
      })
    })

  }

  submitAttendeeList ({target: {value, name}}) {
    let errors = {}

    if (this.state.attendeeList.firstName === '' || this.state.attendeeList.firstName.length === 1) {
      errors.firstName_error = 'The field is required'
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

    this.props.changeStateProps('errors', this.state.errors)

    if (Object.keys(errors).length === 0) {
      this.props.changeStateProps('attendeeList', this.state.attendeeList)
      this.setState({
        errors: {},
        attendeeList: {
          firstName: '',
          lastName: '',
          date: '',
          email: '',
          phone: '',
          address: ''
        }
      })
      this.props.changeStateProps('attendeeList', this.state.attendeeList)
    }
  }

  validateEmail(email) {
    return EMAIL_REGEX.test(email);
  }

  render() {
    return (
      <div className="row">
        <div className="medium-6 medium-offset-3 columns">
          <form>
            <div className='block'>
              <label htmlFor="firstName">firstName:</label>
              <input id="firstName"
                     className="form-control"
                     type="text"
                     name='firstName'
                     placeholder="firstName"
                     onChange={this.changeInput}/>
              <div className='invalid'>
                {this.state.errors.firstName_error}
              </div>
            </div>

            <div className='block'>
              <label htmlFor="lastName">lastName:</label>
              <input id="lastName"
                     name='lastName'
                     type="text"
                     placeholder="lastName"
                     onChange={this.changeInput}/>
              <div className='invalid'>
                {this.state.errors.nameError}
              </div>
            </div>

            <div className='block'>
              <label htmlFor="date">date:</label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                name="dateJfBirth"
                dateFormat="YYYY/MM/DD"
              />
              <div>

              </div>
            </div>

            <div className='block'>
              <label htmlFor="email">email:</label>
              <input id="email"
                     name='email'
                     type="email"
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
                     type="number"
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
                        type="text"
                        placeholder="address"
                        onChange={this.changeInput}/>
              <div className='invalid'>
                {this.state.errors.nameError}
              </div>
            </div>
            <button type="submit" value="Submit" onClick={this.submitAttendeeList} className="button">Add attendee</button>
          </form>
        </div>
      </div>
    )
  }
}

// class RemoveAttendee extends Component {
//   handleOnClick() {
//     let index = this.props.index;
//
//     this.props.removeAttendee(index);
//   }
//   render() {
//     return (
//       <button className="alert button tiny" onClick={this.handleOnClick.bind(this)}> &times; Remove attendee</button>
//     )
//   }
// }




