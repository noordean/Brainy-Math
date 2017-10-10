const generateOptions = (answer) => {
  return {
    type: 'GENERATE_OPTIONS',
    options: [
      answer,
      answer + Math.floor(Math.random() * 100),
      answer + Math.floor(Math.random() * 100),
      answer + Math.floor(Math.random() * 100)]
  };
};

export default generateOptions;
