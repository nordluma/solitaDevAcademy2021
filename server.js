const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });

const nameRoutes = require("./routes/names");

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
//app.use(express(path.join(__dirname, "client/build")));

app.use("/api/names", nameRoutes);

/* app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname + "client/public/index.html"));
}); */

// Error handling
app.use((req, res, next) => {
    const error = new Error("Requested resource not found.");
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500).json({
        status: error.status,
        error: error.message,
    });
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
