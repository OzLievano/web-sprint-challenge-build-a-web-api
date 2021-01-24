// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();

//get projects

router.get('/',function getAllProjects(req,res){
    Projects.get()
    .then((projects)=>{
        res.status(200).json(projects)
    })
    .catch((error)=>{
        res.status(500).json({error:"error,try again."})
    })
})

// get specific projects , this also returns actions for the specific project. (aka a commit for example)

router.get('/:id', function getProjectById(req,res){
    const {id} = req.params;
    if(id){
        Projects.get(id)
        .then((project)=>{
            res.status(200).json(project)
        })
        .catch((error)=>{
            res.status(500).json({error:"error message"})
        })
    }else{
        res.status(404).json({error:"project not found"})
    }
})

// lets create a new project using POST 

router.post('/', function createNewProject(req,res){
    const newProject = req.body;
    // in order to create a project: name & description are required.
    if(!newProject.name || !newProject.description){
        res.status(400).json({error:"Please provide a project name & description."})
        return;
    }else{
        Projects.insert(newProject)
        .then((projects)=>{
            res.status(201).json(newProject)
        })
        .catch((error)=>{
            res.status(500).json({error:"system error."})
        })
    }
})

// lets update an existing project with PUT
router.put('/:id', function UpdateExistingProject(req,res){
    const {id} = req.params;
    const updates = req.body;
    if(!id){
        res.status(404).json({error:"project id not found"})
        return;
    }else{
        Projects.update(id,updates)
        .then((project)=>{
            res.status(204).json(updates)
        })
        .catch((error)=>{
            res.status(500).json({error:"unable to update project."})
        })
    }
})


//make sure you export bruh
module.exports = router;