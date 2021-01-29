const inputs = require("./inputs");

const { getDifferenceBetween, getScalarProduct, isNonZero } = require("./helpers");
const makeTranspose = require("./transpose");

function getPivotIndex(subMat) {
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

const getRREF = (inputMat) => {
	if (inputMat.length < 2) {
		// throw new Error("Row Matrices don't have any RREF");
		return inputMat;
	}
	let mat = [...inputMat];
	if (mat.flat().every((entry) => entry === 0)) {
		return mat;
	}

	function _rref(workRegionRowIndex, workRegionColumnIndex) {
		const workRegion = mat.slice(workRegionRowIndex).map((col) => col.filter((_, j) => j >= workRegionColumnIndex));

		if (workRegion.flat().length === 0) {
			return mat;
		}

		let { pivotalRowIndex, pivotalColumnIndex } = getPivotIndex(workRegion);
		if (pivotalColumnIndex === -1) {
			return mat;
		}

		pivotalRowIndex += workRegionRowIndex;
		pivotalColumnIndex += workRegionColumnIndex;

		if (pivotalRowIndex !== workRegionRowIndex) {
			const workRegionTopRow = mat[workRegionRowIndex];
			const pivotalRow = mat[pivotalRowIndex];

			mat[pivotalRowIndex] = workRegionTopRow;
			mat[workRegionRowIndex] = pivotalRow;
			pivotalRowIndex = workRegionRowIndex;
		}

		const pivot = mat[pivotalRowIndex][pivotalColumnIndex];
		const pivotalRow = mat[pivotalRowIndex];

		const scaledDownPivotalRow = getScalarProduct(pivotalRow, 1 / pivot);

		mat[pivotalRowIndex] = scaledDownPivotalRow;

		mat = mat.map((row, i) => {
			const entry = row[pivotalColumnIndex];
			if (entry === 0 || i === pivotalRowIndex) return row;

			return getDifferenceBetween(row, getScalarProduct(scaledDownPivotalRow, entry));
		});

		const reduced = _rref(pivotalRowIndex + 1, pivotalColumnIndex + 1);

		return reduced;
	}

	const reduced = _rref(0, 0);

	const normalised = reduced.map((row) =>
		row.map((entry) => {
			if (entry === -0) {
				entry = 0;
			}
			entry = +entry.toFixed(3);
			return entry;
		})
	);

	return normalised;
};

for (const key in inputs) {
	const mat = inputs[key];
	const reduced = getRREF(mat);
	console.log(key, reduced);
}
