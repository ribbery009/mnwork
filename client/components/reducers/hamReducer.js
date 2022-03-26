export function isHamburgeReducer(state, action) {
  console.log("action",action);
  console.log("state: ",state);
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