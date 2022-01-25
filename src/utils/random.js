module.exports = function (gl) {
    gl = parseInt(gl);
    let random = Math.random() * 100;

    if (random < gl) {
        return true
    } else {
        return false
    }

}