const ordersReducer = (state, action) => {
  switch (action.type) {
    case "RESPONSE":
      return { ...state, ...action.response };

    default:
      return state;
  }
};
 
export default ordersReducer;