const initialState = {
  user: null,
};

export { initialState };

const userReducer = (state, action) => {
  console.warn(action);
  switch (action.type) {
    case "SET_USER": {
      // console.log("SET_USER - Previous state:", state);
      // console.log("SET_USER - New user:", action.payload);
      return { ...state, user: action.payload };
    }
    case "RESET_USER": {
      // console.log("RESET_USER - Previous state:", state);
      // console.log("RESET_USER - User reset to null");
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
