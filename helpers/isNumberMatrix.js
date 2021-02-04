const isNumericMatrix = (mat) => mat.flat().every((val) => typeof val === "number");
export default isNumericMatrix;
