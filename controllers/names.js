const fetch = require("node-fetch");
const fs = require("fs");

// @desc    Get all names
// @route   GET /names
// @access  Public
exports.getAllNames = async (req, res, next) => {
    try {
        // TODO: change to fs.readfile
        const response = await fetch("../names.json");
        const names = await response.json();
        console.log(names);
        return res.status(200).json(names);
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.status = err.status || 500;
        next(error);
    }
};
