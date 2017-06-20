export const login = (user) => ({
  type: 'LOGIN',
  user
})

export const updateStore = (user) => ({
  type: 'EDITPROFILE',
  user
})

export const logout = () => ({
  type: 'LOGOUT'
})

export const addPet = (pet) => ({
  type: 'ADD_PET',
  pet
})

export const updatePet = (pet) => ({
  type: 'UPDATE_PET',
  pet
})

export const populatePets = (pets) => ({
  type: 'POPULATE_PETS',
  pets
})

export const addSize = (size) => ({
  type: 'ADD_SIZE',
  size
})

export const populateSizes = (sizes) => ({
  type: 'POPULATE_SIZES',
  sizes
})

export const addRace = (race) => ({
  type: 'ADD_RACE',
  race
})

export const populateRaces = (races) => ({
  type: 'POPULATE_RACES',
  races
})

export const addPlan = (plan) => ({
  type: 'ADD_PLAN',
  plan
})

export const populatePlans = (plans) => ({
  type: 'POPULATE_PLANS',
  plans
})

export const addService = (service) => ({
  type: 'ADD_SERVICE',
  service
})

export const populateServices = (services) => ({
  type: 'POPULATE_SERVICES',
  services
})

export const addServiceHistory = (service) => ({
  type: 'ADD_SERVICE_HISTORY',
  service
})

export const populateServicesHistory = (servicesHistory) => ({
  type: 'POPULATE_SERVICES_HISTORY',
  servicesHistory
})
