const { mat, mat3 } = require("./inputs");

const isNumberMatrix = (mat) => mat.flat().every((val) => typeof val === "number");

const composeZeroMatrix = (nRow, nCol) => Array(nRow).fill(Array(nCol).fill(0));

function multiplyTwoMatrices(mat1, mat2) {
	if (mat1[0].length !== mat2.length) {
		// todo
		throw Error("impossible");
	}

	return mat1.map((row, i) => {
		const otherRow = mat2[i];
		return row.map((entry, j) => entry * otherRow[j]).reduce((acc, val) => acc + val);
		
	});
}

function multiplyMatrices() {
	// todo: check for no args

	const matrices = Array.from(arguments);
	const zeroMatrix = composeZeroMatrix(matrices[0].length, matrices[0][0].length);
	return matrices.reduce((accumulatorMatrix, currentMatrix) => {
		return multiplyTwoMatrices(accumulatorMatrix, currentMatrix);
	}, zeroMatrix);
}
