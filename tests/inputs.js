const mat = [
	[3, 4, 5, 3, 3],
	[1, 7, 6, 8, 9],
	[2, 0, 8, 5, 7],
	[4, 2, 9, 1, 6],
	[3, 7, 1, 2, 8],
];
const notSquare = [
	[3, 4, 5, 3, 3],
	[1, 7, 6, 8, 9],
	[4, 2, 9, 1, 6],
	[3, 7, 1, 2, 8],
];
const mat3 = [
	[1, 2, 3, 8, 5],
	[4, 5, 6, 11, 3],
	[7, 8, 9, 20, 8],
	[10, 11, 12, 16, 0],
	[13, 14, 15, 8, 7],
];

const columnMatrix = [[1], [2], [3], [4]];
const rowMatrix = [[1, 2, 3, 4, 5]];

const mat2 = [
	[1, 3, 4, 10],
	[2, 5, 9, 11],
	[6, 8, 12, 15],
	[7, 13, 14, 16],
];
const strings = [
	[1, 3, 4, "asdas"],
	[2, 5, 9, 11],
	[6, 8, 12, 15],
	[7, 13, 14, 16],
];

const zeroMatrix = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
];

const identityMatrix = [
	[1, 0, 0, 0, 0],
	[0, 1, 0, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 0, 1, 0],
	[0, 0, 0, 0, 1],
];

module.exports = {
	mat,
	mat2,
	mat3,
	rowMatrix,
	columnMatrix,
	zeroMatrix,
	identityMatrix,
	strings,
	notSquare,
};