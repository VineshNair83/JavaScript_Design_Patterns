// var Task = require('./task.js');

//------------------------------------------------------------------------------
var Task = function(data){
  this.name = data.name;
  this.priority = data.priority;
  this.project = data.project;
  this.user = data.user;
  this.completed = data.completed;
}

Task.prototype.complete = function(){
  console.log('completing task: ' + this.name);
  this.completed = true;
};

Task.prototype.save = function(){
  console.log('saving task: ' + this.name);
};

//------------------------------------------------------------------------------
var notificationService = function(){
  var message = 'Notifying ';
  this.update = function(task){
    console.log(message + task.user + ' for N task ' + task.name)
  }
};

var loggingService = function(){
  var message = 'Logging ';
  this.update = function(task){
    console.log(message + task.user + ' for L task ' + task.name)
  }
};

var auditingService = function(){
  var message = 'Auditing ';
  this.update = function(task){
    console.log(message + task.user + ' for A task ' + task.name)
  }
};
//------------------------------------------------------------------------------
function ObserverList(){
  this.observerList = [];
};

ObserverList.prototype.add = function(obj){
  return this.observerList.push(obj);
};

ObserverList.prototype.get = function(index){
  if(index > -1 && index < this.observerList.length){
    return this.observerList[index];
  }
};

ObserverList.prototype.count = function(){
  return this.observerList.length;
}
//------------------------------------------------------------------------------
var ObservableTask = function(data){
  Task.call(this,data);
  this.observers = new ObserverList();
};

ObservableTask.prototype.addObserver = function(observer){
  this.observers.add(observer);
};

ObservableTask.prototype.notify = function(context){
  var observerCount = this.observers.count();
  for(var i=0; i<observerCount; i++){
    this.observers.get(i)(context);
  }
}

ObservableTask.prototype.save = function(){
  this.notify(this);
  Task.prototype.save.call(this);
};
//------------------------------------------------------------------------------


var not = new notificationService();
var ls = new loggingService();
var audit = new auditingService();

var task1 = new ObservableTask({name:'create demo for constructors', user: 'jon'});

task1.addObserver(not.update);
task1.addObserver(ls.update);
task1.addObserver(audit.update);

task1.save();


