const races = (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_RACES':
      return action.races
    case 'ADD_RACE':
      return [
        ...state,
        action.race
      ]
    default:
      return state
  }
}

export default races
