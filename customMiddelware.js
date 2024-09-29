
const myLogger = function (req, res, next) {
    console.log({date:Date.now(), Method:req.method, URL: req.url})
    next()
}
module.exports = myLogger;