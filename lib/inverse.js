const getRREF = require("./rref");

function getInverse(matrix) {
	const size = matrix.length;
	const zeroes = Array(size).fill(0);

    // todo: make a concat function
	const augmentedMatrix = matrix.map((row, i) => {
		const identityRow = zeroes.map((zero, j) => (j === i ? 1 : 0));
		return [...row, ...identityRow];
	});

    const rref = getRREF(augmentedMatrix);
    const inverse = rref.map(row => row.filter((_, i) => i >= size));

    return inverse;
}

module.exports = getInverse;
module.exports.default = getInverse;