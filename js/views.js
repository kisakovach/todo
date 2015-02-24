
App.Views.Start = Backbone.View.extend({

    el:'body',
    
    initialize: function(){
        console.log("Index!!");
    },

    render: function(){

    },

    events:{
    "click #add_button"    : "showAddForm", 
    "click #list_button"   : "showListView",   
    "click #shedule_button": "showSheduleView",
    "click #time_button"   : "showTimeView"
    },

    showAddForm: function(e){
        //e.preventDefault();
        console.log("add button click");
        App.router.navigate("#add",{trigger: true, replace: true});
    },

    showListView: function( e ){
        // body...  
      App.router.navigate("#list",{trigger: true, replace: true});  
    },

    showSheduleView: function  () {
        // body...
    },

    showTimeView: function  () {
        // body...
    }
});


App.Views.AddTask = Backbone.View.extend({
    
    tagName:"div",

    tag_id:"add_template",

    template: window.template,

    events:{     
        "click #submit" : "addTask"
    },
    
    initialize: function(){
         
        console.log("init show");
        //this.render();
    
    },

    render: function(){
        
        
        this.$el.html("");
        this.$el.html(this.template(this.tag_id));
        //this.$el.show();
        return this;

    },

    showAddTask: function(){
        console.log("add form show");
        $("#main").html("");
        $("#main").append(this.render().$el);
    },

    

    addTask: function(e){

            console.log("submit");
            e.preventDefault();
            task = new App.Models.Task({
                                       title: $("#title").val(),
                                       text: $("#text").val(),
                                       deadline:$("#deadline").val()
                                    });
           //Для бекенда 
           /* 
            task.save();
            
            */
            this.collection.add(task);
            this.collection.saveToLocal();
    }

});


App.Views.Task = Backbone.View.extend({
  
  
  tag_id: "task_li",
  
  template: window.template("task_li"),
 
  tagName:"tr",

  initialize: function(){       
        
        console.log("task show ");
        //this.render();
        this.listenTo(this.model,"change",this.render);
    
    },

    render: function(){ 
          var m = this.model.toJSON();
          m.checked="";
          if(+(m.completed)>0){ m.checked="checked"
            this.$el.addClass("completed");
          };      
          this.$el.html(this.template(m));
          
          return this;      
    },

    events:{

        "click input[type = 'checkbox']" : "taskCompleted"
    },

    taskCompleted: function(e){
        vent.trigger("check_task");
        this.$el.toggleClass("completed");
        if(this.model.get("completed")>0){
            this.model.set("completed",0)
        } else {
            this.model.set("completed",1);
        };
        
    }


});



App.Views.Tasks = Backbone.View.extend({

    tagName: "div",


    initialize: function(){
         
        //this.$el.attr("rules","all");
        this.listenTo(this.collection ,"add", this.render);
        //this.render();
            
   },

    render: function(){
        this.group = this.collection.groupBy(App.cropDate);
        this.$el.html("");
        for(var key in this.group){
            var group = new App.Collections.Tasks(this.group[key]);
            var groupView = new App.Views.DayTasks({collection:group});
            this.$el.append("<div>"+key+"</div>");
            this.$el.append(groupView.render().el);
        };
        return this;

    },

    showTaskList: function(){

        
        $("#main").html("");
        $("#main").append(this.render().$el);

    }

    /*
    addOne: function(groupTask){

       
    }
   */
});


App.Views.DayTasks = Backbone.View.extend({

    tagName:"table",

    initialize: function(){
         
        this.$el.attr("rules","all");
        //this.collection.on("add",this.render,this);
        //this.render();
    
    },

    render:function  () {
        // body...
       this.$el.html("");
       this.collection.each(this.addOne,this);
       return this;
    },

    addOne: function(task){

       var taskView = new App.Views.Task({model:task});
       this.$el.append(taskView.render().$el);
    }

});



