import React, { Component } from 'react'
export default class Badge extends Component {
  constructor (props) {
    super(props)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  // function that deletes a user from the lis
  handleOnClick (index) {
    let arrayOfLists = this.props.arrayOfLists.slice()
    arrayOfLists.splice(index, 1)
    this.props.changeStateProps('arrayOfLists', arrayOfLists)
  }

  // display information about the user
  render () {
    let style = {backgroundColor: 'red'}
    return (
      <div>
        <div className='badge' style={style}>
          {this.props.arrayOfLists.length ? this.props.arrayOfLists.map((list, index) => {
            return (
              <div key={index} className='item'>
                <p className='badge__title'><span className='hello-badge'>User</span><br />information:</p>
                <p className='badge__name'>{list.firstName}</p>
                <p className='badge__name'>{list.lastName}</p>
                <p className='badge__name'>{list.date}</p>
                <p className='badge__name'>{list.email}</p>
                <p className='badge__name'>{list.phone}</p>
                <p className='badge__name'>{list.address}</p>
                <button className='removeBtn' onClick={this.handleOnClick}> &times; Remove attendee</button>
              </div>
            )
          }) : ''}
        </div>
      </div>
    )
  }
}
