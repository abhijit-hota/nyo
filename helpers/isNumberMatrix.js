const isNumericMatrix = (mat) => mat.flat().every((val) => typeof val === "number");
module.exports = isNumericMatrix;
