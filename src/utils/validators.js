export const isNotValid = (cost) => {
  // console.log(`validating ${cost} type of cost ${typeof cost}`);
  if (cost === null || cost === undefined || cost === "") {
    return true;
  }
  if (isNaN(cost)) {
    return true;
  }
  return false;
};
