var  indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var DB_NAME = "clientDB";
var DB_STORE_NAME = 'publications';
var id;

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
    notes = [];                
    console.log(keyRangeValue);
    index.openCursor(keyRangeValue).onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        notes.push(cursor.value);
        cursor.continue();
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

function updateNotePage(id) {

  window.open("http://localhost:8080/taskmanager/updateNote/"+id,"_self"); 


}; 




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
 }); 
});



   function getIDForNotes() {
    var pathArray = window.location.pathname.split( '/' );
     id = pathArray[3];
    console.log(id);
    var url = '/notes/' + id;
    console.log("URL "+url);
    var open = window.indexedDB.open(DB_NAME, 8);
    open.onsuccess = function(event) {
    var db = event.target.result;
    var tx = db.transaction("notes", "readwrite");
    var store = tx.objectStore("notes");
    
    //Get Note 
   var InnerHTML;
   var record =  store.get(id);
   record.onsuccess = function(event) {
    console.log("RECORD");
    console.log(record.result.content.toString());
    
                  document.getElementsByName("name")[0].value =record.result.name.toString();
                  document.getElementsByName("description")[0].value =record.result.description.toString();
                  InnerHTML = record.result.content.toString();
                  
   };            
     tx.oncomplete = function() {  
      db.close();
      document.getElementById("introduction").innerHTML = InnerHTML;
      // The inline editor should be enabled on an element with "contenteditable" attribute set to "true".
      // Otherwise CKEditor will start in read-only mode.
      var introduction = document.getElementById( 'introduction' );
      introduction.setAttribute( 'contenteditable', true );

      CKEDITOR.inline( 'introduction', {
        // Allow some non-standard markup that we used in the introduction.
        extraAllowedContent: 'a(documentation);abbr[title];code',
        removePlugins: 'stylescombo',
        extraPlugins: 'sourcedialog',
        // Show toolbar on startup (optional).
        startupFocus: true
      });
     }
};                 
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
 $("#updateNoteForm").submit(function(event) {
  event.preventDefault();
   var url = '/notes/' + id;
   console.log("URL2 " + url);
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
                        url: url,
                        type: 'PUT',
                        data: json, 
                        success: function(datas) {
                                  alert("OK");
                                  window.location = "http://localhost:8080/taskmanager/all"; 
                                  } 
                        });
                  } else {
                    // update UI with progress complete 
                   // updateInterface(progress);
                   console.log("PROGRESS");
                  }
                });
              
    
 }); 
});