import { connect } from 'react-redux'
import Badge from './BadgeComponent'

const mapStateToProps = (state, ownProps) => {
  console.log('state', state)
  return {
    attendees: state.main.attendees             //масив обєктів

  }
}

export default connect(
  mapStateToProps)(Badge)