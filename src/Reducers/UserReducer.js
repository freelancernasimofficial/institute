const UserReducer = (state,action) => {
    switch (action.type) {
        case 'SET_USER':
        return {...state,...action.payload}
        case 'ERROR':
            return {}
        default:
            return state;
    }
}
 
export default UserReducer;