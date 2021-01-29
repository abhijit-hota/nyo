const inputs = require("./inputs");

const makeTranspose = require("./transpose");
const isNonZero = (entry) => entry !== 0;
const getScalarProduct = (arr, scalar = 1) => arr.map((entry) => entry * scalar);

// todo: check if same length
const getDifferenceBetween = (arr1, arr2) => arr1.map((val, index) => val - arr2[index]);

const getRREF = (inputMat) => {
	if (inputMat.length < 2) {
		throw new Error("Row Matrices don't have any RREF");
		return inputMat;
	}
	let mat = [...inputMat];

	function findPivotIndex(subMat) {
		// To easily iterate through columns
		const transposedMatrix = makeTranspose(subMat);
		const pivotalColumnIndex = transposedMatrix.findIndex((col) => col.some(isNonZero));

		if (pivotalColumnIndex === -1) {
			return { pivotalRowIndex: -1, pivotalColumnIndex: -1 };
		}
		const pivotalColumn = transposedMatrix[pivotalColumnIndex];
		const pivotalRowIndex = pivotalColumn.findIndex(isNonZero);

		return { pivotalRowIndex, pivotalColumnIndex };
	}
	function _rref(pivotalRowIndex, pivotalColumnIndex) {
		if (mat.flat().every((entry) => entry === 0)) {
			return mat;
		}

		const pivot = mat[pivotalRowIndex][pivotalColumnIndex];

		const pivotalRow = mat[pivotalRowIndex]; // because a[i][j] = transpose(a)[j][i]
		const scaledDownPivotalRow = getScalarProduct(pivotalRow, 1 / pivot);

		mat[pivotalRowIndex] = scaledDownPivotalRow;

		mat = mat.map((row, i) => {
			const entry = row[pivotalColumnIndex];
			if (entry === 0 || i === pivotalRowIndex) return row;

			return getDifferenceBetween(row, getScalarProduct(scaledDownPivotalRow, entry));
		});

		const subMatrix = mat.slice(pivotalRowIndex + 1).map((col) => col.filter((_, j) => j > pivotalColumnIndex));

		if (subMatrix.flat().length === 0) {
			return mat;
		}

		const { pivotalRowIndex: i, pivotalColumnIndex: j } = findPivotIndex(subMatrix);

		if (i !== 0) {
			const topRowOfSubMatrix = mat[mat.length - subMatrix.length];
			mat[pivotalRowIndex] = topRowOfSubMatrix;
			mat[mat.length - subMatrix.length] = pivotalRow;
			pivotalRowIndex = mat.length - subMatrix.length;
		}

		const reduced = _rref(pivotalRowIndex + 1 + i, pivotalColumnIndex + 1 + j);

		return reduced;
	}

	let { pivotalRowIndex, pivotalColumnIndex } = findPivotIndex(mat);

	if (pivotalColumnIndex === -1) {
		return mat;
	}

	if (pivotalRowIndex !== 0) {
		const firstRow = mat[0];
		const pivotalRow = mat[pivotalRowIndex];
		mat[pivotalRowIndex] = firstRow;
		mat[0] = pivotalRow;
		pivotalRowIndex = 0;
	}

	return _rref(pivotalRowIndex, pivotalColumnIndex);
};

for (const key in inputs) {
	const mat = inputs[key];
	const reduced = getRREF(mat);
	console.log(key, reduced);
}
