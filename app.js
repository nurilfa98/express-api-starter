require("dotenv").config();
require("module-alias/register");

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const middlewareRequest = require("@middlewares/logger");
const authMiddleware = require("@middlewares/auth");
const allRouter = require("@routes");
const authRouter = require("@routes/auth");

// izinkan semua origin
app.use(
    cors({
        origin: "*",
    })
);

// mencatat informasi request ke server
app.use(middlewareRequest);

// agar express bisa membaca req.body
app.use(express.json());

// default route
app.get("/", (req, res) => {
    res.send("Hello, we are running!");
});

// public route (login, register)
app.use("/api", authRouter);

// semua request harus pakai token jwt
app.use(authMiddleware);

// private route
app.use("/api", allRouter);

app.listen(port, () => {
    console.log(`Express app listening at http://127.0.0.1:${port}`);
});
