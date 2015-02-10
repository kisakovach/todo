(function(){

 window.App = {
  Models:{},
  Views:{},
  Collections:{},
  Routers:{}
 };
 
 //console.log(vent);
 
 App.defaultDeadLine = function(){
  var p = new Date();
  p.setHours(p.getHours()+1);
  return p;
 }

 window.template = function(id){
  return _.template($('#'+id).html());
 }
 
 //model
 App.Models.Task = Backbone.Model.extend({
  defaults: {
    name:  "New task",
    time:  new Date(),
    text:  "New text",
	priorety: 5,
    deadLine: App.defaultDeadLine()
  },
  
  validate: function ( attr, options){ 
   if( !$.trim(attr.name)){
    return "Name must be not empty!";   
   }
  }
 });


//view 


 App.Views.Task = Backbone.View.extend({
  
  tagName: "li",
  
  template: template("task_id"),
  
  initialize:function(){
   this.model.on("change",this.render, this);
   this.model.on("destroy",this.remove, this);
  },
  
  render: function(){
   this.$el.html(this.template(this.model.toJSON()));
   return this;
  },

  events: {
   "click .edit": "editTask",
   "click .delete": "deleteTask"
  },
  
  editTask:function(){
   var taskTitle = prompt("Change name '"+this.model.get("name")+"'", this.model.get("name")); 
   this.model.save('name',taskTitle);
  },
  
  deleteTask: function (){
   this.model.destroy();
  },
  
  remove: function (){
   this.$el.remove();
  }
 });

 // View Add Task
 
 App.Views.AddTask = Backbone.View.extend({
   
   el: "#addTask",
   
   initialized: function (){
    
   },
   
   events:{
    "submit": "addTask"
   },
   
   addTask: function (e){
    e.preventDefault();
	var nameTask = this.$el.find("input[data-add-task=name]").val();
	var textTask = this.$el.find("input[data-add-task=text]").val();
	var timeTask = this.$el.find("input[data-add-task=time]").val();
	var newTask = new App.Models.Task({
	 name: nameTask,
	 text: textTask,
	 deadLine: timeTask
	});
	console.log("Добавили задачу! "+nameTask);
	this.collection.add(newTask);
	//console.log(this.$el);
   }
   
 });
 
// Views Collection

App.Views.Tasks = Backbone.View.extend({
  
  tagName: "ul",
  
  initialize: function (){
   this.render();
   this.collection.on("add",this.render,this);
   
  },
  
  addOne: function( task ){ 
   
   var taskView = new App.Views.Task({ model:task });
   this.$el.append( taskView.render().$el ); 
  
  },

  render: function () {
   this.$el.html("");
   this.collection.each(this.addOne, this);
   return this;
   //$("#main").html(this.$el);
  }
});
  
 
 //collection
App.Collections.Task = Backbone.Collection.extend({
 
  model: App.Models.Task
 
});
 
App.tasks = new App.Collections.Task([
{ 
  name:"Сходить в магаз", 
  deadLine:"21.02.2015 10:21:45", 
  text:"Text1"
},
{
 name:"Проверить почту",
 deadLine:"20.02.2015 11:21:45", 
 text:"Text2"
},
{
 name:"Сходить на работу", 
 deadLine:"18.02.2015 13:21:45", 
 text:"Text3"
},
{
 name:"Пойти в кино",
 deadLine:"16.02.2015 15:21:45", 
 text:"Text4"
}
 ]);
 
 App.tasksView = new App.Views.Tasks({collection: App.tasks});
 $("#main").html( App.tasksView.render().$el );
 App.addTask = new App.Views.AddTask({collection: App.tasks});
 
 }());

