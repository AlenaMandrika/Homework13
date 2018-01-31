import React, { Component } from 'react';

export default class Badge extends Component {
  componentDidMount () {
    console.log('props in component Badge', this.props)
  }
  render() {
    let style = {backgroundColor: 'red'};
    return (
      <div className="badge" style={style}>
        <p className="badge__title"><span className="hello-badge">User</span><br />information:</p>
        <p className="badge__name">{this.props.attendee.firstName}</p>
        <p className="badge__name">{this.props.attendee.lastName}</p>
        <p className="badge__name">{this.props.attendee.date}</p>
        <p className="badge__name">{this.props.attendee.email}</p>
        <p className="badge__name">{this.props.attendee.phone}</p>
        <p className="badge__name">{this.props.attendee.address}</p>
      </div>
    )
  }
}