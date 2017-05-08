// function iframe() {
//   content.document.designMode = 'on';
// }
var gid;
var  indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
const DB_NAME = "clientDB";
const DB_STORE_NAME = 'publications';


function createNote(id) {
 // console.log(id);
 // gid = id;
 window.location = "http://localhost:8080/taskmanager/createNote";
 //gid = id;

}; 

function getBack() {
  window.location = "http://localhost:8080/taskmanager/all";

}


function logout() {
  var url = "/logout"
  $.ajax({
          url: url,
          success: function(datas) {
                 window.location = "http://localhost:8080";
                  }   
               }); 
}






//Delete notebook
function Delete() {

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
      buttonDiv.innerHTML = 'Delete';
      buttonDiv.setAttribute("id", tasks[key].id);
      //Delete all notes from notebook
      buttonDiv.onclick = function(event){
          event.preventDefault();
          var notebookid = event.currentTarget.id;
          var url = '/tasks/' + notebookid;
          var urlForNotes = '/notes/notebook/' + notebookid;
          //console.log(url);
          $.ajax({
          url: url,
          type: 'DELETE',
          success: function(datas) {
                  // var jsonResponse = JSON.parse(datas);
                  //var tasks = datas;
                  //console.log(tasks);
                  //var idd = 0;
                  alert("Deleted notebook with id =" + notebookid);      
                  //location.reload(); 
                  }   
               }); 
         $.ajax({
          url: urlForNotes,
          type: 'DELETE',
          success: function(datas) {
                  // var jsonResponse = JSON.parse(datas);
                  //var tasks = datas;
                  //console.log(tasks);
                  //var idd = 0;
                  alert("Deleted all notes from notebook with id =" + notebookid);      
                  //location.reload(); 
                  }   
               });                                             
      }
      innerDiv.setAttribute("id",tasks[key].id); 
      innerDiv.onclick = function(event) {
       // event.preventDefault();
        deleteNotesByNotebookID(event.currentTarget.id);


      }
      
      contentDiv.appendChild(headerDiv);
      contentDiv.appendChild(descriptionDiv);
      contentDiv.appendChild(buttonDiv);
      innerDiv.appendChild(contentDiv);
      newDiv.appendChild(innerDiv);
      newDiv.setAttribute("id", "Div" + key);
      
      //newDiv.setAttribute("onclick","parseNotebook()");

      element.appendChild(newDiv);    
    }  
    }
);


}; 

//DELETE NOTE
function deleteNotesByNotebookID(id) {
    var element = document.getElementById("notebooks");
      while (element.hasChildNodes()) {
          element.removeChild(element.lastChild);
      }
 
 var open = window.indexedDB.open(DB_NAME, 8);
 open.onsuccess = function(event) {
    
    var keyRangeValue = IDBKeyRange.only(id);
    var db = event.target.result;
    var tx = db.transaction("notes", "readwrite");
    var store = tx.objectStore("notes");
    var index = store.index("notebookid");
    //store.createIndex('title', 'title', { unique: false });
    //store.createIndex('year', 'year', { unique: false });
    notes = [];                
    console.log(keyRangeValue);
    index.openCursor(keyRangeValue).onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
       // alert("Name for SSN " + cursor.key + " is " + cursor.value.name);
        notes.push(cursor.value);
        cursor.continue();

      }
      else {
       // alert("No more entries!");
      }


     
 
    };

     tx.oncomplete = function() {  

    for (var key in notes) {
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
              
              headerDiv.innerHTML=notes[key].name;
              descriptionDiv.innerHTML =notes[key].description; 

              innerDiv.setAttribute("id",notes[key].id); 
              innerDiv.onclick = function(event) {
                // event.preventDefault();
                //Decryption  
                getNoteByID(event.currentTarget.id);
              }
              buttonDiv.innerHTML = 'Delete';
              buttonDiv.setAttribute("id", notes[key].id);
              buttonDiv.onclick = function(event) {
                event.preventDefault();
                var id = event.currentTarget.id
                var url = '/notes/' + id ;
                //console.log(url);
                $.ajax({
                url: url,
                type: 'DELETE',
                success: function(datas) {
                        
                        alert("Deleted note with id =" + id);      
                        location.reload(); 
                        }   
                     }); 

              }

              contentDiv.appendChild(headerDiv);
              contentDiv.appendChild(descriptionDiv);
              innerDiv.appendChild(contentDiv);
              innerDiv.appendChild(buttonDiv);
              newDiv.appendChild(innerDiv);
              newDiv.setAttribute("id", "Div" + key);   
              element.appendChild(newDiv);

             
    }  
               
        db.close();
     };

  

 }



};


//Update notebook
function Update() {
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
      buttonDiv.innerHTML = 'Update';
      buttonDiv.setAttribute("id", tasks[key].id);
      //Update notebook
      buttonDiv.onclick = function(event){
        updateNotebookPage(event.currentTarget.id); 
                                                      
      }
      innerDiv.setAttribute("id",tasks[key].id); 
      innerDiv.onclick = function(event) {
       // event.preventDefault();
        updateNotesByNotebookID(event.currentTarget.id);


      }
      
      contentDiv.appendChild(headerDiv);
      contentDiv.appendChild(descriptionDiv);
      contentDiv.appendChild(buttonDiv);
      innerDiv.appendChild(contentDiv);
      newDiv.appendChild(innerDiv);
      newDiv.setAttribute("id", "Div" + key);
      
      //newDiv.setAttribute("onclick","parseNotebook()");

      element.appendChild(newDiv);    
    }  
    }
);

}



//UPDATE NOTE
function updateNotesByNotebookID(id) {
    var element = document.getElementById("notebooks");
      while (element.hasChildNodes()) {
          element.removeChild(element.lastChild);
      }
 
 var open = window.indexedDB.open(DB_NAME, 8);
 open.onsuccess = function(event) {
    
    var keyRangeValue = IDBKeyRange.only(id);
    var db = event.target.result;
    var tx = db.transaction("notes", "readwrite");
    var store = tx.objectStore("notes");
    var index = store.index("notebookid");
    //store.createIndex('title', 'title', { unique: false });
    //store.createIndex('year', 'year', { unique: false });
    notes = [];                
    console.log(keyRangeValue);
    index.openCursor(keyRangeValue).onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
       // alert("Name for SSN " + cursor.key + " is " + cursor.value.name);
        notes.push(cursor.value);
        cursor.continue();

      }
      else {
       // alert("No more entries!");
      }


     
 
    };

     tx.oncomplete = function() {  

    for (var key in notes) {
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
              
              headerDiv.innerHTML=notes[key].name;
              descriptionDiv.innerHTML =notes[key].description; 

              innerDiv.setAttribute("id",notes[key].id); 
              innerDiv.onclick = function(event) {
                // event.preventDefault();
                //Decryption  
                getNoteByID(event.currentTarget.id);
              }
              buttonDiv.innerHTML = 'UPDATE';
              buttonDiv.setAttribute("id", notes[key].id);
              buttonDiv.onclick = function(event) {
                event.preventDefault();
                updateNotePage(event.currentTarget.id) 

              }

              contentDiv.appendChild(headerDiv);
              contentDiv.appendChild(descriptionDiv);
              innerDiv.appendChild(contentDiv);
              innerDiv.appendChild(buttonDiv);
              newDiv.appendChild(innerDiv);
              newDiv.setAttribute("id", "Div" + key);   
              element.appendChild(newDiv);

             
    }  
               
        db.close();
     };

  

 }



};



function updateNotebookPage(id) {
//console.log(t);
  window.open("http://localhost:8080/taskmanager/updateTask/"+id,"_self"); 
}; 

function updateNotePage(id) {

  window.open("http://localhost:8080/taskmanager/updateNote/"+id,"_self"); 


}; 



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
        // window.location.href = "/taskmanager/all"; // show response from the php script.
         alert("OK")
        getBack();
         },
         error: function() { 
                    alert("Error!");
                }  

 });
 
 }); 
});
//create Note
$(document).ready(function() {
 
 $("#createNoteForm").submit(function(event) {
  document.getElementById("notebookid").value = localStorage.getItem("gid");
  event.preventDefault();
  var url = "/notes"
  var outKey;

  var data = $(this).serializeFormJSON();
  

                var password = new buffer.SlowBuffer(localStorage.getItem("clientPass").normalize('NFKC'));
                var salt = new buffer.SlowBuffer("someSalt".normalize('NFKC'));
           
                var N = 1024, r = 8, p = 1;
                var dkLen = 32;
              
                scrypt(password, salt, N, r, p, dkLen, function(error, progress, key) {
                  if (error) {
                    console.log("Error: " + error);
           
                  } else if (key) {
                  var text = document.getElementById("introduction").innerHTML;
                   var textBytes = aesjs.utils.utf8.toBytes(text);
                  // The counter is optional, and if omitted will begin at 1
                  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
                  var encryptedBytes = aesCtr.encrypt(textBytes);
                  // To print or store the binary data, you may convert it to hex
                  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

                   data["data"].content = encryptedHex.toString();
                   console.log(data["data"].content);
                   var json = JSON.stringify(data);

                   console.log(json);
                   $.ajax({
                   type: "POST",
                   url: url,
                   data: json, // serializes the form's elements.
                           success: function(){
                          // window.location.href = "/taskmanager/all"; // show response from the php script.
                           alert("OK")
                          getBack();
                           },
                           error: function() { 
                                      alert("Error!");
                                  }  

                   });
           
                  } else {
                    // update UI with progress complete 
                   // updateInterface(progress);
                   console.log("PROGRESS");
                   

                  }
                });


  //data["data"].content = document.getElementById("introduction").innerHTML;
                   //console.log(document.getElementById("introduction").innerHTML);

  
 
 }); 
});





function getNoteByID(note_id) {
   
    var element = document.getElementById("textContainerInRow");
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
   
  
  var open = window.indexedDB.open(DB_NAME, 8);
 open.onsuccess = function(event) {
    
    
    var db = event.target.result;
    var tx = db.transaction("notes", "readwrite");
    var store = tx.objectStore("notes");
    
    //Get Note 

   var record =  store.get(note_id);
   record.onsuccess = function(event) {
    console.log("RECORD");
    console.log(record.result.content.toString());
    var newDiv = document.createElement("div");
         

          
              
                  newDiv.innerHTML = record.result.content.toString();
                  element.appendChild(newDiv);
   };
   
   

                 

              

    

     tx.oncomplete = function() {  
      db.close();
     }


}; 

}




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
       // event.preventDefault();
         
        getNotesByNotebookID(event.currentTarget.id);
      }
      contentDiv.appendChild(headerDiv);
      contentDiv.appendChild(descriptionDiv);
      contentDiv.appendChild(buttonDiv);
      innerDiv.appendChild(contentDiv);
      newDiv.appendChild(innerDiv);
      newDiv.setAttribute("id", "Div" + key);
      
      //newDiv.setAttribute("onclick","parseNotebook()");

      element.appendChild(newDiv);    
    }  
    }
);
};


function getUserNotes() {
 name =  document.getElementById("idName").innerHTML;
 var url = "/notes/users/"+name;
 var element = document.getElementById("notebooks");
      while (element.hasChildNodes()) {
          element.removeChild(element.lastChild);
      }
 
    $.get(
        url,
        function(datas) {
        var jsonResponse = JSON.parse(datas);
        var notes = jsonResponse.data;
        console.log(notes);
        var idd = 0;
          for (var key in notes) {
            var newDiv = document.createElement("div");
            var innerDiv = document.createElement("div");
            var contentDiv = document.createElement("div");
            var descriptionDiv = document.createElement("div");
            var headerDiv = document.createElement("div");
            
            newDiv.className = "ui cards";
            innerDiv.className = "card";
            contentDiv.className="content";
            headerDiv.className = "header";
            descriptionDiv.className = "description";
            
            headerDiv.innerHTML=notes[key].name;
            descriptionDiv.innerHTML =notes[key].description; 

            innerDiv.setAttribute("id",notes[key].id); 
            innerDiv.onclick = function(event) {
              // event.preventDefault();
                
              getNoteByID(event.currentTarget.id);
            }

            contentDiv.appendChild(headerDiv);
            contentDiv.appendChild(descriptionDiv);
            innerDiv.appendChild(contentDiv);
            newDiv.appendChild(innerDiv);
            newDiv.setAttribute("id", "Div" + key);   
            element.appendChild(newDiv);

             
    }  
        });
};


function getNotesByNotebookID(id) {
    var element = document.getElementById("notebooks");
      while (element.hasChildNodes()) {
          element.removeChild(element.lastChild);
      }

 
 var open = window.indexedDB.open(DB_NAME, 8);
 open.onsuccess = function(event) {
    
    var keyRangeValue = IDBKeyRange.only(id);
    var db = event.target.result;
    var tx = db.transaction("notes", "readwrite");
    var store = tx.objectStore("notes");
    var index = store.index("notebookid");
    //store.createIndex('title', 'title', { unique: false });
    //store.createIndex('year', 'year', { unique: false });
    notes = [];                
    console.log(keyRangeValue);
    index.openCursor(keyRangeValue).onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
       // alert("Name for SSN " + cursor.key + " is " + cursor.value.name);
        notes.push(cursor.value);
        cursor.continue();

      }
      else {
       // alert("No more entries!");
      }


     
 
    };

     tx.oncomplete = function() {  

    for (var key in notes) {
              var newDiv = document.createElement("div");
              var innerDiv = document.createElement("div");
              var contentDiv = document.createElement("div");
              var descriptionDiv = document.createElement("div");
              var headerDiv = document.createElement("div");
              
              newDiv.className = "ui cards";
              innerDiv.className = "card";
              contentDiv.className="content";
              headerDiv.className = "header";
              descriptionDiv.className = "description";
              
              headerDiv.innerHTML=notes[key].name;
              descriptionDiv.innerHTML =notes[key].description; 

              innerDiv.setAttribute("id",notes[key].id); 
              innerDiv.onclick = function(event) {
                // event.preventDefault();
                //Decryption  
                getNoteByID(event.currentTarget.id);
              }

              contentDiv.appendChild(headerDiv);
              contentDiv.appendChild(descriptionDiv);
              innerDiv.appendChild(contentDiv);
              newDiv.appendChild(innerDiv);
              newDiv.setAttribute("id", "Div" + key);   
              element.appendChild(newDiv);

             
    }  
               
        db.close();
     };

  

 }



}; 

//When user login
function startDBsession() {

if (!window.indexedDB) {
    window.alert("Ваш браузер не поддерживат стабильную версию IndexedDB. Такие-то функции будут недоступны");
}


// Open (or create) the database
var open = window.indexedDB.open(DB_NAME, 8);

open.onerror = function(e) {
   alert('Error: ' + e.target.error.name + ': Failed to open the database');
};

// Create the schema
open.onupgradeneeded = function(event) {
    console.log("onupgradeneeded");


    var db = event.target.result;
    if (event.oldVersion < 8) {
    db.deleteObjectStore("notebooks");
    db.deleteObjectStore("notes");
    }
    var notebooks = db.createObjectStore("notebooks", {keyPath: 'id', autoIncrement:true});
    var notes = db.createObjectStore("notes", {keyPath: 'id', autoIncrement:true});

    notebooks.createIndex("createdby","createdby", {unique: true});
    notebooks.createIndex("name","name", {unique: false});
    notebooks.createIndex("description","description", {unique: false});

    notes.createIndex("createdby","createdby", {unique: true});
    notes.createIndex("name","name", {unique: false});
    notes.createIndex("description","description", {unique: false});
    notes.createIndex("content","content", {unique: false});
    notes.createIndex("notebookid","notebookid", {unique: false});

};

open.onsuccess = function(event) {
    // Start a new transaction
    var db = event.target.result;
                var password = new buffer.SlowBuffer(localStorage.getItem("clientPass").normalize('NFKC'));
                console.log("Password " + password);
                var salt = new buffer.SlowBuffer("someSalt".normalize('NFKC'));
           
                var N = 1024, r = 8, p = 1;
                var dkLen = 32;
    
        scrypt(password, salt, N, r, p, dkLen, function(error, progress, key) {
                  if (error) {
                    console.log("Error: " + error);
           
                  } else if (key) {

                  getUserNotebooksForClientSide(key);
                  getUserNotesForClientSide(key);
              

                  } else {
                    console.log("PROGRESS");
                  }

                });
        
    
    // // Close the db when the transaction is done
    // tx.oncomplete = function() {
       
    //    db.close();
    // };

   
}
endDBsession();

};

window.onload = function() {
  startDBsession();
};


function endDBsession() {
 var open = window.indexedDB.open(DB_NAME, 8); 
 open.onsuccess = function(event) {
    // Start a new transaction
    var db = event.target.result;
    var transaction = db.transaction(["notes"], "readwrite");
     // create an object store on the transaction
    var objectStore = transaction.objectStore("notes");

    // clear all the data out of the object store
    var objectStoreRequest = objectStore.clear();
    
    transaction.oncomplete = function() {
      db.close();
    }
  }
 

  // report on the success of opening the transaction
  // transaction.oncomplete = function(event) {
  //   note.innerHTML += '<li>Transaction completed: database modification finished.</li>';
  // };


  // transaction.onerror = function(event) {
  //   note.innerHTML += '<li>Transaction not opened due to error: ' + transaction.error + '</li>';
  // };

 
};

//Fill IndexDB
function getUserNotebooksForClientSide(key) {
  name =  document.getElementById("idName").innerHTML;
  var url = "/tasks/users/"+name;
  var notebooskData;
 

$.ajax({
             url:url,
             type: "GET",
             
             success: function(datas) {
                var jsonResponse = JSON.parse(datas);
                var tasks = jsonResponse.data;
                notebooskData = tasks;
                var open = window.indexedDB.open(DB_NAME, 8);

                open.onerror = function(e) {
                   alert('Error: ' + e.target.error.name + ': Failed to open the database');
                };

                

                open.onsuccess = function(event) {
                    // Start a new transaction
                    var db = event.target.result;
                    var tx = db.transaction("notebooks", "readwrite");
                    var store = tx.objectStore("notebooks");
                    //var index = store.index("NameIndex");

                    // Add some data
                    
                    console.log(notebooskData);
                    for(var i in notebooskData) {
                      console.log(notebooskData[i].name);
                      store.put({id: notebooskData[i].id, name: notebooskData[i].name, description: notebooskData[i].description });
    
                      }
                    
                    //store.clear();
                    // // Close the db when the transaction is done
                    tx.oncomplete = function() {
                       
                       db.close();
                    };

                   
                }


              }

            
        }); 

     
};
//Fill indexDB
function getUserNotesForClientSide(key) {
  name =  document.getElementById("idName").innerHTML;
  var url = "/notes/users/"+name;
  var notebooskData;
 

$.ajax({
             url:url,
             type: "GET",
             
             success: function(datas) {
                var jsonResponse = JSON.parse(datas);
                var tasks = jsonResponse.data;
                notesData = tasks;
                var open = window.indexedDB.open(DB_NAME, 8);

                open.onerror = function(e) {
                   alert('Error: ' + e.target.error.name + ': Failed to open the database');
                };

                

                open.onsuccess = function(event) {
                    // Start a new transaction
                    var db = event.target.result;
                    var tx = db.transaction("notes", "readwrite");
                    var store = tx.objectStore("notes");
                    //var index = store.index("NameIndex");

                    // Add some data
                    
                    //console.log(notebooskData);
                    for(var i in notesData) {
                    //  console.log(notebooskData[i].name);

                     // When ready to decrypt the hex string, convert it back to bytes
                  var encryptedBytes = aesjs.utils.hex.toBytes(notesData[i].content.toString());
                  // The counter mode of operation maintains internal state, so to
                  // decrypt a new instance must be instantiated.
                  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
                  var decryptedBytes = aesCtr.decrypt(encryptedBytes);
                  // Convert our bytes back into text
                  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);



                  store.put({id: notesData[i].id, name: notesData[i].name, notebookid: notesData[i].notebookid, description: notesData[i].description, content: decryptedText.toString() });
    
                      }
                    
                    //store.clear();
                    // // Close the db when the transaction is done
                    tx.oncomplete = function() {
                       
                       db.close();
                    };

                   
                }


              }

            
        }); 

     
};




// function encryption() {
// var textBytes = aesjs.utils.utf8.toBytes(text);

// // The counter is optional, and if omitted will begin at 1
// var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
// var encryptedBytes = aesCtr.encrypt(textBytes);

// // To print or store the binary data, you may convert it to hex
// var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
// console.log(encryptedHex);

// // When ready to decrypt the hex string, convert it back to bytes
// var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

// // The counter mode of operation maintains internal state, so to
// // decrypt a new instance must be instantiated.
// var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
// var decryptedBytes = aesCtr.decrypt(encryptedBytes);

// // Convert our bytes back into text
// var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
// console.log(decryptedText);
// // "Text may be any length you wish, no padding is required."
// };