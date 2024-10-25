export const searchFilter = (input, fullList) => {
  return Object.keys(fullList).filter(key => {
    const nameList = fullList[key].title.toLowerCase();
    return nameList.includes(input.toLowerCase())
  })
    .map(foundKey => ({ ...fullList[foundKey], key: foundKey }))
}