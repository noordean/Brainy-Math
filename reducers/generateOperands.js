const initialState = [];

const generateOperands = (state = initialState, action) => {
  switch (action.type) {
    case 'GENERATE_OPERANDS':
      return [...action.operands];
    default:
      return state;
  }
};

export default generateOperands;
