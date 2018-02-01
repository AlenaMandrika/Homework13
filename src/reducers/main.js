import update from 'immutability-helper'

let defaultState = {
  arrayOfLists: [],
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

export default (state = defaultState, action) => {
  console.log('state', state)
  switch (action.type) {
    case 'CHANGE_STATE_PROPS':
      return update(state, {
        [action.state.prop]: {$set: action.state.value}
      })

    default:
      return state
  }
}
