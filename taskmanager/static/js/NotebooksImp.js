
var  indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var DB_NAME = "clientDB";
var DB_STORE_NAME = 'publications';
var id;
   

  function getID() {
    var pathArray = window.location.pathname.split( '/' );
     id = pathArray[3];
    console.log(id);    
    var url = '/tasks/' + id;
    console.log(url);
  $.ajax({
      url: url,
      type: 'GET',
      success: function(datas) {
                var tasks = datas;
                console.log(tasks);
                var element = document.getElementById("updateTaskForm");   
                document.getElementsByName("status")[0].value =tasks.status;
                document.getElementsByName("name")[0].value =tasks.name;
                document.getElementsByName("description")[0].value =tasks.description;                 
                }
  });
   };
(function ($) {
    $.fn.serializeFormJSON = function () {
       var  strarr;
        var o = {};
        var o2 = {};
        var a = this.serializeArray();
        $.each(a, function () {
              if(this.name == "tags") {
                  strarr = this.value.split(',');
                  o[this.name] = strarr;
              } else {
                 o[this.name] = this.value || '';
              }         
            o2["data"] = o;
        });
        return o2;
    };
})(jQuery);

$(document).ready(function() {
 $("#updateTaskForm").submit(function(event) {
  event.preventDefault();
   var url = '/tasks/' + id;
  var data = $(this).serializeFormJSON();
  var json = JSON.stringify(data);
  console.log("how")
  console.log(json);
 $.ajax({
          url: url,
          type: 'PUT',
          data: json, 
          success: function(datas) {
                  alert("OK");
                  window.location = "http://localhost:8080/taskmanager/all";
          },
          error: function() { 
                  alert("Error!");
          }  
     });
 }); 
});

//Create Notebook
(function ($) {
    $.fn.serializeFormJSON = function () {
       var  strarr;
        var o = {};
        var o2 = {};
        var a = this.serializeArray();        
        console.log(a);
        $.each(a, function () {
              if(this.name == "tags") {
                  strarr = this.value.split(',');
                  o[this.name] = strarr;
              } else {
                 o[this.name] = this.value || '';
              } 
            o2["data"] = o;
        });
        return o2;
    };
})(jQuery);

$(document).ready(function() {
 $("#createTaskForm").submit(function(event) {
  event.preventDefault();
  var url = "/tasks"
  var data = $(this).serializeFormJSON();
  var json = JSON.stringify(data);
  console.log(json);
 $.ajax({
 type: "POST",
 url: url,
 data: json, // serializes the form's elements.
         success: function(){
         alert("OK")
        getBack();
         },
         error: function() { 
                    alert("Error!");
                }  

 });
 
 }); 
});


function createNotebook() {
  window.location = "http://localhost:8080/taskmanager/createNotebook";
}


function getUserNotebook() {
 name =  document.getElementById("idName").innerHTML;
 var url = "/tasks/users/"+name;
 console.log(url);
      
      var element = document.getElementById("notebooks");
      while (element.hasChildNodes()) {
          element.removeChild(element.lastChild);
      }

 $.get(
    url,
    function(datas) {
    var jsonResponse = JSON.parse(datas);
    var tasks = jsonResponse.data;
    console.log(tasks);
    var idd = 0;
    for (var key in tasks) {
      var newDiv = document.createElement("div");
      var innerDiv = document.createElement("div");
      var contentDiv = document.createElement("div");
      var descriptionDiv = document.createElement("div");
      var headerDiv = document.createElement("div");
      var buttonDiv = document.createElement("button");
      newDiv.className = "ui cards";
      innerDiv.className = "card";
      contentDiv.className="content";
      headerDiv.className = "header";
      descriptionDiv.className = "description";
      headerDiv.innerHTML=tasks[key].name;
      descriptionDiv.innerHTML =tasks[key].description;
      contentDiv.innerHTML = '<p hidden>'+tasks[key].id+'</p>';
      buttonDiv.innerHTML = 'Add note';
      buttonDiv.setAttribute("id", tasks[key].id);
      buttonDiv.onclick = function(event){
                                          event.preventDefault();
                                          localStorage.setItem("gid",event.currentTarget.id);
                                          createNote();
                                        }
      innerDiv.setAttribute("id",tasks[key].id); 
      innerDiv.onclick = function(event) {         
        getNotesByNotebookID(event.currentTarget.id);
      }
      contentDiv.appendChild(headerDiv);
      contentDiv.appendChild(descriptionDiv);
      contentDiv.appendChild(buttonDiv);
      innerDiv.appendChild(contentDiv);
      newDiv.appendChild(innerDiv);
      newDiv.setAttribute("id", "Div" + key);
      element.appendChild(newDiv);    
    }  
    }
);
};


