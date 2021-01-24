// Write your "actions" router here!
const express = require('express');
const Actions = require('../actions/actions-model')
const Projects = require('../projects/projects-model')

const router = express.Router();

const fiveHundredMessage = "System error, please view get request."
// get array of actions (or an empty array) as the body of the response

router.get('/',function getAllActions(req,res){
    Actions.get()
    .then((actions)=>{
        res.status(200).json(actions)
    })
    .catch((error)=>{
        res.status(500).json({error:fiveHundredMessage})
    })
})

// get array of actions for a given id as the body of the resposne

router.get('/:id',function getActionsById(req,res){
    const {id}= req.params;
    // if ID exists return actions
    if(id){
        Actions.get(id)
        .then((actions)=>{
            res.status(200).json(actions)
        })
        .catch((error)=>{
            res.status(500).json({error:fiveHundredMessage})
        })
    }else{
        res.status(404).json({error:"ID does not exist."})
    }
})

// sends a newly created action as the body of the response, adding in to commit MVP.

router.post('/',function createAction(req,res){
    const newAction = req.body;

    if(!newAction.project_id || !newAction.notes || !newAction.description){
        res.status(400).json({error:"please provide a project id,project description, and project notes"})
    }else{
        Actions.insert(newAction)
        .then((actions)=>{
            res.status(201).json(newAction)
        })
        .catch((error)=>{
            res.status(500).json({error:"unable to create new action"})
        })
    }
})


// lets update an action 

router.put('/:id', function updateAction(req,res){
    const {id} = req.params;
    const updates = req.body;

    if(!id){
        res.status(404).json({error:"id not found"})
        return;
    }else{
        Actions.update(id,updates)
        .then((action)=>{
            res.status(200).json(updates)
        })
        .catch((error)=>{
            res.status(500).json({error:"unable to update action"})
        })
    }
})

// its time to delete our action

router.delete('/:id',function deleteAction(req,res){
    const {id}= req.params;
    if(!id){
        res.status(404).json({error:"id not found"})
        return;
    }else{
        Actions.remove(id)
        .then((action)=>{
            res.status(200).json()
        })
        .catch((error)=>{
            res.status(500).json({error:`unable to delete action number ${id}`})
        })
    }
})

module.exports = router;