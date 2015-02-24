App.Routers.Router = Backbone.Router.extend({
	routes:{
		""         : "index",
		"test/:id" : "test",
		"add"	   : "showAddTask",
		"list"	   : "showTaskList" 

		},

		index : function(){
			
		},

		test : function(id) {

			console.log("test "+id);
		
		},

		showAddTask: function(){
			
			App.addTaskForm.showAddTask();
		
		},

		showTaskList: function(){
		
			App.taskListView.showTaskList();	
		
		}

});