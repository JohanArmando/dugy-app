const servicesHistory = (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_SERVICES_HISTORY':
      return action.servicesHistory
    case 'ADD_SERVICE_HISTORY':
      return [
        ...state,
        action.serviceHistory
      ]
    default:
      return state
  }
}

export default servicesHistory
