const initialState = {
  user: null,
};

export { initialState };

const userReducer = (state, action) => {
  console.warn(action);
  switch (action.type) {
    case "SET_USER": {
      return { ...state, user: action.payload };
    }
    case "RESET_USER": {
      return { ...state, user: null };
    }
    case "UPDATE_USER": {
      return { ...state, user: { ...state.user, ...action.payload } };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
