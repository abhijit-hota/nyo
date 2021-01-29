const { mat, mat2, mat3, mat4 } = require("./inputs");

const unspiral = (mat_in) => {
    let outputArr = [];
    let turn = 0;
    let slicedPart = [];
    let mat = mat_in.map(row => [...row]);

    while (true) {
        slicedPart = [];
        switch (turn % 4) {
            case 0:
                // First Row
                slicedPart = mat.splice(0, 1)[0];
                break;
            case 1:
                // Last Column
                slicedPart = mat.map((arr) => arr.splice(arr.length - 1)[0]);
                break;
            case 2:
                // Last Row
                slicedPart = mat.splice(mat.length - 1)[0].reverse();
                break;
            case 3:
                // First Column
                slicedPart = mat.map((arr) => arr.splice(0, 1)[0]).reverse();
                break;
        }
        outputArr = [...outputArr, ...slicedPart];
        turn++;
        if (outputArr.length >= mat_in.length * mat_in[0].length) break;
    }

    return outputArr;
};

console.log(unspiral(mat));
console.log(unspiral(mat));
console.log(unspiral(mat3));
console.log(unspiral(mat3));
