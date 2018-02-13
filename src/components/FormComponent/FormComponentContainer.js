import { connect } from 'react-redux'
import { changeStateProps } from '../../actions'
import Form from './FormComponent'

const mapStateToProps = (state, ownProps) => {
  return {
    attendeeList: state.main.attendeeList ,
    arrayOfLists: state.main.arrayOfLists,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeStateProps: (prop, value) => {
      dispatch(changeStateProps(prop, value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Form)
