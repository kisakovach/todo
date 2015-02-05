
//model

function defaultDeadLine(){
 var p = new Date();
 p.setHours(p.getHours()+1);
 return p;
}

var Task = Backbone.Model.extend({
  defaults: {
    "name":  "New task",
    "time":  new Date(),
    "text":  "New text",
	"deadLine": defaultDeadLine()
  }
});

//view 

var TaskView = Backbone.View.extend({
 tagName:"li",
 template:"#task_id",
 render:function(){
  var template=_.template($(this.template).html());
  this.$el.html(template(this.model.toJSON()));
 }
})


var task = new Task({name:"Task1", text:"My first task"});
var taskView= new TaskView({model:task}); 

//Collection

var Tasks = Backbone.Collection.extend({
 model:Task
});

var tasks = new Tasks([
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
 
 var TasksView = Backbone.View.extend({
  tagName:"ul",
  
  inisialize:function (){
   this.render();
  },
  
  render: function () {
   this.$el.html("");
   this.collection.each(function(task){
    var taskView = new TaskView({model:task});
	taskView.render();
	this.$el.append(taskView.el);
   }, this);
   $("#main").html(this.$el);
  }
 })
 
 var tasksView = new TasksView({collection:tasks});
 tasks.add({name:"new task 5", text:"is som thing interesting..."});
 