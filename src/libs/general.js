
// input: "a,b, c , d,e"
// output: ["a", "b", "c", "d, "e"]
const stringToList = (str) => {
  return (str.split(",").map((s) => s.trim()));
}

module.exports = {
    stringToList: stringToList
}
