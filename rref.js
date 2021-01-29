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

/**
 * Get RREF (Row Reduced Echelon Form) for a matrix.
 *
 * Learn More: https://en.wikipedia.org/wiki/Row_echelon_form
 * @param {number[[]]} inputMatrix - Warning: Row Matrices do not have a RREF
 * @param {{precision: number}} options
 *
 * @returns {number[[]]} The RRE form of the given Matrix
 */
const getRREF = (inputMatrix, options = { precision: 3 }) => {
	if (inputMatrix.length < 2) {
		throw new Error("Row Matrices don't have any RREF");
		return inputMatrix;
	}
	let mat = [...inputMatrix];
	if (mat.flat().every((entry) => entry === 0)) {
		return mat;
	}

	function _rref(workRegionRowIndex, workRegionColumnIndex) {
		// 1. Set the work region
		const workRegion = mat.slice(workRegionRowIndex).map((col) => col.filter((_, j) => j >= workRegionColumnIndex));

		if (workRegion.flat().length === 0) {
			return mat;
		}

		let { pivotalRowIndex, pivotalColumnIndex } = getPivotIndex(workRegion);
		if (pivotalColumnIndex === -1) {
			return mat;
		}

		// Transform the indices accordingly
		// Because the getPivotIndex returns values wrt the current work region sub matrix
		pivotalRowIndex += workRegionRowIndex;
		pivotalColumnIndex += workRegionColumnIndex;

		// 2. Swap the top pivotal row with row in the matrix
		// corresponding to the top row of work region
		if (pivotalRowIndex !== workRegionRowIndex) {
			const workRegionTopRow = mat[workRegionRowIndex];
			const pivotalRow = mat[pivotalRowIndex];

			mat[pivotalRowIndex] = workRegionTopRow;
			mat[workRegionRowIndex] = pivotalRow;
			pivotalRowIndex = workRegionRowIndex;
		}

		const pivot = mat[pivotalRowIndex][pivotalColumnIndex];
		const pivotalRow = mat[pivotalRowIndex];

		// 3. Multiply the pivotal row with 1/pivot
		const scaledDownPivotalRow = getScalarProduct(pivotalRow, 1 / pivot);
		mat[pivotalRowIndex] = scaledDownPivotalRow;

		// 4. Make every element of the pivotal column, except the pivot, zero
		// 	  via elementary ow operations
		mat = mat.map((row, i) => {
			const entry = row[pivotalColumnIndex];
			if (entry === 0 || i === pivotalRowIndex) return row;

			return getDifferenceBetween(row, getScalarProduct(scaledDownPivotalRow, entry));
		});

		// 5. Set the working region to right and below the pivot and repeat
		return _rref(pivotalRowIndex + 1, pivotalColumnIndex + 1);
	}

	// 0. Start with the work region as whole matrix
	const reduced = _rref(0, 0);

	// The operation gives -0 as its entries and long decimal values
	const normalised = reduced.map((row) =>
		row.map((entry) => {
			if (entry === -0) {
				entry = 0;
			}
			entry = +entry.toFixed(options.precision);
			return entry;
		})
	);

	return normalised;
};
