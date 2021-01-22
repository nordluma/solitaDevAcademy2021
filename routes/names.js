const router = require("express").Router();

const { getAllNames, getName } = require("../controllers/names");

router.get("/", getAllNames);
//router.get("/:name", getName);

router.use((req, res, next) => {
    const error = new Error("Only GET command supported");
    error.status = 500;
    next(error);
});

module.exports = router;
