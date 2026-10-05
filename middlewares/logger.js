const logRequest = (req, res, next) => {
    const timestamp = new Date().toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
    });

    if (!req.url.startsWith("/.well-known")) {
        console.log(
            `[${timestamp}] REQUEST [${req.method}] ${req.url} - ${res.statusCode}`
        );
    }
    next();
};

module.exports = logRequest;
