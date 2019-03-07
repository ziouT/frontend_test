
function subsets (res, chosen, arr, index, n) {
    if(index > arr.length - 1) {
        return;
    }
    if(chosen.length === n) {
        res.push(chosen.slice());
    } else {
        let curr = arr[index];
        chosen.push(curr);
        subsets(res, chosen, arr, index + 1, n);
        chosen.pop();
        subsets(res, chosen, arr, index + 1, n);
    }
}
exports.combination = function (arr, n) {
    let res = [];
    subsets(res, [], arr, 0, n);
    return res;
};

exports.cloneDeep = function (obj) {
    //in case of primitives
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    //handle Array
    if (Array.isArray(obj)) {
        var clonedArr = [];
        obj.forEach(function (element) {
            clonedArr.push(exports.cloneDeep(element));
        });
        return clonedArr;
    }

    //lastly, handle objects
    var clonedObj = {};
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            clonedObj[prop] = exports.cloneDeep(obj[prop]);
        }
    }
    return clonedObj;
};
