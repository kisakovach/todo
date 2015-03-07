
 App.Collections.Tasks = Backbone.Collection.extend({
        
        model : App.Models.Task,
        
        url : "/task",


        saveToLocal: function(){
        	console.log("test save");
        	var p = this.toJSON();
        	localStorage.setItem(App.localKey, JSON.stringify(p));
        
        },

        fetchFromLocal: function(){

         var col = JSON.parse(localStorage.getItem(App.localKey),App.fromUTCDate);
         this.set(col);
         vent.trigger("fetchFromLocal");   
        },

        
        comparator:function(task){

                return  -task.get("deadline").valueOf();
        }


 });
