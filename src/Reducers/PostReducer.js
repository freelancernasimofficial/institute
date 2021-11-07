export const initialPost = {
  showComment: false,
  offset: 0,
  error: false,
  errorMessage: "",
  isPosting: false,
  
};

const postReducer = (state, action) => {

  switch (action.type) {
    case "RESPONSE":
      return {
        ...state,
        ...action.payload,
      };
    case "COMMENT_BUTTON":
      return {
        ...state,
        ...action.payload,
      };
    case "REACT":
      return {
        ...state,
        ...action.payload,
      };
    case "NEW_COMMENT":
      return {
        ...state,
        ...action.payload,
      };
    case "NEW_SHARE":
      return {
        ...state,
        ...action.payload,
      };
    case "ERROR":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const initialComments = {
  comments: [],
  offset: 0,
  replyoffset: 0,
  commentInput: "",
  replyInput: "",
  targetComment: false,
  replyTargetComment: false,
};
export const commentReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_COMMENTS":
      return { ...state, comments: action.payload };
    case 'ONCHANGE_COMMENT':
      return { ...state, commentInput: action.payload }
    case 'NEW_COMMENT':
      return { ...state, commentInput:"", comments: [action.payload, ...state.comments] }
    case 'TARGET_COMMENT':
      return { ...state, targetComment: action.payload}
    case 'ONCHANGE_REPLY':
      return { ...state, replyInput: action.payload }
    case 'REPLY_TARGET':
      return { ...state, replyTargetComment: action.payload };
    case 'CLEAN_INPUT':
      return {...state,commentInput:"",replyInput:""}
    default:
      return state;
  }
};


export const loadPostsReducer = (state,action) => {
  switch (action.type) {
    case 'RESPONSE':
      return { ...state, posts: action.payload };
    case 'ERROR':
      return {...state,error: action.payload}
    case 'RESET':
      return {}
    default:
      return state;
  }
}


export default postReducer;
