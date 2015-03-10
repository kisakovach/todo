App.Routers.Router = Backbone.Router.extend({
	routes:{
		""         : "index",
		"edit/:id" : "edit",
		"add"	   : "showAddTask",
		"list"	   : "showTaskList" 

		},

		index : function(){
			
		},

		edit : function(id) {
			
			App.editTaskForm = new App.Views.EditTask({ model: App.tasks.get(id)});
			console.log("test "+id);
			App.editTaskForm.showEditTask();
		
		},

		showAddTask: function(){
			
			App.addTaskForm = new App.Views.AddTask({collection: App.tasks}); 
			App.addTaskForm.showAddTask();
		
		},

		showTaskList: function(){
		
			App.taskListView.showTaskList();	
		
		}

});