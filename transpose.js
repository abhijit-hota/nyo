/**
 * 
 * @param {[][]} mat 
 * @returns {[][]}
 */
function makeTranspose(mat) {
	const column = mat[0];
	return column.map((_, i) => {
		return mat.map((row) => row[i]);
	});
}

module.exports = makeTranspose;