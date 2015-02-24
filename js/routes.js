(function(){

 window.App = {
  Models:{},
  Views:{},
  Collections:{},
  Routers:{}
 };
 
 window.vent = _.extend( {}, Backbone.Events );

 window.template = function(id){
  return _.template( $('#'+id).html() );
 }
 // console.log(vent);
 //Router
 App.Models.SpecialTask = Backbone.Model.extend({
   
   default:{
    name: "NewTask",
    text: "New text",
    time: new Date()

   }

 })

 App.Collections.SpecialTask = Backbone.Collection.extend({
  
  model:App.Models.SpecialTask

 })

 
 App.Routers.Router = Backbone.Router.extend({
  
  routes: {
  
  ""                 : "start",
  "specialTasks/:id"  : "showSpecialTask"
  
  },
 
  start: function() {
   console.log("Превая индексная страница");
  },
   
  showSpecialTask: function (id) {
  
   //console.log("test "+id);
   vent.trigger("specialTasks:show", id);
  
  }
 
 });
 

 App.Views.SpecialTasks = Backbone.View.extend({

  initialize: function (){
   vent.on("specialTasks:show",this.show,this);  
  },

  show: function (id) {
    console.log(id);
    console.log(this.collection);
    var task = this.collection.get(id);
    console.log(task);
  }

 });
 
  App.Tasks = new App.Collections.SpecialTask([
  {
   name:"Print me", 
   text:"Go Sleep!!!"
  },
  {
   name:"Erase me", 
   text:"Go Fack!!!"
  },
  {
   name:"Read me", 
   text:"I am so happy!!!"
  }
  ]);

 new App.Views.SpecialTasks({collection:App.Tasks});
 new App.Routers.Router();
 Backbone.history.start(); 
 
  
 })();