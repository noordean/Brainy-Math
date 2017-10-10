const generateOperands = () => {
  return {
    type: 'GENERATE_OPERANDS',
    operands: [Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 1000)]
  };
};

export default generateOperands;
