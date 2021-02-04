const isNumberMatrix = (mat) => mat.flat().every((val) => typeof val === "number");
const isSquareMatrix = (mat) => mat[0].length === mat.length;

const validateMatrix = (mat) => {
	if (!isNumberMatrix(mat)) {
		const error = new Error(
			"The function getDeterminant expects pure numerical matrices. Some of the elements in the matrix passed are not numbers. Note that strings also do not work."
		);
		error.code = "ERR_NOT_NUM";
		throw error;
		return false;
	}

	if (!isSquareMatrix(mat)) {
		const error = new Error("Determinants are only available for square matrices.");
		error.code = "ERR_NOT_SQUARE";
		throw error;
		return false;
	}

	return true;
}

const getDeterminant = (inputMatrix) => {
	validateMatrix(inputMatrix);

	// Just in case
	let mat = [...inputMatrix];

	function _determinant(mat) {
		const order = mat.length;
		if (order === 1) {
			// the smallest submatrix having only one element
			return mat[0][0];
		} else {
			// first row is removed
			const firstRow = mat.splice(0, 1)[0];
			
			const determinant = firstRow.reduce((accumulator, element, i) => {
				// make a sub matrix and recurse
				const subMatrix_i = mat.map((row) => {
					return row.filter((_, index) => index !== i);
				});
				const multiplier = i % 2 !== 0 ? -1 : 1;
				return accumulator + element * multiplier * _determinant(subMatrix_i);
			}, 0);

			return determinant;
		}
	}
	return _determinant(mat);
};

module.exports = getDeterminant;
module.exports.default = getDeterminant;