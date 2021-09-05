


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.random = random;

exports.israndom = function (per) {

    let ran = random(0, 100);
    // console.log(ran);
    if (ran >= 0 && ran <= per) {
        return true;
    } else {
        return false;
    }

}