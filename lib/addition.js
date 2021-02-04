const composeZeroMatrix = (nRow, nCol) => Array(nRow).fill(Array(nCol).fill(0));

function addTwoMatrices(mat1, mat2) {
	return mat1.map((row, i) => {
		const otherRow = mat2[i];
		return row.map((entry, j) => entry + otherRow[j]);
	});
}

function addMatrices() {
	// todo: check for no args

	const matrices = Array.from(arguments);
	const zeroMatrix = composeZeroMatrix(matrices[0].length, matrices[0][0].length);
	return matrices.reduce((accumulatorMatrix, currentMatrix) => {
		return addTwoMatrices(accumulatorMatrix, currentMatrix);
	}, zeroMatrix);
}

module.exports = addMatrices;
module.exports.default = addMatrices;
