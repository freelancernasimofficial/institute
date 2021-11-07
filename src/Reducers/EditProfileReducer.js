
const EditProfileReducer = (state, action) => {
    switch (action.type) {
      case "RESPONSE":
        return { ...state, ...action };
      case "firstName":
        return { ...state, firstName: action.firstName };
      case "lastName":
        return { ...state, lastName: action.lastName };
      case "designation":
        return { ...state, designation: action.designation };
      case "email":
        return { ...state, email: action.email };
      case "phone":
        return { ...state, phone: action.phone };
      case "gender":
        return { ...state, gender: action.gender };
      case "date":
        return { ...state, date: action.date };
      case "month":
        return { ...state, month: action.month };
      case "year":
        return { ...state, year: action.year };
      case "address":
        return { ...state, address: action.address };
      case "countryId":
        return { ...state, countryId: action.countryId };
      case "city":
        return { ...state, city: action.city };
      case "postalCode":
        return { ...state, postalCode: action.postalCode };
      case "shortBio":
        return { ...state, shortBio: action.shortBio };
      case "education":
        return { ...state, education: action.education };
      case "educationAbout":
        return { ...state, educationAbout: action.educationAbout };
      case "work":
        return { ...state, work: action.work };
      case "workAbout":
        return { ...state, workAbout: action.workAbout };
      case "skills":
        return { ...state, skills: action.skills };
      case "CLEANUP":
        return {};

      default:
        return state;
    }
}
 
export default EditProfileReducer;