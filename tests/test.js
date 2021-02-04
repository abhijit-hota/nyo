const test = require("ava");
const { mat, mat2, strings, notSquare, identityMatrix, zeroMatrix } = require("./inputs");

const getDeterminant = require("../determinant");

test("determinant", (t) => {
	t.is(getDeterminant(mat), -3596);
	t.is(getDeterminant(mat2), -594);
	t.is(getDeterminant(identityMatrix), 1);
	t.is(getDeterminant(zeroMatrix), 0);
	t.is(getDeterminant([[0]]), 0);
	t.is(getDeterminant([[4]]), 4);
	t.throws(() => getDeterminant(notSquare), {
		code: "ERR_NOT_SQUARE",
	});
	t.throws(() => getDeterminant(strings), {
		code: "ERR_NOT_NUM",
	});
});
