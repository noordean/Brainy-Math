const initialState = [];

/**
 * description: handles actions from generateOptions
 *
 * @param {Array} state the initial state
 * @param { Object } action the dispatched action
 *
 * @return {Array} the new state
 */
const generateOptions = (state = initialState, action) => {
  switch (action.type) {
    case 'GENERATE_OPTIONS':
      return [...action.options];
    default:
      return state;
  }
};

export default generateOptions;
