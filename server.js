'use strict';

const express = require('express');
const people = require("./projects.json");

const app = express();

app.set("view engine", "pug");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Brian Hirosky's Resume",
        projects: projects.profiles
    });
});

app.get("/profile", (req, res) => {
    const project = project.profiles.find(p => p.id === req.query.id);
    res.render("profile", {
        title: `About ${project.name}`,
        project
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);