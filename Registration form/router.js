const express = require('express');
const path = require("path");
const router = express.Router();
const Form  = require("./schema");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

router.post("/submit-form", async (req, res) => {
    const { usermail, password } = req.body;
    console.log(`Username/mail: ${usermail}, Password: ${password}`);

    try {
        const newForm = new Form({ usermail, password });
        await newForm.save();

        const savedForm = await Form.findOne({ usermail, password });
        console.log("Data saved to DB:", savedForm);
        res.redirect("/success");
    } catch (err) {
        console.log("Error saving data:", err);
        res.status(500).send("Error saving data");
    }
});

router.post("/login-form", async (req, res) => {
    const { usermail, password } = req.body;
    console.log(`Username/mail: ${usermail}, Password: ${password}`);

    try {
        const fetchdata = await Form.findOne({ usermail, password });
        if (fetchdata) {
            res.redirect("/success");
        } else {
            res.send("No valid credentials");
        }
    } catch (err) {
        console.log("Error fetching data:", err);
        res.status(500).send("Error fetching data");
    }
});

router.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/interface.html'));
});

module.exports = router;