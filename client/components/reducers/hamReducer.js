export function userReducer(state, action) {
  switch (action.type) {
    case 'SET_HAM': 
      return {
        ...state,
        actual: action.user
      }
    default:
      return state
}
}