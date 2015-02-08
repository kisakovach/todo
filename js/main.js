(function(){

 window.App = {
  Models:{},
  Views:{},
  Collections:{}
 };
 
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
  }
 });


//view 


 App.Views.Task = Backbone.View.extend({
  
  tagName: "li",
  
  template: template("task_id"),

  render: function(){
   this.$el.html(this.template(this.model.toJSON()));
   return this;
  },

  events: {
   "click": "showAlert"
  },

  showAlert: function(){
    alert("You are clkiked to '"+this.model.get("name")+"'");
  }
 });

// Views Collection

App.Views.Tasks = Backbone.View.extend({
  
  tagName: "ul",
  
  initialize: function (){
   this.render();
   
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
 name:"Сходитьна работу", 
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
 
 }());

