export const changeStateProps = (prop, value) => {
  console.log('action triggered', value)
  return {
    type: 'CHANGE_STATE_PROPS',
    state: {
      prop,
      value
    }
  }
}

// export const removeAttendee = (index) => {
//   console.log('action triggered', index)
//   return {
//     type: 'REMOVE_ATTENDEE',
//     state: {
//       index
//     }
//   }
// }


