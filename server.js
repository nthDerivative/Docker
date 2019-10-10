const express = require("express");
const fs = require('fs')

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch (err) {
            return cb && cb(err)
        }
    })
}
 
const jsonprojectdata = fs.readFileSync('./json/projects.json');
const projectdata = JSON.parse(jsonprojectdata);
const jobdata = require("./json/experience.json");
const hardskills = require("./json/hardskills.json"); 
const app = express();

app.set("view engine", "pug");

// serve static files from the `public` folder
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("index", {
        title: "About me",
        name: "Brian Hirosky",
        description: "Software Developer, Systems Administrator, IT Solutions Provider",
        projectslist: projectdata.profiles,
        languagelist: hardskills.languages,
        softwarelist: hardskills.software
    });
});

app.get("/hardskills", (req, res) => {
    const languageprogress = languagelist.languages.find(p => p.id === req.query.id);
    res.render("hardskills", {
        title: `${languageprogress.name}`,
        languageprogress
    });
    const softwareeprogress = softwarelist.software.find(p => p.id === req.query.id);
    res.render("hardskills", {
        title: `${softwareeprogress.name}`,
        softwareeprogress
    });
});

app.get("/timeline", (req, res) => {
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
    const project = projectdata.profiles.find(p => p.id === req.query.id);
    res.render("projects", {
        title: "My Projects",
        projectslist: projectdata.profiles,
        project
    });
});

app.get("/projectdetails", (req, res) => {
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