
var express = require('express');
var bookshelf = require('../bookshelf');

var tasksRouter = express.Router();

var Task = bookshelf.Model.extend({
  tableName: 'tasks'
});

var Project = bookshelf.Model.extend({
  tableName: 'project',
});

// get all tasks
tasksRouter.get('/', function(req, res, next) {

  Task.fetchAll().then(function(tasks){
    console.log(tasks.toJSON());
    res.send(tasks.toJSON());
  }).catch(function(err){
    console.error(err);
  });
  
});
  

// get task by id
tasksRouter.get('/:id', function(req, res, next) {

  
  Task.where('idtask', req.params.id).fetch().then(function(task){
    console.log(task.toJSON());
    res.send(task.toJSON());
  }).catch(function(err){
    console.error(err);
  });
  
  
});


// TO CODE:  get all tasks by resource

tasksRouter.get('/:resourceId', function(req, res, next) {
  var tasks = [ 'Chanter', 'Danser' ];
  res.send(tasks);
});


// TO CODE: get all tasks by period of time (or week) STILL TO THINK

tasksRouter.get('/:weekId', function(req, res, next) {
  var tasks = [ 'tache 1 pour semaine 1', 'tache 2 pour semaine 1' ];
  res.send(tasks);
});

// post a task
tasksRouter.post('/', function(req, res, next) {

  var newtask = new Task();
 
  newtask.set('name', 'POST test');  
  newtask.set('resourceID', 4);  
  newtask.set('projectID', 2);
  newtask.set('workTypeID', 3);

  newtask.save().then(function(task){
    console.log("Task saved: ", task.get('name'));
    res.status(200).json({message:"task created"});
  }).catch(function(err){
    console.error(err);
  });

});

//put task param: id
tasksRouter.put('/:id', function(req, res, next) 
{
  Task.where({idtask:req.params.id}).save(req.body,{patch:true}).then(function(task) {
      res.status(200).json({message: "task updated"});
  
    }).catch(function(err){
    console.error(err);
  });
});

//delete task param: id
tasksRouter.delete('/:id', function(req, res, next) 
{
    
  Task.where('idtask', req.params.id).destroy().then(function()
  {
    res.status(200).json({message:"task deleted"});
  }).catch(function(err){
    console.error(err);

  });
  
});
module.exports = tasksRouter;
