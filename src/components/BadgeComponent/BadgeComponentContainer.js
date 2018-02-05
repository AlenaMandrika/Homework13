import { connect } from 'react-redux'
import { changeStateProps} from '../../actions'
import Badge from './BadgeComponent'



const mapStateToProps = (state, ownProps) => {
  console.log(11111, state.main)
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
  mapDispatchToProps)(Badge)