App.Models.Task = Backbone.Model.extend({

      defaults: {
            
            title : "",
            text : "Some text",
            deadline : new Date(),
            completed: 0,     
       },

       urlRoot : "/task"
}); 

