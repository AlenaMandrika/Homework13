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
        <p className="badge__name">{this.props.attendees.firstName}</p>
        <p className="badge__name">{this.props.attendees.lastName}</p>
        <p className="badge__name">{this.props.attendees.date}</p>
        <p className="badge__name">{this.props.attendees.email}</p>
        <p className="badge__name">{this.props.attendees.phone}</p>
        <p className="badge__name">{this.props.attendees.address}</p>
      </div>
    )
  }
}