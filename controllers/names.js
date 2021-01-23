const fetch = require("node-fetch");
const fs = require("fs");

// @desc    Get all names
// @route   GET /api/names
// @access  Public
exports.getAllNames = async (req, res, next) => {
    try {
        fs.readFile("./names.json", (err, data) => {
            if (err) throw err;
            const names = JSON.parse(data);
            return res.status(200).json(names);
        });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.status = err.status || 500;
        next(error);
    }
};
