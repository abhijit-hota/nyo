const getTranspose = require("./transpose");

function multiplyTwoMatrices(mat1, mat2) {
	if (mat1[0].length !== mat2.length) {
		throw Error("The multiplier and the multiplicant matrices must be of the same order");
		return null;
	}

	const transposedMat2 = getTranspose(mat2);

	const multiplied = mat1.map((row) => {
		return transposedMat2.map((mat2Column) => {
			return mat2Column.reduce((acc, val, j) => row[j] * val + acc, 0);
		});
	});

	return multiplied;
}

function multiplyMatrices(...matrices) {
	if (matrices.length === 0) {
		throw Error("No matrices passed to multiply");
		return null;
	}
	return matrices.reduce((accumulatorMatrix, currentMatrix) => {
		return multiplyTwoMatrices(accumulatorMatrix, currentMatrix);
	});
}

module.exports = multiplyMatrices;
