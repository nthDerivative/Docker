const express = require("express");

const fs = require('fs');
const app = express();

app.set("view engine", "pug");

// serve static files from the `public` folder
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    const personaldata = JSON.parse(fs.readFileSync('./json/personal.json'));
    const projectdata = JSON.parse(fs.readFileSync('./json/projects.json'));
    const hardskills = JSON.parse(fs.readFileSync('./json/hardskills.json')); 
    const personal = JSON.parse(fs.readFileSync('./json/personal.json')); 

    res.render("index", {
        title: "About me",
        name: personal.first + " " + personal.last,
        bio: personal.bio,
        description: personal.title,
        projectslist: projectdata.profiles,
        languagelist: hardskills.languages,
        softwarelist: hardskills.software
    });
});

app.get("/timeline", (req, res) => {
    const jobdata = JSON.parse(fs.readFileSync('./json/experience.json'));
    const hardskills = JSON.parse(fs.readFileSync('./json/hardskills.json')); 

    const year = jobdata.profiles.find(p => p.id === req.query.id);
    const languages = hardskills.languages.find(p => p.id === req.query.id);
    res.render("timeline", {
        jobexperience: jobdata.profiles,
        languagelist: hardskills.languages,
        softwarelist: hardskills.software,
        title: `My History`,
        languages,
        year,
    });
});

app.get("/projects", (req, res) => {
    const projectdata = JSON.parse(fs.readFileSync('./json/projects.json'));

    const project = projectdata.profiles.find(p => p.id === req.query.id);
    res.render("projects", {
        title: "My Projects",
        projectslist: projectdata.profiles,
        project
    });
});

app.get("/projectdetails", (req, res) => {
    const projectdata = JSON.parse(fs.readFileSync('./json/projects.json'));

    const project = projectdata.profiles.find(p => p.id === req.query.id);
    res.render("projectdetails", {
        title: `About ${project.title}`,
        projectslist: projectdata.profiles,
        project
    });
});

const server = app.listen(8080, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});