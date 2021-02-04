const getTranspose = require("./lib/transpose");
const getDeterminant = require("./lib/determinant");
const multiplyScalar = require("./lib/scalar-multiplication");
const multiplyMatrices = require("./lib/multiplication");
const { composeMatrix } = require("./helpers");

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
	multiply(...matrices) {
		return multiplyMatrices([this.matrix, ...matrices]);
	}
}

module.exports = Matrix;
module.exports.default = Matrix;
