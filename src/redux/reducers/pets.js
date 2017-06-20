const pets = (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_PETS':
      return action.pets
    case 'UPDATE_PET':
      pets = state.map((pet) => {
        if (pet.id === action.pet.id) {
          return action.pet
        }
        return pet
      })
      console.log(pets, state);
      return pets;
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
