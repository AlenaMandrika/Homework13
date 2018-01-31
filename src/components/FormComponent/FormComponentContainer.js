import Form from './FormComponent'
import { connect } from 'react-redux'
import {actions} from '../../actions'
import { bindActionCreators } from 'redux'


const mapStateToProps = (state, ownProps) => {
  console.log('state', state)
  return {
    attendees: state.main.attendees             //масив обєктів

  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}


export default connect(
  mapStateToProps, mapDispatchToProps)(Form)