function random(arr1, arr2) {
    var sum = 0,
        factor = 0,
        random = Math.random();

    for (var i = arr2.length - 1; i >= 0; i--) {
        sum += arr2[i]; // 统计概率总和
    };
    random *= sum; // 生成概率随机数
    console.log(random);
    for (var i = arr2.length - 1; i >= 0; i--) {
        console.log(factor);
        factor += arr2[i];
        if (random <= factor)
            return arr1[i];
    };
    return null;
};

// test
var a = ['mac', 'iphone', 'vivo', 'OPPO'];
var b = [0.01, 0.05, 0.3, 0.4];
console.log(random(a, b));