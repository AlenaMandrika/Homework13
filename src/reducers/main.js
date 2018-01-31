//import update from 'immutability-helper';

let attendeeList = [{
  firstName: '',
  lastName: '',
  date: '',
  email: '',
  phone: '',
  address: '',
  id: (Math.random() * 100),
}]

const main = (state = attendeeList, action) => {
  switch (action.type) {
    case 'ADD_ATTENDEE':
      // Return a new array with old state and added attendee.
      return [{
        firstName: action.firstName,
        lastName: action.lastName,
        date: action.date,
        email: action.email,
        phone: action.phone,
        address: action.address,
      },
        ...state
      ];
    case 'REMOVE_ATTENDEE':
      return [
        // Grab state from begging to index of one to delete
        ...state.slice(0, action.index),
        // Grab state from the one after one we want to delete
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
};


export default main






