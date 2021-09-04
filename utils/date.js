module.exports = function () {
    let t = new Date();
    let year = t.getFullYear();
    let month = t.getMonth() + 1;
    let date = t.getDate();
    return `${year}-${month}-${date}`;
}