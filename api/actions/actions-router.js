// Write your "actions" router here!
const express = require('express');
const Actions = require('../actions/actions-model')

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

// sends a newly created action as the body of the response

// router.post('/',(req,res)=>{

// })


module.exports = router;