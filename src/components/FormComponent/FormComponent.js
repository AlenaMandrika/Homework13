import React, { Component } from 'react'
import update from 'immutability-helper'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { EMAIL_REGEX, DIGIT_REGEX } from '../../emailValidationConstans'
import './Form.css'

export default class Form extends Component {
  constructor (props) {
    super(props)
    console.log('props', props)

    this.state = {
      attendeeList: this.props.attendeeList,
      startDate: moment(),
      errors: {},
    }

    this.changeInput = this.changeInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitAttendeeList = this.submitAttendeeList.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
  }

  componentDidMount () {
    console.log('props in component', this.props)
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

  submitAttendeeList () {
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
    } else if (this.state.attendeeList.email && !this.validateEmail(this.state.attendeeList.email)) {
      this.setState({errors: {emailError: 'Please choose a valid email'}})
      return
    }
    if (this.state.attendeeList.phone.length === 0) {
      this.setState({errors: {nameError: 'This field should not be blank'}})
      return
    }else if (this.state.attendeeList.phone) {
      if (this.state.attendeeList.phone.length < 8 || !DIGIT_REGEX.test(this.state.attendeeList.phone)) {
        this.setState({errors: {phoneError: 'Please provide a valid phone number'}})
        return
      }
    }

    if (this.state.attendeeList.address) {
      if (this.state.attendeeList.address.length < 10 || !this.state.attendeeList.address.length > 100) {
        this.setState({errors: {addressError: 'Min 10 characters, max 100'}})
        return
      }
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
      })

      let arrayOfLists = this.props.arrayOfLists
      arrayOfLists.push(this.state.attendeeList)
      this.props.changeStateProps('attendeeList', this.state.attendeeList)
      this.props.changeStateProps('arrayOfLists', arrayOfLists)
    }
  }

  validateEmail (email) {
    return EMAIL_REGEX.test(email)
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
                     value={this.state.firstName}
                     onChange={this.changeInput}/>

              <div className='invalid'>
                {this.state.errors.nameError}
              </div>
            </div>

            <div className='block'>
              <label htmlFor="lastName">lastName:</label>
              <input id="lastName"
                     className="form-control"
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
                name="date"
                dateFormat="YYYY/MM/DD"
              />
            </div>

            <div className='block'>
              <label htmlFor="email">email:</label>
              <input id="email"
                     className="form-control"
                     name='email'
                     type="email"
                     placeholder="email@gmail.com"
                     onChange={this.changeInput}/>
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
                     onChange={this.changeInput}/>
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
                        onChange={this.changeInput}/>
              <div className='invalid'>
                {this.state.errors.addressError}
              </div>
            </div>
            <button type="submit" value="Submit" className="button">Add attendee</button>
          </form>
        </div>
      </div>
    )
  }
}





