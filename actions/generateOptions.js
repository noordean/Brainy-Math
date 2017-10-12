/**
 * description: dispatches an action of type
 * 'GENERATE_OPTIONS'
 *
 * @param {Number} answer correct answer to be included as
 * part of the options
 *
 * @return {Object} the dispatched action
 */
const generateOptions = answer => ({
  type: 'GENERATE_OPTIONS',
  options: [
    answer,
    answer + Math.floor(Math.random() * 100),
    answer + Math.floor(Math.random() * 100),
    answer + Math.floor(Math.random() * 100)]
});

export default generateOptions;
