const { mat, mat2, mat3, mat4, mat5 } = require("../tests/inputs");

const zigzag = (mat_in) => {
    // Copy the matrix and convert to string. 
    // 0 and "0" being falsy and truthy purposes.
    let mat = mat_in.map((row) => row.map((val) => val.toString()));

    // Required
    let zigzagged = [mat[0][0]],
        nextNumber = null,
        i = 0,
        j = 0;

    // Higher Order Traverse function
    const traverse = (rowStep, colStep) => {
        return function () {
            if (mat[i + rowStep] && mat[i + rowStep][j + colStep] !== undefined) {
                i += rowStep;
                j += colStep;
                return mat[i][j];
            } else return undefined;
        };
    };
    const goDown = traverse(1, 0);
    const goRight = traverse(0, 1);
    const goTopRight = traverse(-1, 1);
    const goBottomLeft = traverse(1, -1);

    // Recursive function which does the actual traversal
    const _zigzag = () => {
        // Go down or right one block
        nextNumber = goDown() || goRight();
        if (nextNumber) {
            zigzagged.push(nextNumber);
        } else return;

        // Go northeast until you reach boundary
        nextNumber = goTopRight();
        while (nextNumber) {
            zigzagged.push(nextNumber);
            nextNumber = goTopRight();
        }

        // Go right or down one block
        nextNumber = goRight() || goDown();
        if (nextNumber) {
            zigzagged.push(nextNumber);
        } else return;

        // Go Southwest until you reach boundary
        nextNumber = goBottomLeft();
        while (nextNumber) {
            zigzagged.push(nextNumber);
            nextNumber = goBottomLeft();
        }

        // Repeat
        _zigzag();
    };

    _zigzag();

    // + operator converts to number
    return zigzagged.map((val) => +val);
};

console.log(zigzag(mat));
console.log(zigzag(mat2));
console.log(zigzag(mat3));
console.log(zigzag(mat4));
console.log(zigzag(mat5));
