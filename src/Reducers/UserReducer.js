const UserReducer = (state,action) => {
    switch (action.type) {
        case 'SET_USER':
        return {...state,...action.payload}
        case 'NO_AUTH':
            return {currentUser:false}
        default:
            return state;
    }
}
 
export default UserReducer;