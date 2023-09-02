export const getRandomItemFromArray = <T>(array: T[], forbiddenItem: T): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomItem = array.splice(randomIndex, 1)[0];

  if (randomItem === forbiddenItem) {
    return getRandomItemFromArray(array, forbiddenItem);
  }

  return randomItem;
};
