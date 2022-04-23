export function isHamburgeReducer(state, action) {

  switch (action.type) {
    case 'SET_HAM': 
      return {
        ...state,
        actual: action.isHamburgerIcon
      }
    default:
      return state
}
}