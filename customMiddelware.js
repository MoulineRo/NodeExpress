
const myLogger = function (req, res, next) {
    const timestamp = new Date().toLocaleString('uk-UA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    console.log(`[${timestamp}] Method: '${req.method}', URL: ['${req.url}']`);
    next()
}
module.exports = myLogger;