// export const addAttendee = (firstName, lastName, date, email, phone, address) => {
//   return {
//     type: 'ADD_ATTENDEE',
//     id: (Math.random() * 100),
//     firstName,
//     lastName,
//     date,
//     email,
//     phone,
//     address
//   }
// }
//
// export const removeAttendee = (index) => {
//   return {
//     type: 'REMOVE_ATTENDEE',
//     index
//   }
// }

export const actions = {
  addAttendee: (firstName, lastName, date, email, phone, address) => {
    return {
      type: 'ADD_ATTENDEE',
      id: (Math.random() * 100),
      firstName,
      lastName,
      date,
      email,
      phone,
      address
    }
  },
  removeAttendee: (index) => {
    return {
      type: 'REMOVE_ATTENDEE',
      index
    }
  }
};




