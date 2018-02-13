import React, { Component } from 'react'
import update from 'immutability-helper'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { DIGIT_REGEX } from '../../emailValidationConstans'
import './Form.css'


export default class Form extends Component {
  constructor (props) {
    super(props)

    this.state = {
      attendeeList: this.props.attendeeList,
      startDate: moment(),
      errors: {},
    }
    this.changeInput = this.changeInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitAttendeeList = this.submitAttendeeList.bind(this)
  }

  //state update attendeeList
  changeInput ({target: {value, name}}) {
    this.setState({
      attendeeList: update(this.state.attendeeList, {
        [name]: {$set: value}
      })
    })
  }

  //update the status of the participant (date field)
  handleChange (target) {
    this.setState({
      startDate: target,
      attendeeList: update(this.state.attendeeList, {
        'date': {$set: target.toString()}
      })
    })
  }

  //validation function
  submitAttendeeList () {
    let re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    let errors = {}
    if (this.state.attendeeList.firstName.length === 0) {
      this.setState({errors: {nameError: 'This field should not be blank'}})
      return
    }
    if (this.state.attendeeList.lastName.length === 0) {
      this.setState({errors: {nameError: 'This field should not be blank'}})
      return
    }
    if (this.state.attendeeList.email.length === 0) {
      this.setState({errors: {nameError: 'This field should not be blank'}})
      return
    } else if (this.state.attendeeList.email && !re.test(this.state.attendeeList.email)) {
      this.setState({errors: {emailError: 'Please choose a valid email'}})
      return
    }
    if (this.state.attendeeList.phone.length === 0) {
      this.setState({errors: {nameError: 'This field should not be blank'}})
      return
    } else if (this.state.attendeeList.phone) {
      if (this.state.attendeeList.phone.length < 8 || !DIGIT_REGEX.test(this.state.attendeeList.phone)) {
        this.setState({errors: {phoneError: 'Please provide a valid phone number'}})
        return
      }
    }
    if (this.state.attendeeList.address.length === 0) {
      this.setState({errors: {nameError: 'This field should not be blank'}})
      return
    }

    this.setState({errors})

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
      }, () => {this.props.changeStateProps('attendeeList', this.state.attendeeList)})

      let arrayOfLists = this.props.arrayOfLists.slice()
      arrayOfLists.push(this.state.attendeeList)
      this.props.changeStateProps('arrayOfLists', arrayOfLists)
    }
  }

  render () {
    return (
      <div className="row">
        <div className="medium-6 medium-offset-3 columns">
          <form onSubmit={(e) => {
            e.preventDefault()
            this.submitAttendeeList()
          }}>
            <div className='block'>
              <label htmlFor="firstName">firstName:</label>
              <input id="firstName"
                     className="form-control"
                     type="text"
                     name='firstName'
                     placeholder="firstName"
                     onChange={this.changeInput}
                     value={this.state.attendeeList.firstName}/>

              <div className='invalid'>
                {!this.state.attendeeList.firstName.length ? this.state.errors.nameError : null}
              </div>
            </div>

            <div className='block'>
              <label htmlFor="lastName">lastName:</label>
              <input id="lastName"
                     className="form-control"
                     name='lastName'
                     type="text"
                     placeholder="lastName"
                     onChange={this.changeInput}
                     value={this.state.attendeeList.lastName}/>
              <div className='invalid'>
                {!this.state.attendeeList.lastName.length ? this.state.errors.nameError : null}
              </div>
            </div>

            <div className='block'>
              <label htmlFor="date">date:</label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                name="date"
                dateFormat="DD/MM/YYYY"
              />
            </div>

            <div className='block'>
              <label htmlFor="email">email:</label>
              <input id="email"
                     className="form-control"
                     name='email'
                     type="text"
                     placeholder="email@gmail.com"
                     onChange={this.changeInput}
                     value={this.state.attendeeList.email}/>
              <div className='invalid'>
                {!this.state.attendeeList.email.length ? this.state.errors.nameError : this.state.errors.emailError}
              </div>
            </div>

            <div className='block'>
              <label htmlFor="phone">phone:</label>
              <input id="phone"
                     className="form-control"
                     name='phone'
                     type="number"
                     placeholder="(***)**-**-***"
                     onChange={this.changeInput}
                     value={this.state.attendeeList.phone}/>
              <div className='invalid'>
                {!this.state.attendeeList.phone.length ? this.state.errors.nameError : this.state.errors.phoneError}
              </div>
            </div>

            <div className='block'>
              <label htmlFor="address">address:</label>
              <textarea id="address"
                        className="form-control"
                        name='address'
                        type="text"
                        placeholder="address"
                        onChange={this.changeInput}
                        value={this.state.attendeeList.address}/>
              <div className='invalid'>
                {!this.state.attendeeList.address.length ? this.state.errors.nameError : null}
              </div>
            </div>
            <button type="submit" value="Submit" className="button">Add attendee</button>
          </form>
        </div>
      </div>
    )
  }
}





