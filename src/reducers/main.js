import update from 'immutability-helper'

let defaultState = {
  attendeeList: {
    'firstName': '',
    'lastName': '',
    'date': null,
    'email': '',
    'phone': '',
    'address': '',
    id: (Math.random() * 100)
  }
}

const main = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_STATE_PROPS':
      console.log('data in reducer', action.state)
      return update(state, {
        [action.state.prop]: {$set: action.state.value}
      })

    case 'REMOVE_ATTENDEE':
      return update(state, {
        [action.state.index]: {$set: action.state.index}
      })

    default:
      return state
  }
}

export default main




