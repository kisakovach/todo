(function(){
    
    window.App = {
      
      Models : {},
      Views : {},
      Collections : {},
      Routers:{},

      initialize:function(){
        
        this.setSizing();
        Backbone.history.start();
        this.router = new this.Routers.Router();
        this.startView = new this.Views.Start();
        this.tasks = new this.Collections.Tasks();
        this.tasks.fetchFromLocal();
			
        this.addTaskForm = new this.Views.AddTask({collection: this.tasks});
        this.taskListView = new this.Views.Tasks({collection: this.tasks});
		vent.on("check_task",this.tasks.saveToLocal,this.tasks);
      },

      setSizing:function(){

        $("body").css("width",$(window).width()- this.getScrollBarWidth());
        $("body").css("height",$(window).height()- this.getScrollBarWidth());
      
      },

      getScrollBarHeight: function () {
        var jTest = $('<div style="display:none;width:50px;overflow: scroll"><div style="width:100px;"><br /><br /></div></div>');
        $('body').append(jTest);
        var h = jTest.innerHeight();
        jTest.css({
            overflow: 'auto',
            width: '200px'
        });
        var h2 = jTest.innerHeight();
        return h - h2;
      },

      getScrollBarWidth: function () {
          var jTest = $('<div style="display:none;height:50px;overflow: scroll"><div style="height:100px;"></div></div>');
          $('body').append(jTest);
          var w = jTest.innerWidth();
          jTest.css({
              overflow: 'auto',
              height: '200px'
          });
          var w2 = jTest.innerWidth();
          return w - w2;
      }

    };

    window.vent = _.extend({},Backbone.Events);


    App.localKey = "tasks";

    window.template = function(tag_id){

        return _.template($("#"+tag_id).html());

    };

    App.fromUTCDate = function(key,value){

      if(key == "deadline") return new Date(value);
      return value;

    }

    Date.createFromMysql = function(mysql_string) {
       if(typeof mysql_string === 'string') {
        var t = mysql_string.split(/[- :\.]/);
        return new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);          
       }
        return mysql_string;   
    };

    App.cropDate = function(task){
      var date = Date.createFromMysql(task.get("deadline"));
      return new Date(date.getFullYear(),date.getMonth(),
        date.getDate()); 
    };


  }());

