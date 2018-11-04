import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/issue';


const app= express () ;
const router= express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/demo');

const connection=mongoose.connection;

connection.once('open', ()=>{console.log('MongoDB database connection established successfully!');
});

app.get('/issues',function(req,res){
// var data1=new Issue({
//         title:'Mrs',
//         responsible:'Team Lead',
//         description:'Software Engineer',
//         severity:'Low',
//         status:'Closed'
//     });
//     data1.save(function(err,docs){
//         if(err){
//             return console.error(err);
//         }
//         else{
//             console.log('Saved',docs)
//             res.send(docs);
//         }
//     });

    Issue.find((err,issues)=>
    {
        if(err){
            console.log(err)
        }
        else{
            res.json(issues);
        }
    });
});

router.route('/issues/:id').get((req,res)=>{
    Issue.findById(req.params.id,(err,issue)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.json(issue);
        }

    });
});

router.route('/issues/add').post((req,res)=>{
    let issue=new Issue(req.body);
    issue.save()
        .then(issue =>{
            res.status(200).json({'issue': 'Added Sucessfully'});
        })
        .catch(err =>{
            res.status(400).send('Failed to create new reccord');
        });
});

router.route('/issues/update/:id').post((req,res)=>{
    Issue.findById(req.params.id,(err, issue)=>{
        if(!issue)
        {
            return new (new Error('Could not Load Document'));
        }
        else{
            issue.title=req.body.title;
            issue.responsible=req.body.responsible;
            issue.description=req.body.description;
            issue.severity=req.body.severity;
            issue.status=req.body.status;

            issue.save().then(issue =>{
                res.json('Update done');
            }).catch(err =>{
                res.status(400).send('Update Failed');
            });

        }
    });
});

router.route('/issues/delete/:id').get((req,res)=>{
    Issue.findByIdAndRemove({_id: req.params.id}, (err,issue)=>{
        if(err)
        {
            res.json(err);
        }
        else{
            res.json('Remove successfully');
        }
    });
});

app.use('/', router);
app.listen(4000, () => console.log("Express server running on port 4000"));

