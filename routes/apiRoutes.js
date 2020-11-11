const router = require("express").Router()
const Store = require("../db/store")

const { v1: uuidv1 } = require("uuid");
const fs = require('fs');
const path = require('path');
const DB_PATH = path.join(__dirname, '../db/db.json');

const getDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf8')) || [];
const setDB = db => fs.writeFileSync(DB_PATH, JSON.stringify(db));

router.get("/notes", (req, res) => {
    res.json(getDB())
})

router.post("/notes", (req, res) => {
    const DB = getDB();
    req.body.id = uuidv1();
    DB.push(req.body)
    setDB(DB);
    res.sendStatus(200);
})

router.delete("/notes/:id", (req, res) => {
    let DB = getDB();
    DB = DB.filter(x => x.id !== req.params.id);
    setDB(DB);
    res.sendStatus(200);
})



module.exports = router;