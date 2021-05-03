/*
 * A handy, async/await wrapper function
 * for setTimeout()
 */
const wait = async ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

module.exports = wait;
