const initState = {
  account: {}
};

export const AccountReducer = (state = initState, action) => {
  if (action.type === "LOAD_ACCOUNT") {
    return {
      account: action.account
    };
  }
  return state;
};
