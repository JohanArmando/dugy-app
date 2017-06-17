const plans = (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_PLANS':
      return action.plans
    case 'ADD_PLAN':
      return [
        ...state,
        action.plan
      ]
    default:
      return state
  }
}

export default plans
