const multiplyScalar = (mat, scalar) => mat.map((row) => row.map((entry) => entry * scalar));

module.exports = multiplyScalar;
module.exports.default = multiplyScalar;
