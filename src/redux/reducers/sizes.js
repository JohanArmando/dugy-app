const sizes = (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_SIZES':
      return action.sizes
    case 'ADD_SIZE':
      return [
        ...state,
        action.size
      ]
    default:
      return state
  }
}

export default sizes
