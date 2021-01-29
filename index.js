const { mat } = require("./inputs.js");
const getTranspose = require("./transpose.js");
const getDeterminant = require("./determinant");
const multiplyScalar = require("./scalar-multiplication.js");
const composeMatrix = (nRows = 3, nCols = 3, filler = 1) => Array(nRows).fill(Array(nCols).fill(filler));

class Matrix {
	constructor({ nRows, nCols, filler } = {}) {
		if (nRows || nCols || filler) {
			this.matrix = composeMatrix(nRows, nCols, filler);
		} else {
			const matrix = Array.from(arguments).flat(1);
			if (matrix.every((row) => row.length === matrix[0].length)) {
				this.matrix = matrix;
			} else {
				// todo: handle this
				throw new Error("Not a matrix");
			}
		}
	}
	get order() {
		return {
			nRows: this.matrix.length,
			nColumns: this.matrix[0].length,
		};
	}
	get determinant() {
		return getDeterminant(this.matrix);
	}
	get trace() {
		return this.matrix.reduce((acc, row, i) => acc + row[i], 0);
	}
	get isSquareMatrix() {
		return this.order.nColumns === this.order.nRows;
	}
	get isInvertable() {
		return this.determinant !== 0;
	}
	get transpose() {
		return new Matrix(getTranspose(this.matrix));
	}
	multiplyScalar(scalar) {
		return new Matrix(multiplyScalar(this.matrix, scalar));
	}
}

const mat1 = new Matrix(mat);
const mat2 = new Matrix([
	[1, 2, 3],
	[3, 4, 5],
]);
console.log(mat2.order);
console.log(mat2.transpose.order);
// console.log(mat2.determinant);
console.log(mat2.multiplyScalar(2));
// console.log(mat1.trace);
// console.log(mat1.isSquareMatrix);
// console.log(mat1.isInvertable);
