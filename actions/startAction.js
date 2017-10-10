export const startAction = () => {
  return {
    type: 'START_GAME',
    operands: [Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 1000)]
  };
};

export default startAction;
