const multiplyScalar = (mat, scalar) => mat.map((row) => row.map((entry) => entry * scalar));

module.exports = multiplyScalar;
