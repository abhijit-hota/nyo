/**
 * Get the transpose of a matrix
 * 
 * @param {number[[]]} mat 
 * @returns {number[[]]}
 */
function getTranspose(mat) {
	const column = mat[0];
	return column.map((_, i) => {
		return mat.map((row) => row[i]);
	});
}

module.exports = getTranspose;