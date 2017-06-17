const services = (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_SERVICES':
      return action.services
    case 'ADD_SERVICE':
      return [
        ...state,
        action.service
      ]
    default:
      return state
  }
}

export default services
