const initialState = [];

const generateOptions = (state = initialState, action) => {
  switch (action.type) {
    case 'GENERATE_OPTIONS':
      return [...action.options];
    default:
      return state;
  }
};

export default generateOptions;
