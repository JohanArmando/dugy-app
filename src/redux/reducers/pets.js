const pets = (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_PETS':
      return action.pets
    case 'ADD_PET':
      return [
        ...state,
        action.pet
      ]
    default:
      return state
  }
}

export default pets
