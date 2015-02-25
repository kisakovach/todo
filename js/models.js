App.Models.Task = Backbone.Model.extend({

      defaults: {
            
            title : "test",
            text : "Some text",
            deadline : new Date(),
            completed: 0,     
       },

       validate: function(attrs, options){

       	if(attrs.deadline.toString()==="Invalid Date"){
       		console.log("error");
       		return "No such date!";
       		this.attrs = new Date();
       	};

       },

       urlRoot : "/task"
}); 

