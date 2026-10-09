require("dotenv").config();
require("module-alias/register");

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const middlewareRequest = require("@middlewares/logger");
const allRoutes = require("@routes/index");
const errorHandler = require('@middlewares/error-handler');

// izinkan semua origin
app.use(
    cors({
        origin: "*",
    })
);

// agar express bisa membaca req.body
app.use(express.json());

// mencatat informasi request ke server
app.use(middlewareRequest);

// default route
app.get("/", (req, res) => {
    res.send("Hello, we are running!");
});

app.use("/api", allRoutes);

// menangani error global
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Express app listening at http://127.0.0.1:${port}`);
});
