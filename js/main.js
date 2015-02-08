(function(){

 window.App = {
  Model:{},
  View:{},
  Collection:{}
 };
 
 App.defaultDeadLine = function(){
  var p = new Date();
  p.setHours(p.getHours()+1);
  return p;
 }

 App.template = function(id){
  return _.template($('#'+id).html());
 }
 
 //model
 App.Model.Task = Backbone.Model.extend({
  defaults: {
    "name":  "New task",
    "time":  new Date(),
    "text":  "New text",
	"deadLine": App.defaultDeadLine()
  }
 });


//view 

 App.View.TaskView = Backbone.View.extend({
  tagName:"li",
  
  template: App.template("task_id"),
  
  render:function(){
   this.$el.html(this.template(this.model.toJSON()));
   return this;
  }
 });

  
 
 //collection
 App.Collection.Tasks = Backbone.Collection.extend({
 model:App.Model.Task,
 
 saveTo:function(){
  localStorage.setItem("tasks", JSON.stringify(this.toJSON()));
 },
 
 load:function(){
  this.set(JSON.parse(localStorage.getItem("tasks")));
 }
});



var task = new App.Model.Task({name:"Task1", text:"My first task"});
var taskView= new App.View.TaskView({model:task}); 

//Collection






var tasks = new App.Collection.Tasks([
{ 
  name:"New task1", 
  deadLine:"21.02.2015 10:21:45", 
  text:"Text1"
  },
{
 name:"New task2",
 deadLine:"20.02.2015 11:21:45", 
 text:"Text2"
},
{
 name:"New task3", 
 deadLine:"18.02.2015 13:21:45", 
 text:"Text3"},
 {
 name:"New task4",
 deadLine:"16.02.2015 15:21:45", 
 text:"Text4"
}
 ]);
 
 // Views Collection
 
App.View.TasksView = Backbone.View.extend({
  tagName:"ul",
  
  initialize:function (){
   this.render();
  },
  
  render: function () {
   this.$el.html("");
   this.collection.each(function(task){
    var taskView = new App.View.TaskView({model:task});
	taskView.render();
	this.$el.append(taskView.$el);
   }, this);
   $("#main").html(this.$el);
  }
 });
 
 
 var tasksView = new App.View.TasksView({collection:tasks});
 tasks.add({name:"new task 5", text:"is some thing interesting..."});
 
 }());