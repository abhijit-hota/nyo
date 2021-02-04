const getDifferenceBetween = (arr1, arr2) => {
	if (arr1.length !== arr2.length) {
		throw new Error("Can't subtract rows with different lengths.");
	}
	return arr1.map((val, index) => val - arr2[index]);
};
export default getDifferenceBetween;
