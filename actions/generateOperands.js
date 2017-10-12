/**
 * description: dispatches an action of type
 * 'GENERATE_OPERANDS'
 *
 * @return {Object} the dispatched action
 */
const generateOperands = () => ({
  type: 'GENERATE_OPERANDS',
  operands: [Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 1000)]
});

export default generateOperands;
