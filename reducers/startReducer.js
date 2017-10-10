const initialState = [];

const startReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GAME':
      return [...action.operands];
    default:
      return state;
  }
};

export default startReducer;
