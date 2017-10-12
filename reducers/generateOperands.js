const initialState = [];

/**
 * description: handles actions from generateOperands
 *
 * @param {Array} state the initial state
 * @param { Object } action the dispatched action
 *
 * @return {Array} the new state
 */
const generateOperands = (state = initialState, action) => {
  switch (action.type) {
    case 'GENERATE_OPERANDS':
      return [...action.operands];
    default:
      return state;
  }
};

export default generateOperands;
