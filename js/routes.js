(function(){

 window.App = {
  Models:{},
  Views:{},
  Collections:{},
  Routers:{}
 };
 
 var vent = _.extend({}, Backbone.Events);

 window.template = function(id){
  return _.template($('#'+id).html());
 }
 // console.log(vent);
 //Router
 
 App.Views.SpecialTask = Backbone.View.extend({
  initialized: function(){
   vent.on("specialTasks:show", this.show, this);
  },
  
  show: function (id){
   console.log("To show the "+id);
  }
 });
 
 App.Routers.Router = Backbone.Router.extend({
  
  routes: {
  
  ""          : "start",
  "test/:id"  : "showSpecialTask"
  
  },
 
  start: function() {
   console.log("Превая индексная страница");
  },
   
  showSpecialTask: function (id) {
   console.log("test");
   vent.trigger("specialTasks:show", id);
  }
 
 });
 
 Backbone.history.start();
 new App.Routers.Router();
  
 
 var specialTasks = new App.Views.SpecialTask();
  
 })();