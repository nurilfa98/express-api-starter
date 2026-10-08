const logRequest = (req, res, next) => {
    const start = performance.now();

    res.on("finish", () => {
        const duration = (performance.now() - start).toFixed(2); // Menghasilkan misal: 12.45 (dalam ms)

        const timestamp = new Date().toLocaleString("id-ID", {
            timeZone: "Asia/Jakarta",
        });
        
        if (!req.url.startsWith("/.well-known")) {
            console.log(
                `[${timestamp}][${req.method}] ${req.originalUrl} ${res.statusCode} in ${duration}ms`
            );
        }
    })
    next();
};

module.exports = logRequest;
